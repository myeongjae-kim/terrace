//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [...tanstackConfig, {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },
    languageOptions: {
        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "script",

        parserOptions: {
            project: ["./tsconfig.json"],
        },
    },
    rules: {
        "no-console": ["error", {
            allow: ["warn", "error"],
        }],

        "@next/next/no-img-element": 0,

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^ignore",
            destructuredArrayIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/no-misused-promises": "error",
    }
}]
