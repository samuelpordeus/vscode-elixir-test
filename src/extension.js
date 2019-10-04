const vscode = require("vscode");
const commands = require("./commands");

function activate(context) {
  commands.forEach(command => {
    const disposable = vscode.commands.registerCommand(
      command.name,
      command.handler
    );
    context.subscriptions.push(disposable);
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
