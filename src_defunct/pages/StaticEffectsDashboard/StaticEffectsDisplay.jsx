import { useState } from "react";
import { Box, Menu, MenuItem, IconButton, Tooltip } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextDashboard from "./TextDashboard";
import BackgroundDashboard from "./BackgroundDashboard";
import BorderDashboard from "./BorderDashboard";

export default function StaticEffectsDisplay({ elementStyles, computedStyles }) {
    const settings = {
        "Text": <TextDashboard elementStyles={elementStyles} computedStyles={computedStyles} />,
        "Background": <BackgroundDashboard elementStyles={elementStyles} computedStyles={computedStyles} />,
        "Border": <BorderDashboard />
    }

    const settings_keys = Object.keys(settings);

    const [setting, setSetting] = useState(settings_keys[0]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [viewChanges, setViewChanges] = useState(false);

    const open = Boolean(anchorEl);

    // Changing static dashboard settings
    const handleChangeSetting = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickSetting = (option) => {
        setAnchorEl(null);
        setSetting(option);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    // View changes in CSS
    const toggleView = (view) => {
        setViewChanges(!view);
    }

    return (
        <Box>
            <Box sx={{ margin: "1em 0 1em 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2>
                    {setting}
                </h2>
                <IconButton
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleChangeSetting}
                    sx={{ margin: "0 2px 0 2px" }}
                >
                    <ArrowDropDownIcon />
                </IconButton>
                <Tooltip 
                    title="See changes in CSS"
                    placement="top"
                    onClick={() => toggleView(viewChanges)}
                    arrow
                >
                    <IconButton
                        id="basic-button2"
                        disableRipple={true}
                    >
                        {viewChanges ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                </Tooltip>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    {settings_keys.map((key, index) => {
                        return (
                            <MenuItem 
                                key={index} 
                                onClick={() => handleClickSetting(key)}
                            >
                                {key}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </Box>
            <Box sx={{ margin: '0 5% 0 5%' }}>
                {settings[setting]}
            </Box>
            
        </Box>
    );
}