const term = require('../helpers/term');

function handler() {
  term.run('mix test');
}

module.exports = {
  name: 'extension.elixirRunTestSuite',
  handler,
};
