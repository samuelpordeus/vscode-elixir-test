const term = require('../helpers/term');
const mix = require('../helpers/mix');

function handler() {
  const cmd = mix.testFailed();
  term.run(cmd);
}

module.exports = {
  name: 'extension.elixirRunFailedTests',
  handler,
};
