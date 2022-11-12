
let borderAttributes = [
    "borderStyle",
    "borderWidth",
    "borderColor"
]

let allAttributes = [borderAttributes]

let supportedAttributes: string[] = []
for (let list of allAttributes) {
    supportedAttributes.push(...list);
}

export { borderAttributes, supportedAttributes };