import React, { useState } from "react"
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';

import Dropdown from "../components/Dropdown";
import AppearanceDashboard from "./AppearanceDashboard/AppearanceDashboard";
import FlexVisualizer from "./FlexVisualizer/FlexVisualizer";
import Code from "../components/Code/Code";
import { CodeDisplayModel } from "../types/codeDisplay";
import { getDisplayCode } from "../utils/helpers";

const settingOptions = ["dashboard", "code"]
const viewOptions = ["Selected Element", "Children"]

export default function MainView() {
    const [setting, setSetting] = useState(settingOptions[0])
    const [view, setView] = useState(viewOptions[0])
    const [code, setCode] = useState<CodeDisplayModel>({
        selectedElement: {},
        containingElement: {},
        childElements: [],
    })

    const handleSetting = (
        event: React.MouseEvent<HTMLElement>,
        newSetting: string,
    ) => {
        if (newSetting !== null) {
            setSetting(newSetting);
        }
    };

    const Display = () => {
        if (setting === settingOptions[0] && view === viewOptions[0]) {
            return <AppearanceDashboard />
        } else if (setting === settingOptions[0] && view === viewOptions[1]) {
            return <FlexVisualizer setCode={setCode} />
        } else {
            const [elementDisplayStyles, allDisplayStyles] = getDisplayCode(code)
            return <Code element={elementDisplayStyles} all={allDisplayStyles} />
        }
    }

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
            <Display />
        </div>
    );
}