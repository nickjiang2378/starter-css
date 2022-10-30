import React, { useState, useContext } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { SelectedContext } from "../../SelectedContext";
import OptionsProperty from "../../components/OptionsProperty"
import InputProperty from "../../components/InputProperty"
import CheckboxProperty from "../../components/CheckboxProperty";
import Code from "../../components/Code/Code";
import "./FlexVisualizer.css"
import { flexDirectionSettings, justifyContentSettings, alignContentSettings, alignItemsSettings, alignSelfSettings } from "./constants";
import { useFlexStyles, useUpdateFlex } from "./flexHooks";
import { isRowAligned, filterInvalidFlexValues, settingsToCode } from "./helpers";
import { FixMeLater } from "../../types/general";
import { FlexChild, FlexContainer, VisualizerElement } from "../../types/dashboards";

export default function FlexVisualizer() {
    const { selectedElement } = useContext(SelectedContext);
    const [containerStyles, setContainerStyles] = useFlexStyles(selectedElement?.computedStyles);

    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [children, setChildren] = useState<VisualizerElement[]>([
        {
            id: "#child1",
            displayName: "Child 1",
            code: {
                flex: "none",
                alignSelf: "auto"
            }
        }, 
        {
            id: "#child2",
            displayName: "Child 2",
            code: {
                flex: "none",
                alignSelf: "auto"
            }
        }, 
        {
            id: "#child3",
            displayName: "Child 3",
            code: {
                flex: "none",
                alignSelf: "auto"
            }
        }, 
    ]);

    // For when the user adds or deletes a flexbox
    const addFlex = (add: boolean) => {
        if (add) {
            setContainerStyles({
                display: "flex",
            })
        } else {
            setContainerStyles({})
        }
    }

    const resetView = () => {
        setSelectedIndex(null);
    }

    // Helper functions to update container and child styles
    const setContainerKey = (prop: string, val: string) => {
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

    // Generate "real" code from dashboard settings
    let realContainerCode = settingsToCode(containerStyles);

    // Code Visualizer content
    let elementDisplayStyles: VisualizerElement = {
        id: "#element",
        displayName: "element",
        code: filterInvalidFlexValues(realContainerCode)
    };
    let allDisplayStyles: VisualizerElement[] = [...children];
    allDisplayStyles.unshift(elementDisplayStyles);

    // Checks if we're on row or column mode
    let rowMode = isRowAligned(containerStyles);
    
    // Transmits changes to the browser DOM
    useUpdateFlex(realContainerCode); 

    console.log(containerStyles)
    console.log(realContainerCode);

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
                <div className="flexVisualizer">
                    <div className="flexPlayground" style={realContainerCode} onClick={resetView}>
                        <>
                            {children.map((child, index) => {
                                return (
                                    <div
                                        onClick={(e) => {console.log(e); e.stopPropagation(); setSelectedIndex(index)}}
                                        id={child.id}
                                        className={`flexChild ${index === selectedIndex ? "highlightedBox" : "normalBox"}`}
                                        style={child.code}
                                    >
                                        {child.displayName}
                                    </div>
                                )
                            })}
                        </>
                    </div>
                    <div className="flexSettings">
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
                            <OptionsProperty
                                property={`Line Spacing (${rowMode ? "Vertical" : "Horizontal"})`}
                                val={containerStyles?.alignContent}
                                setVal={(newVal: string) => setContainerKey("alignContent", newVal)}
                                options={alignContentSettings}
                                disabled={containerStyles?.flexWrap === "nowrap"}
                            />
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
                    <Code element={elementDisplayStyles} all={allDisplayStyles}/>
                </div>
            }
        </div>
    )
}