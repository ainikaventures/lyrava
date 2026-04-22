/* Lyrava — minimal ESLint config layered on top of Astro defaults. */
module.exports = {
  root: true,
  env: { browser: true, node: true, es2024: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  extends: ["eslint:recommended", "plugin:astro/recommended"],
  ignorePatterns: ["dist", "node_modules", ".astro"],
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: { parser: "@typescript-eslint/parser", extraFileExtensions: [".astro"] },
    },
  ],
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
