import React from "react"
import { VisualizerElement } from "../../types/dashboards";

type VisualizerChildProps = {
    index: number,
    child: VisualizerElement,
    setSelectedChild: React.Dispatch<React.SetStateAction<number | null>>
    selectedChild: number | null,
    children: React.ReactNode
}

export default function VisualizerChild({ setSelectedChild, index, child, selectedChild, children }: VisualizerChildProps) {
    return (
        <div
            onClick={(e) => {console.log(e); e.stopPropagation(); setSelectedChild((currVal) => {
                if (currVal == null || currVal !== index) return index;
                else return null;
            })}}
            id={child.id}
            className={`flexChild ${index === selectedChild ? "highlightedBox" : "normalBox"} ${child.id === "pseudo" ? "pseudoChild" : ""}`}
            style={{...child.code, display: "flex", alignItems: "center", justifyContent: "center"}}
        >
            {children}
        </div>
    )
}