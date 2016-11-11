/*
 * An overview of all rules can be found at http://eslint.org/docs/rules.
 * The idea here is that all stylistic hints use warnings; only those rules
 * coupled with something that would generate a runtime error trigger an error.
 */
module.exports = {
  "root": true,
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,

    "block-scoped-var": 1,
    "consistent-return": 1,
    "dot-notation": 1,
    "eqeqeq": 1,
    "guard-for-in": 1,
    "no-alert": 1,
    "no-eq-null": 2,
    "no-eval": 1,
    "no-implicit-globals": 2,
    "no-lone-blocks": 1,
    "no-loop-func": 1,
    // "no-magic-numbers": 1,
    "no-multi-spaces": 1,
    "no-param-reassign": [1, { "props": true }],
    "no-return-assign": 1,
    "vars-on-top": 1,

    "no-catch-shadow": 1,
    "no-shadow": [1, { "allow": ["done"] }],
    "no-unused-vars": 1,
    "no-use-before-define": 2,

    "handle-callback-err": [ 1, "err" ],
    "no-mixed-requires": 1,
    "no-new-require": 1,
    "no-path-concat": 2,


    "array-bracket-spacing": 1,
    "block-spacing": 1,
    "brace-style": [1, "1tbs", { "allowSingleLine": true }],
    "comma-dangle": [1, "only-multiline"],
    "comma-spacing": 1,
    "comma-style": 1,
    "computed-property-spacing": 2,
    "consistent-this": 1,
    "eol-last": 1,
    "func-call-spacing": 1,
    "func-name-matching": 1,
    "indent": [1, 2],
    "key-spacing": 1,
    "keyword-spacing": 1,
    "lines-around-comment": 1,
    "lines-around-directive": 1,
    // "max-nested-callbacks": [1, 3],  // see also background info: http://eslint.org/docs/rules/max-nested-callbacks#further-reading
    "new-cap": 1,
    // "new-parens": 1,
    "no-array-constructor": 1,
    "no-bitwise": 1,  // we might want to disable this at some point
    "no-lonely-if": 1,
    "no-new-object": 1,
    "no-trailing-spaces": 1,
    "no-unneeded-ternary": 1,
    "no-whitespace-before-property": 1,
    // "object-curly-spacing": [1, "always"],  // disabled because it requires spaces in destructurings
    "operator-linebreak": 1,
    "quotes": [1, "single"],
    // "require-jsdoc": 1,
    "semi-spacing": 1,
    "semi": 1,
    "space-before-blocks": 1,
    "space-before-function-paren": [1, "never"],
    "space-infix-ops": 1,
    "space-unary-ops": 1,
    "spaced-comment": 1,
    "unicode-bom": 1,

    "arrow-parens": 1,
    "arrow-spacing": 1,
    "constructor-super": 2,
    "generator-star-spacing": 1,
    "no-class-assign": 1,
    "no-confusing-arrow": 1,
    "no-const-assign": 2,
    "no-dupe-class-members": 1,
    "no-duplicate-imports": 1,  // [1, { "includeExports": true }]
    "no-new-symbol": 2,
    "no-this-before-super": 2,
    "no-useless-computed-key": 1,
    "no-useless-constructor": 1,
    "no-useless-rename": 1,
    "no-var": 1,  // do we want this?
    "object-shorthand": 1,
    "prefer-arrow-callback": 1,
    "prefer-const": 1,
    "prefer-numeric-literals": 1,
    "prefer-rest-params": 1,
    "prefer-spread": 1,
    "prefer-template": 1,
    "rest-spread-spacing": 1,
    "symbol-description": 1,
    "template-curly-spacing": 1,
    "yield-star-spacing": 1
  },
  "extends": "eslint:recommended"
}
