import { useState } from "react";
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
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

export default function TextDashboard() {
    const [formats, setFormats] = useState(() => ['bold', 'italic']);
    const [alignment, setAlignment] = useState(() => "left");
    const [fontSize, setFontSize] = useState("15px");

    const changeFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const changeAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const changeFontSize = (event) => {
        setFontSize(event.target.value);
    }

    const fonts = ["Calibri", "Arial", "Times New Roman"]

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                    <ToggleButton disableRipple={true} value="justify" key="justify">
                        <FormatAlignJustifyIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Dropdown title="Font" options={fonts} defaultIndex={1} />
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