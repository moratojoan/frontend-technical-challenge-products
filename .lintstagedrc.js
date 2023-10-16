const buildEslintCommand = (filenames) =>
  `npx eslint --fix ${filenames.join(' ')}`;
const buildPrettierCommand = (filenames) =>
  `npx prettier --write ${filenames.join(' ')}`;

module.exports = {
  '*.{js,jsx,ts,tsx,css}': [buildPrettierCommand],
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
