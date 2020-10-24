const vscode = require('vscode');
const validations = require('../helpers/validations');

function handler() {
  const activeFile = vscode.window.activeTextEditor;
  if (!activeFile) {
    return;
  }

  const openedFilename = activeFile.document.fileName;

  const isWindows = validations.isWindows(openedFilename);
  const isTestFile = validations.isTestFile(openedFilename);
  const isUmbrella = validations.isUmbrella(openedFilename);

  const config = vscode.workspace.getConfiguration('vscode-elixir-test');

  if (isTestFile === true) {
    let testPathFilter = validations.getTestPathFilter(isUmbrella, isWindows);
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
    terminal.sendText(`mix test ${openedFilename.match(testPathFilter)[1]}`);
    if (config.focusOnTerminalAfterTest) terminal.show();
  } else {
    vscode.window.showInformationMessage(
      'The current file is not a test file.',
    );
  }
}

module.exports = {
  name: 'extension.elixirRunTestFile',
  handler,
};
