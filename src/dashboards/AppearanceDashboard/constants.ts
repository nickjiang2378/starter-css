import { AppearanceStyles } from "../../types/dashboards";

let borderAttributes = [
    "borderStyle",
    "borderWidth",
    "borderColor",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius"
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
}

export { borderAttributes, supportedAttributes, defaultValues };