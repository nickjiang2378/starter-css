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

function basicBorderExists(styles: ObjectStringKeys) {
    return "borderWidth" in styles ||
            "borderStyle" in styles ||
            "borderColor" in styles;
}

function borderRadiusExists(styles: ObjectStringKeys) {
    return "borderTopLeftRadius" in styles ||
            "borderTopRightRadius" in styles ||
            "borderBottomLeftRadius" in styles ||
            "borderBottomRightRadius" in styles
}

function sameRadius(styles: ObjectStringKeys) {
    return styles?.borderTopLeftRadius === styles?.borderTopRightRadius &&
            styles?.borderTopRightRadius === styles?.borderBottomLeftRadius && 
            styles?.borderBottomLeftRadius === styles?.borderBottomRightRadius
}


export { filterAppearanceAttributes, attrExists, basicBorderExists, borderRadiusExists, sameRadius }