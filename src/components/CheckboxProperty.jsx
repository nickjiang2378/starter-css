import { useState, useEffect } from "react";
import { Checkbox } from '@mui/material';

export default function InputProperty({property, checked, onChange, disabled=false}) {
    return (
        <div style={{ display: "flex", alignItems: "baseline" }}>
            <div style={{ marginRight: "15px", whiteSpace: "nowrap" }}>{property}</div>
            <div style={{ }}>
                <Checkbox
                    checked={checked}
                    onChange={onChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
        </div>
    )
} 