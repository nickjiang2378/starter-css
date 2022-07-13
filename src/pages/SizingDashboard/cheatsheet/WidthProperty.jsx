import { PropertyDescriptionFull, PropertyDescriptionPreview } from "../../../components/PropertyDescription";

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

export function WidthPropertyFull({ computedStyles }) {
    return (
        <PropertyDescriptionFull
            computedStyles={computedStyles}
            title="width"
            PropertyComponent={
                <WidthPropertyDefinition
                    computedStyles={computedStyles}
                />
            }
        />
    )
}

export function WidthPropertyPreview({ openModal, computedStyles }) {
    return (
        <PropertyDescriptionPreview
            computedStyles={computedStyles}
            openModal={openModal}
            title="width"
            PropertyComponent={
                <WidthPropertyDefinition
                    computedStyles={computedStyles}
                />
            }
        />
    )
}