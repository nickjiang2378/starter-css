import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";

function useStyleUpdates({ fillColor, opacity }) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChanges = {
            'backgroundColor': null,
            'opacity': null,
        };
        styleChanges['backgroundColor'] = fillColor?.hex;
        styleChanges['opacity'] = opacity;
        //console.log(`Computed Styles - ${computedStyles?.opacity} vs. Dashboard - ${opacity}`);
        // if (computedStyles?.opacity !== opacity || elementStyles?.opacity === opacity) {
        //     styleChanges['opacity'] = opacity;
        // }

        console.log(styleChanges);

        updateStyle(styleChanges);

    }, [fillColor, opacity])
}

function useFillStyles(elementStyles, computedStyles) {
    /* Sends dashboard settings to update DOM element */
    const [fillObj, setFillObj] = useState({
        fillColor: null,
        opacity: null
    });
    useEffect(() => {
        setFillObj((obj) => {
            console.log("Updating fill object");
            let fillObjCopy = {...obj};
            fillObjCopy['fillColor'] = computedStyles?.backgroundColor; // Should check if element styles has this or not - if not, don't include it here. 
            fillObjCopy['opacity'] = computedStyles?.opacity;
            return fillObjCopy;
        })
    }, [computedStyles]);

    return [fillObj, setFillObj]
}

export { useStyleUpdates, useFillStyles };