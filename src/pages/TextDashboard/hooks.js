import { useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";

function useTextStyleChanges({ formats, alignment, fontSize, font, textColor }) {
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

        styleChanges['textAlign'] = alignment ? alignment: null;
        styleChanges['fontSize'] = fontSize ? fontSize: null;
        styleChanges['fontFamily'] = font ? font : null;
        styleChanges['color'] = textColor?.hex ? textColor?.hex : null;

        updateStyle(styleChanges);
    }, [formats, alignment, fontSize, font, textColor]);
}

export { useTextStyleChanges };