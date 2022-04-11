import { useState } from 'react';
import { Popper, Box, Button, ClickAwayListener } from "@mui/material"
import { ChromePicker } from "react-color";
import { styled } from '@mui/material/styles';

export default function ColorPicker({ color, setColor, children, outerSx, ...props }) {
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
    const ColorButton = styled(Button)(({ theme }) => ({
        '&:hover': {
          backgroundColor: null,
        },
    }));

    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
          backgroundColor: null,
          borderColor: null,
          boxShadow: 'none',
        },
        '&:active': {
          boxShadow: 'none',
          backgroundColor: '#0062cc',
          borderColor: '#005cbf',
        },
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    });

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <Box sx={outerSx}>
                <BootstrapButton
                    aria-describedby={id} 
                    onClick={handleClick}
                    {...props}
                >{children}</BootstrapButton>
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