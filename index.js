#!/usr/bin/env node
// index file is entry of the application
const args = process.argv.slice(2);
const installAngularCli= require('./install');

console.log(`Hello, Welcome to the ngvm2 CLI.`);


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