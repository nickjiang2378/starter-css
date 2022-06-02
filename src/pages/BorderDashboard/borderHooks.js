import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { compile } from "../../utils/helpers";
import { createColorObj, hexaToRGBA } from "../../utils/colors";

function useUpdateBorder({ borderColor, borderColorTransparency, borderStyle, borderWidth, topLeftRadius, topRightRadius, botLeftRadius, botRightRadius }) {
    useEffect(() => {
        let styleChanges = {
            borderTopLeftRadius: null,
            borderBottomLeftRadius: null,
            borderTopRightRadius: null,
            borderBottomRightRadius: null,
            borderColor: null,
            borderStyle: null,
            borderWidth: null,
        };

        styleChanges.borderTopLeftRadius = topLeftRadius;
        styleChanges.borderBottomLeftRadius = botLeftRadius;
        styleChanges.borderTopRightRadius = topRightRadius;
        styleChanges.borderBottomRightRadius = botRightRadius;
        styleChanges.borderColor = borderColor?.hex && borderColorTransparency != null ? hexaToRGBA(borderColor?.hex, borderColorTransparency): null;
        styleChanges.borderStyle = borderStyle;
        styleChanges.borderWidth = borderWidth;

        //console.log(styleChanges);
        updateStyle(styleChanges);
    }, [ borderColor, borderColorTransparency, borderStyle, borderWidth, topLeftRadius, topRightRadius, botLeftRadius, botRightRadius ]);
}

function useBorderStyles(elementStyles, computedStyles) {
    /* Sends dashboard settings to update DOM element */
    let { hex, transparency } = createColorObj(computedStyles?.borderColor);
    const [borderObj, setBorderObj] = useState({
        borderWidth: computedStyles?.borderWidth,
        borderStyle: computedStyles?.borderStyle,
        borderColor: { hex: hex },
        borderColorTransparency: transparency,
        topLeftRadius: computedStyles?.borderTopLeftRadius,
        topRightRadius: computedStyles?.borderTopRightRadius,
        botLeftRadius: computedStyles?.borderBottomLeftRadius,
        botRightRadius: computedStyles?.borderBottomRightRadius,
    });
    useEffect(() => {
        setBorderObj((obj) => {
            return {
                borderWidth: computedStyles?.borderWidth,
                borderStyle: computedStyles?.borderStyle,
                borderColor: computedStyles?.borderColor,
                topLeftRadius: computedStyles?.borderTopLeftRadius,
                topRightRadius: computedStyles?.borderTopRightRadius,
                botLeftRadius: computedStyles?.borderBottomLeftRadius,
                botRightRadius: computedStyles?.borderBottomRightRadius,
            }
        })
    }, [computedStyles]);
    console.log(borderObj);
    
    return [borderObj, setBorderObj]
}


export { useUpdateBorder, useBorderStyles };