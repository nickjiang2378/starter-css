import React, { useState, useContext, useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import "../ChildView.css"
import { SelectedContext } from "../../../SelectedContext";
import { SetDataModel } from "../../../types/messages";
import { IS_PRODUCTION, lengthSettings } from "../../../utils/constants";
import { useGridContainer, useGridChildren, useUpdateGrid } from "./gridHooks";
import { GridContainer, VisualizerElement } from "../../../types/dashboards";
import { createSetChildKey, stringsToOptions, useUpdateCode } from "../helpers";
import OptionsProperty from "./OptionsProperty";
import { alignSelfSettings, justifyContentSettings, justifySelfSettings, supportedChildAttributes, supportedElementAttributes, trackBoundarySettings } from "./constants";
import OptionsInput from "../../../components/OptionsInput";
import { alignContentSettings, alignItemsSettings } from "../FlexSettings/constants";
import { Stack } from "@mui/material";
import { settingsToCode } from "./helpers";
import GridLineInputs from "./GridLineInputs";
// import GridLineInputs from "./GridLineInputs";


export default function GridVisualizer({ setCode }: SetDataModel) {
    const { selectedElement, childElements } = useContext(SelectedContext);
    const [containerStyles, setContainerStyles] = useGridContainer(selectedElement?.computedStyles);

    const [selectedChild, setSelectedChild] = useState<number | null>(null);
    // const [children, setChildren] = useGridChildren(childElements);
    const [children, setChildren] = useState<VisualizerElement[]>([]);

    useEffect(() => {
        if (IS_PRODUCTION) return;
        setChildren([
            {
                displayName: "Test Child",
                id: "1",
                code: {}
            },
            {
                displayName: "Test Child 2",
                id: "2",
                code: {}
            }
        ])
    }, [setChildren])

    // Runs when user clicks on a child and needs to reset the view
    const resetView = () => {
        setSelectedChild(null);
    }

    // Helper functions to update container and child styles
    const setContainerKey = (prop: string, val: any) => {
        setContainerStyles((obj: GridContainer) => ({...obj, [prop]: val}));
        // setCode((prevCode: CodeDisplayModel) => {
        //     const newStyles: ObjectStringKeys = {...containerStyles, [prop]: val};
        //     const currStyles: ObjectStringKeys = {...prevCode.selectedElement}
        //     // Generate "real" code from dashboard settings
        //     let realContainerCode = settingsToCode(newStyles);

        //     return {
        //         ...prevCode,
        //         selectedElement: strictMerge(currStyles, realContainerCode, supportedElementAttributes)
        //     }
        // })
    }

    const setChildKey = createSetChildKey(setChildren);

    const realContainerCode = settingsToCode(containerStyles);

    console.log(realContainerCode);

    useUpdateCode(containerStyles, children, setCode, supportedElementAttributes, supportedChildAttributes, settingsToCode);
    //useUpdateGrid(containerStyles, children, setCode); // Must use containerStyles because the real code changes on every render

    return (
        <div>
            <div className="visualizer">
                <div>
                    {children.length >= 1 ?
                    <>
                        <div className="visualizer-playground" style={{ display: "grid", ...realContainerCode}} onClick={resetView}>
                            {children.map((child, index) => {
                                return (
                                    <div
                                        onClick={(e) => {console.log(e); e.stopPropagation(); setSelectedChild((currVal) => {
                                            if (currVal == null || currVal !== index) return index;
                                            else return null;
                                        })}}
                                        id={child.id}
                                        className={`flexChild ${index === selectedChild ? "highlightedBox" : "normalBox"}`}
                                        style={{...child.code, display: "flex", alignItems: "center", justifyContent: "center"}}
                                    >
                                        <span>{child.displayName}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="visualizer-settings">
                        {selectedChild == null 
                        ? <>
                            <div className="bold">Setup</div>
                            <OptionsProperty
                                property="Gap"
                            >
                                <Stack direction="row" gap="15px">
                                    <OptionsInput
                                        label="Horizontal"
                                        value={containerStyles?.columnGap}
                                        setValue={(newVal: string) => setContainerKey("columnGap", newVal)}
                                        options={lengthSettings}
                                    />
                                    <OptionsInput
                                        label="Vertical"
                                        value={containerStyles?.rowGap}
                                        setValue={(newVal: string) => setContainerKey("rowGap", newVal)}
                                        options={lengthSettings}
                                    />
                                </Stack>
                            </OptionsProperty>
                            <OptionsProperty property="Columns">
                                <GridLineInputs
                                    containerStyles={containerStyles}
                                    children={children}
                                    setContainerKey={setContainerKey}
                                    type="column"
                                />
                            </OptionsProperty>
                            <OptionsProperty property="Rows">
                                <GridLineInputs
                                    containerStyles={containerStyles}
                                    children={children}
                                    setContainerKey={setContainerKey}
                                    type="row"
                                />
                            </OptionsProperty>
                            <div className="bold" style={{ marginTop: "10px" }}>Alignment</div>
                            <OptionsProperty
                                property="Grid"
                            >
                                <Stack direction="row" gap="15px">
                                    <OptionsInput
                                        label="Horizontal"
                                        value={containerStyles?.justifyContent}
                                        setValue={(newVal: string) => setContainerKey("justifyContent", newVal)}
                                        options={stringsToOptions(justifyContentSettings)}
                                    />
                                    <OptionsInput
                                        label="Vertical"
                                        value={containerStyles?.alignContent}
                                        setValue={(newVal: string) => setContainerKey("alignContent", newVal)}
                                        options={stringsToOptions(alignContentSettings)}
                                    />

                                </Stack>
                            </OptionsProperty>
                            <OptionsProperty
                                property="Child"
                            >
                                <Stack direction="row" gap="15px">
                                    <OptionsInput
                                        label="Horizontal"
                                        value={containerStyles?.justifyItems}
                                        setValue={(newVal: string) => setContainerKey("justifyItems", newVal)}
                                        options={stringsToOptions(alignItemsSettings)}
                                    />
                                    <OptionsInput
                                        label="Vertical"
                                        value={containerStyles?.alignItems}
                                        setValue={(newVal: string) => setContainerKey("alignItems", newVal)}
                                        options={stringsToOptions(alignItemsSettings)}
                                    />

                                </Stack>
                            </OptionsProperty>
                        </> :
                        <>
                            <OptionsProperty
                                property="Rows"
                            >
                                <Stack direction="row" gap="15px">
                                    <OptionsInput
                                        label="Start"
                                        value={children[selectedChild].code.gridRowStart}
                                        setValue={(newVal: string) => setChildKey("gridRowStart", newVal, selectedChild)}
                                        options={trackBoundarySettings}
                                    />
                                    <OptionsInput
                                        label="End"
                                        value={children[selectedChild].code.gridRowEnd}
                                        setValue={(newVal: string) => setChildKey("gridRowEnd", newVal, selectedChild)}
                                        options={trackBoundarySettings}
                                    />
                                </Stack>
                            </OptionsProperty>
                            <OptionsProperty
                                property="Columns"
                            >
                                <Stack direction="row" gap="15px">
                                    <OptionsInput
                                        label="Start"
                                        value={children[selectedChild].code.gridColumnStart}
                                        setValue={(newVal: string) => setChildKey("gridColumnStart", newVal, selectedChild)}
                                        options={trackBoundarySettings}
                                    />
                                    <OptionsInput
                                        label="End"
                                        value={children[selectedChild].code.gridColumnEnd}
                                        setValue={(newVal: string) => setChildKey("gridColumnEnd", newVal, selectedChild)}
                                        options={trackBoundarySettings}
                                    />
                                </Stack>
                            </OptionsProperty>
                            <OptionsProperty
                                property="Align"
                            >
                                <Stack direction="row" gap="15px">
                                    <OptionsInput
                                        label="Horizontal"
                                        value={children[selectedChild].code.justifySelf}
                                        setValue={(newVal: string) => setChildKey("justifySelf", newVal, selectedChild)}
                                        options={stringsToOptions(justifySelfSettings)}
                                    />
                                    <OptionsInput
                                        label="End"
                                        value={children[selectedChild].code.alignSelf}
                                        setValue={(newVal: string) => setChildKey("alignSelf", newVal, selectedChild)}
                                        options={stringsToOptions(alignSelfSettings)}
                                    />
                                </Stack>
                            </OptionsProperty>
                        </>
                        }
                    </div>
                    </> :
                        <div className="visualizer-playground" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ width: "50%", opacity: 0.5 }}>No child nodes found. Either select the parent node or add children.</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}