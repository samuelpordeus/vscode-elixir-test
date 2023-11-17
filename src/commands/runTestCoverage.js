const mix = require('../helpers/mix');
const term = require('../helpers/term');

function handler() {
  const cmd = mix.testCoverage();
  term.run(cmd);
}

module.exports = {
  name: 'extension.elixirRunTestCoverage',
  handler,
};
