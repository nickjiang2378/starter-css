import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { compile } from "../../utils/helpers";

function useEffectsStyleUpdates({ effects }) {
    useEffect(() => {
        let styleChanges = {
            boxShadow: null,
        };

        // Handle box shadows
        let boxShadowArr = [];
        for (let effect of effects) {
            if (effect.type === "Box Shadow") {
                boxShadowArr.push(compile([
                    effect.x,
                    effect.y,
                    effect.blur,
                    effect.spread,
                    effect.color.hex
                ]));
            }
        }

        styleChanges.boxShadow = boxShadowArr.join(", ") ? boxShadowArr.join(", ") : null;

        console.log(styleChanges);
        updateStyle(styleChanges);
    }, [effects]);
}

export { useEffectsStyleUpdates };