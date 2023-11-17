const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler() {
  test.onRootFolder(() => mix.testStale());
}

module.exports = {
  name: 'extension.elixirRunStaleTests',
  handler,
};
