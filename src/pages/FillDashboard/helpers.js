import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";

function useStyleUpdates({ fillColor, opacity }) {
    useEffect(() => {
        let styleChanges = {
            'backgroundColor': null,
            'opacity': null,
        };
        styleChanges['backgroundColor'] = fillColor?.hex;
        styleChanges['opacity'] = opacity;

        updateStyle(styleChanges);

    }, [fillColor, opacity])
}

export { useStyleUpdates };