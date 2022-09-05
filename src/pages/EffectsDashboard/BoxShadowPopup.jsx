import { useState } from "react";
import { ClickAwayListener, Popper, Box, Input, InputAdornment } from "@mui/material";
import TuneIcon from '@mui/icons-material/Tune';
import PropertyInput from "./PropertyInput";
import ColorPicker from "../../components/ColorPicker";

export default function BoxShadowPopup({ effect, setEffectKey }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const colorPickerBorder = '1px solid grey';

    return (
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
            <div>
                <div onClick={handleClick} className="icon-btn">
                    <TuneIcon sx={{ height: "100%", width: "100%" }} />
                </div>
                <Popper sx={{ zIndex: 1 }} id={id} open={open} anchorEl={anchorEl}>
                    <Box sx={{ padding: "30px", boxShadow: 1, bgcolor: 'background.paper' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ColorPicker
                                color={{ hex: effect.color.hex }}
                                setColor={(col) => setEffectKey("color", { hex: col?.hex })}
                            >
                                <div
                                    className="solid-color-btn" 
                                    style={{ backgroundColor: effect.color.hex, border: colorPickerBorder }} 
                                />
                            </ColorPicker>
                            <Input
                                value={effect.color.hex}
                                onChange={(e) => setEffectKey("color", { hex: e.target.value })}
                            />
                            <Input
                                value={effect.color.opacity}
                                onChange={(e) => setEffectKey("opacity", e.target.value)}
                                endAdornment={
                                    <InputAdornment
                                        position="end"
                                    >
                                        %
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}>
                                <span className="property-text">X</span>
                                <Input
                                    value={effect.x}
                                    onChange={(e) => setEffectKey("x", e.target.value)}
                                    type="number"
                                />
                            </div>
                            <div style={{ flex: 1, justifyContent: 'flex-end' }}>
                                <span className="property-text">Y</span>
                                <Input
                                    value={effect.y}
                                    onChange={(e) => setEffectKey("y", e.target.value)}
                                    type="number"
                                />
                            </div>
                        </div>
                        <PropertyInput
                            prop="Spread"
                            renderInput={
                                <Input
                                    value={effect.spread}
                                    onChange={(e) => setEffectKey("spread", e.target.value)}
                                />
                            }
                        />
                        <PropertyInput
                            prop="Blur"
                            renderInput={
                                <Input
                                    value={effect.blur}
                                    onChange={(e) => setEffectKey("blur", e.target.value)}
                                />
                            }
                        />
                    </Box>
                </Popper>
            </div>
        </ClickAwayListener>
    );
}