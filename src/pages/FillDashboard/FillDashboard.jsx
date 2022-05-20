import { useEffect, useState } from "react";
import { Input, InputAdornment, TextField } from "@mui/material";

import ColorPicker from "../../components/ColorPicker";
import StandardLayout from "../StandardLayout";
import { updateStyle } from "../../scripts/updateStyle";
import { useStyleUpdates, useFillStyles } from "./fillHooks";

export default function FillDashboard({ elementStyles, computedStyles }) {
    console.log("Entered Fill Dashboard");
    console.log(computedStyles);
    const [fillStyles, setFillStyles] = useFillStyles(elementStyles, computedStyles);
    /*const [fillStyles, setFillStyles] = useState({
        fillColor: null,
        opacity: 1
    });
    console.log(fillStyles);
    useEffect(() => {
        console.log("Computed Styles updated, triggering rerun of setFillObj")
        console.log(computedStyles);
        console.log(`Background-color: ${computedStyles?.backgroundColor}`);
        setFillStyles((obj) => {
            let fillObjCopy = {...obj};
            fillObjCopy['fillColor'] = computedStyles?.backgroundColor;
            fillObjCopy['opacity'] = computedStyles?.opacity;
            return fillObjCopy;
        })
    }, [elementStyles, computedStyles]);*/

    const setFillKey = (prop) => (val) => {
        setFillStyles((obj) => ({...obj, [prop]: val}));
    }
    const setFillColor = setFillKey('fillColor');
    const setOpacity = setFillKey('opacity');
    //const [fillColor, setFillColor] = useState();
    //const [opacity, setOpacity] = useState(1);
    const colorPickerBorder = '1px solid grey';

    const handleColorChange = (prop) => (event) => {
        setFillColor({...fillStyles?.fillColor, [prop]: event.target.value});
    }

    useStyleUpdates(
        { 
            fillColor: fillStyles?.fillColor, 
            opacity: fillStyles?.opacity 
        },
        elementStyles,
        computedStyles
    );

    return (
        <div className="container">
            <div className="category-header bold">Fill</div>
            <StandardLayout
                begin={
                    <>
                        <ColorPicker
                            color={{ hex: fillStyles?.fillColor?.hex }}
                            setColor={setFillColor}
                            outerSx={{ display: 'inline-block'}}
                        >
                            <div 
                                className="solid-color-btn" 
                                style={{ backgroundColor: fillStyles?.fillColor?.hex, border: colorPickerBorder }} 
                            />
                        </ColorPicker>
                        <TextField
                            id="standard-basic" 
                            variant="standard" 
                            value={fillStyles?.fillColor?.hex ? fillStyles.fillColor?.hex : ""}
                            onChange={handleColorChange("hex")}
                            sx={{ marginLeft: '10px', display: 'inline-block'}}
                        />
                    </>
                }
                middle={
                    <Input
                        value={fillStyles?.opacity}
                        onChange={(e) => setOpacity(e.target.value)}
                        variant="standard"
                        size="small"
                        endAdornment={
                            <InputAdornment
                                position="end"
                            >
                                %
                            </InputAdornment>
                        }
                    />
                }
            />
            
        </div>

    );
}