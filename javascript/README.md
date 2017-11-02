# Javascript

## Linting
We mainly use eslint to lint our JavaScript.

## Tooling
For eslint to work properly we need to install eslint as a dev-dependency.

### Install dependencies
Install eslint:
```
npm install --save-dev eslint@^4.2.0
```

Install eslint babel plugin:
```
npm install --save-dev babel-eslint@^7.2.0
```

Install eslint config
```
npm install --save-dev @telenorfrontend/eslint-config-telenor
```

### Add lint script to package.json

```json
scripts: {
  ...
  "test:eslint": "eslint list of your sources",
  ...
}
```
### Extend your local .eslintrc.json

Create your local .eslintrc.json in the project root and add the following:

```
{
  "extends": "@telenorfrontend/telenor"
}
```
