import { useState } from "react";
import "./StaticEffectsDisplay.css"
import { Box, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function TextDashboard() {
    const [font, setFont] = useState("Font");

    function changeFont(event) {
        setFont(event.target.value);
    }

    return (
        <Box>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Font</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={font}
                    defaultValue="Font"
                    label="Age"
                    onChange={changeFont}
                >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}