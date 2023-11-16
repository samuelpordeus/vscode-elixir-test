const term = require('../helpers/term');

function handler() {
  term.run('mix test --failed');
}

module.exports = {
  name: 'extension.elixirRunFailedTests',
  handler,
};
