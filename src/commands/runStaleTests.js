const mix = require('../helpers/mix');
const test = require('../helpers/test');

function handler(context) {
  test.onRootFolder(context, () => mix.testStale());
}

module.exports = {
  name: 'extension.elixirRunStaleTests',
  handler,
};
