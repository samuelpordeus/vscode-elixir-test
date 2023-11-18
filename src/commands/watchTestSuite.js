const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler(context) {
  test.onRootFolder(context, () => mix.testWatch());
}

module.exports = {
  name: 'extension.elixirWatchTestSuite',
  handler,
};
