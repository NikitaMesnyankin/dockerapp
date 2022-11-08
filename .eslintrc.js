module.exports = {
	env: {
		es6: true,
		node: true
	},
	parserOptions: {
		ecmaVersion: 2020
	},
	extends: "eslint:recommended",
	rules: {
		"no-invalid-regexp": 1,
		"no-unused-vars": 1,
		"no-restricted-syntax": 1,
		"no-unreachable": 1,
		"no-inner-declarations": 1,
		"no-dupe-else-if": 2,
		"no-undef": 2,
		"no-duplicate-imports": 1,
		"no-var": 1,
		"quotes": ["error", "double"],
		"semi": ["error", "always"],
		"multiline-ternary": ["error", "always"],
		"object-curly-spacing": ["error", "always"],
		"indent": ["error", "tab"]
	},
};