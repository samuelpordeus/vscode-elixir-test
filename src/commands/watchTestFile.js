const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler(context) {
  test.onTestFile(context, (fileName) => mix.testWatchPath(fileName));
}

module.exports = {
  name: 'extension.elixirWatchTestFile',
  handler,
};
