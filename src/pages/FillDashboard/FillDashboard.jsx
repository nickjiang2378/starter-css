import { useEffect, useState } from "react";
import { Input, InputAdornment, TextField } from "@mui/material";

import ColorPicker from "../../components/ColorPicker";
import StandardLayout from "../StandardLayout";
import { useUpdateFill, useFillStyles } from "./fillHooks";

export default function FillDashboard({ elementStyles, computedStyles }) {
    const [fillStyles, setFillStyles] = useFillStyles(elementStyles, computedStyles);

    const setFillKey = (prop) => (val) => {
        setFillStyles((obj) => ({...obj, [prop]: val}));
    }
    const setFillColor = setFillKey('fillColor');
    const setTransparency = setFillKey('transparency');
    const colorPickerBorder = '1px solid grey';

    const handleColorChange = (prop) => (event) => {
        setFillColor({...fillStyles?.fillColor, [prop]: event.target.value});
    }

    useUpdateFill(
        { 
            fillColor: fillStyles?.fillColor, 
            transparency: fillStyles?.transparency
        }
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
                            sx={{ marginLeft: '10px', width: 'calc(6em)', display: 'inline-block'}}
                        />
                    </>
                }
                middle={
                    <Input
                        value={fillStyles?.transparency}
                        onChange={(e) => setTransparency(e.target.value)}
                        variant="standard"
                        size="small"
                        type="number"
                        sx={{ width: 'calc(2em + 30px)' }}
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