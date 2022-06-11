const vscode = require("vscode");
const { TextEncoder } = require("util");

const addTogitignore = (
  /** @type {vscode.Uri} */ gitignore,
  /** @type {string} */ content,
  /** @type {string} */ pathName
) => {
  const fs = vscode.workspace.fs;
  const newFileContent = content + `\n${pathName}`;
  const encode = new TextEncoder().encode(newFileContent);
  fs.writeFile(gitignore, encode).then(() => {
    vscode.window
      .showInformationMessage(`${pathName} added to gitignore`, "Undo")
      .then((select) => {
        if (select != undefined) {
          const oldEncode = new TextEncoder().encode(content);
          fs.writeFile(gitignore, oldEncode);
        }
      });
  });
};
const fetchFileContent = async (/** @type {vscode.Uri} */ gitignore) => {
  const fs = vscode.workspace.fs;
  return fs.readFile(gitignore).then((content) => {
    return content.toString();
  });
};
const checkDoesAlreadyExist = (
  /** @type {string} */ content,
  /** @type {string} */ pathName
) => {
  let exist = false;
  const fileContent = content.split("\n");
  fileContent.forEach((e) => {
    if (e == pathName) exist = true;
  });
  return exist;
};
const commandCallback = async (/** @type {vscode.Uri} */ l) => {
  vscode.window.setStatusBarMessage("added to gitIgnore").dispose();
  const pathName = "/" + vscode.workspace.asRelativePath(l);
  const workspaceFolder = vscode.workspace.workspaceFolders[0];
  const gitignore = vscode.Uri.parse(`${workspaceFolder.uri.path}/.gitignore`);
  const content = await fetchFileContent(gitignore);
  const exist = checkDoesAlreadyExist(content, pathName);
  if (exist) {
    vscode.window.showErrorMessage("Already added to .gitignore ");
  } else {
    addTogitignore(gitignore, content, pathName);
  }
};
module.exports = {
  commandName: "add.when.clicked",
  commandCallback,
};
