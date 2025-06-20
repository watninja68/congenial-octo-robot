import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactPlugin from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  ...pluginQuery.configs["flat/recommended"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
    },
  },
  prettier,
];
