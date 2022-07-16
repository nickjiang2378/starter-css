import { useContext } from "react";
import { filterInitialNumbers, camelCase } from "../../utils/helpers";
import { SelectedContext } from "../../SelectedContext";

export default function ComputedValueExplanation({ propertyName, value }) {
    const { selectedElement: { computedStyles }, containingBlock } = useContext(SelectedContext);
    const unit = filterInitialNumbers(value);
    let camelCasedName = camelCase(propertyName)
    if (unit === "%") {
        return <>Equals {value} X {"("}{containingBlock?.computedStyles && containingBlock?.computedStyles[camelCasedName]}{")"}</>
    }
    return null;
}