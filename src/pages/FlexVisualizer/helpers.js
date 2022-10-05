import { flexDirectionSettings, justifyContentSettings, alignContentSettings, alignItemsSettings, flexWrapSettings } from "./constants";

function filterFlex(styles) {
    if (styles?.display !== "flex") {
        return {}
    } else {
        const possibleFlexStyles = {
            "flexDirection": flexDirectionSettings,
            "justifyContent": justifyContentSettings,
            "alignContent": alignContentSettings,
            "alignItems": alignItemsSettings,
            "flexWrap": flexWrapSettings,
        };
        let filteredStyles = {
            display: "flex"
        };
        for (let prop in possibleFlexStyles) {
            if (prop in styles && possibleFlexStyles[prop].includes(styles[prop])) {
                filteredStyles[prop] = styles[prop];
            }
        }
        return filteredStyles;
    }
}

export { filterFlex }; // currently not in use