const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler() {
  test.onRootFolder(() => mix.testCoverage());
}

module.exports = {
  name: 'extension.elixirRunTestCoverage',
  handler,
};
