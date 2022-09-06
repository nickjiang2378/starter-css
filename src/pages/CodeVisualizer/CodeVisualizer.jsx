import { ToggleButton, ToggleButtonGroup, IconButton } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import "./CodeVisualizer.css"

export default function CodeVisualizer({ code }) {
    const generateCode = data => {
        let code = [];
        for (const header in data) {
            if (Object.keys(data)[0] !== header) {
                code.push(<br key={header+"br-2"} />);
                code.push(<br key={header+"br-1"} />);
            }

            code.push(<span key={header+"{"} className="header text">{header + " {"}</span>);
            code.push(<br key={header+"br0"} />)

            for (const attr in data[header]) {
                code.push(<span key={header+attr} className="attr text">{attr}</span>);
                code.push(<span key={header+attr+":"} className="punc text">: </span>);

                const value = data[header][attr];
                code.push(
                    <span
                        key={header+attr+value}
                        className={(value.match(/\d/) && !value.match(/#/)) ? "num text": "str text"}
                    >
                        {value}
                    </span>
                );
                code.push(<span key={header+attr+";"} className="punc text">;</span>);

                code.push(<br key={header+attr+"br"} />);
            }

            code.push(<span key={header+"}"} className="header text">{"}"}</span>)
        }

        console.log(code);
        return code
    }

    return (
        <div className="container">
            <div className="category-header bold">Code Snippet</div>
            <div className="codeContainer">
                <div className="controls">
                    <div className="elementToggle">
                        <ToggleButtonGroup
                            color="primary"
                            exclusive
                            onChange={() => {}}
                            aria-label="Platform"
                        >
                            <ToggleButton value="element" sx={{color: "#F3E5F5"}}>Element</ToggleButton>
                            <ToggleButton value="all" sx={{color: "#F3E5F5"}}>All</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    <div className="copy">
                        <IconButton>
                            <ContentCopyRoundedIcon sx={{color: "#F3E5F5"}} />
                        </IconButton>
                    </div>
                </div>
                <div className="codeWrapper">
                    <div className="code">
                        {generateCode(code)}
                    </div>
                </div>
            </div>
        </div>
    )
}