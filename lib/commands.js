const { exec } = require("child_process");

const SPINNER_FACTORY = require("../lib/spinner");
const { getRepo } = require("./repos");

const { print } = require("../utils/consoleColors");

const installDependencies = ({ projectName, onDone }) => {
    print("Installing dependencies");
    let command = null;
    const spinner = SPINNER_FACTORY.create({ message: "Loading stuff" }).start();
    
    if(projectName != null){
        command = "cd " + projectName + " && npm install";
    } else {
        command = "npm install";
    }

    const ls = exec(command);
    ls.on("exit", function (code) {
        spinner.stop();
        onDone(code);
    });
}

const createTemplate = ({ projectName, onDone, isSapper, bundler }) => {
    const url = getRepo({ isSapper, bundler });
    let command = "npx degit " + url;

    if(projectName != null){
        print("create svelte app in ./" + projectName);
        command += " " + projectName;
    } else {
        print("create svelte app in current directory");
    }

    const spinner = SPINNER_FACTORY.create({ message: "Creating template" }).start();
    const ls = exec(command);

    ls.on("exit", function (code) {
        spinner.stop();
        onDone(code);
    });
}

module.exports = {
    installDependencies,
    createTemplate
}