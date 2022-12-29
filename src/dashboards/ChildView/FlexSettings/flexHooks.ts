import React, { useState, useEffect } from "react";
import { updateStyle } from "../../../scripts/updateStyle";
import { FlexChild, FlexContainer, VisualizerElement, VisualizerFlexChild } from "../../../types/dashboards";
import { FixMeLater, ObjectStringKeys } from "../../../types/general";
import { StyleChangesModel } from "../../../types/messages";
import { strictMerge } from "../../../utils/helpers";
import { supportedChildAttributes, supportedElementAttributes } from "./constants";
import { filterFlexAttributes, filterFlexChildAttributes, formatDOMChanges, settingsToCode } from "./helpers"

function useUpdateFlex(styleChanges: ObjectStringKeys, childChanges: VisualizerFlexChild[], setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChangesReal = settingsToCode(styleChanges);

        let styleChangesCopy: ObjectStringKeys = {}
        for (let attr of supportedElementAttributes) {
            styleChangesCopy[attr] = null
        }
        
        for (let prop in styleChangesReal) {
            styleChangesCopy[prop] = styleChangesReal[prop];
        }
        let childElements: ObjectStringKeys[] = [];
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

        // Update the central codebase
        setCode((prevCode: StyleChangesModel) => {
            let currChildren = prevCode.childElementChanges
            let newChildren: ObjectStringKeys[] = []
            for (let i = 0; i < childElements.length; i++) {
                if (i >= currChildren.length) {
                    newChildren.push(strictMerge({}, childElements[i], supportedChildAttributes))
                } else {
                    newChildren.push(strictMerge(currChildren[i], childElements[i], supportedChildAttributes))
                }
            }
            
            return {
                ...prevCode,
                selectedElementChanges: strictMerge(prevCode.selectedElementChanges, styleChangesCopy, supportedElementAttributes),
                childElementChanges: newChildren
            }
        })

        //updateStyle(formatDOMChanges({}, styleChangesCopy, childElements));

    }, [styleChanges, childChanges, setCode]);
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