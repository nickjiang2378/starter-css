import React, { useEffect, useState } from "react"
import { ToggleButtonGroup, ToggleButton, Button } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';

import Dropdown from "../components/Dropdown";
import AppearanceDashboard from "./AppearanceDashboard/AppearanceDashboard";
import FlexVisualizer from "./FlexVisualizer/FlexVisualizer";
import Code from "../components/Code/Code";
import { formatDOMChanges, getDisplayCode } from "../utils/helpers";
import { FixMeLater } from "../types/general";
import { updateStyle } from "../scripts/updateStyle";
import { StyleChangesModel } from "../types/messages";

const settingOptions = ["dashboard", "code"]
const viewOptions = ["Selected Element", "Children"]

const DisplayView = ({ code, setCode, setting, view }: FixMeLater) => {
    const [elementDisplayStyles, allDisplayStyles] = getDisplayCode(code)

    const selectedElementMode = setting === settingOptions[0] && view === viewOptions[0];
    const childrenMode = setting === settingOptions[0] && view === viewOptions[1];
    const codeMode = setting === settingOptions[1];

    console.log(code)
    console.log(elementDisplayStyles)

    return (
        <>
            <div style={{ display: selectedElementMode ? "block" : "none"}}>
                <AppearanceDashboard setCode={setCode} />
            </div>
            <div style={{ display:  childrenMode ? "block" : "none"}}>
                <FlexVisualizer setCode={setCode} />
            </div>
            <div style={{ display: codeMode ? "block" : "none"}}>
                <Code element={elementDisplayStyles} all={allDisplayStyles} />
            </div>
        </>
    )

}

export default function MainView() {
    const [setting, setSetting] = useState(settingOptions[0])
    const [view, setView] = useState(viewOptions[0])
    const [code, setCode] = useState<StyleChangesModel>({
        selectedElementChanges: {},
        containingElementChanges: {},
        childElementChanges: [],
    })

    const handleSetting = (
        event: React.MouseEvent<HTMLElement>,
        newSetting: string,
    ) => {
        if (newSetting !== null) {
            setSetting(newSetting);
        }
    };

    useEffect(() => {
        updateStyle(code);
        console.log("Updating style")
    }, [code])

    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <ToggleButtonGroup
                    value={setting}
                    exclusive
                    onChange={handleSetting}
                    aria-label="setting"
                >
                    <ToggleButton value="dashboard" aria-label="dashboard-setting">
                        <DashboardIcon />
                    </ToggleButton>
                    <ToggleButton value="code" aria-label="code-setting">
                        <CodeIcon />
                    </ToggleButton>
                </ToggleButtonGroup>
                <div style={{ display: "flex", alignItems: "baseline", columnGap: "10px" }}>
                    <span>View:</span>
                    <Dropdown
                        displayOption={view}
                        setDisplayOption={setView}
                        options={["Selected Element", "Children"]}
                    />
                </div>
            </div>
            <DisplayView
                code={code}
                setCode={setCode}
                setting={setting}
                view={view}
            />
        </div>
    );
}