export function WidthPropertyDefinition({ computedStyles}) {
    if (computedStyles?.boxSizing === "contentBox") {
        return (
            <div>
                Sets the width of the content area because <code>box-sizing: content-box</code>.
            </div>
        )
    } else if (computedStyles?.boxSizing === "borderBox") {
        return (
            <div>Sets the width of the border area because <code>box-sizing: border-box</code>.</div>
        )
    } else {
        return null;
    }
}