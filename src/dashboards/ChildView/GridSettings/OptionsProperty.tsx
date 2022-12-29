import React, { useState, useEffect } from "react";
import { Input, IconButton, Autocomplete, TextField, Stack } from "@mui/material"
import OptionsInput from "../../../components/OptionsInput";

type OptionsPropertyProps = {
    property: string;
    children: React.ReactNode;
    disabled?: boolean;
}

export default function OptionsProperty({ property, children, disabled=false }: OptionsPropertyProps) {

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "15px", whiteSpace: "nowrap" }}>{property}</div>
            {children}
        </div>
    )
} 