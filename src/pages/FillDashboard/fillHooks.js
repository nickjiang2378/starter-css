import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { setStyleKey } from "../../utils/helpers";

function useStyleUpdates({ fillColor, opacity }, elementStyles, computedStyles) {
    useEffect(() => {
        let styleChanges = {
            'backgroundColor': null,
            'opacity': null,
        };
        styleChanges['backgroundColor'] = fillColor?.hex;
        console.log(`${computedStyles?.opacity} vs. ${opacity}`);
        if (computedStyles?.opacity !== opacity || elementStyles?.opacity === opacity) {
            styleChanges['opacity'] = opacity;
        }

        updateStyle(styleChanges);

    }, [fillColor, opacity, computedStyles, elementStyles])
}

function useFillStyles(elementStyles, computedStyles) {
    const [fillObj, setFillObj] = useState({
        fillColor: null,
        opacity: null
    });
    console.log(fillObj);
    useEffect(() => {
        console.log("Computed Styles updated, triggering rerun of setFillObj")
        console.log(computedStyles);
        console.log(`Opacity: ${computedStyles?.opacity}`);
        setFillObj((obj) => {
            let fillObjCopy = {...obj};
            fillObjCopy['fillColor'] = computedStyles?.backgroundColor; // Should check if element styles has this or not - if not, don't include it here. 
            fillObjCopy['opacity'] = computedStyles?.opacity;
            return fillObjCopy;
        })
    }, [elementStyles, computedStyles]);

    return [fillObj, setFillObj]
}

export { useStyleUpdates, useFillStyles };