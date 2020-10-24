const vscode = require('vscode');
const validations = require('../helpers/validations');

function handler() {
  const activeFile = vscode.window.activeTextEditor;
  if (!activeFile) {
    return;
  }

  const openedFilename = activeFile.document.fileName;
  /*
  We do a +1 here because the `line` returned is zero based.
  Ref: https://code.visualstudio.com/api/references/vscode-api#Position
  */
  const cursorLine = activeFile.selection.active.line + 1;

  const isWindows = validations.isWindows(selectedFolder);
  const isTestFolder = validations.isTestFolder(selectedFolder);
  const isUmbrella = validations.isUmbrella(selectedFolder);

  const config = vscode.workspace.getConfiguration('vscode-elixir-test');

  if (isTestFile === true) {
    const testPathFilter = validations.getTestPathFilter(isUmbrella, isWindows);
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
    terminal.sendText(
      `mix test ${openedFilename.match(testPathFilter)[1]}:${cursorLine}`,
    );
    if (config.focusOnTerminalAfterTest) terminal.show();
  } else {
    vscode.window.showInformationMessage(
      'The current file is not a test file.',
    );
  }
}

module.exports = {
  name: 'extension.elixirRunTestAtCursor',
  handler,
};
