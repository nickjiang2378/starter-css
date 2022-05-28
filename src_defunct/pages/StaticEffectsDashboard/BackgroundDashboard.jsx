import { useState, useEffect } from 'react';
import {  Container, Stack, Slider, Input } from "@mui/material"
import ColorPicker from '../../components/ColorPicker';
import { updateStyle } from '../../scripts/updateStyle';

export default function BackgroundDashboard({ elementStyles }) {
    const [color, setColor] = useState();
    const [opacity, setOpacity] = useState(1);

    const handleSliderChange = (event, newValue) => {
        setOpacity(newValue);
    };

    const handleInputChange = (event) => {
        setOpacity(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (opacity < 0) {
            setOpacity(0);
        } else if (opacity > 1) {
            setOpacity(1);
        }
    };
    
    useEffect(() => {
        let styleChanges = {};
        styleChanges['backgroundColor'] = color ? color.hex : "#fff";
        styleChanges['opacity'] = opacity;

        console.log(styleChanges);
        updateStyle(styleChanges);
    }, [color, opacity])

    const colorPickerBorder = '1px solid grey';
    return (
        <Container sx={{ textAlign: 'left' }}>
            <h2>
                Fill Color
            </h2>
            <Stack sx={{ marginLeft: "3%" }} direction="row" spacing={2}>
                <span>
                    Solid
                </span>
                <ColorPicker 
                    color={color} 
                    setColor={setColor}
                >
                    <div 
                        className="solid-color-btn" 
                        style={{ backgroundColor: color?.hex, border: colorPickerBorder }} 
                    />
                </ColorPicker>
            </Stack>
            <h2>Opacity</h2>
            <Stack sx={{ marginLeft: "3%" }} direction="row" spacing={2}>
                <Slider
                    value={opacity}
                    onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    max={1}
                    step={0.01}
                    valueLabelDisplay="auto"
                />
                <Input
                    value={opacity}
                    size="medium"
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    inputProps={{
                        step: 0.1,
                        min: 0,
                        max: 1,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </Stack>
            
        </Container>
    );
}