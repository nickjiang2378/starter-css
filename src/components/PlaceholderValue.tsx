import React from "react"

type PlaceholderValue = {
    unit: string
}
export default function PlaceholderValue({ unit }: PlaceholderValue) {
    return (
        <>
            <span style={{ border: "1px dotted black", padding: "2px", marginRight: "5px"}}>1</span>
            {unit}
        </>
    )
}