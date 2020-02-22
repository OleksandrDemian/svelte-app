#! /usr/bin/env node
const commands = require("../lib/commands");
const argsUtils = require("../utils/args");

const ora = require("ora");
const chalk = require("chalk");
const figlet = require("figlet");

// EXECUTION
const args = argsUtils.getInput();

console.clear();

console.log(
    chalk.yellow(
        figlet.textSync("SVELTE APP", { horizontalLayout: "full" })
    )
);

const templateCreated = (code) => {
    commands.installDependencies({
        projectName: args.name,
        onDone: function(code) {
            console.log("Svelte app created successfully");
            process.exit(code);
        }
    });
}

commands.createTemplate({
    projectName: args.name,
    onDone: templateCreated
});