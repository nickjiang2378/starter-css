import { filterInitialNumbers } from "../../../utils/helpers";

export function WidthValueDefinition({ computedStyles, value }) {
    let unit = filterInitialNumbers(value);
    if (unit === "%") {
        return <div>Evaluates to a percentage of the width of the containing block (usually the parent element)</div>
    } else if (unit === "auto") {
        return <div>Element will expand to try to fill the width of the containing block</div>
    } else if (unit === "min-content") {
        return <div>Sets the width to how much space the longest word or biggest child element takes up in the horizontal direction</div>
    }
    return null;
}