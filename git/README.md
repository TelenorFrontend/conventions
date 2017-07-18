# Git

## Commit messages
When commiting code for the repo you will need to use the [conventional commits guidelines](https://conventionalcommits.org/). This helps us in several ways. It keeps a clean git history and helps creating a useful CHANGELOG when running a release.

## Tooling
To help enforce the commit guidelines we validate all commits and do not allow any mismatch from the expected format.

### Install dependencies
Install husky, a git hook enabling library:
```
npm install --save-dev husky
```

Install validate-commit-msg, the function that will be validating our commit message:

```
npm install --save-dev validate-commit-msg
```

### Add validate script in package.json

```json
scripts: [
  ...
  "commitmsg": "validate-commit-msg",
  ...
]
```

## Related
[Versioning](../versioning/README.md) - Creating and tagging new versions