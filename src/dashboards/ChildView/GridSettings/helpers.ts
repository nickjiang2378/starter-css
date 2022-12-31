import { GridContainer, VisualizerElement } from "../../../types/dashboards";
import { FixMeLater, ObjectStringKeys } from "../../../types/general";
import { compile } from "../../../utils/helpers";
import { filterAttributes } from "../helpers";

function filterGridAttributes(computedStyles: ObjectStringKeys, attributesOfInterest: string[]) {
    const styles = filterAttributes(computedStyles, attributesOfInterest)
    styles.gridTemplateColumns = styles.gridTemplateColumns.trim().split(/\s+/);
    styles.gridTemplateRows = styles.gridTemplateRows.trim().split(/\s+/);
    return styles
}

function settingsToCode(code: GridContainer) {
    /* Remove any surrounding whitespaces for row and column inputs */
    return {
        ...code,
        gridTemplateColumns: compile(code.gridTemplateColumns || []),
        gridTemplateRows: compile(code.gridTemplateRows || [])
    }
}

function columnsExist(containerStyles: GridContainer) {
    return containerStyles?.gridTemplateColumns && containerStyles.gridTemplateColumns.length > 0
}

function rowsExist(containerStyles: GridContainer) {
    return containerStyles?.gridTemplateRows && containerStyles.gridTemplateRows.length > 0
}

function findNumDimensions(containerStyles: ObjectStringKeys, children: VisualizerElement[], type: "row" | "column") {
    let attrs: FixMeLater;
    if (type === "row") {
        attrs = ["gridTemplateRows", "gridRowStart", "gridRowEnd", 0]
    } else {
        attrs = ["gridTemplateColumns", "gridColumnStart", "gridColumnEnd", 1]
    }
    const numExplicit = containerStyles[attrs[0]] ? Math.max(containerStyles[attrs[0]].length, 1) : 1;
    let maxChildVal = 0;
    for (let child of children) {
        if (child.code[attrs[1]]) {
            maxChildVal = Math.max(maxChildVal, child.code[attrs[1]]);
        }
        if (child.code[attrs[2]]) {
            maxChildVal = Math.max(maxChildVal, child.code[attrs[2]]);
        }
    }
    const placedVal = autoPlacementDimensions(containerStyles, children.length)[attrs[3]];
    console.log(numExplicit, maxChildVal, placedVal);
    return [Math.max(numExplicit, maxChildVal, placedVal), placedVal];
}

function autoPlacementDimensions(containerStyles: GridContainer, childCount: number) {
    let rows, columns = 0;
    if (!containerStyles.gridAutoFlow || containerStyles.gridAutoFlow === "row") {
        columns = containerStyles.gridTemplateColumns ? Math.max(containerStyles.gridTemplateColumns.length, 1) : 1;
        rows = Math.ceil(childCount / columns)
    } else {
        rows = containerStyles.gridTemplateRows ? Math.max(containerStyles.gridTemplateRows.length, 1) : 1;
        columns = Math.ceil(childCount / rows)
    }
    return [rows, columns]
}

export {
    filterGridAttributes,
    settingsToCode,
    columnsExist,
    rowsExist,
    findNumDimensions
}
