import { useState } from "react";

import { ToggleButtonGroup, IconButton } from '@mui/material';
import MuiToggleButton from "@mui/material/ToggleButton";
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { styled } from "@mui/material/styles";

const ToggleButton = styled(MuiToggleButton)({
    "&.MuiToggleButton-root": {
        color: "grey"
    },
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white"
    },
});

export default function CodeVisualizer({ element, all }) {
    const [display, changeDisplay] = useState("element");

    let key = -1;
    const keyGen = () => {
        key++;
        return key;
    }

    const generateCode = () => {
        const data = display === "element" ? [element] : all;

        let code = [];
        for (const elementCode of data) {
            const selector = elementCode.name;

            // New ruleset
            if (data[0].name !== selector) {
                code.push(<br key={selector+"br-2"+keyGen()} />);
                code.push(<br key={selector+"br-1"+keyGen()} />);
            }

            // Selector
            code.push(<span key={selector+"{"+keyGen()} className="header text">{selector + " {"}</span>);
            code.push(<br key={selector+"br0"+keyGen()} />);

            // Declarations
            for (const prop in elementCode.code) {
                code.push(<span key={selector+prop+keyGen()} className="attr text">{prop}</span>);
                code.push(<span key={selector+prop+":"+keyGen()} className="punc text">: </span>);

                const propValue = elementCode.code[prop];
                const propValueLst = propValue.split(" ");
                for (const propValueItem of propValueLst) {
                    console.log(propValueItem);
                    code.push(
                        <span
                            key={selector+prop+propValueItem+keyGen()}
                            className={(propValueItem.match(/\d/) && !propValueItem.match(/#/)) ? "num text": "str text"}
                        >
                            {(propValueLst[0] !== propValueItem ? " " : "") + propValueItem}
                        </span>
                    );
                }
                code.push(<span key={selector+prop+";"+keyGen()} className="punc text">;</span>);

                code.push(<br key={selector+prop+"br"+keyGen()} />);
            }

            code.push(<span key={selector+"}"} className="header text">{"}"}</span>)
        }

        return code
    }

    const copy = () => {
        const data = display === "element" ? [element] : all;

        if (!data) return;

        const rulesets = [];
        for (const elementCode of data) {
            const selector = elementCode.name;
            let ruleset = "";
            ruleset += selector + " {\n";
            for (const prop in elementCode.code) {
                ruleset += "\t" + prop + ": " + elementCode.code[prop] + ";\n";
            }
            ruleset += "}\n";
            rulesets.push(ruleset);
        }

        const code = rulesets.join("\n");

        navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.clipboard.writeText(code).then(() => {
                    console.log("Copied:");
                    console.log(code);
                },() => {
                    console.error("Copy failed");
                });
            }
        });
    }

    return (
        <div className="container">
            <div className="codeContainer">
                <div className="controls">
                    <div className="elementToggle">
                        <ToggleButtonGroup
                            value={display}
                            onChange={(event, value) => {
                                if (value) changeDisplay(value);
                            }}
                            size="small"
                            sx={{ alignSelf: 'stretch' }}
                            exclusive
                        >
                            <ToggleButton variant="text" disableRipple value="element" key="left">
                                Element
                            </ToggleButton>
                            <ToggleButton variant="text" disableRipple value="all" key="center">
                                All
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="copy">
                        <IconButton onClick={() => copy()}>
                            <ContentCopyRoundedIcon sx={{color: "#F3E5F5"}} />
                        </IconButton>
                    </div>
                </div>
                <div className="codeWrapper">
                    <div className="code">
                        {generateCode()}
                    </div>
                </div>
            </div>
        </div>
    )
}