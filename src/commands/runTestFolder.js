const vscode = require('vscode');
const path = require('path');
const validations = require('../helpers/validations');

function handler(folderUri) {
  let selectedFolder;

  if (folderUri) {
    selectedFolder = folderUri.fsPath;
  } else {
    const activeFile = vscode.window.activeTextEditor;
    if (!activeFile) {
      return;
    }

    selectedFolder = path.dirname(activeFile.document.fileName);
  }

  selectedFolder += selectedFolder.endsWith('/') ? '' : '/';

  const isWindows = validations.isWindows(selectedFolder);
  const isTestFolder = validations.isTestFolder(selectedFolder);
  const isUmbrella = validations.isUmbrella(selectedFolder);

  const config = vscode.workspace.getConfiguration('vscode-elixir-test');

  if (isTestFolder === true) {
    const testPathFilter = validations.getTestPathFilter(isUmbrella, isWindows);
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
    terminal.sendText(`mix test ${selectedFolder.match(testPathFilter)[1]}`);
    if (config.focusOnTerminalAfterTest) terminal.show();
  } else {
    vscode.window.showInformationMessage(
      'This folder is not a test folder.',
    );
  }
}

module.exports = {
  name: 'extension.elixirRunTestFolder',
  handler,
};
