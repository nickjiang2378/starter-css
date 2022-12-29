import { lengthSettings } from "../../../utils/constants";

const flexDirectionSettings = ["row", "row-reverse", "column", "column-reverse"];
const justifyContentSettings = ["flex-start", "center", "space-evenly", "space-around", "space-between", "flex-end"];
const alignItemsSettings = ["flex-start", "baseline", "center", "flex-end", "stretch"];
const alignContentSettings = ["normal", "flex-start", "center", "space-around", "space-between", "stretch", "flex-end"];
const alignSelfSettings = ["auto", "flex-start", "flex-end", "center", "baseline", "stretch"];
const flexWrapSettings = ["nowrap", "wrap", "reverse"];
const gapSettings = [
    { label: "normal" },
    ...lengthSettings
]

const supportedElementAttributes = [
    "flexDirection",
    "justifyContent",
    "alignItems",
    "alignContent",
    "columnGap",
    "rowGap",
    "flexWrap"
]

const supportedChildAttributes = [
    "alignSelf",
    "flex"
]

export { 
    flexDirectionSettings, 
    justifyContentSettings, 
    alignContentSettings, 
    alignItemsSettings, 
    alignSelfSettings, 
    flexWrapSettings,
    gapSettings,
    supportedElementAttributes,
    supportedChildAttributes
};