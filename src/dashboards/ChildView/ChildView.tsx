import React, { useState, useContext } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Dropdown from "../../components/Dropdown";
import { SelectedContext } from "../../SelectedContext";
import { SetDataModel, StyleChangesModel } from "../../types/messages";
import { isFlexBox, isGrid } from "./helpers";
import { strictMerge } from "../../utils/helpers";
import { FixMeLater } from "../../types/general";
import FlexVisualizer from "../FlexVisualizer/FlexVisualizer";

type ChildViewProps = {
    setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>,
    code: StyleChangesModel
}

const layoutOptions = [
    "Flexbox",
    "Grid"
]

const Visualizer = ({ code, setCode }: ChildViewProps) => {
    if (isFlexBox(code.selectedElementChanges)) {
        return <FlexVisualizer setCode={setCode} />
    } else if (isGrid(code.selectedElementChanges)) {
        return null;
    } else {
        return null;
    }
}

export default function ChildView({ setCode, code }: ChildViewProps) {
    const [layout, setLayout] = useState(layoutOptions[0]);

    function updateLayout(layout: string) {
        setCode((prevCode: StyleChangesModel) => {
            // Case to remove display
            if (layout === "") {
                return {
                    ...prevCode,
                    selectedElementChanges: strictMerge(prevCode.selectedElementChanges, {}, ["display"]),
                } 
            }

            // Case to set new display value
            let displayVal;
            if (prevCode.selectedElementChanges.display === "inline" && layout === "Flexbox") {
                displayVal = "inlineFlex"
            } else if (prevCode.selectedElementChanges.display === "inline" && layout === "Grid") {
                displayVal = "inlineGrid"
            } else if (layout === "Flexbox") {
                displayVal = "flex"
            } else {
                displayVal = "grid"
            }
            return {
                ...prevCode,
                selectedElementChanges: strictMerge(prevCode.selectedElementChanges, { display: displayVal }, ["display"]),
            }
        })
    }

    return (
        <>
            <div className="category-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Dropdown
                    displayOption={layout}
                    setDisplayOption={setLayout}
                    options={layoutOptions}
                />
                {
                    isFlexBox(code.selectedElementChanges) || isGrid(code.selectedElementChanges) ?
                    <div
                            className="icon-btn"
                            onClick={() => updateLayout("")}
                        >
                            <RemoveIcon
                                sx={{ width: '100%', height: '100%' }}
                            />
                    </div> :
                    <div
                            className="icon-btn"
                            onClick={() => updateLayout(layout)}
                        >
                            <AddIcon
                                sx={{ width: '100%', height: '100%' }}
                            />
                    </div>
                }
            </div>
            <Visualizer code={code} setCode={setCode} />
        </>
    );
}