const prettierSvelte = require('prettier-plugin-svelte')

module.exports = {
	arrowParens: 'avoid',
	bracketSpacing: true,
	endOfLine: 'lf',
	plugins: [prettierSvelte],
	printWidth: 100,
	semi: false,
	singleQuote: true,
	svelteIndentScriptAndStyle: true,
	svelteSortOrder: 'options-scripts-markup-styles',
	svelteStrictMode: false,
	tabWidth: 2,
	trailingComma: 'none',
	useTabs: true
}
