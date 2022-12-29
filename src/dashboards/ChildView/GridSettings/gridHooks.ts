import React, { useState, useEffect } from "react";
import { updateStyle } from "../../../scripts/updateStyle";
import { GridChild, GridContainer, VisualizerElement } from "../../../types/dashboards";
import { FixMeLater, ObjectStringKeys } from "../../../types/general";
import { StyleChangesModel } from "../../../types/messages";
import { strictMerge } from "../../../utils/helpers";
import { filterAttributes, filterChildrenAttributes, generateVisualizerElements } from "../helpers";
import { supportedChildAttributes, supportedElementAttributes } from "./constants";

// Abstract this hook away
function useUpdateFlex(styleChanges: ObjectStringKeys, childChanges: VisualizerElement[], setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChangesReal = styleChanges;

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

    }, [styleChanges, childChanges, setCode]);
}

type GridContainerReturn = [GridContainer, React.Dispatch<React.SetStateAction<GridContainer>>]
type GridChildrenReturn = [VisualizerElement[], React.Dispatch<React.SetStateAction<VisualizerElement[]>>]

function useGridContainer(computedStyles: ObjectStringKeys | null | undefined): GridContainerReturn {
    /* Sends dashboard settings to update DOM element */
    let styles = filterAttributes(computedStyles ? computedStyles : {}, supportedElementAttributes);
    const [containerStyles, setContainerStyles] = useState<GridContainer>(styles);
    useEffect(() => {
        let styles = filterAttributes(computedStyles ? computedStyles : {}, supportedElementAttributes)
        setContainerStyles(styles);
    }, [computedStyles])
    
    return [containerStyles, setContainerStyles]
}

function useGridChildren(childrenComputedStyles: ObjectStringKeys[] | undefined): GridChildrenReturn {
    let childrenStyles = filterChildrenAttributes(childrenComputedStyles ? childrenComputedStyles : [], supportedChildAttributes);
    const [children, setChildren] = useState<VisualizerElement[]>(generateVisualizerElements(childrenStyles));
    useEffect(() => {
        let childrenStyles = filterChildrenAttributes(childrenComputedStyles ? childrenComputedStyles : [], supportedChildAttributes);
        setChildren(generateVisualizerElements(childrenStyles));
    }, [childrenComputedStyles])

    return [children, setChildren]
}

export { useUpdateFlex, useGridContainer, useGridChildren };