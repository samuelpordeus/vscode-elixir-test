const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler(context) {
  test.onTestFile(context, (fileName, cursorLine) => mix.testWatchFileAt(fileName, cursorLine));
}

module.exports = {
  name: 'extension.elixirWatchTestAtCursor',
  handler,
};
