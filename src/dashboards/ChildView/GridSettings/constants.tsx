import React from "react"
import PlaceholderValue from "../../../components/PlaceholderValue"
import { lengthSettings } from "../../../utils/constants"

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

const gridLineSettings = [
    { label: "1fr", display: <PlaceholderValue unit="share of leftover space" /> },
    ...lengthSettings
]

const gapSettings = [
    { label: "normal" },
    ...lengthSettings
]

const trackBoundarySettings = [
    { label: "auto" },
    { label: "1", display: <PlaceholderValue unit={""} /> },
]

const justifySelfSettings = [
    "start",
    "center",
    "end",
    "stretch"
]

const alignSelfSettings = [
    "start",
    "center",
    "end",
    "stretch"
]

export {
    supportedChildAttributes,
    supportedElementAttributes,
    justifyItemSettings,
    justifyContentSettings,
    alignItemSettings,
    gridLineSettings,
    gapSettings,
    trackBoundarySettings,
    justifySelfSettings,
    alignSelfSettings
}