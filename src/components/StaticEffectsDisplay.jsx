import { useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";


const SETTINGS = {
    "Text": null,
    "Background": null
}

const SETTINGS_KEYS = Object.keys(SETTINGS);

export default function StaticEffectsDisplay() {
    const [setting, setSetting] = useState(SETTINGS_KEYS[0]);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleChangeSetting = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickSetting = (option) => {
        console.log(option);
        console.log("closing")
        setAnchorEl(null);
        setSetting(option);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }
    console.log(SETTINGS_KEYS)

    return (
        <Box>
            <Box sx={{ margin: "1em 0 1em 0", display: "flex", justifyContent: "center", alignItems: "baseline" }}>
                <Box>
                    {setting}
                </Box>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleChangeSetting}
                >
                    Change
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    {SETTINGS_KEYS.map((key, index) => {
                        return <MenuItem key={index} onClick={() => handleClickSetting(key)}>{key}</MenuItem>
                    })}
                </Menu>
            </Box>
            
        </Box>
    );
}