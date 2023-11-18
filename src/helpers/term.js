const vscode = require('vscode');
const storage = require('./storage');

const config = vscode.workspace.getConfiguration('vscode-elixir-test');

function terminal() {
  return vscode.window.activeTerminal || vscode.window.createTerminal();
}

function run(context, cmd, store = true) {
  const term = terminal();
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
