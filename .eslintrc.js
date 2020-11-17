module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/essential",
		"@vue/airbnb",
		"@vue/typescript/recommended",
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	plugins: [
		"prettier",
	],
	rules: {
		"no-tabs": "off",
		indent: ["error", "tab"],
		quotes: ["off", "double"],
	},
};
