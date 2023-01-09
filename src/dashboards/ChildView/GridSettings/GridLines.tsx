import { Tooltip } from "@mui/material";
import React from "react"
import { ObjectStringKeys } from "../../../types/general";

type GridLineProps = {
    numColumns: number,
    maxChildColumn: number,
    numRows: number,
    maxChildRow: number,
    realContainerCode: ObjectStringKeys
}

type LineProps = {
    type: "row" | "column",
    showRight?: boolean,
    index: number,
    children: React.ReactNode
}
const Line = ({ type, index, children, showRight=false }: LineProps) => {
    return (
    <div style={{ display: "flex", flexDirection: type === "row" ? "column" : "row" }}>
        <Tooltip title={`${type} ${index}`}>
            <div className={`gridLine ${type === "row" ? "rowGridLine" : "columnGridLine"}`}></div>
        </Tooltip>
        <div style={{ pointerEvents: "none", flex: 1 }}>
            {children}
        </div>
        {showRight && 
            <Tooltip title={`${type} ${index + 1}`}>
                <div className={`gridLine ${type === "row" ? "rowGridLine" : "columnGridLine"}`}></div>
            </Tooltip>
        }
    </div>
    )
}

export default function GridLines({ numColumns, realContainerCode, maxChildColumn, numRows, maxChildRow }: GridLineProps) {
    return (
        <>
            <div className="gridOverlayWrapper">
                <div id="columnLines" className="gridOverlay" style={{ ...realContainerCode, gridTemplateRows: undefined, alignContent: "stretch", justifyItems: "stretch", alignItems: "stretch" }}>
                    {numColumns > 0 && [...Array(numColumns).keys()].map((_, index) => {
                        if (index < maxChildColumn) {
                            return (
                                <Line type="column" index={index + 1} showRight={index === numColumns - 1}>
                                        <div
                                            id={"Hidden"}
                                            className={`flexChild normalBox`}
                                            style={{ display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden", border: "none" }}
                                        >
                                            <span>Child</span>
                                        </div>           
                                </Line>
                            )
                        }
                        return (
                            <Line type="column" index={index + 1} showRight={index === numColumns - 1}>
                            </Line>
                        )
                    })}
                </div>
                <div id="rowLines" className="gridOverlay" style={{ ...realContainerCode, gridTemplateColumns: undefined, justifyContent: "stretch", justifyItems: "stretch", alignItems: "stretch" }}>
                    {numRows > 0 && [...Array(numRows).keys()].map((_, index) => {
                        if (index < maxChildRow) {
                            return (
                                <Line type="row" index={index + 1} showRight={index === numRows - 1}>
                                        <div
                                            id={"Hidden"}
                                            className={`flexChild normalBox`}
                                            style={{ display: "flex", alignItems: "center", justifyContent: "center", visibility: "hidden", border: "none" }}
                                        >
                                            <span>Child</span>
                                        </div>           
                                </Line>
                            )
                        }
                        return (
                            <Line type="column" index={index + 1} showRight={index === numRows - 1}>
                            </Line>
                        )
                    })}

                </div>
            </div>
        </>
    )
}