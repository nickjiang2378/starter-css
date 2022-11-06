import React, { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { FlexChild, FlexContainer, VisualizerElement, VisualizerFlexChild } from "../../types/dashboards";
import { FixMeLater, ObjectStringKeys } from "../../types/general";
import { filterFlexAttributes, filterFlexChildAttributes, formatDOMChanges } from "./helpers"

function useUpdateFlex(styleChanges: ObjectStringKeys, childChanges: VisualizerFlexChild[]) {
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
        let childElements = [];
        for (let childChange of childChanges) {
            let childStyles: ObjectStringKeys = {
                alignSelf: null,
                flex: null
            };
            for (let prop in childStyles) {
                childStyles[prop] = (childChange.code as ObjectStringKeys)[prop];
            }
            childElements.push(childStyles)
        }

        updateStyle(formatDOMChanges({}, styleChangesCopy, childElements));

    }, [styleChanges, childChanges]);
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