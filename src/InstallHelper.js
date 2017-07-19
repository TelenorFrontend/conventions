const { moveSync, copySync } = require("fs-extra");
const { existsSync } = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const npmAddScript = require("npm-add-script");
const chalk = require("chalk");

const log = console.log;

const INSTALL_TYPES = {
    EDITOR_CONFIG: "EDITOR_CONFIG",
    SCSS: "SCSS",
    GIT: "GIT",
    JAVASCRIPT: "JAVASCRIPT",
    VERSIONING: "VERSIONING"
};

const INSTALL_INSTRUCTIONS = {
    EDITOR_CONFIG: {
        prettyName: "editorconfig",
        installMessage: "Adding editorconfig",
        before: () => {
            ifExistsTakeBackup(".editorconfig");
        },
        install: () => {
            copySync(path.resolve(__dirname, "../editorconfig/.editorconfig"), ".editorconfig");
        },
        after: () => {}
    },
    JAVASCRIPT: {
        prettyName: "JavaScript",
        installMessage: "Adding dependencies and adding .eslintrc",
        before: () => {
            ifExistsTakeBackup(".eslintrc.json");
        },
        install: () => {
            installNpmDependencies(["eslint", "babel-eslint", "https://github.com/TelenorFrontend/conventions.git"]);
            copySync(path.resolve(__dirname, "../boilerplate/.eslintrc.json"), ".eslintrc.json");
            npmAddScript({
                key: "test:eslint",
                value: "eslint your sources"
            });
        },
        after: () => {}
    },
    GIT: {
        prettyName: "Git",
        installMessage: "Adding dependencies",
        before: () => {},
        install: () => {
            installNpmDependencies(["husky", "validate-commit-msg"]);
            npmAddScript({
                key: "commitmsg",
                value: "validate-commit-msg"
            });
        },
        after: () => {}
    },
    SCSS: {
        prettyName: "SCSS",
        installMessage: "Adding dependencies and adding .stylelintrc.yml",
        before: () => {
            ifExistsTakeBackup(".stylelintrc.yml");
        },
        install: () => {
            installNpmDependencies([
                "stylelint",
                "stylelint-config-standard",
                "stylelint-order",
                "stylelint-scss",
                "https://github.com/TelenorFrontend/conventions.git"
            ]);
            copySync(path.resolve(__dirname, "../boilerplate/.stylelintrc.yml"), ".stylelintrc.yml");
            npmAddScript({
                key: "test:stylelint",
                value: "stylelint list of your sources"
            });
        },
        after: () => {}
    },
    VERSIONING: {
        prettyName: "Versioning",
        installMessage: "Adding dependencies",
        before: () => {},
        install: () => {
            installNpmDependencies([
                "standard-version"
            ]);
            npmAddScript({
                key: "release",
                value: "standard-version --silent"
            });
            npmAddScript({
                key: "release:patch",
                value: "npm run release -- --release-as patch"
            });
            npmAddScript({
                key: "release:minor",
                value: "npm run release -- --release-as minor"
            });
            npmAddScript({
                key: "release:major",
                value: "npm run release -- --release-as major"
            });
        },
        after: () => {}
    }
};
const ifExistsTakeBackup = (file) => {
    if (existsSync(file)) {
        log(chalk.dim(`Oh, there existed a config already. Backuped it to ${file}_backup so you don't loose any data. Fix this later.`));
        moveToBackup(file);
    }
};

const moveToBackup = (file) => {
    let backupFileName = `${file}_backup`;

    if (existsSync(backupFileName)) {
        throw Error(`Seems as if there's already a ${backupFileName}. Aborting to avoid loss of data.`);
    }

    moveSync(file, backupFileName);
};

const installNpmDependencies = (listOfDependencies) => {
    execSync(`npm install --save-dev ${listOfDependencies.join(" ")} --silent`);
};

exports.INSTALL_TYPES = INSTALL_TYPES;

exports.Installer = {
    install: (type) => {
        const installInstructions = INSTALL_INSTRUCTIONS[type];

        if (!installInstructions) {
            log(chalk.yellow(`Could not found install instructions for ${type}`));
            return;
        }

        log(chalk.dim(`Installing ${installInstructions.prettyName}`));

        try {
            installInstructions.before();
            installInstructions.install();
            installInstructions.after();

            log(chalk.green(`\nInstalling ${installInstructions.prettyName} complete ✔`));
        } catch (e) {
            log(chalk.yellow(e));
            log(chalk.red(`\nInstallation of ${installInstructions.prettyName} was incomplete ✘`));
        }
    }
};
