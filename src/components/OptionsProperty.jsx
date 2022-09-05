import { useState, useEffect } from "react";
import { Input, IconButton } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { modulo } from "../utils/helpers";

export default function OptionsProperty({property, val, setVal, options, disabled=false}) {
    const [index, setIndex] = useState(0);

    function updateIndexVal(diff) {
        const newIndex = modulo(index + diff, options.length)
        setIndex(newIndex);
        setVal(options[newIndex])
    }

    return (
        <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ flex: 1, textAlign: "right", marginRight: "15px" }}>{property}</div>
            <div style={{ flex: 1 }}>
                <Input
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    disabled={disabled}
                    sx={{ maxWidth: "7em" }}
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
            </div>
        </div>
    )
} 