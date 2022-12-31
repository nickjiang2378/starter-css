import React, { useState, useContext, useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';

import "../ChildView.css"
import { SelectedContext } from "../../../SelectedContext";
import { SetDataModel } from "../../../types/messages";
import { IS_PRODUCTION, lengthSettings } from "../../../utils/constants";
import { useGridContainer, useGridChildren, useUpdateGrid } from "./gridHooks";
import { GridContainer, VisualizerElement } from "../../../types/dashboards";
import { addChild, createSetChildKey, stringsToOptions, useUpdateCode } from "../helpers";
import OptionsProperty from "./OptionsProperty";
import { alignSelfSettings, justifyContentSettings, justifySelfSettings, supportedChildAttributes, supportedElementAttributes, trackBoundarySettings } from "./constants";
import OptionsInput from "../../../components/OptionsInput";
import { alignContentSettings, alignItemsSettings } from "../FlexSettings/constants";
import { Button, Stack, ToggleButton } from "@mui/material";
import { columnsExist, findNumDimensions, rowsExist, settingsToCode } from "./helpers";
import GridLineInputs from "./GridLineInputs";
import { Add } from "@mui/icons-material";
import PseudoChildIcon from "../PseudoChildIcon";

export default function GridVisualizer({ setCode }: SetDataModel) {
    const { selectedElement, childElements } = useContext(SelectedContext);
    const [containerStyles, setContainerStyles] = useGridContainer(selectedElement?.computedStyles);

    const [selectedChild, setSelectedChild] = useState<number | null>(null);
    const [children, setChildren] = useGridChildren(childElements);
    const [showGridLines, setShowGridLines] = useState(true);

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
    const [numRows, maxChildRow] = findNumDimensions(containerStyles, children, "row"); 
    const [numColumns, maxChildColumn] = findNumDimensions(containerStyles, children, "column"); 

    useUpdateCode(containerStyles, children, setCode, supportedElementAttributes, supportedChildAttributes, settingsToCode);
    //useUpdateGrid(containerStyles, children, setCode); // Must use containerStyles because the real code changes on every render

    return (
        <div>
            <div className="visualizer">
                <div>
                    {children.length >= 1 ?
                    <>
                        <div style={{ position: "relative", minWidth: "100%", minHeight: "150px" }}>
                            <div className="visualizer-playground" style={{ position: "absolute", width: "100%", height: "100%", display: "grid", ...realContainerCode}} onClick={resetView}>
                                {children.map((child, index) => {
                                    return (
                                        <div
                                            onClick={(e) => {console.log(e); e.stopPropagation(); setSelectedChild((currVal) => {
                                                if (currVal == null || currVal !== index) return index;
                                                else return null;
                                            })}}
                                            id={child.id}
                                            className={`flexChild ${index === selectedChild ? "highlightedBox" : "normalBox"} ${child.id === "pseudo" ? "pseudoChild" : ""}`}
                                            style={{...child.code, display: "flex", alignItems: "center", justifyContent: "center"}}
                                        >
                                            <span>{child.displayName}</span>
                                            {child.id === "pseudo" && <PseudoChildIcon />}
                                        </div>
                                    )
                                })}
                            </div>
                            { numRows * numColumns > 0 && false && showGridLines &&
                                (
                                    <>
                                        <div className="gridOverlay" style={{ ...realContainerCode, justifyItems: "stretch", alignItems: "stretch" }}>
                                            {[...Array(numColumns * numRows).keys()].map((_, index) => {
                                                let className = "gridOverlayVerticalElement gridOverlayHorizontalElement";
                                                if (index < children.length) {
                                                    let child = children[index]
                                                    return (
                                                        <div className={className} style={{ pointerEvents: "none", border: "2px dashed purple"}}>
                                                            <div
                                                                id={child.id}
                                                                className={`flexChild ${index === selectedChild ? "highlightedBox" : "normalBox"} ${child.id === "pseudo" && "psuedoChild"}`}
                                                                style={{...child.code, display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden"}}
                                                            >
                                                                <span>{child.displayName}</span>
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className={className} style={{ pointerEvents: "none", border: "2px dashed purple"}}>
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </div>
                                    </>
                                )

                            }
                            {showGridLines &&
                                (<>
                                    <div className="gridOverlayWrapper">
                                        <div className="gridOverlay" style={{ ...realContainerCode, gridTemplateRows: undefined, justifyItems: "stretch", alignItems: "stretch" }}>
                                            {numColumns > 0 && [...Array(numColumns).keys()].map((_, index) => {
                                                let className = "gridOverlayVerticalElement";
                                                if (index === numColumns - 1) {
                                                    className += " lastVerticalElement"
                                                }
                                                if (index < maxChildColumn) {
                                                    return (
                                                        <div className={className}>
                                                                <div
                                                                    id={"Hidden"}
                                                                    className={`flexChild ${index === selectedChild ? "highlightedBox" : "normalBox"}`}
                                                                    style={{display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden"}}
                                                                >
                                                                    <span>Child</span>
                                                                </div>           
                                                        </div>
                                                    )
                                                }
                                                return (
                                                    <div className={className}></div>
                                                )
                                            })}
                                        </div>
                                        <div className="gridOverlay" style={{ ...realContainerCode, gridTemplateColumns: undefined, justifyItems: "stretch", alignItems: "stretch" }}>
                                            {numRows > 0 && [...Array(numRows).keys()].map((_, index) => {
                                                let className = "gridOverlayHorizontalElement";
                                                if (index === numRows - 1) {
                                                    className += " lastHorizontalElement"
                                                }
                                                console.log(maxChildRow)
                                                if (index < maxChildRow) {
                                                    return (
                                                        <div className={className}>
                                                                <div
                                                                    id={"Hidden"}
                                                                    className={`flexChild ${index === selectedChild ? "highlightedBox" : "normalBox"}`}
                                                                    style={{display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden"}}
                                                                >
                                                                    <span>Child</span>
                                                                </div>           
                                                        </div>
                                                    )
                                                }
                                                return (
                                                    <div className={className}></div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </>)
                            }
                            {numRows > 0 && false && showGridLines &&
                                (
                                    <div id="rowOverlay" className="gridOverlay" style={{ ...realContainerCode, gridTemplateColumns: undefined, justifyItems: "stretch", alignItems: "stretch" }}>
                                        {[...Array(numRows).keys()].map((_, index) => {
                                            let className = "gridOverlayHorizontalElement";
                                            if (index === numRows - 1) {
                                                className += " lastHorizontalElement"
                                            }
                                            console.log(maxChildRow)
                                            if (index < maxChildRow) {
                                                return (
                                                    <div className={className}>
                                                            <div
                                                                id={"Hidden"}
                                                                className={`flexChild ${index === selectedChild ? "highlightedBox" : "normalBox"}`}
                                                                style={{display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden"}}
                                                            >
                                                                <span>Child</span>
                                                            </div>           
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div className={className}></div>
                                            )
                                        })}
                                    </div>
                                )
                            }

                        </div>
                        <div className="visualizer-settings">
                        {selectedChild == null 
                        ? <>
                            <div style={{ display: "flex" }}>
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
                            {children[selectedChild].id === "pseudo" && <p style={{ fontStyle: "italic" }}>This child is simulated. It will only appear in the visualizer, not the actual DOM.</p>}
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