import { filterInitialNumbers } from "../../../utils/helpers";
import { GenericValuePreview, GenericValueFull } from "../GenericValueDefinition";

import ComputedValueExplanation from "../ComputedValueExplanation";

export function WidthValuePreview({ computedStyles, value }) {
    let unit = filterInitialNumbers(value);
    if (unit === "auto") {
        return <div>Element will expand to try to fill the width of the containing block</div>
    } else if (unit === "min-content") {
        return <div>Sets the width to how much space the longest word or biggest child element takes up in the horizontal direction</div>
    } else if (unit === "em") {
        return <div>Font size of the selected element because <code>width</code> is a non-typographical property.</div>
    } else {
        return <GenericValuePreview propertyName="width" unit={unit} />
    }
}

export function WidthValueFull({ computedStyles, value }) {
    return <WidthValuePreview computedStyles={computedStyles} value={value} />
}

export function WidthComputedValue({ value }) {
    return <ComputedValueExplanation propertyName="width" value={value} />
}