# Noia Epyrus Options

**Noia Epyrus Options** is a legacy XUL add-on for **Epyrus 2.2.1** that provides optional visual settings for the [Noia Epyrus](https://github.com/Halvar666/Noia-Epyrus) complete theme.

The add-on is derived from **Noia Fox Options** by David Vincent and adapts selected classic Noia Fox customization features to the current Epyrus theme structure.

## Status

Current development build: **1.0.0a17**

Tested with:

- Epyrus 2.2.1 — Linux x86_64 GTK3
- Epyrus 2.2.1 — Windows 64-bit

The add-on only applies its runtime styles while **Noia Epyrus** is active. Preferences remain stored when another theme is selected.

## Available options

- Grey, Blue and Black Noia color schemes
- Default Noia/Australis, classic square and classic rounded mail tabs
- Standard, square and rounded dialog tabs
- Rounded dialog buttons
- Blue close buttons
- Classic Noia striped message rows
- Optional primary-toolbar borders
- Toolbar-button hover background
- Optional plain toolbars without gradient/effect

## Repository layout

- `chrome/content/` — XUL UI, runtime code and optional stylesheets
- `chrome/skin/` — add-on artwork and UI styling
- `chrome/locale/en-US/` — locale strings
- `defaults/preferences/` — default preferences
- `install.rdf` — legacy add-on metadata
- `chrome.manifest` — chrome package and overlay registration
- `tools/build.sh` — XPI build helper
- `tools/verify.sh` — package and metadata checks

## Building

Requirements: `bash`, `zip`, `unzip`, `python3` and `sha256sum`.

```bash
./tools/build.sh
./tools/verify.sh
```

Build output is written to `dist/`.

## Origin

Noia Epyrus Options is based on **Noia Fox Options 3.x** by David Vincent. Several visual rules and image assets were reconstructed from the earlier Noia Fox 2.x theme/options packages in order to restore Thunderbird-era customization features for Epyrus.

See [CREDITS.md](CREDITS.md), [MODIFICATIONS.md](MODIFICATIONS.md) and [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

The add-on code derived from **Noia Fox Options** is distributed under the **Mozilla Public License 2.0**, matching the upstream Noia Fox Options 3.x license.

Several inherited visual assets originate from the **Noia Fox theme**, whose upstream source was distributed under the **Mozilla Public License 1.1**. Those files retain their original licensing terms. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
