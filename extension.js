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
  ws.insert(uriFile, new vscode.Position(0, 0), `defmodule ${moduleName}Test do\nend`);

  await vscode.workspace.applyEdit(ws);
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

  let runTestsOnFile = vscode.commands.registerCommand(
    "extension.elixirRunTestFile",
    function() {
      const activeFile = vscode.window.activeTextEditor;
      if (!activeFile) {
        return;
      }

      const openedFilename = activeFile.document.fileName;

      const isTestFile = openedFilename.includes("_test.exs");
      const isUmbrella = openedFilename.includes("/apps/");

      if (isTestFile === true) {
        const testPathFilter = isUmbrella ? /.*\/(apps\/.*)$/ : /.*\/(test\/.*)$/;
        let terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
        terminal.sendText(`mix test ${openedFilename.match(testPathFilter)[1]}`);
        terminal.show();
      } else {
        vscode.window.showInformationMessage(`The current file is not a test file.`);
      }
    }
  );

  context.subscriptions.push(runTestsOnFile);

  let runTestSuite = vscode.commands.registerCommand(
    "extension.elixirRunTestSuite",
    function() {
      let terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
      terminal.sendText(`mix test`);
      terminal.show();
    }
  )

  context.subscriptions.push(runTestSuite);

  const runTestAtCursor = vscode.commands.registerCommand(
    "extension.elixirRunTestAtCursor",
    () => {
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

      const isTestFile = openedFilename.includes("_test.exs");
      const isUmbrella = openedFilename.includes("/apps/");

      if (isTestFile === true) {
        const testPathFilter = isUmbrella ? /.*\/(apps\/.*)$/ : /.*\/(test\/.*)$/;
        let terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
        terminal.sendText(`mix test ${openedFilename.match(testPathFilter)[1]}:${cursorLine}`);
        terminal.show();
      } else {
        vscode.window.showInformationMessage(`The current file is not a test file.`);
      }
    },
  )
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
