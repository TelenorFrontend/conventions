# SCSS

## Linting
We mainly use stylelint to lint our scss-files. We lint for typical mistakes found when using scss such as exaggerated nesting and wrong usage of mixins. We also lint style so that all styles share a common property order.

## Tooling
To use style-lint we need to install it along with some dependencies.

### Install dependencies
Install stylelint:
```
npm install --save-dev stylelint@^7.11.0
```

Install config standard:
```
npm install --save-dev stylelint-config-standard
```

Install stylelint order:
```
npm install --save-dev stylelint-order@^0.5.0
```

Install stylelint scss:

```
npm install --save-dev stylelint-scss@^1.4.0
```

Add the conventions repo to your dependencies:
```
npm install --save-dev https://github.com/TelenorFrontend/conventions.git
```

### Add lint script to package.json

```json
scripts: [
  ...
  "test:stylelint": "stylelint list of your sources",
  ...
]
```

### Extend your local .stylelintrc.yml

Create your local `.stylelintrc.yml` and add the following

```yml
extends: ./node_modules/tn-conventions/scss/.stylelintrc.yml
```