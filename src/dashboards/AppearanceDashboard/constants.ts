import { AppearanceStyles } from "../../types/dashboards";
import { ObjectStringKeys } from "../../types/general";

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

let cssDefaults: ObjectStringKeys = {
    borderStyle: ["none"],
    borderWidth: ["0px"],
    borderColor: ["rgb(0, 0, 0)"],
    borderTopLeftRadius: ["0px"],
    borderTopRightRadius: ["0px"],
    borderBottomLeftRadius: ["0px"],
    borderBottomRightRadius: ["0px"],
    outlineWidth: ["0px"],
    outlineStyle: ["none"],
    outlineColor: ["rgb(0, 0, 0)"],
    outlineOffset: ["0px"]
}

export { borderAttributes, supportedAttributes, defaultValues, cssDefaults };