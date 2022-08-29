import { useContext } from "react";
import { SelectedContext } from "../../../SelectedContext";

export function WidthPropertyPreview({ computedStyles}) {
    if (computedStyles?.boxSizing === "content-box") {
        return (
            <div>
                Sets the width of the content area because <code>box-sizing: content-box</code>.
            </div>
        )
    } else if (computedStyles?.boxSizing === "border-box") {
        return (
            <div>Sets the width of the border area because <code>box-sizing: border-box</code>.</div>
        )
    } else {
        return null;
    }
}

export function WidthPropertyFull() {
    const { selectedElement: { computedStyles } } = useContext(SelectedContext) 
    if (computedStyles?.boxSizing === "content-box") {
        return (
            <>
                <div>
                    Sets the width of the content area because <code>box-sizing: content-box</code>.
                </div>
                <div>If <code>box-sizing</code> is set to border-box, it will specify the width of an element's border area, which consists of the content and padding combined.</div>
            </>
        )
    } else if (computedStyles?.boxSizing === "border-box") {
        return (
            <>
                <div>Sets the width of the border area because <code>box-sizing: border-box</code>.</div>
                <div>If <code>box-sizing</code> is set to content-box, it will specify the width of an element's content area.</div>
            </>
        )
    } else {
        return null;
    }
}