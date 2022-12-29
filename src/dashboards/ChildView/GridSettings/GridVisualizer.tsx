import React, { useState, useContext, useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import "../ChildView.css"
import { SelectedContext } from "../../../SelectedContext";
import { SetDataModel } from "../../../types/messages";
import { IS_PRODUCTION, lengthSettings } from "../../../utils/constants";
import { useGridContainer, useGridChildren } from "./gridHooks";
import { GridContainer } from "../../../types/dashboards";
import { createSetChildKey, stringsToOptions } from "../helpers";
import OptionsProperty from "./OptionsProperty";
import { justifyContentSettings } from "./constants";
import OptionsInput from "../../../components/OptionsInput";
import { alignContentSettings, alignItemsSettings } from "../FlexSettings/constants";
import { Stack } from "@mui/material";

export default function GridVisualizer({ setCode }: SetDataModel) {
    const { selectedElement, childElements } = useContext(SelectedContext);
    const [containerStyles, setContainerStyles] = useGridContainer(selectedElement?.computedStyles);

    const [selectedChild, setSelectedChild] = useState<number | null>(null);
    const [children, setChildren] = useGridChildren(childElements);

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
    const setContainerKey = (prop: string, val: string) => {
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

    return (
        <div>
            <div className="visualizer">
                <div>
                    {children.length >= 1 ?
                    <>
                        <div className="visualizer-playground" style={{ display: "grid", ...containerStyles}} onClick={resetView}>
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
                            <OptionsProperty
                                property="Grid Alignment"
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
                                property="Child Alignment"
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
                        </> :
                        <>
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