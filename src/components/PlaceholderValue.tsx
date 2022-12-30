import React from "react"

type PlaceholderValueProps = {
    unit: string
}
export default function PlaceholderValue({ unit }: PlaceholderValueProps) {
    return (
        <>
            <span style={{ border: "1px dotted black", padding: "2px", marginRight: "5px"}}>1</span>
            {unit}
        </>
    )
}