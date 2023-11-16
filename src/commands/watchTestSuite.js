const term = require('../helpers/term');

function handler() {
  term.run('mix test.watch');
}

module.exports = {
  name: 'extension.elixirWatchTestSuite',
  handler,
};
