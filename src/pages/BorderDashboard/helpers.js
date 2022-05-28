import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { compile } from "../../utils/helpers";

function useBorderStyleUpdates({ borderColor, borderRadius, borderStyle, borderWidth }) {
    useEffect(() => {
        let styleChanges = {
            borderRadius: null,
            border: null,
        };

        styleChanges.borderRadius = borderRadius;
        styleChanges.border = compile([borderWidth, borderStyle, borderColor?.hex])

        //console.log(styleChanges);
        updateStyle(styleChanges);
    }, [borderColor, borderRadius, borderStyle, borderWidth]);
}


export { useBorderStyleUpdates };