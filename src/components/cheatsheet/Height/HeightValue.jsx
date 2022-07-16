import { filterInitialNumbers } from "../../../utils/helpers";
import { GenericValuePreview, GenericValueFull } from "../GenericValueDefinition";

import ComputedValueExplanation from "../ComputedValueExplanation";

export function HeightValuePreview({ value }) {
    let unit = filterInitialNumbers(value);
    if (unit === "auto") {
        return <div>Element’s height is defined by the height of its contents {"("}text, children{")"}</div>
    } else if (unit === "min-content") {
        return <div>Sets the width to how much space the longest word or biggest child element takes up in the horizontal direction</div>
    } else if (unit === "em") {
        return <div>Font size of the selected element because <code>height</code> is a non-typographical property.</div>
    } else {
        return <GenericValuePreview propertyName="height" unit={unit} />
    }
}

export function HeightValueFull({ value }) {
    return <HeightValuePreview value={value} />
}

export function HeightComputedValue({ value }) {
    return <ComputedValueExplanation propertyName="height" value={value} />
}