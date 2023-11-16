const vscode = require('vscode');
const validations = require('../helpers/validations');
const term = require('../helpers/term');

function handler() {
  const activeFile = vscode.window.activeTextEditor;
  if (!activeFile) {
    return;
  }

  const openedFilename = activeFile.document.fileName;

  const isWindows = validations.isWindows(openedFilename);
  const isTestFile = validations.isTestFile(openedFilename);
  const isUmbrella = validations.isUmbrella(openedFilename);

  if (isTestFile === true) {
    const testPathFilter = validations.getTestPathFilter(isUmbrella, isWindows);
    const fileName = openedFilename.match(testPathFilter)[1];
    term.run(`mix test.watch ${fileName}`);
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
