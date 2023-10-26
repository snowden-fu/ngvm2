#!/usr/bin/env node
// index file is entry of the application
const args = process.argv.slice(2);
const { log } = require('console');
const installAngularCli= require('./install');
const useAngularCli= require('./use');
console.log(`Hello, Welcome to the ngvm2 CLI.`);


// a mapping of commands
const commands = {
    'install': installAngularCli(args[1]),
    'use': useAngularCli(args[1]),
}

// run command
const exec = require('child_process').exec;
const cmd = commands[args[0]];
if (cmd) {
    log(`Running command: ${cmd}`);
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