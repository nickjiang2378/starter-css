function compile(attributeList) {
    let nonEmptyList = [];
    for (let attribute of attributeList) {
        if (attribute !== undefined && attribute != null) {
            nonEmptyList.push(("" + attribute).trim());
        }
    }
    return nonEmptyList.join(" ");
}

function setStyleKey(styleObj, key, val) {
    return {...styleObj, [key]: val};
}

function filterInitialNumbers(value) {
    if (typeof value === "string") {
        for (let i = 0; i < value.length; i++) {
            if (isNaN(value[i])) {
                return value.substring(i)
            }
        }
    }
    return ""
}

export { compile, setStyleKey, filterInitialNumbers };