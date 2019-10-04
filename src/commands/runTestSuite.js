const vscode = require("vscode");

function handler() {
  let terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
  terminal.sendText(`mix test`);
  terminal.show();
}

module.exports = {
  name: "extension.elixirRunTestSuite",
  handler
};
