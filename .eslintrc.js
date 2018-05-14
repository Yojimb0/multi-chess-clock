module.exports = {
	"root": true,
	"parserOptions": { "parser": "babel-eslint", "ecmaVersion": 2017 },
	"settings": {
		"import/resolver": {
			"webpack": {"config": "build/webpack.base.conf.js" }
		}
	},
	"env": {
		"browser": true,
		"node": true,
		"mocha": true
	},
	"extends": ["eslint-config-airbnb", "plugin:vue/essential"],
	"plugins": ["vue"],
	"rules": {
		"no-tabs": 0,
		"no-console": 0,
		"no-unused-vars": ["error", { "args": "none" }],
		"indent": [1, "tab"],
		"import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
		"comma-dangle": ["error", "never"],
		"arrow-body-style": 0,
		"import/no-dynamic-require": "off",
		"import/no-unresolved": "off",
		"import/extensions": "never",
		"import/prefer-default-export": "off",
		"no-plusplus": "off",
		"global-require": "off",
		"arrow-parens": "off",
		"no-underscore-dangle": "off",
		"keyword-spacing": "off",
		"no-param-reassign": "off",
		"key-spacing": ["error", { "mode": "minimum" }],
		"max-len": ["error", 120, {
			"ignoreStrings": true,
			"ignoreComments": true,
			"ignoreTemplateLiterals": true
		}],
		"func-names": "off",
		"quote-props": ["error", "consistent"]
	},
	"overrides": [{
		"files": [ "**/*.vue" ],
		"rules": {
			"import/no-extraneous-dependencies": ["warn", { "devDependencies": true }],
			"indent": "off",
			"max-len": ["off", 120, { "ignoreStrings": true, "ignoreComments": true, "ignoreTemplateLiterals": true }],
			"vue/script-indent": ["error", "tab", { "baseIndent": 1 }]
		}
	}]
}
