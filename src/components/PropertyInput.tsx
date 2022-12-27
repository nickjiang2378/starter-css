import React from "react";
import { FixMeLater } from "../types/general";

type Props = {
    propertyName: string,
    inputs: FixMeLater,
    rightIcons: FixMeLater
}

export default function PropertyInput({ propertyName, inputs, rightIcons }: Props) {
    return (
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <div style={{ marginRight: "15px" }}>{propertyName}</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {inputs}
            </div>
            <div style={{ flex: 1 }}></div>
            {rightIcons}
        </div>
    )
}