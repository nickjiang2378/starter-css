import { Add, Close } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React from "react";
import HorizontalStretchIcon from "../../../components/HorizontalStretchIcon";
import OptionsInput from "../../../components/OptionsInput";
import VerticalStretchIcon from "../../../components/VerticalStretchIcon";
import { GridContainer, VisualizerElement } from "../../../types/dashboards";
import { FixMeLater } from "../../../types/general";
import { lengthSettings } from "../../../utils/constants";
import { stringsToOptions } from "../helpers";
import { alignItemSettings, gridLineSettings, justifyContentSettings, justifyItemSettings } from "./constants";
import OptionsProperty from "./OptionsProperty";

type GridLineInputsType = {
    containerStyles: GridContainer,
    type: "row" | "column",
    setContainerKey: (prop: string, val: any) => void
}

const typeToAttribute: FixMeLater = {
    "row": "gridTemplateRows",
    "column": "gridTemplateColumns"
}

function GridLineInputs({ containerStyles, type, setContainerKey }: GridLineInputsType) {
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

type GridContainerControlProps = {
    containerStyles: GridContainer,
    setContainerKey: FixMeLater,
}

export default function GridContainerControls({ containerStyles, setContainerKey }: GridContainerControlProps) {
    return (
        <>
        <OptionsProperty
            property="Gap"
        >
            <Stack direction="row" gap="15px">
                <OptionsInput
                    value={containerStyles?.columnGap}
                    setValue={(newVal: string) => setContainerKey("columnGap", newVal)}
                    options={lengthSettings}
                    startAdornment={<HorizontalStretchIcon color="grey" sx={{ marginRight: "5px" }}/>}
                />
                <OptionsInput
                    value={containerStyles?.rowGap}
                    setValue={(newVal: string) => setContainerKey("rowGap", newVal)}
                    options={lengthSettings}
                    startAdornment={<VerticalStretchIcon color="grey" sx={{ marginRight: "5px" }}/>}
                />
            </Stack>
        </OptionsProperty>
        <OptionsProperty property="Columns">
            <GridLineInputs
                containerStyles={containerStyles}
                setContainerKey={setContainerKey}
                type="column"
            />
        </OptionsProperty>
        <OptionsProperty property="Rows">
            <GridLineInputs
                containerStyles={containerStyles}
                setContainerKey={setContainerKey}
                type="row"
            />
        </OptionsProperty>
        <div className="bold" style={{ margin: "10px 0" }}>Alignment</div>
        <OptionsProperty
            property="Grid"
        >
            <Stack direction="row" gap="15px">
                <OptionsInput
                    value={containerStyles?.justifyContent}
                    setValue={(newVal: string) => setContainerKey("justifyContent", newVal)}
                    options={stringsToOptions(justifyContentSettings)}
                    startAdornment={<HorizontalStretchIcon color="grey" sx={{ marginRight: "5px" }}/>}
                />
                <OptionsInput
                    value={containerStyles?.alignContent}
                    setValue={(newVal: string) => setContainerKey("alignContent", newVal)}
                    options={stringsToOptions(justifyContentSettings)}
                    startAdornment={<VerticalStretchIcon color="grey" sx={{ marginRight: "5px" }}/>}
                />

            </Stack>
        </OptionsProperty>
        <OptionsProperty
            property="Child"
        >
            <Stack direction="row" gap="15px">
                <OptionsInput
                    value={containerStyles?.justifyItems}
                    setValue={(newVal: string) => setContainerKey("justifyItems", newVal)}
                    options={stringsToOptions(justifyItemSettings)}
                    startAdornment={<HorizontalStretchIcon color="grey" sx={{ marginRight: "5px" }}/>}
                />
                <OptionsInput
                    value={containerStyles?.alignItems}
                    setValue={(newVal: string) => setContainerKey("alignItems", newVal)}
                    options={stringsToOptions(alignItemSettings)}
                    startAdornment={<VerticalStretchIcon color="grey" sx={{ marginRight: "5px" }}/>}
                />

            </Stack>
        </OptionsProperty>
        </>
    )
}