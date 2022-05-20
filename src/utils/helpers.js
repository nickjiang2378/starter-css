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

export { compile, setStyleKey };