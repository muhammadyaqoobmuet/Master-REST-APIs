import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin"; // Fixed import path

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn", // Ensures unused variables only show a warning, not an error
        {
          args: "all",
          argsIgnorePattern: "^_", // Ignore unused arguments prefixed with _
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_", // Ignore caught errors prefixed with _
          destructuredArrayIgnorePattern: "^_", // Ignore unused destructured variables prefixed with _
          varsIgnorePattern: "^_", // Ignore unused variables prefixed with _
          ignoreRestSiblings: true, // Allows destructuring with unused properties
        }
      ]
    }
  },
  {
    languageOptions: {
      globals: globals.browser // Keep browser globals
    }
  },
  pluginJs.configs.recommended, // Use recommended rules from @eslint/js
  tseslint.configs.recommended, // Use recommended rules from @typescript-eslint
];
