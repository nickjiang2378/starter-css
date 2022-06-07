import { useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { hexaToRGBA } from "../../utils/colors";

function useTextStyleChanges({ formats, alignment, fontSize, font, textColor, textColorTransparency }) {
    useEffect(() => {
        let styleChanges = {
            'fontWeight': null,
            'textAlign': null,
            'fontSize': null,
            'fontFamily': null,
            'fontStyle': null,
            'color': null
        };

        if (formats.includes('bold')) {
            styleChanges['fontWeight'] = 700;
        } 
        if (formats.includes('italic')) {
            styleChanges['fontStyle'] = 'italic'
        } 

        let styleColor = textColor?.hex && textColorTransparency != null ? hexaToRGBA(textColor?.hex, +textColorTransparency): null;

        styleChanges['textAlign'] = alignment ? alignment: null;
        styleChanges['fontSize'] = fontSize ? fontSize + "px": null;
        styleChanges['fontFamily'] = font ? font : null;
        styleChanges['color'] = styleColor;

        console.log(styleChanges);

        updateStyle(styleChanges);
    }, [formats, alignment, fontSize, font, textColor, textColorTransparency]);
}

export { useTextStyleChanges };