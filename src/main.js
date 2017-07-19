#!/usr/bin/env node

const prompt = require("prompt");
const chalk = require("chalk");
const { existsSync } = require("fs");

const { parseResultToBoolean } = require("./PromptHelpers");
const { Installer, INSTALL_TYPES } = require("./InstallHelper");
const log = console.log;

prompt.message = "?";
prompt.delimiter = " ";

const gitPrompt = {
    description: "First off, do you use Git? (of course you do)",
    type: "string",
    default: "Y",
    before: parseResultToBoolean
};
const versioningPrompt = {
    description: "Awesome! Should we add some automagic release/changelogging to that?",
    type: "string",
    default: "Y",
    before: parseResultToBoolean
};
const javaScriptPrompt = {
    description: "Allright, do you use JavaScript?",
    type: "string",
    default: "Y",
    before: parseResultToBoolean
};
const editorConfigPrompt = {
    description: "Would you like an .editorconfig file?",
    type: "string",
    default: "Y",
    before: parseResultToBoolean
};
const scssConfigPrompt = {
    description: "Lastly, do you use SCSS in your project?",
    type: "string",
    default: "Y",
    before: parseResultToBoolean
};

let promptSchema = {
    properties: {
        gitPrompt,
        versioningPrompt,
        javaScriptPrompt,
        editorConfigPrompt,
        scssConfigPrompt
    }
};

if (!existsSync("package.json")) {
    log(chalk.red("No package.json found"));
    log(chalk.dim("Looks like you're trying to initiate conventions without a package.json. Run npm init or move to your project folder root"));
    process.exit(0);
}

log(chalk.dim("Alright! Let's get conventioning"));

prompt.start({ noHandleSIGINT: true });
process.on("SIGINT", function() {
    log("Conventioning cancelled");
    process.exit(0);
});
prompt.get(promptSchema, (err, result) => {
    if (result.gitPrompt) {
        Installer.install(INSTALL_TYPES.GIT);
    }
    if (result.versioningPrompt) {
        Installer.install(INSTALL_TYPES.VERSIONING);
    }
    if (result.javaScriptPrompt) {
        Installer.install(INSTALL_TYPES.JAVASCRIPT);
    }
    if (result.scssConfigPrompt) {
        Installer.install(INSTALL_TYPES.SCSS);
    }
    if (result.editorConfigPrompt) {
        Installer.install(INSTALL_TYPES.EDITOR_CONFIG);
    }

    log(chalk.green("All done!"));
});
