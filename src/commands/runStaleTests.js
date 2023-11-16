const term = require('../helpers/term');

function handler() {
  term.run('mix test --stale');
}

module.exports = {
  name: 'extension.elixirRunStaleTests',
  handler,
};
