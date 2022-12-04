import React from "react"
import { FixMeLater } from "../../../types/general"
import "./IconButtonCustom.css"

type IconButtonTypes = {
    icon: FixMeLater,
    clicked: boolean,
    setClicked: FixMeLater
}

export default function IconButtonCustom({ icon, clicked, setClicked }: IconButtonTypes) {
    let classes = clicked ? "clicked" : "unclicked"
    return <div className={`iconBtn ${classes}`} onClick={(e) => {e.stopPropagation(); setClicked(!clicked)}}>
        <span style={{ opacity: clicked ? 1 : 0.3 }}>{icon}</span>
        </div>;
}