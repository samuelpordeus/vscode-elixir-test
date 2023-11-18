const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
  const commandsDir = path.join(__dirname, '/commands');
  const commands = fs.readdirSync(commandsDir).map((file) => `./commands/${file}`);

  commands.forEach((commandEntry) => {
    const command = require(commandEntry);
    const disposable = vscode.commands.registerCommand(
      command.name,
      (args) => command.handler(context, args),
    );
    context.subscriptions.push(disposable);
  });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
