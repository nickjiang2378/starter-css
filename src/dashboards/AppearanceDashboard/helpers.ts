import { ObjectStringKeys } from "../../types/general";
import { supportedAttributes } from "./constants";

function filterAppearanceAttributes(computedStyles: ObjectStringKeys) {
    let filteredAttr: ObjectStringKeys = {};
    for (let attribute of supportedAttributes) {
        if (attribute in computedStyles) {
            filteredAttr[attribute] = computedStyles[attribute];
        }
    }
    return filteredAttr;
}

function attrExists(styles: ObjectStringKeys, attributes: string[]) {
    for (let attribute of attributes) {
        if (attribute in styles) {
            return true;
        }
    }
    return false;
}

export { filterAppearanceAttributes, attrExists }