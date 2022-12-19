import React, { useState, useEffect } from "react";

import { FixMeLater, ObjectStringKeys } from "../../types/general"
import { updateStyle } from "../../scripts/updateStyle";
import { AppearanceStyles } from "../../types/dashboards";
import { filterAppearanceAttributes } from "./helpers";
import { formatDOMChanges, strictMerge } from "../../utils/helpers";
import { supportedAttributes } from "./constants"
import { StyleChangesModel } from "../../types/messages";

type AppearanceHookReturn = [AppearanceStyles, React.Dispatch<React.SetStateAction<AppearanceStyles>>]

function useUpdateAppearance(styleChanges: ObjectStringKeys, setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChangesCopy: ObjectStringKeys = {};
        
        for (let prop of supportedAttributes) {
            styleChangesCopy[prop] = prop in styleChanges ? styleChanges[prop] : null
        }

        //updateStyle(formatDOMChanges({}, styleChangesCopy, []));
        setCode((prevCode: StyleChangesModel) => {
            return {
                ...prevCode,
                selectedElementChanges: strictMerge(prevCode.selectedElementChanges, styleChangesCopy, supportedAttributes)
            }
        })

    }, [styleChanges, setCode]);
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