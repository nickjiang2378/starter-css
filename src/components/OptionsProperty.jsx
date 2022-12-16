import { useState, useEffect } from "react";
import { Input, IconButton, Autocomplete, TextField, Stack } from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { modulo } from "../utils/helpers";
import OptionsInput from "../dashboards/FlexVisualizer/OptionsInput";

export default function OptionsProperty({property, val, setVal, options, disabled=false, defaultIndex=0}) {
    const [index, setIndex] = useState(defaultIndex);

    function updateIndexVal(diff) {
        const newIndex = modulo(index + diff, options.length)
        setIndex(newIndex);
        setVal(options[newIndex])
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "15px", whiteSpace: "nowrap" }}>{property}</div>
            <div>
                <Stack direction="row">
                    <OptionsInput
                        options={options}
                        value={val}
                        setValue={setVal}
                        disabled={!disabled}
                    />
                    {/*<Input
                        value={val ? val : options[index]}
                        onChange={(e) => setVal(e.target.value)}
                        sx={{ minWidth: "4em", maxWidth: "10em"}}
    />*/}
                </Stack>
            </div>
        </div>
    )
} 