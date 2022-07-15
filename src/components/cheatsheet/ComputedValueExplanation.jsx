import { useContext } from "react";
import { filterInitialNumbers } from "../../utils/helpers";
import { SelectedContext } from "../../SelectedContext";

export default function ComputedValueExplanation({ propertyName, value }) {
    const { selectedElement: { computedStyles }, containingBlock } = useContext(SelectedContext);
    const unit = filterInitialNumbers(value);
    console.log(value)
    if (unit === "%") {
        return <>Equals {value} X {containingBlock?.computedStyles?.propertyName}</>
    }
    return null;
}