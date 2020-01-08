buffett-code-api-client-google-spreadsheet
==========================================

[![Node CI](https://github.com/BuffettCode/buffett-code-api-client-google-spreadsheet/workflows/Node%20CI/badge.svg)](https://github.com/BuffettCode/buffett-code-api-client-google-spreadsheet/actions?query=workflow%3A%22Node+CI%22)

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

## Deploy

Prepare the following files:
- `.clasp.json`
- `.clasp.local.json`
- `.clasp.dev.json`   # correspond to develop branch
- `.clasp.prod.json`  # correspond to master branch

```sh
# deploy to local environment
npm run deploy # or npm run deploy:local

# deploy to dev environment
npm run deploy:dev

# deploy to prod environment
npm run deploy:prod
```
