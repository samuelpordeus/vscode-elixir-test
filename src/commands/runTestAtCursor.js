const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler() {
  test.onTestFile((fileName, cursorLine) => mix.testFileAt(fileName, cursorLine));
}

module.exports = {
  name: 'extension.elixirRunTestAtCursor',
  handler,
};
