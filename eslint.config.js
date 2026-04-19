import __vite__cjsImport0__eslint_js from "/node_modules/.vite/deps/@eslint_js.js?v=7fb1dc1b"; const js = __vite__cjsImport0__eslint_js.__esModule ? __vite__cjsImport0__eslint_js.default : __vite__cjsImport0__eslint_js;
import __vite__cjsImport1_globals from "/node_modules/.vite/deps/globals.js?v=7fb1dc1b"; const globals = __vite__cjsImport1_globals.__esModule ? __vite__cjsImport1_globals.default : __vite__cjsImport1_globals;
import __vite__cjsImport2_eslintPluginReactHooks from "/node_modules/.vite/deps/eslint-plugin-react-hooks.js?v=7fb1dc1b"; const reactHooks = __vite__cjsImport2_eslintPluginReactHooks.__esModule ? __vite__cjsImport2_eslintPluginReactHooks.default : __vite__cjsImport2_eslintPluginReactHooks;
import __vite__cjsImport3_eslintPluginReactRefresh from "/node_modules/.vite/deps/eslint-plugin-react-refresh.js?v=7fb1dc1b"; const reactRefresh = __vite__cjsImport3_eslintPluginReactRefresh.__esModule ? __vite__cjsImport3_eslintPluginReactRefresh.default : __vite__cjsImport3_eslintPluginReactRefresh;
import __vite__cjsImport4_typescriptEslint from "/node_modules/.vite/deps/typescript-eslint.js?v=7fb1dc1b"; const tseslint = __vite__cjsImport4_typescriptEslint.__esModule ? __vite__cjsImport4_typescriptEslint.default : __vite__cjsImport4_typescriptEslint;

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
);
