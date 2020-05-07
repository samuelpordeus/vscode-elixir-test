const vscode = require('vscode');

function openFile(file) {
  return vscode.workspace
    .openTextDocument(vscode.Uri.file(file))
    .then(vscode.window.showTextDocument);
}

function showConfirmationDialog(text, button) {
  return vscode.window.showWarningMessage(text, { modal: true }, button);
}

async function getModuleName(uriFile) {
  const content = (await vscode.workspace.fs.readFile(uriFile)).toString();
  const moduleDefinition = content.match(/defmodule (.*) do/);

  return moduleDefinition[1];
}

async function createNewTestFile(dir, file) {
  const uriDir = vscode.Uri.file(dir);
  const uriFile = vscode.Uri.file(`${dir}${file}`);
  const ws = new vscode.WorkspaceEdit();

  const originalFile = vscode.window.activeTextEditor.document.fileName;
  const originalFileUri = vscode.Uri.file(originalFile);
  const moduleName = await getModuleName(originalFileUri);

  await vscode.workspace.fs.createDirectory(uriDir);

  ws.createFile(uriFile);
  ws.insert(
    uriFile,
    new vscode.Position(0, 0),
    `defmodule ${moduleName}Test do\n\tuse ExUnit.Case\n\tdoctest ${moduleName}\n\talias ${moduleName}\n\nend`,
  );

  await vscode.workspace.applyEdit(ws);
}

function askToCreateANewFile(dir, file) {
  return showConfirmationDialog(
    `Create the test file at ${dir}?`,
    'Create',
  ).then((answer) => {
    if (answer === 'Create') {
      createNewTestFile(dir, file).then(() => {
        openFile(`${dir}${file}`);
      });
    }
  });
}

function handler() {
  const activeFile = vscode.window.activeTextEditor;

  if (!activeFile) {
    return;
  }

  const openedFilename = activeFile.document.fileName;
  const isCodeFile = /(.*(\/.*\/))(.*)(\.\w+)$/;
  const openedFile = openedFilename.match(isCodeFile);

  if (!openedFile) {
    return;
  }

  const fullDir = openedFile[1];
  const context = openedFile[2] === '/lib/'
    ? '/test/'
    : openedFile[2].replace('/test/', '/lib/');
  const fileName = openedFile[3];
  const isTestFile = fileName.includes('_test');

  let fileToOpen = `**${context}${fileName}_test.exs`;
  if (isTestFile === true) {
    const strippedFileName = fileName.replace('_test', '');
    fileToOpen = `**${context}${strippedFileName}.ex`;
  }

  vscode.workspace.findFiles(fileToOpen, '**/.elixir_ls/**').then((files) => {
    if (!files.length) {
      const dir = fullDir.replace('lib', 'test');
      const file = `${fileName}_test.exs`;

      askToCreateANewFile(dir, file);
    } else {
      const file = files[0].fsPath;
      openFile(file);
    }
  });
}

module.exports = {
  name: 'extension.elixirJumpToTest',
  handler,
};
