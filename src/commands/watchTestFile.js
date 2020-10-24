const vscode = require('vscode');

function handler() {
  const activeFile = vscode.window.activeTextEditor;
  if (!activeFile) {
    return;
  }

  const openedFilename = activeFile.document.fileName;

  const isTestFile = openedFilename.includes('_test.exs');
  const isUmbrella = openedFilename.includes('/apps/');

  const config = vscode.workspace.getConfiguration('vscode-elixir-test');

  if (isTestFile === true) {
    const testPathFilter = isUmbrella ? /.*\/(apps\/.*)$/ : /.*\/(test\/.*)$/;
    const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
    terminal.sendText(`mix test.watch ${openedFilename.match(testPathFilter)[1]}`);
    if (config.focusOnTerminalAfterTest) terminal.show();
  } else {
    vscode.window.showInformationMessage(
      'The current file is not a test file.',
    );
  }
}

module.exports = {
  name: 'extension.elixirWatchTestFile',
  handler,
};
