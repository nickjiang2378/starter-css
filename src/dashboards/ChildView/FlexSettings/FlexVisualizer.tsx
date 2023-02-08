import React, { useState, useContext, useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { SelectedContext } from "../../../SelectedContext";
import OptionsProperty from "../../../components/OptionsProperty"
import InputProperty from "../../../components/InputProperty"
import CheckboxProperty from "../../../components/CheckboxProperty";
import Code from "../../../components/Code/Code";
import FlexIcon from "./FlexIcon";
import IconButtonCustom from "./IconButtonCustom/IconButtonCustom";
import OptionsInput from "../../../components/OptionsInput";
import { Autocomplete, TextField } from "@mui/material";
import "../ChildView.css"
import { flexDirectionSettings, justifyContentSettings, alignContentSettings, alignItemsSettings, alignSelfSettings, supportedElementAttributes, gapSettings, supportedChildAttributes, flexSettings } from "./constants";
import { useFlexContainer, useFlexChildren, useUpdateFlex } from "./flexHooks";
import { isRowAligned, filterInvalidFlexValues, settingsToCode, getDisplayStyles, settingToCode } from "./helpers";
import { addChild, removeChild, stringsToOptions, useUpdateCode } from "../helpers";
import { FixMeLater, ObjectStringKeys } from "../../../types/general";
import { FlexChild, FlexContainer, VisualizerElement } from "../../../types/dashboards";
import { IS_PRODUCTION } from "../../../utils/constants";
import { DataModel, SetDataModel } from "../../../types/messages";
import { strictMerge } from "../../../utils/helpers";
import { Add } from "@mui/icons-material";
import PseudoChildIcon from "../PseudoChildIcon";
import VisualizerChild from "../VisualizerChild";
import HorizontalStretchIcon from "../../../components/HorizontalStretchIcon";
import VerticalStretchIcon from "../../../components/VerticalStretchIcon";

const DirectionIconWithText = ({ text, direction }: { text: string, direction: 'H' | 'V' } ) => {
    if (direction === 'H') {
        return <div style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
        {text}
        <HorizontalStretchIcon color="grey" sx={{ marginRight: "5px" }}/>
        </div>
    } else {
        return <div style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
        {text}
        <VerticalStretchIcon color="grey" sx={{ marginRight: "5px" }}/>
        </div>
    }
}

export default function FlexVisualizer({ setCode }: SetDataModel) {
    const { selectedElement, childElements } = useContext(SelectedContext);
    const [containerStyles, setContainerStyles] = useFlexContainer(selectedElement?.computedStyles);

    const [selectedChild, setSelectedChild] = useState<number | null>(null);
    const [children, setChildren] = useFlexChildren(childElements);

    // Runs when user clicks on a child and needs to reset the view
    const resetView = () => {
        setSelectedChild(null);
    }

    // Helper functions to update container and child styles
    const setContainerKey = (prop: string, val: string) => {
        setContainerStyles((obj: FlexContainer) => ({...obj, [prop]: val}));
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

    const setChildKey = (prop: string, val: string, index: number) => {
        setChildren((arr) => {
            let newArr = [...arr]
            let childCode = {...newArr[index].code, [prop]: val}
            newArr[index].code = childCode
            return newArr;
        });
    }

    const toggleFlex = (index: number, flex: boolean) => {
        if (flex) {
            setChildKey("flex", "1", index)
        } else {
            setChildKey("flex", "none", index);
        }
    }

    // Checks if we're on row or column mode
    let rowMode = isRowAligned(containerStyles);

    // Generate "real" code from dashboard settings
    let realContainerCode = settingsToCode(containerStyles);

    console.log(realContainerCode);

    // Transmits changes to the central codebase for transfer to DOM
    // useUpdateFlex(containerStyles, children, setCode);
    useUpdateCode(containerStyles, children, setCode, supportedElementAttributes, supportedChildAttributes, settingsToCode)

    return (
        <div>
            <div className="visualizer">
                <div>
                    <>
                        {children.length >= 1
                        ? <div className="visualizer-playground" style={{ display: "flex", ...realContainerCode}} onClick={resetView}>
                            {children.map((child, index) => {
                                return (
                                    <VisualizerChild
                                        selectedChild={selectedChild}
                                        setSelectedChild={setSelectedChild}
                                        index={index}
                                        child={child}
                                    >
                                        <span>{child.displayName}</span>
                                        {child.id === "pseudo" && <PseudoChildIcon />}
                                        <IconButtonCustom
                                            icon={<FlexIcon
                                                    rowMode={rowMode} 
                                                    iconOn={child.code.flex && !["none", "0 1 auto"].includes(child.code.flex)} 
                                                />}
                                            clicked={child.code.flex && !["none", "0 1 auto"].includes(child.code.flex)}
                                            setClicked={(flex: boolean) => toggleFlex(index, flex)}
                                        />
                                    </VisualizerChild>
                                )
                            })}
                        </div> 
                        : (<div className="visualizer-playground" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ width: "50%", opacity: 0.5 }}>No child nodes found. Either select the parent node or add children.</div>
                            </div>)
                        }
                        <div className="visualizer-settings">
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className="btn" onClick={addChild(setChildren)}>
                                <Add sx={{ fontSize: "1.5em" }}/>
                                Child
                            </div>
                        </div>
                        {selectedChild == null 
                        ? <>
                            <OptionsProperty
                                property="Direction"
                                val={containerStyles?.flexDirection}
                                setVal={(newVal: string) => setContainerKey("flexDirection", newVal)}
                                options={stringsToOptions(flexDirectionSettings)}
                            />
                            <OptionsProperty
                                property={rowMode ? <DirectionIconWithText text={"Main Axis"} direction="H" /> : <DirectionIconWithText text={"Main Axis"} direction="V" />}
                                val={containerStyles?.justifyContent}
                                setVal={(newVal: string) => setContainerKey("justifyContent", newVal)}
                                options={stringsToOptions(justifyContentSettings)}
                            />
                            <OptionsProperty
                                property={rowMode ? <DirectionIconWithText text={"Cross Axis"} direction="V" /> : <DirectionIconWithText text={"Cross Axis"} direction="H" />}
                                val={containerStyles?.alignItems}
                                setVal={(newVal: string) => setContainerKey("alignItems", newVal)}
                                options={stringsToOptions(alignItemsSettings)}
                                defaultIndex={3}
                            />
                            <OptionsProperty
                                property="Gap"
                                val={containerStyles?.gap}
                                setVal={(newVal: string) => setContainerKey("gap", newVal)}
                                options={gapSettings}
                            />
                            <CheckboxProperty
                                property={rowMode ? <DirectionIconWithText text={"Line Wrap"} direction="V" /> : <DirectionIconWithText text={"Line Wrap"} direction="H" />}
                                checked={containerStyles?.flexWrap && containerStyles?.flexWrap !== "nowrap"}
                                onChange={(e: FixMeLater) => {
                                    if (e.target.checked) {
                                        setContainerKey("flexWrap", "wrap")
                                    } else {
                                        setContainerKey("flexWrap", "nowrap")
                                    }
                                }}
                            />
                            {containerStyles?.flexWrap && containerStyles?.flexWrap !== "nowrap" && 
                                <OptionsProperty
                                    property={rowMode ? <DirectionIconWithText text={"Line Spacing"} direction="V" /> : <DirectionIconWithText text={"Line Wrap"} direction="H" />}
                                    val={containerStyles?.alignContent}
                                    setVal={(newVal: string) => setContainerKey("alignContent", newVal)}
                                    options={stringsToOptions(alignContentSettings)}
                                    disabled={containerStyles?.flexWrap === "nowrap"}
                                />
                            }
                        </> :
                        <>
                            {children[selectedChild].id === "pseudo" && 
                                <p style={{ fontStyle: "italic" }}>
                                    This child is simulated. It will only appear in the visualizer, not the actual DOM. 
                                    &nbsp;<span className="link" onClick={() => {removeChild(setChildren, selectedChild); setSelectedChild(null)}}>Remove</span>.
                                </p>}
                            <OptionsProperty
                                property="Size Ratio"
                                val={children[selectedChild]?.code?.flex}
                                setVal={(newVal: string) => setChildKey("flex", newVal, selectedChild)}
                                options={flexSettings}
                            />
                            <OptionsProperty
                                property={rowMode ? <DirectionIconWithText text={"Custom Align"} direction="V" /> : <DirectionIconWithText text={"Custom Align"} direction="H" />}
                                val={children[selectedChild]?.code?.alignSelf}
                                setVal={(newVal: string) => setChildKey("alignSelf", newVal, selectedChild)}
                                options={stringsToOptions(alignSelfSettings)}
                            />
                        </>
                        }
                    </div>
                    </> 
                </div>
            </div>
        </div>
    )
}