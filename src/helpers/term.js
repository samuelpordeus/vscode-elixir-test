const vscode = require('vscode');

const config = vscode.workspace.getConfiguration('vscode-elixir-test');

function terminal() {
  return vscode.window.activeTerminal || vscode.window.createTerminal();
}

function run(cmd) {
  const term = terminal();
  term.sendText(cmd);
  if (config.focusOnTerminalAfterTest) term.show();
}

module.exports = {
  run,
};
