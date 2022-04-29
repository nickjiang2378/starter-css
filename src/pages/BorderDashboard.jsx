import { useState, useEffect } from "react";
import { Input, InputAdornment, TextField, Container, Stack, Checkbox, Divider } from "@mui/material";
import PropertyInput from "../components/PropertyInput";
import Dropdown from "../components/Dropdown";
import ColorPicker from "../components/ColorPicker";
import StandardLayout from "./StandardLayout";
import { updateStyle } from '../scripts/updateStyle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

export default function BorderDashboard({ elementStyles }) {

    const [borderColor, setBorderColor] = useState();
    const [borderWidth, setBorderWidth] = useState();
    const [borderStyle, setBorderStyle] = useState();
    const [borderRadius, setBorderRadius] = useState();
    const [opacity, setOpacity] = useState(1);

    const [addBorder, setAddBorder] = useState(false);

    const STYLE_OPTIONS = ['solid', 'dashed']
    const colorPickerBorder = '1px solid grey';


    const compile = (attributeList) => {
        let result = '';
        for (let i = 0; i < attributeList.length; i++) {
            let attribute = attributeList[i];
            result += attribute;
            if (attribute && i < attributeList.length - 1) {
                result += ' ';
            }
        }
        return result.trim();
    }

    const handleColorChange = (prop) => (event) => {
        setBorderColor({...borderColor, [prop]: event.target.value})
    }

    useEffect(() => {
        let styleChanges = {
            borderRadius: null,
            border: null,
            shadow: null
        };


        console.log(styleChanges);
        updateStyle(styleChanges);
    }, [borderColor, borderRadius, borderStyle, borderWidth])

    return (
        <div className="container">
            <div className="border-header category-header">
                <div className="bold" style={{ flex: 1 }}>Border</div>
                {!addBorder && 
                    <div 
                        className="icon-btn"
                        onClick={() => setAddBorder(true)}
                    >
                        <AddIcon
                            sx={{ width: '100%', height: '100%' }}
                        />
                    </div>
                }
            </div>
            {addBorder &&
                <>
                    <StandardLayout
                        begin={
                            <>
                                <ColorPicker
                                color={{ hex: borderColor?.hex }}
                                setColor={setBorderColor}
                                outerSx={{ display: 'inline-block'}}
                                >
                                    <div 
                                        className="solid-color-btn" 
                                        style={{ backgroundColor: borderColor?.hex, border: colorPickerBorder }} 
                                    />
                                </ColorPicker>
                                <TextField
                                    id="standard-basic" 
                                    variant="standard" 
                                    value={borderColor?.hex ? borderColor?.hex : "000000"}
                                    onChange={handleColorChange("hex")}
                                    sx={{ marginLeft: '10px', display: 'inline-block'}}
                                />
                            </>
                        }
                        middle={
                            <Input
                                value={opacity}
                                onChange={(e) => setOpacity(e.target.value)}
                                variant="standard"
                                endAdornment={
                                    <InputAdornment
                                        position="end"
                                    >
                                        %
                                    </InputAdornment>
                                }
                            /> 
                        }
                        endIcon={
                            <div 
                                className="icon-btn"
                                onClick={() => setAddBorder(false)}
                                >
                                <RemoveIcon
                                    sx={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        }
                    />
                    <StandardLayout
                        begin={
                            <>
                                <LineWeightIcon />
                                <TextField
                                    id="standard-basic" 
                                    variant="standard" 
                                    value={borderWidth}
                                    onChange={(e) => setBorderWidth(e.target.value)}
                                    sx={{ marginLeft: '10px' }}
                                />
                            </>
                        }
                        middle={
                            <Dropdown
                                options={STYLE_OPTIONS}
                                displayOption={borderStyle}
                                setDisplayOption={setBorderStyle}
                            />
                        }
                    />
                </>
            }
            <div style={{ marginTop: '20px' }}>
                <StandardLayout
                    begin={
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <LineWeightIcon />
                            <TextField
                                variant="standard"
                                value={borderRadius}
                                sx={{ marginLeft: '10px'}}
                                onChange={(e) => setBorderRadius(e.target.value)}
                            />
                        </div>
                    }
                    endIcon={
                        <div className="icon-btn">
                            <UnfoldMoreIcon
                                sx={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    }
                />
            </div>

                
        </div>
    );
}