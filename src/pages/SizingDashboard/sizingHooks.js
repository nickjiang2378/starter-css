import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";

function useUpdateSizing({ width, height, minWidth, minHeight }) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChanges = {
            width: width,
            height: height,
            minWidth: minWidth,
            minHeight: minHeight
        };
        //console.log(`Computed Styles - ${computedStyles?.opacity} vs. Dashboard - ${opacity}`);
        // if (computedStyles?.opacity !== opacity || elementStyles?.opacity === opacity) {
        //     styleChanges['opacity'] = opacity;
        // }

        //console.log(styleChanges);

        updateStyle(styleChanges);

    }, [width, height, minWidth, minHeight])
}

function useSizingStyles(elementStyles, computedStyles) {
    /* Sends dashboard settings to update DOM element */
    const [sizingObj, setSizingObj] = useState({
        width: computedStyles?.width,
        height: computedStyles?.height,
        minWidth: computedStyles?.minWidth,
        minHeight: computedStyles?.minHeight
    });
    useEffect(() => {
        setSizingObj({
            width: computedStyles?.width,
            height: computedStyles?.height,
            minWidth: computedStyles?.minWidth,
            minHeight: computedStyles?.minHeight
        })
    }, [computedStyles]);
    //console.log(fillObj);
    
    return [sizingObj, setSizingObj]
}

export { useSizingStyles, useUpdateSizing };