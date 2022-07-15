import { filterInitialNumbers } from "../../../utils/helpers";
import { GenericValuePreview, GenericValueFull } from "../GenericValueDefinition";
import ComputedValueExplanation from "../ComputedValueExplanation";

export function MinWidthValuePreview({ computedStyles, value }) {
    let unit = filterInitialNumbers(value);
    if (unit === "auto") {
        return <div>Element will expand to try to fill the width of the containing block</div>
    } else if (unit === "min-content") {
        return <div>Sets the width to how much space the longest word or biggest child element takes up in the horizontal direction</div>
    } else if (unit === "em") {
        return <div>Font size of the selected element because <code>width</code> is a non-typographical property.</div>
    } else {
        return <GenericValuePreview propertyName="min-width" unit={unit} />
    }
}

export function MinWidthValueFull({ computedStyles, value }) {
    return <MinWidthValuePreview computedStyles={computedStyles} value={value} />
}

export function MinWidthComputedValue({ propertyName, value }) {
    return <ComputedValueExplanation propertyName={propertyName} value={value} />
}