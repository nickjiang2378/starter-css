import { useState, useEffect } from "react";
import { updateStyle } from "../../../scripts/updateStyle";
import { compile } from "../../../utils/helpers";
import { createColorObj, hexaToRGBA } from "../../../utils/colors";

function useUpdateBorder({ borderColor, borderColorTransparency, borderStyle, borderWidth, topLeftRadius, topRightRadius, botLeftRadius, botRightRadius }) {
    useEffect(() => {
        let styleChanges = {
            borderTopLeftRadius: null,
            borderBottomLeftRadius: null,
            borderTopRightRadius: null,
            borderBottomRightRadius: null,
            border: null
        };

        let styleColor = borderColor?.hex && borderColorTransparency != null ? hexaToRGBA(borderColor?.hex, +borderColorTransparency): null;
        //console.log(`Style Color: ${styleColor}. Border Color: ${borderColor?.hex}`);
        //styleChanges.border = compile([borderWidth, borderStyle, styleColor])

        styleChanges.borderTopLeftRadius = topLeftRadius;
        styleChanges.borderBottomLeftRadius = botLeftRadius;
        styleChanges.borderTopRightRadius = topRightRadius;
        styleChanges.borderBottomRightRadius = botRightRadius;
        styleChanges.borderWidth = borderWidth;
        styleChanges.borderStyle = borderStyle;
        styleChanges.borderColor = styleColor;

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
            let { hex, transparency } = createColorObj(computedStyles?.borderColor);
            return {
                borderWidth: computedStyles?.borderWidth,
                borderStyle: computedStyles?.borderStyle,
                borderColor: { hex: hex },
                borderColorTransparency: transparency,
                topLeftRadius: computedStyles?.borderTopLeftRadius,
                topRightRadius: computedStyles?.borderTopRightRadius,
                botLeftRadius: computedStyles?.borderBottomLeftRadius,
                botRightRadius: computedStyles?.borderBottomRightRadius,
            }
        })
    }, [computedStyles]);
    //console.log(borderObj);
    
    return [borderObj, setBorderObj]
}


export { useUpdateBorder, useBorderStyles };