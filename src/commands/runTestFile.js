const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler() {
  test.onTestFile((fileName) => mix.testPath(fileName));
}

module.exports = {
  name: 'extension.elixirRunTestFile',
  handler,
};
