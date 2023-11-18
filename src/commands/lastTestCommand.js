const storage = require('../helpers/storage');
const term = require('../helpers/term');

function handler(context) {
  const lastCmd = storage.get(context, 'lastCmd');

  if (lastCmd != null) {
    term.run(context, lastCmd, false);
  }
}

module.exports = {
  name: 'extension.elixirRunLastTestCommand',
  handler,
};
