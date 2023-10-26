#!/usr/bin/env node
// index file is entry of the application
const fs = require('fs');
const path = require('path');
const homeDir = require('os').homedir();
const args = process.argv.slice(2);

console.log(`Hello, Welcome to the ngvm2 CLI.`);
/** function running cmd installing angular-cli under .ngvm2/versions dir
    param: version of angular-cli, default is latest version
 **/
function installAngularCli(version) {
    // if .ngvm2 dir does not exist, create it
    if (!isNgvm2Exists()) {
        fs.mkdirSync(path.join(homeDir, '.ngvm2'));
    }
    // if .ngvm2/versions dir does not exist, create it
    if (!isNgvm2VersionsExists()) {
        fs.mkdirSync(path.join(homeDir, '.ngvm2/versions'));
    }
    // if version is not specified, install latest version
    if (!version) {
        // execute command 'npm show @angular/cli version' to get latest version, if error occurs, return
        const execSync = require('child_process').execSync;
        try {
            version = execSync('npm show @angular/cli version').toString().trim();
        } catch(e) {
            console.error(`exec error: ${e}`);
            return;
        }

    }
    // return cmd
    return `npm install -g @angular/cli@${version} --prefix ${path.join(homeDir, '.ngvm2/versions/'+version)}`;  
}

// a function judging if .ngvm2 dir exists under home directory
function isNgvm2Exists() {
    return fs.existsSync(path.join(homeDir, '.ngvm2'));
}
function isNgvm2VersionsExists() {
    return fs.existsSync(path.join(homeDir, '.ngvm2/versions'));
}

// a mapping of commands
const commands = {
    'install': installAngularCli(args[1])
}

// run command
const exec = require('child_process').exec;
const cmd = commands[args[0]];
if (cmd) {
    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        if (stderr) {
            console.log(`${stderr}`);
        } else {
            console.log(`${stdout}`);
        }
    });
}