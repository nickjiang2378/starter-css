import React from "react"
import PlaceholderValue from "../components/PlaceholderValue";
import { Option } from "../types/dashboards";

export const IS_PRODUCTION: boolean = process.env.NODE_ENV === "production";

const lengthSettings: Option[] = []
for (let unit of ["px", "em", "%", "vh", "vw"]) {
    lengthSettings.push({
        label: "1" + unit,
        display: <PlaceholderValue unit={unit} />
    })
}
export {
    lengthSettings
}