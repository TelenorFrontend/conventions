const { parseResultToBoolean } = require("./PromptHelpers");

const gitPrompt = {
    description: "First off, do you use Git? Do you want to enable consistent git messages?",
    type: "string",
    default: "Y",
    before: parseResultToBoolean
};
const versioningPrompt = {
    description: "Should we add some automagic release/changelogging to that?",
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

let wizardPromptSchema = {
    properties: {
        gitPrompt,
        versioningPrompt,
        javaScriptPrompt,
        editorConfigPrompt,
        scssConfigPrompt
    }
};

const autocompletePromptSchema = {
    properties: {
        autocompletePrompt: {
            description: "Do you want autocomplete installed? (This only has to be done once)",
            type: "string",
            default: "Y",
            before: parseResultToBoolean
        }
    }
};

exports.wizardPromptSchema = wizardPromptSchema;
exports.autocompletePromptSchema = autocompletePromptSchema;
