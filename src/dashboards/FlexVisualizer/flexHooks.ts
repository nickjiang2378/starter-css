import React, { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { FlexChild, FlexContainer, VisualizerElement } from "../../types/dashboards";
import { ObjectStringKeys } from "../../types/general";
import { filterFlexAttributes, filterFlexChildAttributes } from "./helpers"

function useUpdateFlex(styleChanges: ObjectStringKeys) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChangesCopy: ObjectStringKeys = {
            display: null,
            justifyContent: null,
            alignItems: null,
            flexDirection: null,
            alignContent: null,
            flexWrap: null,
            columnGap: null,
            rowGap: null
        };
        
        for (let prop in styleChanges) {
            styleChangesCopy[prop] = styleChanges[prop];

        }
        updateStyle(styleChangesCopy);

    }, [styleChanges]);
}

type FlexContainerReturn = [FlexContainer, React.Dispatch<React.SetStateAction<FlexContainer>>]
type FlexChildrenReturn = [VisualizerElement[], React.Dispatch<React.SetStateAction<VisualizerElement[]>>]

function useFlexContainer(computedStyles: ObjectStringKeys | null | undefined): FlexContainerReturn {
    /* Sends dashboard settings to update DOM element */
    let styles = filterFlexAttributes(computedStyles ? computedStyles : {});
    const [containerStyles, setContainerStyles] = useState<FlexContainer>(styles);
    useEffect(() => {
        let styles = filterFlexAttributes(computedStyles ? computedStyles : {})
        setContainerStyles(styles);
    }, [computedStyles])
    
    return [containerStyles, setContainerStyles]
}

function useFlexChildren(childrenComputedStyles: ObjectStringKeys[] | undefined): FlexChildrenReturn {
    let childrenStyles = filterFlexChildAttributes(childrenComputedStyles ? childrenComputedStyles : []);
    const [children, setChildren] = useState<VisualizerElement[]>(childrenStyles);
    useEffect(() => {
        let childrenStyles = filterFlexChildAttributes(childrenComputedStyles ? childrenComputedStyles : []);
        setChildren(childrenStyles);
    }, [childrenComputedStyles])

    return [children, setChildren]
}

export { useUpdateFlex, useFlexContainer, useFlexChildren };