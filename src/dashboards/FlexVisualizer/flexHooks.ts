import React, { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { FlexContainer } from "../../types/dashboards";
import { ObjectStringKeys } from "../../types/general";
import { filterFlexAttributes } from "./helpers"

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

type FlexReturn = [FlexContainer, React.Dispatch<React.SetStateAction<FlexContainer>>]

function useFlexStyles(computedStyles: ObjectStringKeys | null | undefined): FlexReturn {
    /* Sends dashboard settings to update DOM element */
    let styles = filterFlexAttributes(computedStyles ? computedStyles : {});
    const [containerStyles, setContainerStyles] = useState(styles);
    useEffect(() => {
        let styles = filterFlexAttributes(computedStyles ? computedStyles : {})
        setContainerStyles(styles);
    }, [computedStyles])
    
    return [containerStyles, setContainerStyles]
}

export { useUpdateFlex, useFlexStyles };