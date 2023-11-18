const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler(context) {
  test.onTestFile(context, (fileName, cursorLine) => mix.testFileAt(fileName, cursorLine));
}

module.exports = {
  name: 'extension.elixirRunTestAtCursor',
  handler,
};
