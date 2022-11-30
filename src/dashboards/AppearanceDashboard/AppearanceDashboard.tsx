import React, { useState, useContext } from "react"

import AddIcon from '@mui/icons-material/Add';
import { Checkbox, MenuItem, Menu } from "@mui/material";

import "./Appearance.css"
import { SelectedContext } from "../../SelectedContext";
import { useAppearanceStyles, useUpdateAppearance } from "./appearanceHooks";
import { FixMeLater, ObjectStringKeys } from "../../types/general";
import { AppearanceStyles } from "../../types/dashboards";
import { defaultValues, borderAttributes, supportedAttributes } from "./constants";
import { attrExists, borderRadiusExists, basicBorderExists, outlineExists } from "./helpers"

import BorderSettings from "./BorderSettings/BorderSettings";

export default function AppearanceDashboard() {
    const { selectedElement } = useContext(SelectedContext);
    const [appearanceStyles, setAppearanceStyles] = useAppearanceStyles(selectedElement?.computedStyles);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    // Helper functions to update appearance styles
    const setAppearanceKey = (prop: string, val: string) => {
        setAppearanceStyles((obj: AppearanceStyles) => ({...obj, [prop]: val}));
    }

    const removeAppearanceKey = (prop: string) => {
        setAppearanceStyles((obj: FixMeLater) => {
            if (prop in obj) { 
                let newObj: ObjectStringKeys = {};
                for (let key of Object.keys(obj)) {
                    if (key !== prop) {
                        newObj[key] = obj[key];
                    }
                }
                return newObj;
            } else {
                return obj;
            }
        });
    }

    const toggleAttributes = (attributes: string[], add: boolean) => {
        if (add) {
            for (let attribute of attributes) {
                if (supportedAttributes.includes(attribute)) {
                    setAppearanceKey(attribute, (defaultValues as ObjectStringKeys)[attribute]);
                } else {
                    console.log(`Unsupported attribute: ${attribute}`);
                }
            }
        } else {
            for (let attribute of attributes) {
                if (supportedAttributes.includes(attribute)) {
                    removeAppearanceKey(attribute);
                } else { 
                    console.log(`Unsupported attribute: ${attribute}`);
                }

            }
        }
    }

    const handleClick = (event: FixMeLater) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    console.log(appearanceStyles);

    // Transmit style changes to the DOM
    useUpdateAppearance(appearanceStyles);

    return (
        <div className="container">
            <div className="flex-header category-header">
                <div className="bold" style={{ flex: 1 }}>Selected Element</div>
            </div>
            <div className="visualizer">
                <div className="visualizer-playground center-div" style={{ position: "static" }}>
                    <div className="appearance-visualizer-box" style={appearanceStyles as ObjectStringKeys}>
                        Selected Element
                    </div>
                </div>
                <div className="appearance-visualizer-settings">
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <div className="addStyle" onClick={handleClick}>
                            <AddIcon />
                            <span>Add Style</span>
                        </div>
                    </div>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                    >
                        <div className="flex-header" style={{ margin: "0px 10px 5px 10px" }}>
                            <div className="bold" style={{ flex: 1 }}>Border</div>
                        </div>
                        <MenuItem onClick={() => toggleAttributes(["borderWidth", "borderStyle", "borderColor"], !basicBorderExists(appearanceStyles))}>
                            <Checkbox checked={basicBorderExists(appearanceStyles)} />
                            <div>Basic</div>
                            <div style={{ flex: 1 }}></div>
                            <div className="demoBox" style={{ border: "3px solid #603fef", backgroundColor: "white" }}></div>
                        </MenuItem>
                        <MenuItem onClick={() => toggleAttributes(["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"], !borderRadiusExists(appearanceStyles))}>
                            <Checkbox checked={borderRadiusExists(appearanceStyles)} />
                            <div>Curvature</div>
                            <div style={{ flex: 1 }}></div>
                            <div className="demoBox" style={{ borderRadius: "5px" }}></div>
                        </MenuItem>
                        <MenuItem onClick={() => toggleAttributes(["outlineWidth", "outlineStyle", "outlineColor", "outlineOffset"], !outlineExists(appearanceStyles))}>
                            <Checkbox checked={outlineExists(appearanceStyles)} />
                            <div>Outline</div>
                            <div style={{ flex: 1 }}></div>
                            <div className="demoBox" style={{ outline: "1px solid #FFA500", outlineOffset: "2px" }}></div>
                        </MenuItem>
                        
                    </Menu>
                    {attrExists(appearanceStyles, borderAttributes) && <BorderSettings
                        styles={appearanceStyles}
                        setAppearanceKey={setAppearanceKey}
                        removeAppearanceKey={removeAppearanceKey}
                    />}
                </div>
            </div>
        </div>
    );
}