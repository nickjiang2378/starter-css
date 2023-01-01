import React, { useState, useEffect } from "react";
import { updateStyle } from "../../../scripts/updateStyle";
import { GridChild, GridContainer, VisualizerElement } from "../../../types/dashboards";
import { FixMeLater, ObjectStringKeys } from "../../../types/general";
import { ElementModel, StyleChangesModel } from "../../../types/messages";
import { strictMerge } from "../../../utils/helpers";
import { filterAttributes, filterChildrenAttributes, generateVisualizerElements } from "../helpers";
import { supportedChildAttributes, supportedElementAttributes } from "./constants";
import { filterGridAttributes, settingsToCode } from "./helpers";

// Abstract this hook away
function useUpdateGrid(styleChanges: ObjectStringKeys, childChanges: VisualizerElement[], setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChangesReal = settingsToCode(styleChanges) as ObjectStringKeys;

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
            // let currChildren = prevCode.childElementChanges
            // let newChildren: ObjectStringKeys[] = []
            // for (let i = 0; i < childElements.length; i++) {
            //     if (i >= currChildren.length) {
            //         newChildren.push(strictMerge({}, childElements[i], supportedChildAttributes))
            //     } else {
            //         newChildren.push(strictMerge(currChildren[i], childElements[i], supportedChildAttributes))
            //     }
            // }
            
            return {
                ...prevCode,
                selectedElementChanges: strictMerge(prevCode.selectedElementChanges, styleChangesCopy, supportedElementAttributes),
            }
        })

    }, [styleChanges, childChanges, setCode]);
}

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

export { useUpdateGrid, useGridContainer, useGridChildren };