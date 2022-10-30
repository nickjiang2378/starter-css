import { useState, useEffect } from "react";
import { Input } from "@mui/material"

export default function InputProperty({property, val, setVal, disabled=false}) {
    return (
        <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ flex: 1, textAlign: "right", marginRight: "15px", minWidth: "50%" }}>{property}</div>
            <div style={{ flex: 1 }}>
                <Input
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    disabled={disabled}
                    sx={{ minWidth: "8em", maxWidth: "15em"}}
                />
            </div>
        </div>
    )
} 