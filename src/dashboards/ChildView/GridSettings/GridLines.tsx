import React from "react"
import { ObjectStringKeys } from "../../../types/general";

type GridLineProps = {
    numColumns: number,
    maxChildColumn: number,
    numRows: number,
    maxChildRow: number,
    realContainerCode: ObjectStringKeys
}

export default function GridLines({ numColumns, realContainerCode, maxChildColumn, numRows, maxChildRow }: GridLineProps) {
    return (
        <>
            <div className="gridOverlayWrapper">
                <div className="gridOverlay" style={{ ...realContainerCode, gridTemplateRows: undefined, justifyItems: "stretch", alignItems: "stretch" }}>
                    {numColumns > 0 && [...Array(numColumns).keys()].map((_, index) => {
                        let className = "gridOverlayVerticalElement";
                        if (index === numColumns - 1) {
                            className += " lastVerticalElement"
                        }
                        if (index < maxChildColumn) {
                            return (
                                <div className={className}>
                                        <div
                                            id={"Hidden"}
                                            className={`flexChild normalBox`}
                                            style={{display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden"}}
                                        >
                                            <span>Child</span>
                                        </div>           
                                </div>
                            )
                        }
                        return (
                            <div className={className}></div>
                        )
                    })}
                </div>
                <div className="gridOverlay" style={{ ...realContainerCode, gridTemplateColumns: undefined, justifyItems: "stretch", alignItems: "stretch" }}>
                    {numRows > 0 && [...Array(numRows).keys()].map((_, index) => {
                        let className = "gridOverlayHorizontalElement";
                        if (index === numRows - 1) {
                            className += " lastHorizontalElement"
                        }
                        console.log(maxChildRow)
                        if (index < maxChildRow) {
                            return (
                                <div className={className}>
                                        <div
                                            id={"Hidden"}
                                            className={`flexChild normalBox`}
                                            style={{display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden"}}
                                        >
                                            <span>Child</span>
                                        </div>           
                                </div>
                            )
                        }
                        return (
                            <div className={className}></div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}