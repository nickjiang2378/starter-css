import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { filterComputedStyles } from "./helpers"

function useUpdateFlex(styleChanges) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChangesCopy = {
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

function useFlexStyles(computedStyles) {
    /* Sends dashboard settings to update DOM element */
    let styles = filterComputedStyles(computedStyles);
    const [containerStyles, setContainerStyles] = useState(styles);
    useEffect(() => {
        let styles = filterComputedStyles(computedStyles)
        setContainerStyles(styles);
    }, [computedStyles])
    
    return [containerStyles, setContainerStyles]
}

export { useUpdateFlex, useFlexStyles };