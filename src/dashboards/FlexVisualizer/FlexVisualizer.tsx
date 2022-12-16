import React, { useState, useContext, useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { SelectedContext } from "../../SelectedContext";
import OptionsProperty from "../../components/OptionsProperty"
import InputProperty from "../../components/InputProperty"
import CheckboxProperty from "../../components/CheckboxProperty";
import Code from "../../components/Code/Code";
import FlexIcon from "./FlexIcon";
import IconButtonCustom from "./IconButtonCustom/IconButtonCustom";
import OptionsInput from "./OptionsInput";
import { Autocomplete, TextField } from "@mui/material";
import "./FlexVisualizer.css"
import { flexDirectionSettings, justifyContentSettings, alignContentSettings, alignItemsSettings, alignSelfSettings } from "./constants";
import { useFlexContainer, useFlexChildren, useUpdateFlex } from "./flexHooks";
import { isRowAligned, filterInvalidFlexValues, settingsToCode, getDisplayStyles } from "./helpers";
import { FixMeLater } from "../../types/general";
import { FlexChild, FlexContainer, VisualizerElement } from "../../types/dashboards";
import { IS_PRODUCTION } from "../../utils/constants";
import { DataModel, SetDataModel } from "../../types/messages";
import { CodeDisplayModel } from "../../types/codeDisplay";

export default function FlexVisualizer({ setCode }: SetDataModel) {
    const { selectedElement, childElements } = useContext(SelectedContext);
    const [containerStyles, setContainerStyles] = useFlexContainer(selectedElement?.computedStyles);

    const [selectedChild, setSelectedChild] = useState<number | null>(null);
    const [children, setChildren] = useFlexChildren(childElements);

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

    // For when the user adds or deletes a flexbox
    const addFlex = (add: boolean) => {
        if (add) {
            setContainerStyles({ display: "flex" })
        } else {
            // Reset container itself
            setContainerStyles({})

            // Reset children
            setChildren((childrenPast) => {
                let emptyChildren: VisualizerElement[] = []
                for (let child of childrenPast) {
                    emptyChildren.push({
                        displayName: child.displayName,
                        id: child.id,
                        code: {}
                    })
                }
                return emptyChildren;
            })
        }
    }

    // Runs when user clicks on a child and needs to reset the view
    const resetView = () => {
        setSelectedChild(null);
    }

    // Helper functions to update container and child styles
    const setContainerKey = (prop: string, val: string) => {
        console.log(`Updating ${prop}`)
        setContainerStyles((obj: FlexContainer) => ({...obj, [prop]: val}));
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

    // useEffect(() => {
    //     setCode((prevData: CodeDisplayModel) => {
    //         return {
    //             ...prevData,
    //             selectedElement: {...prevData.selectedElement, ...realContainerCode},
    //             childElements: children.map((child, i) => {
    //                 return {
    //                     ...prevData.childElements[i],
    //                     ...child.code
    //                 }
    //             })
    //         }}
    //     )
    // }, [realContainerCode, setCode, children])

    // Transmits changes to the browser DOM
    useUpdateFlex(realContainerCode, children);

    return (
        <div>
            <div className="flex-header category-header">
                <div className="bold" style={{ flex: 1 }}>Flexbox</div>
                {containerStyles?.display !== "flex" ?
                    <div
                        className="icon-btn"
                        onClick={() => addFlex(true)}
                    >
                        <AddIcon
                            sx={{ width: '100%', height: '100%' }}
                        />
                    </div> :
                    <div
                        className="icon-btn"
                        onClick={() => addFlex(false)}
                    >
                        <RemoveIcon
                            sx={{ width: '100%', height: '100%' }}
                        />
                    </div>
                }
            </div>
            {containerStyles?.display === "flex" &&
                <div className="visualizer">
                    <div>
                        {children.length >= 1 ?
                        <>
                            <div className="visualizer-playground" style={realContainerCode} onClick={resetView}>
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
                                            <IconButtonCustom
                                                icon={<FlexIcon iconOn={child.code.flex && child.code.flex !== "none"} />}
                                                clicked={child.code.flex && child.code.flex !== "none"}
                                                setClicked={(flex: boolean) => toggleFlex(index, flex)}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="visualizer-settings">
                                <div style={{ display: "flex" }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div>Gap</div>
                                        <div>Row Direction
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div>Value</div>
                                        <div>Row Value</div>
                                    </div>
                                </div>
                            {selectedChild == null 
                            ? <>
                                <OptionsProperty
                                    property="Direction"
                                    val={containerStyles?.flexDirection}
                                    setVal={(newVal: string) => setContainerKey("flexDirection", newVal)}
                                    options={flexDirectionSettings}
                                />
                                <OptionsProperty
                                    property={`Main Axis (${rowMode ? "Horizontal" : "Vertical"})`}
                                    val={containerStyles?.justifyContent}
                                    setVal={(newVal: string) => setContainerKey("justifyContent", newVal)}
                                    options={justifyContentSettings}
                                />
                                <OptionsProperty
                                    property={`Cross Axis (${rowMode ? "Vertical" : "Horizontal"})`}
                                    val={containerStyles?.alignItems}
                                    setVal={(newVal: string) => setContainerKey("alignItems", newVal)}
                                    options={alignItemsSettings}
                                    defaultIndex={3}
                                />
                                <InputProperty
                                    property="Gap"
                                    val={containerStyles?.gap}
                                    setVal={(newVal: string) => setContainerKey("gap", newVal)}
                                />
                                <CheckboxProperty
                                    property={`Line Wrap (${rowMode ? "Vertical" : "Horizontal"})`}
                                    checked={containerStyles?.flexWrap !== "nowrap"}
                                    onChange={(e: FixMeLater) => {
                                        if (e.target.checked) {
                                            setContainerKey("flexWrap", "wrap")
                                        } else {
                                            setContainerKey("flexWrap", "nowrap")
                                        }
                                    }}
                                />
                                {containerStyles?.flexWrap !== "nowrap" && 
                                    <OptionsProperty
                                        property={`Line Spacing (${rowMode ? "Vertical" : "Horizontal"})`}
                                        val={containerStyles?.alignContent}
                                        setVal={(newVal: string) => setContainerKey("alignContent", newVal)}
                                        options={alignContentSettings}
                                        disabled={containerStyles?.flexWrap === "nowrap"}
                                    />
                                }
                            </> :
                            <>
                                <InputProperty
                                    property="Flex Ratio"
                                    val={children[selectedChild]?.code?.flex}
                                    setVal={(newVal: string) => setChildKey("flex", newVal, selectedChild)}
                                />
                                <OptionsProperty
                                    property={`Custom Align (${rowMode ? "Vertical" : "Horizontal"})`}
                                    val={children[selectedChild]?.code?.alignSelf}
                                    setVal={(newVal: string) => setChildKey("alignSelf", newVal, selectedChild)}
                                    options={alignSelfSettings}
                                />
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
            }
        </div>
    )
}