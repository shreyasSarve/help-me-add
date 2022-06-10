const vscode = require("vscode");
const activateExtention = require("./commands/activate");
const add = require("./commands/add_to_gitignore");
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
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
/*
 const res=fs.readdir("./commands");
 console.log(res);
 */