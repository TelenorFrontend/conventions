module.exports = {
    "extends": "tslint:recommended",
    "rules": {
        "interface-name": false,
        "max-classes-per-file": false,
        "max-line-length": {
            "options": [
                200
            ]
        },
        "member-access": {
            "options": "no-public"
        },
        "object-literal-sort-keys": false,
        "only-arrow-functions": false,
        "object-literal-shorthand": false,
        "space-before-function-paren": {
            "options": {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }
        }
    }
};
