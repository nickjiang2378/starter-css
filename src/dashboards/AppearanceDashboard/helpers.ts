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
    return ("borderWidth" in styles ||
            "borderStyle" in styles ||
            "borderColor" in styles) &&
            (styles.borderWidth !== "0px" ||
            styles.borderStyle !== "none")
}

function borderRadiusExists(styles: ObjectStringKeys) {
    return ("borderTopLeftRadius" in styles ||
            "borderTopRightRadius" in styles ||
            "borderBottomLeftRadius" in styles ||
            "borderBottomRightRadius" in styles) && 
            styles.borderRadius !== "0px"
}

function sameRadius(styles: ObjectStringKeys) {
    return styles?.borderTopLeftRadius === styles?.borderTopRightRadius &&
            styles?.borderTopRightRadius === styles?.borderBottomLeftRadius && 
            styles?.borderBottomLeftRadius === styles?.borderBottomRightRadius
}

function outlineExists(styles: ObjectStringKeys) {
    return ("outlineColor" in styles ||
            "outlineStyle" in styles ||
            "outlineWidth" in styles ||
            "outlineOffset" in styles) &&
            (styles.outlineWidth !== "0px" ||
            styles.outlineStyle !== "none" ||
            styles.outlineOffset !== "0px"
            )
}


export { filterAppearanceAttributes, 
            attrExists, 
            basicBorderExists, 
            borderRadiusExists, 
            sameRadius, 
            outlineExists }