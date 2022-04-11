import { useState, useEffect } from "react";
import "./StaticEffectsDisplay.css"
import { Box, Button, TextField, InputAdornment } from "@mui/material";
import Dropdown from "../../components/Dropdown";
import ColorPicker from "../../components/ColorPicker";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { updateStyle } from "../../scripts/updateStyle";

let fonts = [];
let alignmentOptions = ['left', 'center', 'right']

export default function TextDashboard({ elementStyles, computedStyles }) {
    console.log("Element Styles: ");
    console.log(elementStyles);
    console.log("Computed Styles: ");
    console.log(computedStyles);

    const [formats, setFormats] = useState([]);
    const [alignment, setAlignment] = useState();
    const [fontSize, setFontSize] = useState();
    const [font, setFont] = useState("");
    const [textColor, setTextColor] = useState()
    
    function updateCurrentState(elementStyles, computedStyles) {
        let fontFamily = computedStyles?.fontFamily.replace(/,\s+/g, ',').split(',');
        fonts = fontFamily ? fontFamily : [];
        const currentStyleSettings = {
            formats: [],
            alignment: alignmentOptions.includes(computedStyles?.textAlign) ? computedStyles?.textAlign : null,
            fontSize: computedStyles?.fontSize,
            font: fonts.length > 0 ? fonts[0] : "",
            color: computedStyles?.color
        }

        if (computedStyles?.textStyle === 'italic') {
            currentStyleSettings.formats.push('italic');
        }

        if (computedStyles?.fontWeight >= 700) {
            currentStyleSettings.formats.push('bold');
        }
        setFormats(currentStyleSettings.formats);
        setAlignment(currentStyleSettings.alignment);
        setFontSize(currentStyleSettings.fontSize);
        setFont(currentStyleSettings.font);
        setTextColor(currentStyleSettings.color);

        return currentStyleSettings;
    }

    const changeFormat = (event, newFormats) => {
        console.log(newFormats);
        setFormats(newFormats);
    };

    const changeAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const changeFontSize = (event) => {
        setFontSize(event.target.value);
    }
    useEffect(() => {
        updateCurrentState(elementStyles, computedStyles);
    }, [elementStyles, computedStyles])

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

        styleChanges['textAlign'] = alignment;
        styleChanges['fontSize'] = fontSize;
        styleChanges['fontFamily'] = font;
        styleChanges['color'] = textColor;

        console.log(styleChanges);
        updateStyle(styleChanges);
    }, [formats, alignment, fontSize, font, textColor])


    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', marginBottom: '3%' }}>
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
                <ColorPicker 
                    color={textColor} 
                    setColor={setTextColor}
                    disableRipple
                    disableElevation
                    variant="outlined"
                    outerSx={{ margin: '0 10px 0 10px', alignSelf: 'stretch' }}
                    sx={{ height: '100%' }}
                >
                    <FormatColorTextIcon sx={{ color: textColor?.hex }} />
                </ColorPicker>
                <ToggleButtonGroup
                    value={alignment}
                    onChange={changeAlignment}
                    size="small"
                    sx={{ alignSelf: 'stretch' }}
                    exclusive
                >
                    <ToggleButton disableRipple={true} value="left" key="left">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton disableRipple={true} value="center" key="center">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton disableRipple={true} value="right" key="right">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Dropdown 
                    title="Font" 
                    options={fonts} 
                    defaultIndex={1}
                    displayOption={font}
                    setDisplayOption={setFont}
                />
                <TextField 
                    label="Font Size"
                    variant="outlined"
                    value={fontSize}
                    onChange={changeFontSize}
                    endAdornment={<InputAdornment position="end">px</InputAdornment>}
                    InputLabelProps={{ shrink: true }}
                />
            </Box>
        </Box>
    );
}