import { useState } from "react"
import { Input } from "@mui/material";
import "./FlexVisualizer.css"

const Property = ({property, val, changeVal}) => (
    <div style={{ display: "flex", alignItems: "baseline" }}>
        <div style={{ flex: 1, textAlign: "right", marginRight: "15px" }}>{property}</div>
        <div style={{ flex: 1 }}>
            <Input
                value={val}
                onChange={changeVal}
                sx={{ maxWidth: "7em" }}
            />
        </div>
    </div>
)
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


    return (
        <div className="container">
            <div className="category-header bold">Flexbox</div>
            <div className="flexVisualizer">
                <div className="flexPlayground" style={containerStyles}>
                    <div className="flexChild normalBox">Box1</div>
                    <div className="flexChild highlightedBox">Box2</div>
                    <div className="flexChild normalBox">Box3</div>
                </div>
                <div className="flexSettings">
                    <Property
                        property="Direction"
                        val={containerStyles?.flexDirection}
                        changeVal={(e) => setContainerKey("flexDirection", e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}