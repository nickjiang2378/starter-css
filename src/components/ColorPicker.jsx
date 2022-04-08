import { useState } from 'react';
import { Popper, Box, ClickAwayListener } from "@mui/material"
import { ChromePicker } from "react-color";

export default function ColorPicker({ color, setColor }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    let styleDiv = {
        'backgroundColor': color ? color.hex : "#000",
        'borderRadius': '2px',
        'width': '20px',
        'height': '20px',
    }
    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box>
                <button
                    aria-describedby={id} 
                    onClick={handleClick}
                    style={styleDiv}
                ></button>
                <Popper id={id} open={open} anchorEl={anchorEl}>
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