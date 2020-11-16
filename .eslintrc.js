module.exports = {
	env: {
		browser: true,
		es2020: true,
	},
	extends: [
		// "prettier",
		"plugin:vue/essential",
		"@vue/airbnb",
		"@vue/typescript/recommended",
		// "eslint:recommended",
		// "plugin:vue/essential",
		// "plugin:@typescript-eslint/recommended"
	],
	parserOptions: {
		ecmaVersion: 12,
		parser: "@typescript-eslint/parser",
		sourceType: "module",
	},
	plugins: [
		"vue",
		"@typescript-eslint",
	],
	rules: {
		"no-tabs": "off",
		indent: ["error", "tab"],
		quotes: ["error", "double"],
	},
};
