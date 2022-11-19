import { useState, useEffect } from "react";
import { Input } from "@mui/material"

export default function InputProperty({property, val, setVal, disabled=false}) {
    return (
        <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ marginRight: "15px", whiteSpace: "nowrap" }}>{property}</div>
            <div style={{ }}>
                <Input
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    disabled={disabled}
                    sx={{ minWidth: "4em", maxWidth: "10em"}}
                />
            </div>
        </div>
    )
} 