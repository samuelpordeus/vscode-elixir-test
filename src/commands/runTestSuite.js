const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler(context) {
  test.onRootFolder(context, () => mix.test());
}

module.exports = {
  name: 'extension.elixirRunTestSuite',
  handler,
};
