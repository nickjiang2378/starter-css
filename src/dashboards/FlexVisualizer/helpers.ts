import { FlexContainer, FlexChild, VisualizerElement } from "../../types/dashboards";
import { ElementModel } from "../../types/messages";
import { ObjectStringKeys } from "../../types/general";
import { StyleChangesModel } from "../../types/messages";
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

function settingToCode(prop: string, val: string, containerStyles: ObjectStringKeys) {
    let rowMode = isRowAligned(containerStyles);
    if (prop === "gap") {
        return [rowMode ? "columnGap" : "rowGap", val]
    } else {
        return [prop, val]
    }
}

function isRowAligned(styles: ObjectStringKeys) {
    /* Finds whether flex children are stacked in row alignment */
    return !styles?.flexDirection || 
            styles?.flexDirection === "row" || 
            styles?.flexDirection === "row-reverse";
}

function filterFlexAttributes(computedStyles: ObjectStringKeys): FlexContainer {
    /* Gets the values of only the flex attributes */
    let styles: ObjectStringKeys = {};
    let attributesOfInterest = ["justifyContent", "alignItems", "flexDirection", "alignContent", "flexWrap"]
    if (computedStyles?.display === "flex") {
        styles.display = "flex";
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

function filterFlexChildAttributes(childrenComputedStyles: ElementModel[]): VisualizerElement[] {
    /* Gets the values of only the flex attributes */
    let children: VisualizerElement[] = [];
    let i = 1;
    for (let child of childrenComputedStyles) {
        let styles: ObjectStringKeys = {};
        let attributesOfInterest = ["flex", "alignSelf"]
        for (let cssAttr of attributesOfInterest) {
            if (child.computedStyles) {
                styles[cssAttr] = child.computedStyles[cssAttr]
            }
        }
        children.push({
            id: `#child${i}`,
            displayName: `Child ${i}`,
            code: styles
        });
        i += 1
    }
    return children
}

function getDisplayStyles(element: FlexContainer, children: VisualizerElement[]) {
    /* Return a list of VisualizerElements for displaying the code in the Code Visualizer */

    // Children is already in the right format as VisualizerElements, we just need to format the element styles
    let elementDisplayStyles: VisualizerElement = {
        id: "#element",
        displayName: "element",
        code: filterInvalidFlexValues(element)
    };
    let allDisplayStyles: VisualizerElement[] = [elementDisplayStyles];
    for (let i = 0; i < children.length; i++) {
        allDisplayStyles.push(children[i])
    }
    return [elementDisplayStyles, allDisplayStyles]
}

function formatDOMChanges(containingBlock: ObjectStringKeys, selected: ObjectStringKeys, children: ObjectStringKeys[]): StyleChangesModel {
    return {
        containingElementChanges: containingBlock,
        selectedElementChanges: selected,
        childElementChanges: children
    }
}

function stringsToOptions(options: string[]) {
    return options.map((option) => {
        return {
            label: option
        }
    })
}

export { settingToCode, 
        isRowAligned, 
        filterFlexAttributes, 
        filterFlexChildAttributes, 
        settingsToCode, 
        filterInvalidFlexValues, 
        getDisplayStyles, 
        formatDOMChanges,
        stringsToOptions
    }; 