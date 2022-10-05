import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";

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
            columnGap: null
        };
        for (let prop in styleChanges) {
            styleChangesCopy[prop] = styleChanges[prop];
        }
        updateStyle(styleChangesCopy);

    }, [styleChanges]);
}

function useFlexStyles(elementStyles, computedStyles) {
    /* Sends dashboard settings to update DOM element */
    let styles = {};
    if (computedStyles?.display === "flex") {
        styles = {
            display: "flex",
            justifyContent: computedStyles?.justifyContent,
            alignItems: computedStyles?.alignItems,
            flexDirection: computedStyles?.flexDirection,
            alignContent: computedStyles?.alignContent,
            flexWrap: computedStyles?.flexWrap,
            columnGap: computedStyles?.columnGap
        };
    }
    const [containerStyles, setContainerStyles] = useState(styles);
    useEffect(() => {
        let styles = {};
        if (computedStyles?.display === "flex") {
            styles = {
                display: "flex",
                justifyContent: computedStyles?.justifyContent,
                alignItems: computedStyles?.alignItems,
                flexDirection: computedStyles?.flexDirection,
                alignContent: computedStyles?.alignContent,
                flexWrap: computedStyles?.flexWrap,
                columnGap: computedStyles?.columnGap
            };
        }
        setContainerStyles(styles);
    }, [computedStyles])
    
    return [containerStyles, setContainerStyles]
}

export { useUpdateFlex, useFlexStyles };