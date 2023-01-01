import React, { useEffect } from "react";
import { VisualizerElement } from "../../types/dashboards";
import { FixMeLater, ObjectStringKeys } from "../../types/general";
import { ElementModel, StyleChangesModel } from "../../types/messages";
import { strictMerge } from "../../utils/helpers";

function isFlexBox(styles: ObjectStringKeys | undefined) {
    if (!styles) {
        return false;
    }
    return styles.display === "flex" || styles.display === "inlineFlex"
}

function isGrid(styles: ObjectStringKeys | undefined) {
    if (!styles) {
        return false;
    }
    return styles.display === "grid" || styles.display === "inlineGrid"
}

function filterAttributes(computedStyles: ObjectStringKeys, attributesOfInterest: string[]) {
    /* Collects only the given attributes from the computed styles*/
    let styles: ObjectStringKeys = {};
    for (let cssAttr of attributesOfInterest) {
        styles[cssAttr] = computedStyles[cssAttr]
    }
    return styles
}

function filterChildrenAttributes(children: ElementModel[], attributesOfInterest: string[]) {
    let childStyles: ObjectStringKeys[] = [];
    for (let child of children) {
        if (child.computedStyles) {
            childStyles.push(filterAttributes(child.computedStyles, attributesOfInterest))
        }
    }
    return childStyles
}

function generateVisualizerElements(codeElements: ObjectStringKeys[]): VisualizerElement[] {
    let elements: VisualizerElement[] = []
    for (let i = 0; i < codeElements.length; i++) {
        elements.push({
            id: `#child${i + 1}`,
            displayName: `Child ${i + 1}`,
            code: codeElements[i]
        })
    }
    return elements;
}

function createSetChildKey(setChildren: React.Dispatch<React.SetStateAction<VisualizerElement[]>>) {
    return (prop: string, val: string, index: number) => {
        setChildren((arr) => {
            let newArr = [...arr]
            let childCode = {...newArr[index].code, [prop]: val}
            newArr[index].code = childCode
            return newArr;
        });
    }
}

// Converts a list of strings to the Option type, useful for Autocomplete inputs
function stringsToOptions(options: string[]) {
    return options.map((option) => {
        return {
            label: option
        }
    })
}

function useUpdateCode(styleChanges: ObjectStringKeys, 
                        childChanges: VisualizerElement[], 
                        setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>,
                        supportedElementAttributes: string[],
                        supportedChildAttributes: string[],
                        settingsToCode: FixMeLater) {
    /* Updates central codebase with dashboard settings */
    useEffect(() => {
        let styleChangesReal = settingsToCode(styleChanges);

        let styleChangesCopy: ObjectStringKeys = {}
        for (let attr of supportedElementAttributes) {
            styleChangesCopy[attr] = (attr in styleChangesReal) ? styleChangesReal[attr] : null
        }
        
        let childElements: ObjectStringKeys[] = [];
        for (let childChange of childChanges) {
            if (childChange.id !== "pseudo") {
                let childStyles: ObjectStringKeys = {};
                for (let prop in supportedChildAttributes) {
                    childStyles[prop] = (prop in childChange.code) ? (childChange.code as ObjectStringKeys)[prop] : null;
                }
                childElements.push(childStyles)
            }
        }

        // Update the central codebase
        setCode((prevCode: StyleChangesModel) => {
            let currChildren = prevCode.childElementChanges
            let newChildren: ObjectStringKeys[] = []
            for (let i = 0; i < childElements.length; i++) {
                if (i >= currChildren.length) { // More children found than in codebase, meaning user just clicked on new element
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

    }, [styleChanges, childChanges, setCode, supportedChildAttributes, supportedElementAttributes, settingsToCode]);
}

// Add pseudo-child
const addChild = (setChildren: React.Dispatch<React.SetStateAction<VisualizerElement[]>>) => () => {
    setChildren((prevChildren) => {
        return [...prevChildren, {
            displayName: `Child ${prevChildren.length + 1}`,
            id: `pseudo`,
            code: {}
        }]
    })
}

// Remove pseudo-child
const removeChild = (setChildren: React.Dispatch<React.SetStateAction<VisualizerElement[]>>, index: number) => {
    setChildren((prevChildren) => {
        const newChildren = [...prevChildren]
        newChildren.splice(index, 1)
        return newChildren;
    })
}


export {
    isFlexBox,
    isGrid,
    filterAttributes,
    filterChildrenAttributes,
    generateVisualizerElements,
    createSetChildKey,
    stringsToOptions,
    useUpdateCode,
    addChild,
    removeChild
}