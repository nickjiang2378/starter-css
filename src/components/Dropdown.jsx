import { useState } from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function Dropdown({ options, defaultIndex, title }) {
    /* options expected to be an array of values */

    const [valIndex, setValIndex] = useState(defaultIndex ? defaultIndex : 0);

    function changeValIndex(event) {
        setValIndex(event.target.value);
    }

    return (<FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="label-help">{title}</InputLabel>
        <Select
            labelId="label-help"
            id="simple-select"
            value={valIndex}
            defaultValue={valIndex}
            label={title}
            onChange={changeValIndex}
        >
            {options.map((val, index) => (
                <MenuItem index={index} value={index}>{val}</MenuItem>
            ))}
        </Select>
    </FormControl>);
}