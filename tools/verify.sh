#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VERSION="$(python3 - "$ROOT/install.rdf" <<'PY'
import sys, xml.etree.ElementTree as ET
r=ET.parse(sys.argv[1]).getroot(); ns={'em':'http://www.mozilla.org/2004/em-rdf#'}
d=r.find('.//{http://www.w3.org/1999/02/22-rdf-syntax-ns#}Description')
print(d.find('em:version',ns).text)
PY
)"
NAME="Noia_Epyrus_Options_${VERSION}"
XPI="$ROOT/dist/$NAME.xpi"

[[ -f "$XPI" ]] || { echo "Missing build: $XPI" >&2; exit 1; }
unzip -tq "$XPI" >/dev/null

python3 - "$XPI" <<'PY'
import sys, zipfile, xml.etree.ElementTree as ET
xpi=sys.argv[1]
with zipfile.ZipFile(xpi) as z:
    names=set(z.namelist())
    root=ET.fromstring(z.read('install.rdf'))
    ns={'em':'http://www.mozilla.org/2004/em-rdf#'}
    d=root.find('.//{http://www.w3.org/1999/02/22-rdf-syntax-ns#}Description')
    def val(tag):
        e=d.find(f'em:{tag}',ns); return e.text if e is not None else None
    assert val('id') == 'noiaepyrus-options@halvar666'
    assert val('name') == 'Noia Epyrus Options'
    app=d.find('em:targetApplication',ns).find('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}Description')
    assert app.find('em:id',ns).text == '{29877c1d-27df-4421-9a79-382c31470151}'
    assert app.find('em:minVersion',ns).text == '2.2.1'
    assert app.find('em:maxVersion',ns).text == '2.2.1'
    for req in ['chrome.manifest','chrome/content/runtime.js','chrome/content/options.xul','defaults/preferences/noiaepyrusoptions.js','LICENSE','CREDITS.md','THIRD_PARTY_NOTICES.md']:
        assert req in names, req
    forbidden=[n for n in names if 'AUDIT' in n or 'CLEANBUILD_REPORT' in n or 'SOURCE_CLEANUP_REPORT' in n]
    assert not forbidden, forbidden
print('XPI verification OK')
PY

(cd "$ROOT/dist" && sha256sum -c "$NAME.sha256")
