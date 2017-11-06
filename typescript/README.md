# TypeScript

## Linting
We mainly use tslint to lint our TypeScript.

## Tooling
For tslint to work properly we need to install tslint as a dev-dependency.

### Install dependencies
Install tslint:
```
npm install --save-dev tslint
```

Install tslint config
```
npm install --save-dev @telenorfrontend/tslint-config-telenor
```

### Add lint script to package.json

```
scripts: {
  ...
  "test:tslint": "tslint list of your sources",
  ...
}
```
### Extend your local tslint.json

Create your local tslint.json in the project root and add the following:

```
{
  "extends": "@telenorfrontend/tslint-config-telenor"
}

```
