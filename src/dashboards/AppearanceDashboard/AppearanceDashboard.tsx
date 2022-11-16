import React, { useState, useContext } from "react"

import AddIcon from '@mui/icons-material/Add';
import { Checkbox, MenuItem, Menu } from "@mui/material";

import "./Appearance.css"
import { SelectedContext } from "../../SelectedContext";
import { useAppearanceStyles } from "./appearanceHooks";
import { FixMeLater, ObjectStringKeys } from "../../types/general";
import { AppearanceStyles } from "../../types/dashboards";
import { defaultValues, borderAttributes, supportedAttributes } from "./constants";
import { attrExists, borderRadiusExists, basicBorderExists } from "./helpers"

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
    return (
        <div className="container">
            <div className="flex-header category-header">
                <div className="bold" style={{ flex: 1 }}>Appearance</div>
            </div>
            <div className="visualizer">
                <div className="visualizer-playground center-div">
                    <div className="appearance-visualizer-box" style={appearanceStyles as ObjectStringKeys}>
                        Selected Element
                    </div>
                </div>
                <div className="appearance-visualizer-settings">
                    <div className="addStyle" onClick={handleClick}>
                        <AddIcon />
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
                            <div className="demoBox" style={{ border: "3px solid #603fef"}}></div>
                        </MenuItem>
                        <MenuItem onClick={() => toggleAttributes(["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"], !borderRadiusExists(appearanceStyles))}>
                            <Checkbox checked={borderRadiusExists(appearanceStyles)} />
                            <div>Curvature</div>
                            <div style={{ flex: 1 }}></div>
                            <div className="demoBox" style={{ borderRadius: "5px" }}></div>
                        </MenuItem>
                        
                    </Menu>
                    {/*<Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<FilledInput />}
                        renderValue={(selected) => "Add Attribute"}
                        variant="filled"
                    >
                        <MenuItem key={"name"} value={"value"}>
                            <Checkbox checked={personName.indexOf("name") > -1} />
                            <ListItemText primary={"name"} />
                        </MenuItem>
                    </Select>*/}
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