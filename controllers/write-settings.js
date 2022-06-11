const vscode = require("vscode");
const { TextEncoder } = require("util");

const writeSettings = () => {
  const currentWorkspaceFolder = vscode.workspace.workspaceFolders[0];
  const settingsPath = `${currentWorkspaceFolder.uri}/.vscode/settings.json`;
  const settings = '{\n"isGitignoreExtActive": true,\n}';
  const encode = new TextEncoder().encode(settings);
  const fs = vscode.workspace.fs;
  fs.writeFile(vscode.Uri.parse(settingsPath), encode).then(() =>
    console.log("settings been written....")
  );
  vscode.commands.executeCommand("setContext", "add.when.clicked", true);
};
module.exports = writeSettings;
