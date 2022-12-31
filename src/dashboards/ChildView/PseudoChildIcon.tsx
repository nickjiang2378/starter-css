import React from "react"
import BlockIcon from '@mui/icons-material/Block';
import { Tooltip } from "@mui/material";

export default function PseudoChildIcon() {
    return (
        <Tooltip title="Pseudo-child">
            <BlockIcon sx={{ marginLeft: "5px", fontSize: "1.5em" }} />
        </Tooltip>
    )
}