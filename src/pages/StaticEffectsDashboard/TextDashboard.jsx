import { useState, useEffect } from "react";
import "./StaticEffectsDisplay.css"
import { Box, Button, TextField } from "@mui/material";
import Dropdown from "../../components/Dropdown";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { updateStyle } from "../../scripts/updateStyle";

const FONTS = ["Calibri", "Arial", "Times New Roman"];

export default function TextDashboard({ elementStyles }) {
    console.log("Styles:");
    console.log(elementStyles);
    function getCurrentState(elementStyles) {
        const currentStyleSettings = {
            formats: [],
            alignment: 'left',
            fontSize: '15px',
            font: FONTS[0]
        }
        if (elementStyles) {
            console.log(elementStyles.textAlign);
            if (elementStyles['textStyle'] === 'italic') {
                currentStyleSettings.formats.push('italic');
            }
            currentStyleSettings.fontSize = elementStyles.fontSize ? elementStyles.fontSize : currentStyleSettings.fontSize;
            currentStyleSettings.font = elementStyles.fontFamily ? elementStyles.fontFamily : currentStyleSettings.font;
            currentStyleSettings.alignment = elementStyles.alignment ? elementStyles.alignment : currentStyleSettings.alignment;
        }
        return currentStyleSettings;
    }

    let currentSettings = getCurrentState(elementStyles);

    const [formats, setFormats] = useState(() => currentSettings['formats']);
    const [alignment, setAlignment] = useState(() => currentSettings['alignment']);
    const [fontSize, setFontSize] = useState(currentSettings['fontSize']);
    const [font, setFont] = useState(currentSettings['font']);

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
        let styleChanges = {};
        if (formats.includes('bold')) styleChanges['fontWeight'] = 700;
        if (formats.includes('italic')) styleChanges['fontStyle'] = 'italic';
        styleChanges['textAlign'] = alignment;
        styleChanges['fontSize'] = fontSize;
        styleChanges['fontFamily'] = font;

        console.log(styleChanges);
        updateStyle(styleChanges);
    }, [formats, alignment, fontSize, font])


    return (
        <Box>
            <Box sx={{ display: "flex", marginBottom: "20px", justifyContent: "center" }}>
                <ToggleButtonGroup
                    value={formats}
                    onChange={changeFormat}
                    aria-label="text formatting"
                >
                    <ToggleButton 
                        disableRipple={true}
                        value="bold" 
                        aria-label="bold"
                    >
                        <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton 
                        disableRipple={true}
                        value="italic" 
                        aria-label="italic"
                    >
                        <FormatItalicIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button
                    size="large"
                    variant="outlined"
                >
                    <FormatColorTextIcon />
                </Button>
                <ToggleButtonGroup
                    value={alignment}
                    onChange={changeAlignment}
                    size="small"
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
                    options={FONTS} 
                    defaultIndex={1}
                    displayOption={font}
                    setDisplayOption={setFont}
                />
                <TextField 
                    label="Font Size" 
                    variant="outlined" 
                    value={fontSize}
                    onChange={changeFontSize}
                />
            </Box>
        </Box>
    );
}