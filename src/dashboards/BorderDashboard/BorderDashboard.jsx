import { useState } from "react";
import { Input, InputAdornment, TextField } from "@mui/material";
import Dropdown from "../../components/Dropdown";
import ColorPicker from "../../components/ColorPicker";
import StandardLayout from "../StandardLayout";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LineWeightIcon from '@mui/icons-material/LineWeight';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import { ReactComponent as TopLeftRadiusIcon } from "./assets/top-left-border-radius.svg"
import { ReactComponent as TopRightRadiusIcon } from "./assets/top-right-border-radius.svg"
import { ReactComponent as BotLeftRadiusIcon } from "./assets/bot-left-border-radius.svg"
import { ReactComponent as BotRightRadiusIcon } from "./assets/bot-right-border-radius.svg"

import { useUpdateBorder, useBorderStyles } from "./borderHooks";

export default function BorderDashboard({ elementStyles, computedStyles }) {

    const [borderStyles, setBorderStyles] = useBorderStyles(elementStyles, computedStyles);

    const [addBorder, setAddBorder] = useState(false);
    const [advancedRadius, setAdvancedRadius] = useState(false);

    const STYLE_OPTIONS = ['solid', 'dashed']
    const colorPickerBorder = '1px solid grey';
    const setBorderKey = (prop, val) => {
        setBorderStyles((obj) => ({...obj, [prop]: val}));
    }
    const handleColorChange = (prop) => (event) => {
        setBorderKey('borderColor', {...borderStyles?.borderColor, [prop]: event.target.value})
    }
    const resetBorder = () => {
        setBorderKey('borderWidth', '0px');
        setBorderKey('borderStyle', 'none');
    }
    const resetBorderRadius = () => {
        setBorderRadius(borderStyles?.topLeftRadius);
        setAdvancedRadius(false);
    }
    const setBorderRadius = (val) => {
        setBorderKey('topLeftRadius', val)
        setBorderKey('topRightRadius', val)
        setBorderKey('botLeftRadius', val)
        setBorderKey('botRightRadius', val)
    }

    useUpdateBorder(borderStyles);
    console.log(addBorder);

    return (
        <div className="container">
            <div className="flex-header category-header">
                <div className="bold" style={{ flex: 1 }}>Border</div>
                {!addBorder &&
                    <div 
                        className="icon-btn"
                        onClick={() => setAddBorder(true)}
                    >
                        <AddIcon
                            sx={{ width: '100%', height: '100%' }}
                        />
                    </div>
                }
            </div>
            {addBorder &&
                <>
                    <StandardLayout
                        sx={{ marginBottom: '20px' }}
                        begin={
                            <>
                                <LineWeightIcon />
                                <TextField
                                    id="standard-basic" 
                                    variant="standard" 
                                    value={borderStyles?.borderWidth}
                                    onChange={(e) => setBorderKey('borderWidth', e.target.value)}
                                    sx={{ marginLeft: '10px', width: 'calc(6em)', display: 'inline-block'}}
                                />
                            </>
                        }
                        middle={
                            <Dropdown
                                options={STYLE_OPTIONS}
                                displayOption={borderStyles?.borderStyle}
                                setDisplayOption={(style) => setBorderKey('borderStyle', style)}
                            />
                        }
                        endIcon={
                            <div 
                                className="icon-btn"
                                onClick={() => {setAddBorder(false); resetBorder()}}
                                >
                                <RemoveIcon
                                    sx={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        }
                    />
                    <StandardLayout
                        begin={
                            <>
                                <ColorPicker
                                    color={{ hex: borderStyles?.borderColor?.hex }}
                                    setColor={(color) => setBorderKey('borderColor', color)}
                                    outerSx={{ display: 'inline-block'}}
                                >
                                    <div 
                                        className="solid-color-btn" 
                                        style={{ backgroundColor: borderStyles?.borderColor?.hex, border: colorPickerBorder }} 
                                    />
                                </ColorPicker>
                                <TextField
                                    id="standard-basic" 
                                    variant="standard" 
                                    value={borderStyles?.borderColor?.hex ? borderStyles?.borderColor?.hex : "000000"}
                                    onChange={handleColorChange("hex")}
                                    sx={{ marginLeft: '10px', width: 'calc(6em)'}}
                                />
                            </>
                        }
                        middle={
                            <Input
                                value={borderStyles?.borderColorTransparency}
                                onChange={(e) => setBorderKey('borderColorTransparency', e.target.value)}
                                type="number"
                                inputProps={{ min: 0, max: 100 }}
                                sx={{ width: 'calc(3em + 30px)' }}
                                variant="standard"
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
                </>
            }

            <div style={{ marginTop: '20px' }}>
                {advancedRadius 
                    ? <>
                        <StandardLayout
                            sx={{ marginBottom: '20px' }}
                            begin={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TopLeftRadiusIcon />
                                    <TextField
                                        variant="standard"
                                        value={borderStyles?.topLeftRadius}
                                        sx={{ marginLeft: '10px'}}
                                        onChange={(e) => setBorderKey('topLeftRadius', e.target.value)}
                                    />
                                </div>
                            }
                            middle={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TopRightRadiusIcon />
                                    <TextField
                                        variant="standard"
                                        value={borderStyles?.topRightRadius}
                                        sx={{ marginLeft: '10px'}}
                                        onChange={(e) => setBorderKey('topRightRadius', e.target.value)}
                                    />
                                </div>
                            }
                            endIcon={
                                <div
                                    onClick={resetBorderRadius}
                                    className="icon-btn"
                                >
                                    <UnfoldLessIcon
                                        sx={{ width: '100%', height: '100%' }}
                                    />
                                </div>
                            }
                        />
                        <StandardLayout
                            sx={{ marginBottom: '20px' }}
                            begin={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <BotLeftRadiusIcon />
                                    <TextField
                                        variant="standard"
                                        value={borderStyles?.botLeftRadius}
                                        sx={{ marginLeft: '10px'}}
                                        onChange={(e) => setBorderKey('botLeftRadius', e.target.value)}
                                    />
                                </div>
                            }
                            middle={
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <BotRightRadiusIcon />
                                    <TextField
                                        variant="standard"
                                        value={borderStyles?.botRightRadius}
                                        sx={{ marginLeft: '10px'}}
                                        onChange={(e) => setBorderKey('botRightRadius', e.target.value)}
                                    />
                                </div>
                            }
                        />
                    </>
                    : <StandardLayout
                        begin={
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <TopLeftRadiusIcon />
                                <TextField
                                    variant="standard"
                                    value={borderStyles?.topLeftRadius}
                                    sx={{ marginLeft: '10px'}}
                                    onChange={(e) => setBorderRadius(e.target.value)}
                                />
                            </div>
                        }
                        endIcon={
                            <div
                                onClick={() => setAdvancedRadius(true)}
                                className="icon-btn"
                            >
                                <UnfoldMoreIcon
                                    sx={{ width: '100%', height: '100%' }}
                                />
                            </div>
                        }
                    />

                }
            </div>
                
        </div>
    );
}