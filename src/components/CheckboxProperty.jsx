import { useState, useEffect } from "react";
import { Checkbox } from '@mui/material';

export default function InputProperty({property, checked, onChange, disabled=false}) {
    return (
        <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ flex: 1, textAlign: "right", marginRight: "15px", minWidth: "50%" }}>{property}</div>
            <div style={{ flex: 1 }}>
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </div>
    )
} 