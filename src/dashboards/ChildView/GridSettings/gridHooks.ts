import React, { useState, useEffect } from "react";
import { updateStyle } from "../../../scripts/updateStyle";
import { GridChild, GridContainer, VisualizerElement } from "../../../types/dashboards";
import { FixMeLater, ObjectStringKeys } from "../../../types/general";
import { ElementModel, StyleChangesModel } from "../../../types/messages";
import { strictMerge } from "../../../utils/helpers";
import { filterAttributes, filterChildrenAttributes, generateVisualizerElements } from "../helpers";
import { supportedChildAttributes, supportedElementAttributes } from "./constants";
import { filterGridAttributes, settingsToCode } from "./helpers";


type GridContainerReturn = [GridContainer, React.Dispatch<React.SetStateAction<GridContainer>>]
type GridChildrenReturn = [VisualizerElement[], React.Dispatch<React.SetStateAction<VisualizerElement[]>>]

function useGridContainer(computedStyles: ObjectStringKeys | null | undefined): GridContainerReturn {
    /* Sends dashboard settings to update DOM element */
    let styles = filterGridAttributes(computedStyles ? computedStyles : {}, supportedElementAttributes);
    const [containerStyles, setContainerStyles] = useState<GridContainer>(styles);
    useEffect(() => {
        let styles = filterGridAttributes(computedStyles ? computedStyles : {}, supportedElementAttributes)
        setContainerStyles(styles);
        console.log("Container changing")
    }, [computedStyles])
    
    return [containerStyles, setContainerStyles]
}

function useGridChildren(childrenComputedStyles: ElementModel[] | undefined): GridChildrenReturn {
    let childrenStyles = filterChildrenAttributes(childrenComputedStyles ? childrenComputedStyles : [], supportedChildAttributes);
    const [children, setChildren] = useState<VisualizerElement[]>(generateVisualizerElements(childrenStyles));
    useEffect(() => {
        let childrenStyles = filterChildrenAttributes(childrenComputedStyles ? childrenComputedStyles : [], supportedChildAttributes);
        setChildren(generateVisualizerElements(childrenStyles));
    }, [childrenComputedStyles])

    return [children, setChildren]
}

export { useGridContainer, useGridChildren };