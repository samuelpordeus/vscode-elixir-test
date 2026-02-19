const vscode = require('vscode');
const storage = require('./storage');

function terminal() {
  const term = vscode.window.activeTerminal || vscode.window.createTerminal();
  // preserveFocus=true. Does not change focus to terminal.
  term.show(true);
  return term;
}

function run(context, cmd, store = true) {
  const config = vscode.workspace.getConfiguration('vscode-elixir-test');
  const term = terminal();

  if (config.beforeTest !== null) {
    term.sendText(config.beforeTest);
  }

  term.sendText(cmd);

  if (config.focusOnTerminalAfterTest) {
    term.show();
  }

  if (store) {
    storage.update(context, 'lastCmd', cmd);
  }
}

module.exports = {
  run,
};
