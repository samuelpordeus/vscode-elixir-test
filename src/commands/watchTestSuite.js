const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler() {
  test.onRootFolder(() => mix.testWatch());
}

module.exports = {
  name: 'extension.elixirWatchTestSuite',
  handler,
};
