import { useState } from "react";

import { TextField, Input, InputAdornment, ToggleButtonGroup, ToggleButton } from "@mui/material";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

import StandardLayout from "./StandardLayout";
import Dropdown from "../components/Dropdown";
import ColorPicker from "../components/ColorPicker";

export default function TextDashboard() {
    const [alignment, setAlignment] = useState();
    const [fontSize, setFontSize] = useState("5");
    const [font, setFont] = useState("");
    const [textColor, setTextColor] = useState()
    const [fontStyle, setFontStyle] = useState("");
    const [formats, setFormats] = useState('');
    const [opacity, setOpacity] = useState("100");

    const possibleFontStyles = [
        { style: "italicized", action: () => setFontStyle('italic') }
    ];
    const fonts = ["Calibri"];
    const colorPickerBorder = '1px solid grey';

    const changeAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const changeFormat = (event, newFormats) => {
        console.log(newFormats);
        setFormats(newFormats);
    };

    const changeFontSize = (event) => {
        setFontSize(event.target.value);
    }

    const handleColorChange = (prop) => (event) => {
        setTextColor({...textColor, [prop]: event.target.value})
    }

    return (
        <div className="container">
            <div className="category-header bold">
                Text
            </div>
            <StandardLayout
                begin={
                    <Dropdown
                        title="Font"
                        options={fonts}
                        defaultIndex={1}
                        displayOption={font}
                        setDisplayOption={setFont}
                    />
                }
                middle={
                    <Input
                        label="Font Size"
                        value={fontSize}
                        shrink
                        variant="standard"
                        onChange={changeFontSize}
                        endAdornment={<InputAdornment position="end">px</InputAdornment>}
                        sx={{ width: `calc(${fontSize.length}em + 50px)`, maxWidth: "7em" }}
                    /> 
                }
            />
            <StandardLayout
                begin={
                    <ToggleButtonGroup
                        value={formats}
                        onChange={changeFormat}
                        aria-label="text formatting"
                    >
                        <ToggleButton 
                            disableRipple
                            value="bold" 
                            aria-label="bold">
                            <FormatBoldIcon />
                        </ToggleButton>
                        <ToggleButton 
                            disableRipple
                            value="italic" 
                            aria-label="italic">
                            <FormatItalicIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                }
                middle={
                    <ToggleButtonGroup
                        value={alignment}
                        onChange={changeAlignment}
                        size="small"
                        sx={{ alignSelf: 'stretch' }}
                        exclusive
                    >
                        <ToggleButton variant="text" disableRipple value="left" key="left">
                            <FormatAlignLeftIcon />
                        </ToggleButton>
                        <ToggleButton variant="text" disableRipple value="center" key="center">
                            <FormatAlignCenterIcon />
                        </ToggleButton>
                        <ToggleButton variant="text" disableRipple value="right" key="right">
                            <FormatAlignRightIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                }
                sx={{ marginTop: '20px', marginBottom: '20px' }}
            />
            <StandardLayout
                begin={
                    <>
                        <ColorPicker
                            color={{ hex: textColor?.hex }}
                            setColor={setTextColor}
                            outerSx={{ display: 'inline-block'}}
                        >
                            <div 
                                className="solid-color-btn" 
                                style={{ backgroundColor: textColor?.hex, border: colorPickerBorder }} 
                            />
                        </ColorPicker>
                        <TextField
                            id="standard-basic" 
                            variant="standard" 
                            value={textColor?.hex ? textColor?.hex : "000000"}
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
                        sx={{ width: `calc(${opacity.length}em + 50px)`, maxWidth: "4em" }}
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
    )
}