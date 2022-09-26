import { useState, useEffect } from "react";
import { updateStyle } from "../../scripts/updateStyle";
import { camelCase } from "../../utils/helpers";

function useUpdateFlex(styleChanges) {
    /* Updates dashboard settings with computed styles */
    useEffect(() => {
        let styleChangesCopy = {};
        for (let prop in styleChanges) {
            styleChangesCopy[prop] = camelCase(styleChanges[prop]);
        }
        updateStyle(styleChangesCopy);

    }, [styleChanges])
}

function useFlexStyles(elementStyles, computedStyles) {
    /* Sends dashboard settings to update DOM element */
    const [containerStyles, setContainerStyles] = useState({
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        alignContent: "normal",
        flexWrap: "nowrap",
        columnGap: "0px",
    });
    /*useEffect(() => {
        setFillObj({
            fillColor: { hex: hex },
            transparency: transparency
        })
    }, [computedStyles]);*/
    //console.log(fillObj);
    
    return [containerStyles, setContainerStyles]
}

export { useUpdateFlex, useFlexStyles };