import React, { useState, useEffect } from "react";

import { ObjectStringKeys } from "../../types/general"
import { AppearanceStyles } from "../../types/dashboards";
import { filterAppearanceAttributes } from "./helpers";

type AppearanceHookReturn = [AppearanceStyles, React.Dispatch<React.SetStateAction<AppearanceStyles>>]

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

export { useAppearanceStyles }