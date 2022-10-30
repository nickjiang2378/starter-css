import { FlexContainer } from "../../types/dashboards";
import { ObjectStringKeys } from "../../types/general";
import { flexDirectionSettings, justifyContentSettings, alignContentSettings, alignItemsSettings, flexWrapSettings } from "./constants";

function filterInvalidFlexValues(styles: ObjectStringKeys) {
    /* Filters out flex attributes in styles that have invalid values */
    if (styles?.display !== "flex") {
        return {}
    } else {
        const possibleFlexStyles: ObjectStringKeys = {
            "flexDirection": flexDirectionSettings,
            "justifyContent": justifyContentSettings,
            "alignContent": alignContentSettings,
            "alignItems": alignItemsSettings,
            "flexWrap": flexWrapSettings,
        };
        let filteredStyles: ObjectStringKeys = {
            display: "flex"
        };
        for (let prop in possibleFlexStyles) {
            if (prop in styles && possibleFlexStyles[prop].includes(styles[prop])) {
                filteredStyles[prop] = styles[prop];
            }
        }
        
        let rowMode = isRowAligned(styles);
        if (rowMode && styles?.columnGap) {
            filteredStyles.columnGap = styles?.columnGap
        } else if (!rowMode && styles?.rowGap) {
            filteredStyles.rowGap = styles?.rowGap
        }
        return filteredStyles;
    }
}

function settingsToCode(containerStyles: ObjectStringKeys) {
    /* Converts the dashboard settings to the code applied on the element */
    let realCode: ObjectStringKeys = {}
    let rowMode = isRowAligned(containerStyles);
    for (let cssAttr in containerStyles) {
        if (cssAttr === "gap") {
            realCode[rowMode ? "columnGap" : "rowGap"] = containerStyles.gap
        } else {
            realCode[cssAttr] = containerStyles[cssAttr]
        }
    }
    return realCode
}

function isRowAligned(styles: ObjectStringKeys) {
    return !styles?.flexDirection || 
            styles?.flexDirection === "row" || 
            styles?.flexDirection === "row-reverse";
}

function filterFlexAttributes(computedStyles: ObjectStringKeys) {
    /* Gets the values of only the flex attributes */
    let styles: ObjectStringKeys = {};
    let attributesOfInterest = ["justifyContent", "alignItems", "flexDirection", "alignContent", "flexWrap"]
    if (computedStyles?.display === "flex") {
        styles = {
            display: "flex",
        };
        for (let cssAttr of attributesOfInterest) {
            styles[cssAttr] = computedStyles[cssAttr]
        }
        let rowMode = isRowAligned(styles);
        if (rowMode) {
            styles.gap = computedStyles?.columnGap;
        } else {
            styles.gap = computedStyles?.rowGap;
        }
    }
    return styles
}

export { isRowAligned, filterFlexAttributes, settingsToCode, filterInvalidFlexValues }; // currently not in use