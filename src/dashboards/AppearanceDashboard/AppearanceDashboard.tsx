import React, { useState, useContext } from "react"

import "./Appearance.css"
import { SelectedContext } from "../../SelectedContext";
import { useAppearanceStyles } from "./appearanceHooks";
import { FixMeLater, ObjectStringKeys } from "../../types/general";
import { AppearanceStyles } from "../../types/dashboards";

import BorderSettings from "./BorderSettings/BorderSettings";

export default function AppearanceDashboard() {
    const { selectedElement } = useContext(SelectedContext);
    const [appearanceStyles, setAppearanceStyles] = useAppearanceStyles(selectedElement?.computedStyles);
    
    // Helper functions to update appearance styles
    const setAppearanceKey = (prop: string, val: string) => {
        setAppearanceStyles((obj: AppearanceStyles) => ({...obj, [prop]: val}));
    }

    const removeAppearanceKey = (prop: string) => {
        setAppearanceStyles((obj: FixMeLater) => {if (prop in obj) { delete obj[prop] }; return obj});
    }

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
                <div className="visualizer-settings">
                    <BorderSettings
                        styles={appearanceStyles}
                        setAppearanceKey={setAppearanceKey}
                        removeAppearanceKey={removeAppearanceKey}
                    />
                </div>
            </div>
        </div>
    );
}