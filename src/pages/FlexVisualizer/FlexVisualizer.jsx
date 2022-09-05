import { useState, useEffect } from "react"
import { Input, IconButton } from "@mui/material";
import Property from "../../components/Property"
import "./FlexVisualizer.css"

export default function FlexVisualizer() {
    const [containerStyles, setContainerStyles] = useState({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    });

    const setContainerKey = (prop, val) => {
        setContainerStyles((obj) => ({...obj, [prop]: val}));
    }

    const flexDirectionSettings = ["row", "row-reverse", "column", "column-reverse"];
    const justifyContentSettings = ["flex-start", "center", "space-evenly", "space-around", "space-between", "flex-end"]
    const alignItemsSettings = ["flex-start", "center", "baseline", "flex-end"]
    const alignContentSettings = ["normal", "flex-start", "center", "space-around", "space-between", "stretch", "flex-end"]

    useEffect(() => {
        console.log(containerStyles)
    }, [containerStyles])

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
                    <Property
                        property="Direction"
                        val={containerStyles?.flexDirection}
                        setVal={(newVal) => setContainerKey("flexDirection", newVal)}
                        options={flexDirectionSettings}
                    />
                </div>
            </div>
        </div>
    )
}