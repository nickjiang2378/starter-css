import { useState, useEffect } from "react"
import { Input, IconButton } from "@mui/material";
import OptionsProperty from "../../components/OptionsProperty"
import InputProperty from "../../components/InputProperty"
import CheckboxProperty from "../../components/CheckboxProperty";
import "./FlexVisualizer.css"

export default function FlexVisualizer() {
    const [containerStyles, setContainerStyles] = useState({
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        alignContent: "normal",
        flexWrap: "nowrap",
        columnGap: "0px"
    });

    const setContainerKey = (prop, val) => {
        setContainerStyles((obj) => ({...obj, [prop]: val}));
    }

    const flexDirectionSettings = ["row", "row-reverse", "column", "column-reverse"];
    const justifyContentSettings = ["flex-start", "center", "space-evenly", "space-around", "space-between", "flex-end"]
    const alignItemsSettings = ["flex-start", "center", "baseline", "stretch", "flex-end"]
    const alignContentSettings = ["normal", "flex-start", "center", "space-around", "space-between", "stretch", "flex-end"]

    return (
        <div className="container">
            <div className="category-header bold">Flexbox</div>
            <div className="flexVisualizer">
                <div className="flexPlayground" style={containerStyles}>
                    <div className="flexChild normalBox">Box 1</div>
                    <div className="flexChild highlightedBox">Box 2</div>
                    <div className="flexChild normalBox">Box 3</div>
                </div>
                <div className="flexSettings">
                    <OptionsProperty
                        property="Direction"
                        val={containerStyles?.flexDirection}
                        setVal={(newVal) => setContainerKey("flexDirection", newVal)}
                        options={flexDirectionSettings}
                    />
                    <OptionsProperty
                        property="Horizontal Alignment"
                        val={containerStyles?.justifyContent}
                        setVal={(newVal) => setContainerKey("justifyContent", newVal)}
                        options={justifyContentSettings}
                    />
                    <OptionsProperty
                        property="Vertical Alignment"
                        val={containerStyles?.alignItems}
                        setVal={(newVal) => setContainerKey("alignItems", newVal)}
                        options={alignItemsSettings}
                    />
                    <InputProperty
                        property="Gap"
                        val={containerStyles?.rowGap}
                        setVal={(newVal) => setContainerKey("columnGap", newVal)}
                    />
                    <CheckboxProperty
                        property="Line Wrap"
                        val={containerStyles?.flexWrap !== "nowrap"}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setContainerKey("flexWrap", "wrap")
                            } else {
                                setContainerKey("flexWrap", "nowrap")
                            }
                        }}
                    />
                    <OptionsProperty
                        property="Line Spacing"
                        val={containerStyles?.alignContent}
                        setVal={(newVal) => setContainerKey("alignContent", newVal)}
                        options={alignContentSettings}
                        disabled={containerStyles?.flexWrap === "nowrap"}
                    />
                </div>
            </div>
        </div>
    )
}