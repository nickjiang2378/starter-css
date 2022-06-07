import { useState } from "react";

import { TextField, Input, InputAdornment, ToggleButtonGroup, ToggleButton } from "@mui/material";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

import StandardLayout from "../StandardLayout";
import Dropdown from "../../components/Dropdown";
import ColorPicker from "../../components/ColorPicker";
import { useTextStyleChanges } from "./textHooks";

export default function TextDashboard(elementStyles, computedStyles) {
    const [alignment, setAlignment] = useState();
    const [fontSize, setFontSize] = useState("");
    const [font, setFont] = useState("");
    const [textColor, setTextColor] = useState()
    const [fontStyle, setFontStyle] = useState("");
    const [formats, setFormats] = useState('');
    const [textColorTransparency, setTextColorTransparency] = useState(100);

    useTextStyleChanges({
        alignment: alignment,
        fontSize: fontSize,
        font: font,
        formats: formats,
        textColor: textColor,
        textColorTransparency: textColorTransparency
    });

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
                        shrink="true"
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
                            sx={{ marginLeft: '10px', width: 'calc(6em)'}}
                        />
                    </>
                }
                middle={
                    <Input
                        value={textColorTransparency}
                        onChange={(e) => setTextColorTransparency(e.target.value)}
                        variant="standard"
                        type="number"
                        inputProps={{ min: 0, max: 100 }}
                        sx={{ width: 'calc(3em + 30px)' }}
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