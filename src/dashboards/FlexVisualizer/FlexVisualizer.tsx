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

export default function FlexVisualizer() {
    const { selectedElement, childElements } = useContext(SelectedContext);
    const [containerStyles, setContainerStyles] = useFlexContainer(selectedElement?.computedStyles);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
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
        setSelectedIndex(null);
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

    // Generate "real" code from dashboard settings
    let realContainerCode = settingsToCode(containerStyles);

    // Add extra metadata such as identifying name for use in the Code Visualizer
    let [elementDisplayStyles, allDisplayStyles] = getDisplayStyles(realContainerCode, children);

    // Checks if we're on row or column mode
    let rowMode = isRowAligned(containerStyles);
    
    // Transmits changes to the browser DOM
    useUpdateFlex(realContainerCode, children);

    // Test
    const [value, setValue] = useState("flex-end");

    return (
        <div className="container">
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
                                            onClick={(e) => {console.log(e); e.stopPropagation(); setSelectedIndex((currVal) => {
                                                if (currVal == null || currVal !== index) return index;
                                                else return null;
                                            })}}
                                            id={child.id}
                                            className={`flexChild ${index === selectedIndex ? "highlightedBox" : "normalBox"}`}
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
                                {<OptionsInput
                                    value={value}
                                    setValue={setValue}
                                    options={alignContentSettings}
                                />}
                                <OptionsInput
                                    options={[]}
                                    value={containerStyles?.justifyContent}
                                    setValue={(newVal: string) => setContainerKey("justifyContent", newVal)}
                                />
                            {selectedIndex == null 
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
                                    val={children[selectedIndex]?.code?.flex}
                                    setVal={(newVal: string) => setChildKey("flex", newVal, selectedIndex)}
                                />
                                <OptionsProperty
                                    property={`Custom Align (${rowMode ? "Vertical" : "Horizontal"})`}
                                    val={children[selectedIndex]?.code?.alignSelf}
                                    setVal={(newVal: string) => setChildKey("alignSelf", newVal, selectedIndex)}
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
                    <Code element={elementDisplayStyles} all={allDisplayStyles}/>
                </div>
            }
        </div>
    )
}