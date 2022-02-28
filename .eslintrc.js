module.exports = {
  "env": {
    "browser": true,
    "es6": true, "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint"
  ],
  "rules": {
    "@next/next/no-img-element": [
      "off"
    ],
    "@typescript-eslint/explicit-module-boundary-types": [ // TODO: Remove this setting
      "off"
    ],
    "@typescript-eslint/no-non-null-assertion": [ // TODO: Remove this setting
      "off"
    ],
    "@typescript-eslint/no-explicit-any": [ // TODO: Remove this setting.
      "off"
    ],
    "@typescript-eslint/ban-ts-ignore": [ // TODO: Remove this setting
      "off"
    ],
    "@typescript-eslint/no-empty-interface": [
      "off"
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],

    "semi": "off",
    "@typescript-eslint/semi": ["error", "always"],
    "no-extra-semi": "off",
    "@typescript-eslint/no-extra-semi": ["error"],

    "@typescript-eslint/no-use-before-define": [
      "off"
    ],
    "@typescript-eslint/no-empty-function": [
      "off"
    ],
    "react/prop-types": [
      "off"
    ],
    "react/react-in-jsx-scope": [
      "off"
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "react/display-name": [
      "off"
    ],
    "@typescript-eslint/camelcase": [
      "off"
    ],
    "no-console": [
      "error",
      {
        "allow": ["warn", "error"]
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
