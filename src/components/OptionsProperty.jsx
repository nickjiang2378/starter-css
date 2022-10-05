import { useState, useEffect } from "react";
import { Input, IconButton, Autocomplete, TextField, Stack } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { modulo } from "../utils/helpers";

export default function OptionsProperty({property, val, setVal, options, disabled=false, defaultIndex=0}) {
    const [index, setIndex] = useState(defaultIndex);

    function updateIndexVal(diff) {
        const newIndex = modulo(index + diff, options.length)
        setIndex(newIndex);
        setVal(options[newIndex])
    }

    return (
        <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ flex: 1, textAlign: "right", minWidth: "50%", marginRight: "15px" }}>{property}</div>
            <div style={{ flex: 1 }}>
                <Stack direction="row">
                    <Input
                        value={val ? val : options[index]}
                        onChange={(e) => setVal(e.target.value)}
                        sx={{ minWidth: "8em", maxWidth: "15em"}}
                    />
                    <IconButton
                        onClick={() => updateIndexVal(-1)}
                        disabled={disabled}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => updateIndexVal(1)}
                        disabled={disabled}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Stack>
            </div>
        </div>
    )
} 