import { GridContainer } from "../../../types/dashboards";
import { ObjectStringKeys } from "../../../types/general";
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

export {
    filterGridAttributes,
    settingsToCode
}
