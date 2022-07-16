import { filterInitialNumbers } from "../../../utils/helpers";
import { GenericValuePreview, GenericValueFull } from "../GenericValueDefinition";
import ComputedValueExplanation from "../ComputedValueExplanation";

export function MinHeightValuePreview({ value }) {
    let unit = filterInitialNumbers(value);
    if (unit === "auto") {
        return <div>Browser will automatically calculate a value</div>
    } else if (unit === "min-content") {
        return <div>Sets the width to how much space the longest word or biggest child element takes up in the horizontal direction</div>
    } else if (unit === "em") {
        return <div>Font size of the selected element because <code>min-height</code> is a non-typographical property.</div>
    } else {
        return <GenericValuePreview propertyName="min-height" unit={unit} />
    }
}

export function MinHeightValueFull({ value }) {
    return <MinHeightValuePreview value={value} />
}

export function MinHeightComputedValue({ value }) {
    return <ComputedValueExplanation propertyName="min-height" value={value} />
}