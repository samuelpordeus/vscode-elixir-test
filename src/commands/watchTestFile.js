const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler() {
  test.onTestFile((fileName) => mix.testWatchPath(fileName));
}

module.exports = {
  name: 'extension.elixirWatchTestFile',
  handler,
};
