const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler(context) {
  test.onRootFolder(context, () => mix.testFailed());
}

module.exports = {
  name: 'extension.elixirRunFailedTests',
  handler,
};
