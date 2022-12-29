const supportedElementAttributes = [
    "gridTemplateColumns",
    "gridTemplateRows",
    "columnGap",
    "rowGap",
    "justifyItems",
    "alignItems",
    "justifyContent",
    "alignContent",
    "gridAutoColumns",
    "gridAutoRows",
    "gridAutoFlow"
]

const supportedChildAttributes = [
    "gridColumnStart",
    "gridColumnEnd",
    "gridRowStart",
    "gridRowEnd",
    "justifySelf",
    "alignSelf"
]

const justifyItemSettings = [
    "start",
    "center",
    "end",
    "stretch"
]

const justifyContentSettings = [
    "start",
    "center",
    "space-around",
    "space-between",
    "space-evenly",
    "end",
    "stretch"
]

const alignItemSettings = [
    "start",
    "baseline",
    "center",
    "end",
    "stretch"
]

export {
    supportedChildAttributes,
    supportedElementAttributes,
    justifyItemSettings,
    justifyContentSettings,
    alignItemSettings
}