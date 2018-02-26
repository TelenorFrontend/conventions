# SCSS

## Linting
We mainly use stylelint to lint our scss-files. We lint for typical mistakes found when using scss such as exaggerated nesting and wrong usage of mixins. We also lint style so that all styles share a common property order.

## Tooling
To use style-lint we need to install it along with some dependencies.

### Install dependencies

#### Install all at once
```
npm i --save-dev stylelint stylelint-config-standard stylelint-order stylelint-scss @telenorfrontend/stylelint-config-telenor
```

#### Install separately
Install stylelint:
```
npm install --save-dev stylelint
```

Install config standard:
```
npm install --save-dev stylelint-config-standard
```

Install stylelint order:
```
npm install --save-dev stylelint-order
```

Install stylelint scss:

```
npm install --save-dev stylelint-scss
```

Add the stylelint config repo to your dependencies:
```
npm install --save-dev @telenorfrontend/stylelint-config-telenor
```

### Add lint script to package.json

```
scripts: [
  ...
  "test:stylelint": "stylelint list of your sources",
  ...
]
```

### Extend your local .stylelintrc.yml

Create your local `.stylelintrc.yml` and add the following

```yml
extends: @telenorfrontend/stylelint-config-telenor
```
