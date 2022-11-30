import { AppearanceStyles } from "../../types/dashboards";

let borderAttributes = [
    "borderStyle",
    "borderWidth",
    "borderColor",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "outlineWidth",
    "outlineStyle",
    "outlineColor",
    "outlineOffset"
]

let allAttributes = [borderAttributes]

let supportedAttributes: string[] = []
for (let list of allAttributes) {
    supportedAttributes.push(...list);
}

let defaultValues: AppearanceStyles = {
    borderStyle: "solid",
    borderWidth: "3px",
    borderColor: "#603fef",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    outlineWidth: "2px",
    outlineStyle: "solid",
    outlineColor: "#FFA500",
    outlineOffset: "3px"
}

export { borderAttributes, supportedAttributes, defaultValues };