const vscode = require("vscode");
const { TextEncoder } = require("util");
const writeSettings = require("../controllers/write-settings");

const checkForGitinit = async (
  /** @type {{ uri: vscode.Uri; }} */ currentWorkspaceFolder
) => {
  const fs = vscode.workspace.fs;
  return fs.readDirectory(currentWorkspaceFolder.uri).then((data) => {
    let exist = false;
    data.forEach((e) => {
      if (e[0] == ".git") exist = true;
    });
    return exist;
  });
};
const commandCallback = async function () {
  const currentWorkspaceFolder = vscode.workspace.workspaceFolders[0];
  if (currentWorkspaceFolder == undefined) {
    vscode.window.showErrorMessage("Open folder in workspace first....");
  } else {
    const cur = await checkForGitinit(currentWorkspaceFolder);
    if (!cur) {
      vscode.window.showErrorMessage("not a git repository....");
    } else {
      vscode.window.showInformationMessage("Namstey World....!");
      const fs = vscode.workspace.fs;
      vscode.workspace.findFiles(".gitignore").then((d) => {
        if (d.length == 0)
          vscode.window
            .showErrorMessage(
              "No .gitignore file Exist in Current repository....",
              "Create File"
            )
            .then((d) => {
              if (d != undefined) {
                const content = new TextEncoder().encode("");
                const path = vscode.Uri.parse(
                  `${currentWorkspaceFolder.uri.path}/.gitignore`
                );
                fs.writeFile(path, content).then(() => {
                  vscode.window.showInformationMessage(
                    ".gitignore file created"
                  );
                });
                writeSettings();
              }
            });
        else {
          writeSettings();
        }
      });
    }
  }
};

module.exports = {
  commandName: "help-me-add.activate",
  commandCallback,
};
