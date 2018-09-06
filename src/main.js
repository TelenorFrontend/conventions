#!/usr/bin/env node
const omelette = require("omelette");
const prompt = require("prompt");
const chalk = require("chalk");
const { existsSync } = require("fs");
const isInstalledGlobally = require("is-installed-globally");

const { Installer, INSTALL_TYPES } = require("./InstallHelper");
const { wizardPromptSchema, autocompletePromptSchema } = require("./prompt/prompts");

const log = console.log;
const args = process.argv.slice(2);

// Setting up prompt
prompt.message = "?";
prompt.delimiter = " ";
prompt.start({ noHandleSIGINT: true });

process.on("SIGINT", function() {
    log("Conventions cancelled");
    process.exit(1);
});

// Setting up auto-complete
const completion = omelette("tn-conventions <action> <convention>");

completion.on("action", ({ reply }) => {
    reply(["init"]);
});

const availableConventions = ["JavaScript", "TypeScript", "SCSS", "Git", "Versioning", "Editorconfig"];

completion.on("convention", ({ reply }) => {
    reply(availableConventions);
});

completion.init();

if (isInstalledGlobally && ~process.argv.indexOf("--autocomplete")) {
    prompt.start({ noHandleSIGINT: true });
    prompt.get(autocompletePromptSchema, (_, result) => {
        if (result.autocompletePrompt) {
            log("Installing autocomplete...");
            completion.setupShellInitFile();
        }
    });
}

if (args.length === 0) {
    log(`
    How to use

    Usage: tn-conventions init [${availableConventions.join("|")}]

    tn-conventions init will start a wizard which lets you choose the different
    conventions you want to add to your project.

    tn-conventions init [convention] will add that specific convention to your
    project.

    Prerequesites:
    You need to have a package.json in the project folder where you
    are executing tn-conventions.

    Examples:

    tn-conventions init             - Initiates conventions wizard 
    tn-conventions init javascript  - Initiates JavaScript conventions 
    `);
}

if (!existsSync("package.json")) {
    log(chalk.red("No package.json found"));
    log(chalk.dim("Looks like you're trying to initiate conventions without a package.json. Run npm init or move to your project folder root"));
    process.exit(0);
}

if (args[0] === "init" && args.length === 1) {
    log(chalk.dim("Alright! Let's get conventioning"));

    prompt.get(wizardPromptSchema, (_, result) => {
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
} else if (args[0] === "init" && args.length > 1) {
    const convention = args[1].toLowerCase();
    if (["javascript", "js"].includes(convention)) {
        Installer.install(INSTALL_TYPES.JAVASCRIPT);
    } else if (["typescript", "ts"].includes(convention)) {
        Installer.install(INSTALL_TYPES.TYPESCRIPT);
    } else if (["scss", "sass"].includes(convention)) {
        Installer.install(INSTALL_TYPES.SCSS);
    } else if (["git"].includes(convention)) {
        Installer.install(INSTALL_TYPES.GIT);
    } else if (["versioning", "semver"].includes(convention)) {
        Installer.install(INSTALL_TYPES.VERSIONING);
    } else if (["editor", "editorconfig"].includes(convention)) {
        Installer.install(INSTALL_TYPES.EDITOR_CONFIG);
    } else {
        log(chalk.yellow(`Could not find any conventions for "${convention}".`));
        log(chalk.green(`Available conventions are:
          ${ availableConventions.join(", ") }
        `));
        log("Is your convention not there and should exist? Go to https://github.com/TelenorFrontend/conventions and create that PR friend.");
    }

    log(chalk.green("All done!"));
}
