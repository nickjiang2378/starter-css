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
            if (isNaN(value[i]) && value[i] !== ".") {
                return value.substring(i)
            }
        }
    }
    return ""
}

function camelCase(string) {
    if (typeof string === "string") {
        let camelCased = ""
        for (let i = 0; i < string.length; i++) {
            if (i < string.length - 1 && string[i] === "-") {
                camelCased += string[i+1].toUpperCase();
                i += 1
            } else {
                camelCased += string[i];
            }
        }
        return camelCased
    } else {
        return null;
    }
}

export { compile, setStyleKey, filterInitialNumbers, camelCase };