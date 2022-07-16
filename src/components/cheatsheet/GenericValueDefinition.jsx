export function GenericValuePreview({ propertyName, unit }) {
    if (unit === "%") {
        return <div>Evaluates to a percentage of the <code>{propertyName}</code> of the containing block {"("}usually the parent element{")"}</div>
    } else if (unit === "px") {
        return <div>1px = 1/96th of 1in</div>
    } else if (unit === "rem") {
        return <div>Font size of the root element</div>
    } else if (unit === "em") {
        return <div>Font size of the parent, in the case of typographical properties like font-size, and font size of the element itself, in the case of other properties like width.</div>
    } else if (unit === "vw") {
        return <div>1vw = 1% of the viewport's width</div>
    } else if (unit === "vh") {
        return <div>1vh = 1% of the viewport's height</div>
    } else {
        return null;
    }
}

export function GenericValueFull({ propertyName, unit }) {
    return <GenericValuePreview propertyName={propertyName} unit={unit} />
}