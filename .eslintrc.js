module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "jest": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "extends": ["airbnb-base"],
  "rules": {
    "no-shadow": "off",
    "no-param-reassign": "off",
    "eol-last": "off",
    "arrow-parens": "off"
  },
  "ignorePatterns": [
    "dist/",
    "build/"
  ]
};