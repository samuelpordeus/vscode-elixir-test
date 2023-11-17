const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler() {
  test.onRootFolder(() => mix.testFailed());
}

module.exports = {
  name: 'extension.elixirRunFailedTests',
  handler,
};
