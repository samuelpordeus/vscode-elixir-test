const term = require('../helpers/term');
const mix = require('../helpers/mix');

function handler() {
  const cmd = mix.testStale();
  term.run(cmd);
}

module.exports = {
  name: 'extension.elixirRunStaleTests',
  handler,
};
