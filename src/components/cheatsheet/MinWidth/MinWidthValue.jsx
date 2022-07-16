import { filterInitialNumbers } from "../../../utils/helpers";
import { GenericValuePreview, GenericValueFull } from "../GenericValueDefinition";
import ComputedValueExplanation from "../ComputedValueExplanation";

export function MinWidthValuePreview({ value }) {
    let unit = filterInitialNumbers(value);
    if (unit === "auto") {
        return <div>Browser will calculate a value</div>
    } else if (unit === "min-content") {
        return <div>Sets the width to how much space the longest word or biggest child element takes up in the horizontal direction</div>
    } else if (unit === "em") {
        return <div>Font size of the selected element because <code>min-width</code> is a non-typographical property.</div>
    } else {
        return <GenericValuePreview propertyName="min-width" unit={unit} />
    }
}

export function MinWidthValueFull({ value }) {
    return <MinWidthValuePreview value={value} />
}

export function MinWidthComputedValue({ value }) {
    return <ComputedValueExplanation propertyName="min-width" value={value} />
}