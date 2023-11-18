const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler(context) {
  test.onRootFolder(context, () => mix.testCoverage());
}

module.exports = {
  name: 'extension.elixirRunTestCoverage',
  handler,
};
