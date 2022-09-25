import { useState, useEffect } from "react"
import { Input, IconButton, ClickAwayListener, Box } from "@mui/material";
import OptionsProperty from "../../components/OptionsProperty"
import InputProperty from "../../components/InputProperty"
import CheckboxProperty from "../../components/CheckboxProperty";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import "./FlexVisualizer.css"
import CodeVisualizer from "../../components/CodeVisualizer/CodeVisualizer";
import { flexDirectionSettings, justifyContentSettings, alignContentSettings, alignItemsSettings, alignSelfSettings } from "./constants";

export default function FlexVisualizer() {
    const [containerStyles, setContainerStyles] = useState({
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "row",
        alignContent: "normal",
        flexWrap: "nowrap",
        columnGap: "0px",
    });
    const [selectedIndex, setSelectedIndex] = useState();
    const [children, setChildren] = useState([
        {
            name: "#child1",
            displayName: "Child 1",
            code: {
                flex: "none",
                alignSelf: "auto"
            }
        }, 
        {
            name: "#child2",
            displayName: "Child 2",
            code: {
                flex: "none",
                alignSelf: "auto"
            }
        }, 
        {
            name: "#child3",
            displayName: "Child 3",
            code: {
                flex: "none",
                alignSelf: "auto"
            }
        }, 
    ]);
    const [addFlex, setAddFlex] = useState(false);

    const resetView = () => {
        setSelectedIndex(null);
    }

    const setContainerKey = (prop, val) => {
        setContainerStyles((obj) => ({...obj, [prop]: val}));
    }

    const setChildKey = (prop, val, index) => {
        setChildren((arr) => {
            let newArr = [...arr]
            let childCode = {...newArr[index].code, [prop]: val}
            newArr[index].code = childCode
            return newArr;
        });
    }

    let elementStyles = {
        name: "#element",
        code: containerStyles
    };
    let allStyles = [...children];
    allStyles.unshift(elementStyles);

    return (
        <div className="container">
            <div className="flex-header category-header">
                <div className="bold" style={{ flex: 1 }}>Flexbox</div>
                {!addFlex ?
                    <div
                        className="icon-btn"
                        onClick={() => setAddFlex(true)}
                    >
                        <AddIcon
                            sx={{ width: '100%', height: '100%' }}
                        />
                    </div> :
                    <div
                        className="icon-btn"
                        onClick={() => setAddFlex(false)}
                    >
                        <RemoveIcon
                            sx={{ width: '100%', height: '100%' }}
                        />
                    </div>
                }
            </div>
            {addFlex &&
                <div className="flexVisualizer">
                    <div className="flexPlayground" style={containerStyles} onClick={resetView}>
                        <>
                            {children.map((child, index) => {
                                return (
                                    <div
                                        onClick={(e) => {console.log(e); e.stopPropagation(); setSelectedIndex(index)}}
                                        id={child.name}
                                        className={`flexChild ${index === selectedIndex ? "highlightedBox" : "normalBox"}`}
                                        style={child.code}
                                    >
                                        {child.displayName}
                                    </div>
                                )
                            })}
                        </>
                    </div>
                    <div className="flexSettings">
                        {selectedIndex == null 
                        ? <>
                            <OptionsProperty
                                property="Direction"
                                val={containerStyles?.flexDirection}
                                setVal={(newVal) => setContainerKey("flexDirection", newVal)}
                                options={flexDirectionSettings}
                            />
                            <OptionsProperty
                                property={`Main Axis (${containerStyles?.flexDirection === "row" || containerStyles?.flexDirection === "row-reverse" ? "Horizontal" : "Vertical"})`}
                                val={containerStyles?.justifyContent}
                                setVal={(newVal) => setContainerKey("justifyContent", newVal)}
                                options={justifyContentSettings}
                            />
                            <OptionsProperty
                                property={`Cross Axis (${containerStyles?.flexDirection === "row" || containerStyles?.flexDirection === "row-reverse" ? "Vertical" : "Horizontal"})`}
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
                                property={`Line Wrap (${containerStyles?.flexDirection === "row" || containerStyles?.flexDirection === "row-reverse" ? "Vertical" : "Horizontal"})`}
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
                                property={`Line Spacing (${containerStyles?.flexDirection === "row" || containerStyles?.flexDirection === "row-reverse" ? "Vertical" : "Horizontal"})`}
                                val={containerStyles?.alignContent}
                                setVal={(newVal) => setContainerKey("alignContent", newVal)}
                                options={alignContentSettings}
                                disabled={containerStyles?.flexWrap === "nowrap"}
                            />
                        </> :
                        <>
                            <InputProperty
                                property="Flex Ratio"
                                val={children[selectedIndex]?.code?.flex}
                                setVal={(newVal) => setChildKey("flex", newVal, selectedIndex)}
                            />
                            <OptionsProperty
                                property={`Custom Align (${containerStyles?.flexDirection === "row" || containerStyles?.flexDirection === "row-reverse" ? "Vertical" : "Horizontal"})`}
                                val={children[selectedIndex]?.code?.alignSelf}
                                setVal={(newVal) => setChildKey("alignSelf", newVal, selectedIndex)}
                                options={alignSelfSettings}
                            />
                        </>
                        }
                    </div>
                    <CodeVisualizer element={elementStyles} all={allStyles}/>
                </div>
            }
        </div>
    )
}