const vscode = require("vscode");
const activateExtention = require("./commands/activate");
const add = require("./commands/add_to_gitignore");
const handleToggle = require("./controllers/toggle-adding");

function activate() {
  listenForChanges();
  vscode.commands.registerCommand(
    activateExtention.commandName,
    activateExtention.commandCallback
  );
  vscode.commands.registerCommand(add.commandName, add.commandCallback);
}
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
const listenForChanges = () => {
  console.log("this ran for first time.....");
  handleToggle();
  vscode.workspace.onDidChangeConfiguration(() => {
    handleToggle();
  });
};
