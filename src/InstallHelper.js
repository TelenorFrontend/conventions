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
        installMessage: "Adding eslint and adding .eslintrc",
        before: () => {
            ifExistsTakeBackup(".eslintrc.json");
        },
        install: () => {
            installNpmDevDependencies(["eslint", "babel-eslint", "@telenorfrontend/eslint-config-telenor"]);
            copySync(path.resolve(__dirname, "../boilerplate/.eslintrc.json"), ".eslintrc.json");
            npmAddScript({
                key: "test:eslint",
                value: "eslint <your sources>"
            });
        },
        after: () => {
            log(chalk.yellow("Don't forget to go into package.json and replace <your sources> with the correct path to your sources"));
        }
    },
    TYPESCRIPT: {
        prettyName: "TypeScript",
        installMessage: "Adding tslint and adding tslint.json",
        before: () => {
            ifExistsTakeBackup("tslint.json");
        },
        install: () => {
            installNpmDevDependencies(["tslint", "@telenorfrontend/tslint-config-telenor"]);
            copySync(path.resolve(__dirname, "../boilerplate/tslint.json"), "tslint.json");
            npmAddScript({
                key: "test:tslint",
                value: "tslint <your sources>"
            });
        },
        after: () => {
            log(chalk.yellow("Don't forget to go into package.json and replace <your sources> with the correct path to your sources"));
        }
    },
    GIT: {
        prettyName: "Git",
        installMessage: "Adding husky for git prehook and adding validating script",
        before: () => {},
        install: () => {
            installNpmDevDependencies(["husky", "validate-commit-msg"]);
            npmAddScript({
                key: "commitmsg",
                value: "validate-commit-msg"
            });
        },
        after: () => {}
    },
    SCSS: {
        prettyName: "SCSS",
        installMessage: "Adding stylelint and adding .stylelintrc.yml",
        before: () => {
            ifExistsTakeBackup(".stylelintrc.yml");
        },
        install: () => {
            installNpmDevDependencies([
                "stylelint",
                "stylelint-config-standard",
                "stylelint-order",
                "stylelint-scss",
                "@telenorfrontend/stylelint-config-telenor"
            ]);
            copySync(path.resolve(__dirname, "../boilerplate/.stylelintrc.yml"), ".stylelintrc.yml");
            npmAddScript({
                key: "test:stylelint",
                value: "stylelint <your sources>"
            });
        },
        after: () => {
            log(chalk.yellow("Don't forget to go into package.json and replace <your sources> with the correct path to your sources"));
        }
    },
    VERSIONING: {
        prettyName: "Versioning",
        installMessage: "Adding standard-version to project for semver control",
        before: () => {},
        install: () => {
            installNpmDevDependencies([
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
        after: () => {
            log(chalk.yellow("To be able to use versioning, make sure you also install git conventions"));
        }
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

const installNpmDevDependencies = (listOfDependencies) => {
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

        log(chalk.dim(`${installInstructions.prettyName}`));
        log(chalk.dim(`${installInstructions.installMessage}`));

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
