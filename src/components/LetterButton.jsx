import { useState } from "react";
import { Button } from "@mui/material";

export default function LetterButton({ letter }) {
    const [clicked, setClicked] = useState(false);

    return (
        <Button
            variant={clicked ? "contained" : "outlined"}
            onClick={() => {setClicked(!clicked)}}
            disableRipple={true}
            disableElevation={true}
            sx={{ minWidth: 0 }}
        >
            {letter}
        </Button>
    )
}