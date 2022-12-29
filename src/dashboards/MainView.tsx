import React, { useEffect, useState } from "react"
import { ToggleButtonGroup, ToggleButton, Button, Snackbar } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import DashboardIcon from '@mui/icons-material/Dashboard';

import Dropdown from "../components/Dropdown";
import AppearanceDashboard from "./AppearanceDashboard/AppearanceDashboard";
import FlexVisualizer from "./FlexVisualizer/FlexVisualizer";
import Code from "../components/Code/Code";
import { findAddedChanges, formatDOMChanges, getDisplayCode, stringifyChanges } from "../utils/helpers";
import { FixMeLater, ObjectStringKeys } from "../types/general";
import { updateStyle } from "../scripts/updateStyle";
import { StyleChangesModel } from "../types/messages";
import { usePrevious } from "../utils/customHooks";
import ChildView from "./ChildView/ChildView";

const settingOptions = ["dashboard", "code"]
const viewOptions = ["Selected Element", "Children"]

type DisplayViewProps = {
    code: StyleChangesModel,
    setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>,
    setting: string,
    view: string
}

// Return an object to show CSS attributes added or changed (but not removed) from the selected element
function useCodeChanges(value: StyleChangesModel) {
    const prevCode: StyleChangesModel = usePrevious(value)
    if (!prevCode) {
      return null;
    } else {
      let changes: ObjectStringKeys = {}
      changes.selectedElementChanges = findAddedChanges(prevCode.selectedElementChanges, value.selectedElementChanges)
      return changes
    }

}

const DisplayView = ({ code, setCode, setting, view }: DisplayViewProps) => {
    const [elementDisplayStyles, allDisplayStyles] = getDisplayCode(code)

    const selectedElementMode = setting === settingOptions[0] && view === viewOptions[0];
    const childrenMode = setting === settingOptions[0] && view === viewOptions[1];
    const codeMode = setting === settingOptions[1];

    return (
        <>
            <div style={{ display: selectedElementMode ? "block" : "none"}}>
                <AppearanceDashboard setCode={setCode} />
            </div>
            <div style={{ display:  childrenMode ? "block" : "none"}}>
                <ChildView setCode={setCode} code={code} />
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarContent, setSnackbarContent] = useState("");

    const handleSetting = (
        event: React.MouseEvent<HTMLElement>,
        newSetting: string,
    ) => {
        if (newSetting !== null) {
            setSetting(newSetting);
        }
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false);
    };

    const codeChanges = useCodeChanges(code)

    // Any changes made to code will update the DOM
    useEffect(() => {
        updateStyle(code);
        console.log(code);
    }, [code])

    // Show changes in snackbar
    useEffect(() => {
        let stringifiedChanges = stringifyChanges(codeChanges?.selectedElementChanges)
        if (stringifiedChanges !== "") {
            setSnackbarOpen(true);
            setSnackbarContent(stringifiedChanges)
        }
    }, [codeChanges])


    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <ToggleButtonGroup
                    value={setting}
                    exclusive
                    size="small"
                    onChange={handleSetting}
                    aria-label="setting"
                >
                    <ToggleButton value="dashboard" aria-label="dashboard-setting" sx={{ }}>
                        <DashboardIcon sx={{ fontSize: "1.5em" }} />
                    </ToggleButton>
                    <ToggleButton value="code" aria-label="code-setting">
                        <CodeIcon sx={{ fontSize: "1.5em" }} />
                    </ToggleButton>
                </ToggleButtonGroup>
                <div style={{ display: "flex", alignItems: "baseline", columnGap: "10px", fontSize: "1em" }}>
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleClose}
                message={snackbarContent}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom"
                }}
                sx={{
                    maxWidth: "50%"
                }}
            />
        </div>
    );
}