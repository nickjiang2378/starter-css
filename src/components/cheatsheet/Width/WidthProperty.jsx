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

export function WidthPropertyFull({ computedStyles, value }) {
    return <WidthPropertyPreview computedStyles={computedStyles} value={value} />
}