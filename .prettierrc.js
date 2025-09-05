/** @type {import('prettier').Config} */
module.exports = {
  // Line length and formatting
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,

  // Semicolons and quotes
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',

  // Objects and arrays
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,

  // JSX specific
  jsxSingleQuote: true,

  // Other options
  arrowParens: 'always',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',

  // File specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'preserve',
      },
    },
  ],
};
