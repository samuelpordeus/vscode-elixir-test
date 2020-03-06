const vscode = require('vscode');
const path = require('path');

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

  const isTestFolder = selectedFolder.includes('/test/');
  const isUmbrella = selectedFolder.includes('/apps/');

  const config = vscode.workspace.getConfiguration("vscode-elixir-test");

  if (isTestFolder === true) {
    const testPathFilter = isUmbrella ? /.*\/(apps\/.*)$/ : /.*\/(test\/.*)$/;
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
