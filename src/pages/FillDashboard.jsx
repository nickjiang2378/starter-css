import { useState } from "react";
import { Input, InputAdornment, TextField } from "@mui/material";

import ColorPicker from "../components/ColorPicker";

export default function FillDashboard() {
    const [fillColor, setFillColor] = useState();
    const [opacity, setOpacity] = useState(1);
    const colorPickerBorder = '1px solid grey';

    console.log(fillColor);
    const handleColorChange = (prop) => (event) => {
        setFillColor({...fillColor, [prop]: event.target.value})
    }

    return (
        <div className="container">
            <div className="category-header bold">Fill</div>
            <div style={{ display: "flex", alignItems: 'center' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <ColorPicker
                        color={{ hex: fillColor?.hex }}
                        setColor={setFillColor}
                        outerSx={{ display: 'inline-block'}}
                    >
                        <div 
                            className="solid-color-btn" 
                            style={{ backgroundColor: fillColor?.hex, border: colorPickerBorder }} 
                        />
                    </ColorPicker>
                    <TextField
                        id="standard-basic" 
                        variant="standard" 
                        value={fillColor?.hex ? fillColor?.hex : "000000"}
                        onChange={handleColorChange("hex")}
                        sx={{ marginLeft: '10px', display: 'inline-block'}}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Input
                        value={opacity}
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
                </div>
            </div>
        </div>

    );
}