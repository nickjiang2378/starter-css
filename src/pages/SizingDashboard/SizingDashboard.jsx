import { useEffect, useState } from "react";
import { TextField } from "@mui/material";

import StandardLayout from "../StandardLayout";
import { useUpdateSizing, useSizingStyles } from "./sizingHooks";

import HoverableProperty from "../../components/HoverableProperty"
import { WidthPropertyPreview, WidthPropertyFull } from "../../components/cheatsheet/Width/WidthProperty";
import { WidthValuePreview, WidthValueFull } from "../../components/cheatsheet/Width/WidthValue";

export default function SizingDashboard({ elementStyles, computedStyles }) {
    const [sizingStyles, setSizingStyles] = useSizingStyles(elementStyles, computedStyles);

    const setSizingKey = (prop, val) => {
        setSizingStyles((obj) => ({...obj, [prop]: val}));
    }

    useUpdateSizing(sizingStyles);

    console.log(sizingStyles)

    return (
        <div className="container">
            <div className="category-header bold">Sizing</div>
            <HoverableProperty
                propertyTitle="W"
                propertyFullName="Width"
                value={sizingStyles?.width}
                computedStyles={computedStyles}
                onChange={(e) => setSizingKey('width', e.target.value)}
                PropertyFull={<WidthPropertyFull computedStyles={computedStyles} />}
                PropertyPreview={<WidthPropertyPreview computedStyles={computedStyles} />}
                UnitFull={<WidthValueFull value={sizingStyles?.width} computedStyles={computedStyles} />}
                UnitPreview={<WidthValuePreview value={sizingStyles?.width} computedStyles={computedStyles} />}
            />
            <HoverableProperty
                propertyTitle="Min"
                propertyFullName="min-width"
                value={sizingStyles?.minWidth}
                computedStyles={computedStyles}
                onChange={(e) => setSizingKey('minWidth', e.target.value)}
                PropertyFull={<WidthPropertyFull computedStyles={computedStyles} />}
                PropertyPreview={<WidthPropertyPreview computedStyles={computedStyles} />}
                UnitFull={<WidthValueFull value={sizingStyles?.width} computedStyles={computedStyles} />}
                UnitPreview={<WidthValuePreview value={sizingStyles?.width} computedStyles={computedStyles} />}
            />
            <StandardLayout
                begin={
                    <div>
                        <div style={{ display: 'inline-block', verticalAlign: 'sub' }}>W</div>
                        <TextField
                            id="standard-basic" 
                            variant="standard" 
                            value={sizingStyles?.width}
                            onChange={(e) => setSizingKey('width', e.target.value)}
                            sx={{ marginLeft: '10px', width: 'calc(6em)'}}
                        />
                    </div>
                }
                middle={
                    <>
                        <div style={{ display: 'inline-block', verticalAlign: 'sub' }}>H</div>
                        <TextField
                            id="standard-basic" 
                            variant="standard" 
                            value={sizingStyles?.height}
                            onChange={(e) => setSizingKey('height', e.target.value)}
                            sx={{ marginLeft: '10px', width: 'calc(6em)'}}
                        />
                    </>
                }
            />
            <StandardLayout
                sx={{ marginTop: '20px' }}
                begin={
                    <>
                        <div style={{ display: 'inline-block', verticalAlign: 'sub' }}>Min</div>
                        <TextField
                            id="standard-basic" 
                            variant="standard" 
                            value={sizingStyles?.minWidth}
                            onChange={(e) => setSizingKey('minWidth', e.target.value)}
                            sx={{ marginLeft: '10px', width: 'calc(6em)'}}
                        />
                    </>
                }
                middle={
                    <>
                        <div style={{ display: 'inline-block', verticalAlign: 'sub' }}>Min</div>
                        <TextField
                            id="standard-basic" 
                            variant="standard" 
                            value={sizingStyles?.minHeight}
                            onChange={(e) => setSizingKey('minHeight', e.target.value)}
                            sx={{ marginLeft: '10px', width: 'calc(6em)'}}
                        />
                    </>
                }
            />
            
        </div>

    );
}