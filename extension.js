const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function openFile(file) {
  return vscode.workspace
    .openTextDocument(vscode.Uri.file(file))
    .then(vscode.window.showTextDocument);
}

function showConfirmationDialog(text, button) {
  return vscode.window.showWarningMessage(text, { modal: true }, button);
}

function createNewTestFile(dir, file) {
  const uriDir = vscode.Uri.file(dir);
  const uriFile = vscode.Uri.file(`${dir}${file}`);

  return vscode.workspace.fs.createDirectory(uriDir).then(() => {
    let ws = new vscode.WorkspaceEdit();
    ws.createFile(uriFile);
    return vscode.workspace.applyEdit(ws);
  });
}

function askToCreateANewFile(dir, file) {
  return showConfirmationDialog(
    `Create the test file at ${dir}?`,
    "Create"
  ).then(answer => {
    if (answer == "Create") {
      createNewTestFile(dir, file).then(() => {
        openFile(`${dir}${file}`);
      });
    } else {
      return;
    }
  });
}

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.elixirJumpToTest",
    function() {
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
      const context =
        openedFile[2] == "/lib/"
          ? "/test/"
          : openedFile[2].replace("/test/", "/lib/");
      const fileName = openedFile[3];
      const isTestFile = fileName.includes("_test");

      if (isTestFile === true) {
        var strippedFileName = fileName.replace("_test", "");
        var fileToOpen = `**${context}${strippedFileName}.ex`;
      } else {
        var fileToOpen = `**${context}${fileName}_test.exs`;
      }

      vscode.workspace.findFiles(fileToOpen, "**/.elixir_ls/**").then(files => {
        if (!files.length) {
          let dir = fullDir.replace("lib", "test");
          let file = `${fileName}_test.exs`;

          askToCreateANewFile(dir, file);
        } else {
          let file = files[0].fsPath;
          openFile(file);
        }
      });
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
