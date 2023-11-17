const mix = require('../helpers/mix');
const term = require('../helpers/term');

function handler() {
  const cmd = mix.test();
  term.run(cmd);
}

module.exports = {
  name: 'extension.elixirRunTestSuite',
  handler,
};
