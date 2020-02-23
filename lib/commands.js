const { exec } = require("child_process");
const ora = require("ora");

const { getRepo } = require("./repos");

const installDependencies = ({ projectName, onDone }) => {
    console.log("Installing dependencies");
    let command = null;
    const spinner = ora('Loading unicorns').start();

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
        console.log("create svelte app in ./" + projectName);
        command += " " + projectName;
    } else {
        console.log("create svelte app in current directory");
    }

    const spinner = ora("Creating template").start();
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