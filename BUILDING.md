# Building Noia Epyrus Options

The repository contains a legacy XUL add-on and does not require compilation.

## Requirements

- bash
- zip / unzip
- python3
- sha256sum

## Build

From the repository root:

```bash
./tools/build.sh
```

The XPI and SHA256 file will be written to `dist/`.

## Verify

```bash
./tools/verify.sh
```

The verifier checks archive integrity, add-on metadata, target application, required chrome packages and the absence of development-only artifacts.
