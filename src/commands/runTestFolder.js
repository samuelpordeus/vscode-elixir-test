const vscode = require('vscode');
const path = require('path');
const validations = require('../helpers/validations');
const term = require('../helpers/term');

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

  if (isTestFolder === true) {
    const testPathFilter = validations.getTestPathFilter(isUmbrella, isWindows);
    const folder = selectedFolder.match(testPathFilter)[1];
    term.run(`mix test ${folder}`);
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
