import React, { useState, useContext, useEffect } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Dropdown from "../../components/Dropdown";
import { SelectedContext } from "../../SelectedContext";
import { SetDataModel, StyleChangesModel } from "../../types/messages";
import { isFlexBox, isGrid } from "./helpers";
import { mergeWithDefault, strictMerge } from "../../utils/helpers";
import { FixMeLater } from "../../types/general";
import FlexVisualizer from "./FlexSettings/FlexVisualizer";
import GridVisualizer from "./GridSettings/GridVisualizer";
import HorizontalStretchIcon from "../../components/HorizontalStretchIcon";
import { supportedElementAttributes as gridAttributes } from "./GridSettings/constants"
import { supportedElementAttributes as flexAttributes } from "./FlexSettings/constants"

type VisualizerProps = {
    setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>,
    layoutDisplay: string,
    code?: StyleChangesModel
}

type Display = {
    display: any;
}

const layoutOptions = [
    "Flexbox",
    "Grid"
]

const Visualizer = ({ layoutDisplay, setCode }: VisualizerProps) => {
    if (layoutDisplay === "flex") {
        return <FlexVisualizer setCode={setCode} />
    } else if (layoutDisplay === "grid") {
        return <GridVisualizer setCode={setCode} />;
    } else {
        return null;
    }
}
function updateLayout(layout: string, setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>) {
    setCode((prevCode: StyleChangesModel) => {
        // Case to remove display
        if (layout === "") {
            const removeAttributes = [...gridAttributes, ...flexAttributes, "display"]
            return {
                ...prevCode,
                selectedElementChanges: mergeWithDefault(prevCode.selectedElementChanges, {}, removeAttributes, null),
            } 
        }

        const removeAttributes = layout === "flex" ? gridAttributes : flexAttributes

        return {
            ...prevCode,
            selectedElementChanges: mergeWithDefault(prevCode.selectedElementChanges, { display: layout }, [...removeAttributes, "display"], null),
        }
    })
}

function convertDisplay(styles: Display | null, displayVal: "flex" | "grid") {
    if (styles && typeof(styles.display) === "string" && styles.display.startsWith("inline")) {
        return { display: "inline" + displayVal[0].toUpperCase() + displayVal.slice(1) }
    } else {
        return { display: displayVal }
    }
} 

export default function ChildView({ setCode, code }: SetDataModel) {
    const { selectedElement } = useContext(SelectedContext);
    const [layoutDisplay, setLayoutDisplay] = useState(layoutOptions[0]);
    const [layout, setLayout] = useState<Display | null>(null);

    const layoutShown = isFlexBox(layout) || isGrid(layout)
    
    useEffect(() => {
        const newLayout = { display: selectedElement?.computedStyles?.display }
        setLayout(newLayout)
        if (isFlexBox(newLayout)) {
            setLayoutDisplay(layoutOptions[0])
        }
        if (isGrid(newLayout)) {
            setLayoutDisplay(layoutOptions[1])
        }
    }, [selectedElement])

    useEffect(() => {
        updateLayout(layout?.display || "", setCode)
    }, [layout, setCode])

    const handleNewOption = (option: string) => {
        setLayoutDisplay(option);
        if (layoutShown) {
            setLayout(convertDisplay(layout, 
                option === layoutOptions[0] ? "flex" : "grid"))
        }
    }

    return (
        <>
            <div className="category-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Dropdown
                    displayOption={layoutDisplay}
                    setDisplayOption={handleNewOption}
                    options={layoutOptions}
                />
                {
                    layoutShown ?
                    <div
                            className="icon-btn"
                            onClick={() => setLayout(null)}
                        >
                            <RemoveIcon
                                sx={{ width: '100%', height: '100%' }}
                            />
                    </div> :
                    <div
                            className="icon-btn"
                            onClick={() => setLayout(convertDisplay(layout, layoutDisplay === layoutOptions[0] ? "flex" : "grid" ))}
                        >
                            <AddIcon
                                sx={{ width: '100%', height: '100%' }}
                            />
                    </div>
                }
            </div>
            <Visualizer layoutDisplay={layout?.display || ""} setCode={setCode} code={code} />
        </>
    );
}