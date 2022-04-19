import { useState, useEffect } from "react";
import { Input, Container, Stack, Checkbox, Divider } from "@mui/material";
import PropertyInput from "../../components/PropertyInput";
import Dropdown from "../../components/Dropdown";
import ColorPicker from "../../components/ColorPicker";
import { updateStyle } from '../../scripts/updateStyle';

export default function BorderDashboard({ elementStyles }) {
    const [borderStyles, setBorderStyles] = useState({
        borderWidth: '',
        borderRadius: '',
        borderColor: '#fff',
        borderStyle: '',
        shadowOffsetX: '',
        shadowOffsetY: '',
        shadowBlurRadius: '',
        shadowSpreadRadius: '',
        shadowColor: '#fff'
    });

    // Box Shadow Properties
    const [addShadow, setAddShadow] = useState(false);

    const STYLE_OPTIONS = ['solid', 'dashed']
    const colorPickerBorder = '1px solid grey';

    const SuggestedStyle = ({ styles }) => (
        <div onClick={() => updateWithSuggestion(styles)} 
            style={{ backgroundColor: '#5b6dcd', height: '50px', width: '50px', ...styles }}
        />
    );

    const updateWithSuggestion = (styles) => {
        Object.keys(styles).forEach((attribute) => {
            changeBorderKey(attribute, styles[attribute]);
        })
    }

    const changeBorderKey = (key, value) => {
        setBorderStyles((obj) => {
            const objCopy = {...obj};
            objCopy[key] = value
            return objCopy;
        })
    }

    const compile = (attributeList) => {
        let result = '';
        for (let i = 0; i < attributeList.length; i++) {
            let attribute = attributeList[i];
            result += attribute;
            if (attribute && i < attributeList.length - 1) {
                result += ' ';
            }
        }
        return result.trim();
    }
    console.log(borderStyles);

    useEffect(() => {
        let styleChanges = {
            borderRadius: null,
            border: null,
            shadow: null
        };

        styleChanges['borderRadius'] = borderStyles.borderRadius;
        styleChanges['border'] = compile([borderStyles.borderWidth, borderStyles.borderStyle, borderStyles.borderColor]);

        console.log(styleChanges);
        updateStyle(styleChanges);
    }, [borderStyles])

    return (
        <Container sx={{ margin: '0 5% 0 5%' }}>
            <Stack
                direction="row"
                spacing={2}
                sx={{ marginBottom: '10px', overflowY: 'scroll' }}
            >
                <SuggestedStyle styles={{ borderStyle: 'solid', borderWidth: '1px', borderColor: 'black' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
                <SuggestedStyle styles={{ borderRadius: '10% / 50%' }} />
            </Stack>
            <Divider />
            <div>
                <h3 style={{ textAlign: 'left' }}>Properties</h3>
            </div>
            <PropertyInput
                title="Width"
                renderInput={
                    <Input
                        value={borderStyles.borderWidth}
                        onChange={(e) => changeBorderKey("borderWidth", e.target.value)}
                    />
                }
            />
            <PropertyInput
                title="Style"
                renderInput={
                    <Dropdown
                        displayOption={borderStyles.borderStyle? borderStyles.borderStyle : ''}
                        setDisplayOption={(val) => changeBorderKey("borderStyle", val)}
                        options={STYLE_OPTIONS}
                    />
                }
            />
            <PropertyInput
                title="Color"
                renderInput={
                    <ColorPicker 
                        color={borderStyles.borderColor} 
                        setColor={(val) => changeBorderKey('borderColor', val)}
                    >
                        <div 
                            className="solid-color-btn" 
                            style={{ backgroundColor: borderStyles.borderColor?.hex, border: colorPickerBorder }} 
                        />
                    </ColorPicker>
                }
            />
            <PropertyInput
                title="Radius"
                renderInput={
                    <Input
                        value={borderStyles.borderRadius}
                        onChange={(e) => changeBorderKey('borderRadius', e.target.value)}
                    />
                }
            />
            <Stack
                direction="row"
            >
                <h3 style={{ textAlign: 'left' }}>Box Shadow</h3>
                <Checkbox
                    checked={addShadow}
                    onChange={(e) => setAddShadow(e.target.checked)}
                    disableRipple
                />
            </Stack>
            {addShadow && 
                <>
                    <div className="indent" style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ marginRight: '10px' }}>Offset-x</h4>
                        <Input
                            value={borderStyles.shadowOffsetX}
                            onChange={(e) => changeBorderKey('shadowOffsetX', e.target.value)}
                        />
                        <span style={{ flex: 1 }}></span>
                        <h4 style={{ marginRight: '10px' }}>Offset-y</h4>
                        <Input
                            value={borderStyles.shadowOffsetY}
                            onChange={(e) => changeBorderKey('shadowOffsetY', e.target.value)}
                        />
                    </div>
                    <PropertyInput
                        title="Blur Radius"
                        renderInput={
                            <Input
                                value={borderStyles.shadowBlurRadius}
                                onChange={(e) => changeBorderKey('shadowBlurRadius', e.target.value)}
                            />
                        }
                    />
                    <PropertyInput
                        title="Spread Radius"
                        renderInput={
                            <Input
                                value={borderStyles.shadowSpreadRadius}
                                onChange={(e) => changeBorderKey('shadowSpreadRadius', e.target.value)}
                            />
                        }
                    />
                    <PropertyInput
                        title="Color"
                        renderInput={
                            <ColorPicker 
                                color={borderStyles.shadowColor} 
                                setColor={(val) => changeBorderKey('shadowColor', val)}
                            >
                                <div 
                                    className="solid-color-btn" 
                                    style={{ backgroundColor: borderStyles.shadowColor?.hex, border: colorPickerBorder }} 
                                />
                            </ColorPicker>
                        }
                    />
                </>
            }
        </Container>
    );
}