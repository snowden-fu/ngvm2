/** function install command is executed by running 'ngvm install <version>' in terminal
    param: version of angular-cli, default is latest version
 **/
const fs = require("fs");
const path = require("path");
const homeDir = require('os').homedir();
module.exports = function installAngularCli(version) {
  // if .ngvm2 dir does not exist, create it
  if (!isNgvm2Exists()) {
    fs.mkdirSync(path.join(homeDir, ".ngvm2"));
  }
  // if .ngvm2/versions dir does not exist, create it
  if (!isNgvm2VersionsExists()) {
    fs.mkdirSync(path.join(homeDir, ".ngvm2/versions"));
  }
  // if version is not specified, install latest version
  if (!version) {
    // execute command 'npm show @angular/cli version' to get latest version, if error occurs, return
    const execSync = require("child_process").execSync;
    try {
      version = execSync("npm show @angular/cli version").toString().trim();
    } catch (e) {
      console.error(`exec error: ${e}`);
      return;
    }
  }
  // return cmd
  return `npm install -g @angular/cli@${version} --prefix ${path.join(
    homeDir,
    ".ngvm2/versions/" + version
  )}`;
};

// a function judging if .ngvm2 dir exists under home directory
function isNgvm2Exists() {
  return fs.existsSync(path.join(homeDir, ".ngvm2"));
}
function isNgvm2VersionsExists() {
  return fs.existsSync(path.join(homeDir, ".ngvm2/versions"));
}
