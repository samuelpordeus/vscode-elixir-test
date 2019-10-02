const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
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

      const context = openedFile[2];
      const fileName = openedFile[3];

      const isTestFile = fileName.includes("_test");

      if (isTestFile === true) {
        var strippedFileName = fileName.replace("_test", "");
        var fileToOpen = `**${context}${strippedFileName}.ex`;
      } else {
        var fileToOpen = `**${context}${fileName}_test.exs`;
      }

      vscode.workspace.findFiles(fileToOpen, "**/.elixir_ls/**").then(files => {
        
        if(!files.length){
          return vscode.window.showInformationMessage("There's not matching tests");
        }
        
        vscode.workspace
          .openTextDocument(vscode.Uri.file(files[0].fsPath))
          .then(vscode.window.showTextDocument);
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
