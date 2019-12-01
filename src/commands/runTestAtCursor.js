const vscode = require('vscode');

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

  const isTestFile = openedFilename.includes('_test.exs');
  const isUmbrella = openedFilename.includes('/apps/');

  if (isTestFile === true) {
    const testPathFilter = isUmbrella ? /.*\/(apps\/.*)$/ : /.*\/(test\/.*)$/;
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
    terminal.sendText(
      `mix test ${openedFilename.match(testPathFilter)[1]}: ${cursorLine}`,
    );
    terminal.show();
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
