const vscode = require("vscode");
const activateExtention = require("./commands/activate");
const add = require("./commands/add_to_gitignore");

function activate() {
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

