buffett-code-api-client-google-spreadsheet
==========================================

[![Node CI](https://github.com/BuffettCode/buffett-code-api-client-google-spreadsheet/workflows/Node%20CI/badge.svg?branch=development)](https://github.com/BuffettCode/buffett-code-api-client-google-spreadsheet/actions?query=workflow%3A%22Node+CI%22)

## Build

```sh
npm run build
# or
npm run watch
```

## Test

```sh
npm test
```

## Environment settings

Prepare the following files:
- `.clasp.json`       # required, the current environment
- `.clasp.local.json` # optional, correspond to private environment
- `.clasp.dev.json`   # optional, correspond to develop environment
- `.clasp.prod.json`  # optional, correspond to production environment

Copy `.clasp.template.json` and edit `.clasp.*.json` for set your script id.
The script id can be get from `File > Project properties > Script ID` in your script page.

```bash
cp .clasp.template.json .clasp.prod.json
cp .clasp.template.json .clasp.dev.json
cp .clasp.template.json .clasp.local.json
cp .clasp.local.json .clasp.json  # Use local as initial environment
```

Finally, you can switch the environment use npm script.

```
# NOTE: these commands overwrite `.clasp.json`
npm run switch:local
npm run switch:dev
npm run switch:prod
```

## Deploy

```sh
npm run login # only the first time

# deploy to local environment
npm run deploy # or npm run deploy:local

# deploy to dev environment
npm run deploy:dev

# deploy to prod environment
npm run deploy:prod
```

## Release

1. Edit `src/version.ts`.
2. Merge development branch into master.
3. Create a release on github.
3. Create Deployments from `Publish` -> `Deploy from manifest` in script editor for prodcution.
