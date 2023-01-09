import { useState } from "react";
import { Input, InputAdornment, TextField } from "@mui/material";
import Dropdown from "../../../components/Dropdown";
import ColorPicker from "../../../components/ColorPicker";
import StandardLayout from "../../../components/StandardLayout";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PropertyInput from "../../../components/PropertyInput";
import { ReactComponent as TopLeftRadiusIcon } from "./assets/top-left-border-radius.svg"
import { ReactComponent as TopRightRadiusIcon } from "./assets/top-right-border-radius.svg"
import { ReactComponent as BotLeftRadiusIcon } from "./assets/bot-left-border-radius.svg"
import { ReactComponent as BotRightRadiusIcon } from "./assets/bot-right-border-radius.svg"

import { borderAttributes } from "../constants";
import { basicBorderExists, borderRadiusExists, outlineExists, sameRadius } from "../helpers";


export default function BorderSettings({ styles, setAppearanceKey, removeAppearanceKey }) {
    function resetBorder() {
        for (let attribute of borderAttributes) {
            removeAppearanceKey(attribute);
        }
    }

    function setBorderRadius(val) {
        setAppearanceKey("borderTopLeftRadius", val);
        setAppearanceKey("borderTopRightRadius", val);
        setAppearanceKey("borderBottomLeftRadius", val);
        setAppearanceKey("borderBottomRightRadius", val);
    }
    
    function removeBorderRadius() {
        removeAppearanceKey("borderTopLeftRadius");
        removeAppearanceKey("borderTopRightRadius");
        removeAppearanceKey("borderBottomLeftRadius");
        removeAppearanceKey("borderBottomRightRadius");
    }

    return (
        <div className="appearance-container">
            <div className="flex-header category-header">
                <div className="bold" style={{ flex: 1 }}>Border</div>
                <div 
                    className="icon-btn"
                    onClick={resetBorder}
                >
                    <RemoveIcon
                        sx={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>
            {basicBorderExists(styles) && 
                <PropertyInput
                    propertyName="Basic"
                    inputs={
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                            <TextField
                                value={styles?.borderWidth || ""}
                                onChange={(e) => setAppearanceKey("borderWidth", e.target.value)}
                                sx={{ marginRight: "10px", width: "5em" }}
                                label="Width"
                                variant="standard"
                            />
                            <TextField
                                value={styles?.borderStyle || ""}
                                onChange={(e) => setAppearanceKey("borderStyle", e.target.value)}
                                sx={{ marginRight: "10px", width: "5em" }}
                                variant="standard"
                                label="Style"
                            />
                            <TextField
                                value={styles?.borderColor || ""}
                                onChange={(e) => setAppearanceKey("borderColor", e.target.value)}
                                sx={{ marginRight: "10px", width: "8em" }}
                                variant="standard"
                                label="Color"
                                InputProps={{
                                    endAdornment: (
                                        <ColorPicker
                                            color={{ hex: styles?.borderColor }}
                                            setColor={(color) => setAppearanceKey('borderColor', color.hex)}
                                            outerSx={{ display: 'inline-block', marginRight: "10px" }}
                                        >
                                            <div 
                                                className="solid-color-btn" 
                                                style={{ backgroundColor: styles?.borderColor }} 
                                            />
                                        </ColorPicker>
                                    )
                                }}
                            >
                            </TextField>
                        </div>
                    }
                    rightIcons={
                        <div 
                            className="icon-btn"
                            onClick={() => {removeAppearanceKey("borderWidth"); removeAppearanceKey("borderStyle"); removeAppearanceKey("borderColor"); }}
                        >
                            <RemoveIcon
                                sx={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    }
                />

            }
            {borderRadiusExists(styles) && 
                <PropertyInput
                    propertyName="Radius"
                    inputs={
                        sameRadius(styles) ?
                        <TextField
                            value={styles?.borderTopLeftRadius || ""}
                            onChange={(e) => setBorderRadius(e.target.value)}
                            sx={{ marginRight: "10px", width: "5em" }}
                            variant="standard"
                            label="All"
                        /> :
                        <>
                        <TextField
                            value={styles?.borderTopLeftRadius || ""}
                            onChange={(e) => setAppearanceKey("borderTopLeftRadius", e.target.value)}
                            sx={{ marginRight: "10px", minWidth: "7em" }}
                            variant="standard"
                            InputProps={{
                                startAdornment: <TopLeftRadiusIcon sx={{ marginBottom: "10px" }} />
                            }}
                        />
                        <TextField
                            value={styles?.borderTopRightRadius || ""}
                            onChange={(e) => setAppearanceKey("borderTopRightRadius", e.target.value)}
                            sx={{ marginRight: "10px", minWidth: "7em" }}
                            variant="standard"
                            InputProps={{
                                startAdornment: <TopRightRadiusIcon sx={{ marginBottom: "10px" }} />
                            }}
                        />
                        <TextField
                            value={styles?.borderBottomLeftRadius || ""}
                            onChange={(e) => setAppearanceKey("borderBottomLeftRadius", e.target.value)}
                            sx={{ marginRight: "10px", minWidth: "7em" }}
                            variant="standard"
                            InputProps={{
                                startAdornment: <BotLeftRadiusIcon sx={{ marginBottom: "10px" }} />
                            }}
                        />
                        <TextField
                            value={styles?.borderBottomRightRadius || ""}
                            onChange={(e) => setAppearanceKey("borderBottomRightRadius", e.target.value)}
                            sx={{ marginRight: "10px", minWidth: "7em" }}
                            variant="standard"
                            InputProps={{
                                startAdornment: <BotRightRadiusIcon sx={{ marginBottom: "10px" }} />
                            }}
                        />
                        </>
                        
                    }
                    
                    rightIcons={
                        <div 
                            className="icon-btn"
                            onClick={removeBorderRadius}
                        >
                            <RemoveIcon
                                sx={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    }
                />
            }
            {outlineExists(styles) &&
                <PropertyInput
                    propertyName="Outline"
                    inputs={
                        <>
                            <TextField
                                value={styles?.outlineOffset || ""}
                                onChange={(e) => setAppearanceKey("outlineOffset", e.target.value)}
                                sx={{ marginRight: "10px", width: "5em" }}
                                variant="standard"
                                label="Offset"
                            />
                            <TextField
                                value={styles?.outlineWidth || ""}
                                onChange={(e) => setAppearanceKey("outlineWidth", e.target.value)}
                                sx={{ marginRight: "10px", width: "5em" }}
                                variant="standard"
                                label="Width"
                            />
                            <TextField
                                value={styles?.outlineStyle || ""}
                                onChange={(e) => setAppearanceKey("outlineStyle", e.target.value)}
                                sx={{ marginRight: "10px", width: "5em" }}
                                variant="standard"
                                label="Style"
                            />
                            <TextField
                                value={styles?.outlineColor || ""}
                                onChange={(e) => setAppearanceKey("outlineColor", e.target.value)}
                                sx={{ marginRight: "10px", width: "8em" }}
                                variant="standard"
                                label="Color"
                                InputProps={{
                                    endAdornment: (
                                        <ColorPicker
                                            color={{ hex: styles?.outlineColor }}
                                            setColor={(color) => setAppearanceKey('outlineColor', color.hex)}
                                            outerSx={{ display: 'inline-block', marginRight: "10px" }}
                                        >
                                            <div 
                                                className="solid-color-btn" 
                                                style={{ backgroundColor: styles?.outlineColor }} 
                                            />
                                        </ColorPicker>
                                    )
                                }}
                            ></TextField>
                        </>
                    }
                    rightIcons={
                        <div 
                            className="icon-btn"
                            onClick={() => {removeAppearanceKey("outlineWidth"); removeAppearanceKey("outlineStyle"); removeAppearanceKey("outlineColor"); removeAppearanceKey("outlineOffset")}}
                        >
                            <RemoveIcon
                                sx={{ width: '100%', height: '100%' }}
                            />
                        </div>
                    }
                />
            }
        </div>
    );
}