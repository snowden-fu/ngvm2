// utility function will be put here
// isVersionInstalled will check if the version is installed or not
const fs = require("fs");
const path = require("path");
const homeDir = require('./constant').homedir();
function isVersionInstalled(version) {
  return fs.existsSync(path.join(homeDir, `.ngvm2/versions/${version}`));
}
module.exports = {
    isVersionInstalled
    };