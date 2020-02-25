#! /usr/bin/env node
const commands = require("../lib/commands");
const argsUtils = require("../utils/args");
const { GREEN, YELLOW, RED, print } = require("../utils/consoleColors");
const { SHOW_CURSOR } = require("../lib/spinner");

const INPUT_VALIDATION = {
    n: { type: String },
    s: { type: Boolean },
    b: {
        type: String,
        default: "rollup",
        accepts: [ "rollup", "webpack" ]
    }
}

console.clear();

const installDependencies = (args) => {
    commands.installDependencies({
        projectName: args.name,
        onDone: function(code) {
            if(code === 0){
                print("Svelte app created successfully", GREEN);
            } else {
                print("Failed to install dependencies", RED);
            }

            SHOW_CURSOR();
            process.exit(code);
        }
    });
}

const createTemplate = (args) => {
    if(args.saper === true){
        print("Sapper template will be used", YELLOW);
    } else {
        print("Standard Svelte3 template will be used", YELLOW);
    }

    print("Bundler: " + args.bundler, YELLOW);

    commands.createTemplate({
        projectName: args.name,
        isSapper: args.saper,
        bundler: args.bundler,
        onDone: code => {
            if(code === 0){
                print("Template created successfully", GREEN);
                installDependencies(args);
            } else {
                print("Failed to create template", RED);
                print("Possible problems:", RED);
                print("- Target folder is not empty", RED);

                SHOW_CURSOR();
                process.exit(1);
            }
        }
    });
}

// EXECUTION
try {
    const args = argsUtils.getInput(INPUT_VALIDATION);
    createTemplate(args);
} catch (e) {
    print(e, RED);
    SHOW_CURSOR();
    process.exit(1);
}