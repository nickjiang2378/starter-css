import { flexDirectionSettings, justifyContentSettings, alignContentSettings, alignItemsSettings, flexWrapSettings } from "./constants";

function filterFlex(styles) {
    if (styles?.display !== "flex") {
        return {}
    } else {
        const possibleFlexStyles = {
            "flexDirection": flexDirectionSettings,
            "justifyContent": justifyContentSettings,
            "alignContent": alignContentSettings,
            "alignItems": alignItemsSettings,
            "flexWrap": flexWrapSettings,
        };
        let filteredStyles = {
            display: "flex"
        };
        for (let prop in possibleFlexStyles) {
            if (prop in styles && possibleFlexStyles[prop].includes(styles[prop])) {
                filteredStyles[prop] = styles[prop];
            }
        }
        
        let rowMode = getRowMode(styles);
        if (rowMode && styles?.columnGap) {
            filteredStyles.columnGap = styles?.columnGap
        } else if (!rowMode && styles?.rowGap) {
            filteredStyles.rowGap = styles?.rowGap
        }
        return filteredStyles;
    }
}

function generateRealContainer(containerStyles) {
    let realCode = {}
    let rowMode = getRowMode(containerStyles);
    for (let cssAttr in containerStyles) {
        if (cssAttr === "gap") {
            realCode[rowMode ? "columnGap" : "rowGap"] = containerStyles.gap
        } else {
            realCode[cssAttr] = containerStyles[cssAttr]
        }
    }
    return realCode
}

function getRowMode(styles) {
    return !styles?.flexDirection || 
            styles?.flexDirection === "row" || 
            styles?.flexDirection === "row-reverse";
}

function filterComputedStyles(computedStyles) {
    let styles = {};
    let attributesOfInterest = ["justifyContent", "alignItems", "flexDirection", "alignContent", "flexWrap"]
    if (computedStyles?.display === "flex") {
        styles = {
            display: "flex",
        };
        for (let cssAttr of attributesOfInterest) {
            styles[cssAttr] = computedStyles[cssAttr]
        }
        let rowMode = getRowMode(styles);
        if (rowMode) {
            styles.gap = computedStyles?.columnGap;
        } else {
            styles.gap = computedStyles?.rowGap;
        }
    }
    return styles
}

export { getRowMode, filterFlex, generateRealContainer, filterComputedStyles }; // currently not in use