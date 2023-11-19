const vscode = require('vscode');
const path = require('path');
const term = require('./term');
const validations = require('./validations');

function maybeEnterProjectRoot(context, openedFilename) {
  const multiRoot = vscode.workspace.workspaceFolders.length > 1;

  if (multiRoot) {
    const project = vscode.workspace.workspaceFolders.find((entry) => openedFilename.includes(entry.uri.path));
    const projectRoot = project.uri.path;
    term.run(context, `cd ${projectRoot}`, false);
  }

  return multiRoot;
}

function onTestFile(context, callback) {
  const activeFile = vscode.window.activeTextEditor;

  if (!activeFile) {
    return;
  }

  /*
  We do a +1 here because the `line` returned is zero based.
  Ref: https://code.visualstudio.com/api/references/vscode-api#Position
  */
  const cursorLine = activeFile.selection.active.line + 1;

  const openedFilename = activeFile.document.fileName;
  const isTestFile = validations.isTestFile(openedFilename);
  const isWindows = validations.isWindows(openedFilename);
  const isUmbrella = validations.isUmbrella(openedFilename);

  if (isTestFile === true) {
    const testPathFilter = validations.getTestPathFilter(isUmbrella, isWindows);
    const fileName = openedFilename.match(testPathFilter)[1];
    const cmd = callback(fileName, cursorLine);

    maybeEnterProjectRoot(context, openedFilename);

    term.run(context, cmd);
  } else {
    vscode.window.showInformationMessage('The current file is not a test file.');
  }
}

function onTestFolder(context, folderUri, callback) {
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
    const folderName = selectedFolder.match(testPathFilter)[1];
    const cmd = callback(folderName);

    maybeEnterProjectRoot(context, selectedFolder);

    term.run(context, cmd);
  } else {
    vscode.window.showInformationMessage('This folder is not a test folder.');
  }
}

function onRootFolder(context, callback) {
  const activeFile = vscode.window.activeTextEditor;
  const openedFilename = activeFile.document.fileName;

  if (maybeEnterProjectRoot(context, openedFilename) === false) {
    const root = vscode.workspace.workspaceFolders[0].uri.path;
    term.run(context, `cd ${root}`, false);
  }

  const cmd = callback();
  term.run(context, cmd);
}

module.exports = {
  onTestFile,
  onTestFolder,
  onRootFolder,
};
