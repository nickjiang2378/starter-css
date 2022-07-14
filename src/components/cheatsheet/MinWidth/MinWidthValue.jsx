import { filterInitialNumbers } from "../../../utils/helpers";
import GenericValueDefinition from "../GenericValueDefinition";

export function MinWidthValueDefinition({ computedStyles, value }) {
    let unit = filterInitialNumbers(value);
    if (unit === "auto") {
        return <div>Element will expand to try to fill the width of the containing block</div>
    } else if (unit === "min-content") {
        return <div>Sets the width to how much space the longest word or biggest child element takes up in the horizontal direction</div>
    } else {
        return <GenericValueDefinition propertyName="width" unit={unit} />
    }
}