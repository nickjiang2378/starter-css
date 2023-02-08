import React, { useEffect, useState } from "react"
import { ToggleButtonGroup, ToggleButton, Button, Snackbar, IconButton, Stack, Checkbox, autocompleteClasses, Tooltip } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import CloseIcon from '@mui/icons-material/Close'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';

import Dropdown from "../components/Dropdown";
import AppearanceDashboard from "./AppearanceDashboard/AppearanceDashboard";
import FlexVisualizer from "./ChildView/FlexSettings/FlexVisualizer";
import Code from "../components/Code/Code";
import { findAddedChanges, formatDOMChanges, getDisplayCode, stringifyChanges } from "../utils/helpers";
import { FixMeLater, ObjectStringKeys } from "../types/general";
import { updateStyle } from "../scripts/updateStyle";
import { StyleChangesModel } from "../types/messages";
import { usePrevious } from "../utils/customHooks";
import ChildView from "./ChildView/ChildView";

const settingOptions = ["dashboard", "code", "settings"]
const viewOptions = ["Selected Element", "Children"]

type DisplayViewProps = {
    code: StyleChangesModel,
    setCode: React.Dispatch<React.SetStateAction<StyleChangesModel>>,
    setting: string,
    updateSnackbar: (msg: string) => void,
    view: string,
    snackbarSetting: boolean,
    setSnackbarSetting: React.Dispatch<React.SetStateAction<boolean>>,
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

const DisplayView = ({ code, setCode, setting, updateSnackbar, view, snackbarSetting, setSnackbarSetting }: DisplayViewProps) => {
    const [elementDisplayStyles, allDisplayStyles] = getDisplayCode(code)

    const selectedElementMode = setting === settingOptions[0] && view === viewOptions[0];
    const childrenMode = setting === settingOptions[0] && view === viewOptions[1];
    const codeMode = setting === settingOptions[1];
    const settingsMode = setting === settingOptions[2];

    return (
        <>
            <div style={{ display: selectedElementMode ? "block" : "none"}}>
                <AppearanceDashboard setCode={setCode} />
            </div>
            <div style={{ display:  childrenMode ? "block" : "none"}}>
                <ChildView setCode={setCode} />
            </div>
            <div style={{ display: codeMode ? "block" : "none"}}>
                <Code element={elementDisplayStyles} all={allDisplayStyles} updateSnackbar={updateSnackbar} />
            </div>
            <div style={{ display: settingsMode ? "block" : "none"}}>
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <div>Snackbar Visible</div>
                    <Checkbox
                        checked={snackbarSetting}
                        onChange={() => setSnackbarSetting(!snackbarSetting)}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </Stack>
            </div>
        </>
    )

}

const updateSnackbarTemplate = (setSnackbarOpen: FixMeLater, setSnackbarContent: FixMeLater) => (msg: string) => {
    setSnackbarOpen(true);
    setSnackbarContent(msg);
}

export default function MainView() {
    const [setting, setSetting] = useState(settingOptions[0])
    const [view, setView] = useState(viewOptions[1])
    const [code, setCode] = useState<StyleChangesModel>({
        selectedElementChanges: {},
        containingElementChanges: {},
        childElementChanges: [],
    })
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSetting, setSnackbarSetting] = useState(true);
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

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );

    const codeChanges = useCodeChanges(code)
    // const codeChanges: FixMeLater = {}
    const updateSnackbar = updateSnackbarTemplate(setSnackbarOpen, setSnackbarContent)

    // Any changes made to code will update the DOM
    useEffect(() => {
        updateStyle(code);
        console.log(code);
    }, [code])

    // Show changes in snackbar
    useEffect(() => {
        let changes: ObjectStringKeys = codeChanges?.selectedElementChanges || {};
        let stringifiedChanges = "";
        if (Object.keys(changes).length > 1) {
            stringifiedChanges = stringifyChanges({ [Object.keys(changes)[0]]: changes[Object.keys(changes)[0]] }) + "..."
        } else {
            stringifiedChanges = stringifyChanges(changes)
        }
        if (stringifiedChanges !== "") {
            updateSnackbar(stringifiedChanges)
        }
    }, [codeChanges, updateSnackbar])


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
                    <Tooltip title="Dashboard">
                        <ToggleButton value="dashboard" selected={setting === "dashboard"} aria-label="dashboard-setting">
                            <DashboardIcon sx={{ fontSize: "1.5em" }} />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Exported Code">
                        <ToggleButton value="code" selected={setting === "code"} aria-label="code-setting">
                            <CodeIcon sx={{ fontSize: "1.5em" }} />
                        </ToggleButton>
                    </Tooltip>
                    {/*<Tooltip title="Settings">
                        <ToggleButton value="settings" selected={setting === "settings"} aria-label="settings-setting">
                            <SettingsIcon sx={{ fontSize: "1.5em" }} />
                        </ToggleButton>
    </Tooltip>*/}
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
                updateSnackbar={updateSnackbar}
                view={view}
                snackbarSetting={snackbarSetting}
                setSnackbarSetting={setSnackbarSetting}
            />
            <Snackbar
                open={snackbarOpen && snackbarSetting}
                autoHideDuration={4000}
                onClose={handleClose}
                message={snackbarContent}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "bottom"
                }}
                sx={{
                    left: "auto",
                    maxWidth: "50%"
                }}
                action={action}
                ContentProps={{
                    sx: {
                        fontFamily: "Menlo, Monaco, 'Courier New', Courier, monospace",
                        fontSize: "1em",
                        maxHeight: "3em",
                        overflow: "auto",
                        maxWidth: "75%",
                        wordBreak: "break-word",
                    }
                }}
                
            />
        </div>
    );
}