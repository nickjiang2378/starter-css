import React, { useState, useContext, useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

import "../ChildView.css"
import { SelectedContext } from "../../../SelectedContext";
import { SetDataModel } from "../../../types/messages";
import { IS_PRODUCTION, lengthSettings } from "../../../utils/constants";
import { useGridContainer, useGridChildren } from "./gridHooks";
import { GridContainer, VisualizerElement } from "../../../types/dashboards";
import { addChild, createSetChildKey, removeChild, stringsToOptions, useUpdateCode } from "../helpers";
import OptionsProperty from "./OptionsProperty";
import { alignSelfSettings, justifyContentSettings, justifySelfSettings, supportedChildAttributes, supportedElementAttributes, trackBoundarySettings } from "./constants";
import OptionsInput from "../../../components/OptionsInput";
import { alignContentSettings, alignItemsSettings } from "../FlexSettings/constants";
import { Button, Stack, ToggleButton } from "@mui/material";
import { columnsExist, findNumDimensions, rowsExist, settingsToCode } from "./helpers";
import { Add } from "@mui/icons-material";
import PseudoChildIcon from "../PseudoChildIcon";
import GridLines from "./GridLines";
import VisualizerChild from "../VisualizerChild";
import GridContainerControls from "./GridContainerControls";

export default function GridVisualizer({ setCode }: SetDataModel) {
    const { selectedElement, childElements } = useContext(SelectedContext);
    const [containerStyles, setContainerStyles] = useGridContainer(selectedElement?.computedStyles);

    const [selectedChild, setSelectedChild] = useState<number | null>(null);
    const [children, setChildren] = useGridChildren(childElements);
    const [showGridLines, setShowGridLines] = useState(true);

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
    const [numRows, maxChildRow] = findNumDimensions(containerStyles, children, "row"); 
    const [numColumns, maxChildColumn] = findNumDimensions(containerStyles, children, "column");
    
    // Must use containerStyles because realContainerCode changes on every render
    useUpdateCode(containerStyles, children, setCode, supportedElementAttributes, supportedChildAttributes, settingsToCode);
    //useUpdateGrid(containerStyles, children, setCode); 

    return (
        <div>
            <div className="visualizer">
                <div>
                    <>
                    {children.length >= 1 ? 
                        <div style={{ position: "relative", minWidth: "100%", minHeight: "150px" }}>
                            <div className="visualizer-playground" style={{ position: "absolute", width: "100%", height: "100%", display: "grid", ...realContainerCode}} onClick={resetView}>
                                {children.map((child, index) => {
                                    return (
                                        <VisualizerChild
                                            setSelectedChild={setSelectedChild}
                                            selectedChild={selectedChild}
                                            index={index}
                                            child={child}
                                        >
                                            <span>{child.displayName}</span>
                                            {child.id === "pseudo" && <PseudoChildIcon />}
                                        </VisualizerChild>
                                    )
                                })}
                            </div>
                            {showGridLines &&
                                <GridLines
                                    numColumns={numColumns}
                                    numRows={numRows}
                                    maxChildColumn={maxChildColumn}
                                    maxChildRow={maxChildRow}
                                    realContainerCode={realContainerCode}
                                />
                            }
                        </div> :
                            <div className="visualizer-playground" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ width: "50%", opacity: 0.5 }}>No child nodes found. Either select the parent node or add children.</div>
                            </div>
                        }
                        <div className="visualizer-settings">
                        {selectedChild == null 
                        ? <>
                            <div style={{ display: "flex", marginTop: "10px" }}>
                                <div className="bold">Setup</div>
                                <div style={{ flex: 1 }}></div>
                                <div className="btn" onClick={addChild(setChildren)} style={{ paddingRight: "10px", paddingLeft: "10px", marginRight: "10px" }}>
                                    <Add sx={{ fontSize: "1.5em" }}/>
                                    Child
                                </div>
                                <ToggleButton
                                    value="ShowGridLines"
                                    size="small"
                                    selected={showGridLines}
                                    onChange={() => {
                                        setShowGridLines(!showGridLines);
                                    }}
                                    >
                                    <Grid3x3Icon sx={{ fontSize: "1.5em" }}/>
                                </ToggleButton>
                            </div>
                            <GridContainerControls
                                containerStyles={containerStyles}
                                setContainerKey={setContainerKey}
                            />
                        </> :
                        <>
                            {children[selectedChild].id === "pseudo" && 
                                <p style={{ fontStyle: "italic" }}>
                                    This child is simulated. It will only appear in the visualizer, not the actual DOM. 
                                    &nbsp;<span className="link" onClick={() => {removeChild(setChildren, selectedChild); setSelectedChild(null)}}>Remove</span>.
                                </p>}
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
                                property="Custom Align"
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
                    </> 
                </div>
            </div>
        </div>
    )
}