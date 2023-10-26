// function changing version of ng by changing $PATH variable
const isVersionInstalled = require("./utils").isVersionInstalled;
const path = require("path");
const homeDir = require("./constant").homedir();
module.exports = function useAngularCli(version) {
  // if version is not specified, return
  if (!version) {
    console.error(`Please specify a version.`);
    return;
  }
  // if version is not installed, return
  if (!isVersionInstalled(version)) {
    console.error(`Version ${version} is not installed.`);
    return;
  }
  updateZshrc(version);
};
const fs = require('fs');
const os = require('os');

function updateZshrc(version) {
  const zshrcPath = path.join(os.homedir(), '.zshrc');
  const ngvmPath = path.join(os.homedir(), ".ngvm2/versions", version, "bin");

  // Read the existing .zshrc content
  const content = fs.existsSync(zshrcPath) ? fs.readFileSync(zshrcPath, 'utf8') : '';
  const regexPattern = new RegExp("\nexport PATH=\"\\/Users\\/snowden\\/\\.ngvm2\\/versions\\/[^\\/]+\\/bin:\\$PATH\"\n", 'g');
  // Check if PATH update is already present
  if (!regexPattern.test(content)) {
    // Append the new PATH to the content
    const updatedContent = content + `\nexport PATH="${ngvmPath}:$PATH"\n`;
    fs.writeFileSync(zshrcPath, updatedContent);
    console.log('.zshrc updated successfully.');
  } else {
    // replace the old path with new path by modifying the version
    const updatedContent = content.replace(regexPattern, `\nexport PATH="${ngvmPath}:$PATH"\n`);
    fs.writeFileSync(zshrcPath, updatedContent);
    console.log('.zshrc replaced successfully.');
    }
}

