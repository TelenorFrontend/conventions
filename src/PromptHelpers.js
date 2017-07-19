exports.parseResultToBoolean = (res) => {
    if (res.length > 0 && res[0].toLowerCase() === "y") {
        return true;
    }

    return false;
};
