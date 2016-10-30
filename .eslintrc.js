// TODO: check if we want more overrides at http://eslint.org/docs/rules
module.exports = {
  "root": true,
  "env": {
    "node": true,
    "es6": true
  },
  "rules": {
    "no-console": 0,
    "no-unused-vars": 1,
    "semi": 2,
    "semi-spacing": 2,
    "quotes": [1, "single"]
  },
  "extends": "eslint:recommended"
}
