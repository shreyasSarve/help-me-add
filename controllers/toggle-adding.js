const vscode = require("vscode");
const activateAdding = () => {
  vscode.commands.executeCommand("setContext", "add.when.clicked", true);
};

const deactivateAdding = () => {
  vscode.commands.executeCommand("setContext", "add.when.clicked", false);
};
const handleToggle = () => {
  const config = vscode.workspace
    .getConfiguration("")
    .get("isGitignoreExtActive");
  if (config == true) {
    console.log("Active......");
    activateAdding();
  } else {
    console.log("Deactive.....");
    deactivateAdding();
  }
};

module.exports =  handleToggle ;
