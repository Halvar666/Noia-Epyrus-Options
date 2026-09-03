#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="$ROOT/dist"
WORK="$ROOT/.build"
VERSION="$(python3 - "$ROOT/install.rdf" <<'PY'
import sys, xml.etree.ElementTree as ET
p=sys.argv[1]
r=ET.parse(p).getroot()
ns={'em':'http://www.mozilla.org/2004/em-rdf#'}
d=r.find('.//{http://www.w3.org/1999/02/22-rdf-syntax-ns#}Description')
print(d.find('em:version',ns).text)
PY
)"
NAME="Noia_Epyrus_Options_${VERSION}"
SOURCE_DATE_EPOCH="${SOURCE_DATE_EPOCH:-1788393600}"

rm -rf "$WORK"
mkdir -p "$WORK/stage" "$DIST"
cp "$ROOT/install.rdf" "$ROOT/chrome.manifest" "$WORK/stage/"
cp -a "$ROOT/chrome" "$ROOT/defaults" "$WORK/stage/"
cp "$ROOT/LICENSE" "$ROOT/LICENSE-NOIA-FOX-MPL-1.1" "$ROOT/CREDITS.md" "$ROOT/THIRD_PARTY_NOTICES.md" "$WORK/stage/"

python3 - "$WORK/stage" "$SOURCE_DATE_EPOCH" <<'PY'
from pathlib import Path
import os,sys
root=Path(sys.argv[1]); epoch=int(sys.argv[2])
for p in [root,*root.rglob('*')]:
    try: os.utime(p,(epoch,epoch),follow_symlinks=False)
    except (NotImplementedError,FileNotFoundError): pass
PY

rm -f "$DIST/$NAME.xpi" "$DIST/$NAME.sha256"
(
  cd "$WORK/stage"
  LC_ALL=C find . -type f -print | sort | zip -X -9 -q "$DIST/$NAME.xpi" -@
)
(cd "$DIST" && sha256sum "$NAME.xpi" > "$NAME.sha256")
printf 'Built %s\n' "$DIST/$NAME.xpi"
