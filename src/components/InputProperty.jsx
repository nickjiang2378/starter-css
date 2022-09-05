import { useState, useEffect } from "react";
import { Input } from "@mui/material"

export default function InputProperty({property, val, setVal, disabled=false}) {
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
            </div>
        </div>
    )
} 