#! /usr/bin/env node
const commands = require("../lib/commands");
const argsUtils = require("../utils/args");

const chalk = require("chalk");
const figlet = require("figlet");

const INPUT_VALIDATION = {
    n: { type: String },
    s: { type: Boolean },
    b: {
        type: String,
        default: "rollup",
        accepts: [ "rollup", "webpack" ]
    }
}

// EXECUTION
console.clear();

console.log(
    chalk.yellow(
        figlet.textSync("SVELTE 3 APP", { horizontalLayout: "full" })
    )
);

const installDependencies = (args) => {
    commands.installDependencies({
        projectName: args.name,
        onDone: function(code) {
            if(code === 0){
                console.log("Svelte app created successfully");
            } else {
                console.log(chalk.green("Failed to install dependencies"));
                process.exit(1);
            }

            process.exit(code);
        }
    });
}

const createTemplate = (args) => {
    if(args.saper === true){
        console.log(chalk.green("Sapper template will be used"));
    } else {
        console.log(chalk.green("Standard Svelte3 template will be used"));
    }

    console.log(chalk.green("Bundler: " + args.bundler));

    commands.createTemplate({
        projectName: args.name,
        isSapper: args.saper,
        bundler: args.bundler,
        onDone: code => {
            if(code === 0){
                console.log("Template created successfully");
                installDependencies(args);
            } else {
                console.log(chalk.red("Failed to create template"));
                console.log(chalk.red("Possible problems:"));
                console.log(chalk.red("- Target folder is not empty"));
                process.exit(1);
            }
        }
    });
}

try {
    const args = argsUtils.getInput(INPUT_VALIDATION);
    createTemplate(args);
} catch (e) {
    console.log(chalk.red(e));
    process.exit(1);
}