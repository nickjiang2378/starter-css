import { useState } from 'react';
import { Popper, Box, Button, ClickAwayListener } from "@mui/material"
import { ChromePicker } from "react-color";

export default function ColorPicker({ color, setColor, children, outerSx, innerSx, ...props }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box sx={outerSx}>
                <div
                    aria-describedby={id} 
                    onClick={handleClick}
                    style={innerSx}
                >{children}</div>
                <Popper sx={{ zIndex: 1 }} id={id} open={open} anchorEl={anchorEl}>
                    <ChromePicker 
                        color={color} 
                        onChange={setColor}
                        disableAlpha
                    />
                </Popper>
            </Box>
        </ClickAwayListener>
    );
}