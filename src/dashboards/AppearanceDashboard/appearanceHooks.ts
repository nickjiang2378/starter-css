import React, { useState, useEffect } from "react";

import { ObjectStringKeys } from "../../types/general"
import { updateStyle } from "../../scripts/updateStyle";
import { AppearanceStyles } from "../../types/dashboards";
import { filterAppearanceAttributes } from "./helpers";
import { formatDOMChanges } from "../../utils/helpers";
import { supportedAttributes } from "./constants"

type AppearanceHookReturn = [AppearanceStyles, React.Dispatch<React.SetStateAction<AppearanceStyles>>]

function useUpdateAppearance(styleChanges: ObjectStringKeys) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChangesCopy: ObjectStringKeys = {};
        
        for (let prop of supportedAttributes) {
            styleChangesCopy[prop] = prop in styleChanges ? styleChanges[prop] : null
        }

        updateStyle(formatDOMChanges({}, styleChangesCopy, []));

    }, [styleChanges]);
}

function useAppearanceStyles(computedStyles: ObjectStringKeys | null | undefined): AppearanceHookReturn {
    /* Sends dashboard settings to update DOM element */
    let styles = filterAppearanceAttributes(computedStyles ? computedStyles : {}) as AppearanceStyles;
    const [appearanceStyles, setAppearanceStyles] = useState<AppearanceStyles>(styles);
    useEffect(() => {
        let styles = filterAppearanceAttributes(computedStyles ? computedStyles : {}) as AppearanceStyles;
        setAppearanceStyles(styles);
    }, [computedStyles])
    
    return [appearanceStyles, setAppearanceStyles]
}


export { useAppearanceStyles, useUpdateAppearance }