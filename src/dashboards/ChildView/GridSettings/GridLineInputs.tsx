import React from "react"
import { IconButton, Stack } from "@mui/material";
import { Add, Close } from "@mui/icons-material";

import { GridContainer, VisualizerElement } from "../../../types/dashboards"
import OptionsInput from "../../../components/OptionsInput";
import { FixMeLater } from "../../../types/general";
import { gridLineSettings } from "./constants";

type GridLineInputsType = {
    containerStyles: GridContainer,
    children: VisualizerElement[],
    type: "row" | "column",
    setContainerKey: (prop: string, val: any) => void
}

const typeToAttribute: FixMeLater = {
    "row": "gridTemplateRows",
    "column": "gridTemplateColumns"
}

export default function GridLineInputs({ containerStyles, children, type, setContainerKey }: GridLineInputsType) {
    const attr: "gridTemplateRows" | "gridTemplateColumns" = typeToAttribute[type]
    const inputs: string[] = containerStyles[attr] || []

    const setGridLine = (index: number, value: string, type: number) => {
        let inputsCopy = [...inputs]
        switch (type) {
            case (0): // Set value of correct input
                inputsCopy[index] = value;
                break;
            case (1): // Insert new input before position "index"
                inputsCopy.splice(index, 0, value);
                break;
            case (2): // Remove input at position "index"
                inputsCopy.splice(index, 1);
                break;
        }
        setContainerKey(attr, inputsCopy);
    }

    return (
        <div className="gridLineInputs">
            <IconButton size="small" onClick={() => setGridLine(0, "1fr", 1)}>
                <Add />
            </IconButton>
            {inputs.map((val, index) => {
                return (
                    <div className="gridLineInput">
                        <OptionsInput
                            value={val}
                            setValue={(newVal: string) => setGridLine(index, newVal, 0)}
                            options={gridLineSettings}
                            label={`${type}${index + 1}`}
                            endAdornment={<IconButton size="small" onClick={() => setGridLine(index, "", 2)}><Close /></IconButton>}
                        />
                        <IconButton size="small" onClick={() => setGridLine(index + 1, "1fr", 1)}>
                            <Add />
                        </IconButton>
                    </div>
                )
            })}
        </div>
    )
}