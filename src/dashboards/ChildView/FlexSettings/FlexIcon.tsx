import React from "react"

export default function FlexIcon({ iconOn, rowMode }: { iconOn: boolean, rowMode: boolean }) {
    return <>
        <svg style={rowMode ? {} : { transform: "rotate(90deg)"}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={iconOn ? "1" : "0.5"}>
            <path d="M20 20V4H22V20H20ZM2 20L2 4H4V20H2ZM9 11V8L5 12L9 16V13H15V16L19 12L15 8V11H9Z" fill={iconOn ? "white" : "black"} />
        </svg>
    </>;
}