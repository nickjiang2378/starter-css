import { VisualizerElement } from "../types/dashboards";
import { FixMeLater, ObjectStringKeys } from "../types/general";
import { DataModel, StyleChangesModel } from "../types/messages"

function compile(attributeList: string[]) {
    /* Joins together all values from attributeList into a single string, separating values by a space */
    let nonEmptyList = [];
    for (let attribute of attributeList) {
        if (attribute !== undefined && attribute != null) {
            nonEmptyList.push(("" + attribute).trim());
        }
    }
    return nonEmptyList.join(" ");
}

function setStyleKey(styleObj: ObjectStringKeys, key: string, val: string) {
    return {...styleObj, [key]: val};
}

function filterInitialNumbers(value: string) {
    if (typeof value === "string") {
        for (let i = 0; i < value.length; i++) {
            if (isNaN((value as FixMeLater)[i]) && value[i] !== ".") {
                return value.substring(i)
            }
        }
    }
    return ""
}

function camelCase(string: string) {
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

function unCamelCase(string: string) {
    if (typeof string === "string") {
        let unCamelCased = ""
        for (let i = 0; i < string.length; i++) {
            if (string[i] === string[i].toUpperCase() && string[i] !== string[i].toLowerCase()) {
                unCamelCased += "-" + string[i].toLowerCase();
            } else {
                unCamelCased += string[i];
            }
        }
        return unCamelCased
    } else {
        return null;
    }
}

const modulo = (a: number,b: number) => (a - (b * Math.floor(a / b)))

function formatDOMChanges(containingBlock: ObjectStringKeys, selected: ObjectStringKeys, children: ObjectStringKeys[]): StyleChangesModel {
    return {
        containingElementChanges: containingBlock,
        selectedElementChanges: selected,
        childElementChanges: children
    }
}

function cleanCode(code: ObjectStringKeys) {
    let codeCopy: ObjectStringKeys = {}
    for (let prop in code) {
        if (code[prop]) {
            codeCopy[prop] = code[prop]
        }
    }
    return codeCopy
}

function getDisplayCode(codeData: StyleChangesModel) {
    let elementDisplayStyles: VisualizerElement = {
        id: "#element",
        displayName: "element",
        code: cleanCode(codeData.selectedElementChanges)
    };
    let allDisplayStyles: VisualizerElement[] = [elementDisplayStyles];
    for (let i = 0; i < codeData.childElementChanges.length; i++) {
        allDisplayStyles.push({
            id: `#child${i+1}`,
            displayName: `child${i+1}`,
            code: cleanCode(codeData.childElementChanges[i])
        })
    }
    return [elementDisplayStyles, allDisplayStyles]
}

function strictMerge(currStyles: ObjectStringKeys, code: ObjectStringKeys, attrSpace: string[]) {
    /* Merges currStyles and code such that all attributes of attrSpace in the merged code will match
    the same values as in "code" */
    const currStylesCopy = {...currStyles};
    for (let attr of attrSpace) {
        if (attr in currStylesCopy) {
            delete currStylesCopy[attr]
        }
        if (attr in code) {
            currStylesCopy[attr] = code[attr]
        }
    }
    return currStylesCopy
}

function findAddedChanges(prev: ObjectStringKeys, current: ObjectStringKeys): ObjectStringKeys {
    /* Finds all attributes in current either added or changed, but not removed, in comparison to prev */
    let changes: ObjectStringKeys = {}
    for (let attr in current) {
        if (attr in prev && current[attr] !== prev[attr] && current[attr]) {
            changes[attr] = current[attr]
        } else if (!(attr in prev) && current[attr]) {
            changes[attr] = current[attr]
        }
    }
    return changes
}

function stringifyChanges(code: ObjectStringKeys): string {
    /* Converts changes in code to a presentable form for the Snackbar */
    if (!code) {
        return ""
    }

    let string = ""
    for (let attr in code) {
        string += unCamelCase(attr) + ": " + code[attr] + "; "
    }
    return string
}

export { getDisplayCode, 
        compile, 
        setStyleKey, 
        filterInitialNumbers, 
        camelCase, 
        unCamelCase, 
        modulo, 
        formatDOMChanges,
        strictMerge,
        findAddedChanges,
        stringifyChanges,
     };