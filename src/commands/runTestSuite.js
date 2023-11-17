const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler() {
  test.onRootFolder(() => mix.test());
}

module.exports = {
  name: 'extension.elixirRunTestSuite',
  handler,
};
