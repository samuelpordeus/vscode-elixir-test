const term = require('../helpers/term');
const mix = require('../helpers/mix');

function handler() {
  const cmd = mix.testWatch();
  term.run(cmd);
}

module.exports = {
  name: 'extension.elixirWatchTestSuite',
  handler,
};
