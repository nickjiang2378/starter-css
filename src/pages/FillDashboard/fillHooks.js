import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { createColorObj, hexaToRGBA } from "../../utils/colors";

function useUpdateFill({ fillColor, transparency }) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChanges = {
            'backgroundColor': null,
        };
        styleChanges['backgroundColor'] = fillColor?.hex && transparency != null ? hexaToRGBA(fillColor?.hex, +transparency) : null;
        //console.log(`Computed Styles - ${computedStyles?.opacity} vs. Dashboard - ${opacity}`);
        // if (computedStyles?.opacity !== opacity || elementStyles?.opacity === opacity) {
        //     styleChanges['opacity'] = opacity;
        // }

        console.log(styleChanges);

        updateStyle(styleChanges);

    }, [fillColor, transparency])
}

function useFillStyles(elementStyles, computedStyles) {
    /* Sends dashboard settings to update DOM element */
    let { hex, transparency } = createColorObj(computedStyles?.backgroundColor);
    const [fillObj, setFillObj] = useState({
        fillColor: { hex: hex },
        transparency: transparency
    });
    useEffect(() => {
        setFillObj((obj) => {
            let { hex, transparency } = createColorObj(computedStyles?.backgroundColor);
            return {
                fillColor: { hex: hex },
                transparency: transparency
            }
        })
    }, [computedStyles]);
    console.log(fillObj);
    
    return [fillObj, setFillObj]
}

export { useUpdateFill, useFillStyles };