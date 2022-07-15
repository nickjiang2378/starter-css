import { useEffect, useState, useContext } from "react";
import { TextField } from "@mui/material";

import StandardLayout from "../StandardLayout";
import { useUpdateSizing, useSizingStyles } from "./sizingHooks";

import { SelectedContext } from "../../SelectedContext";

import HoverableProperty from "../../components/HoverableProperty"
import { WidthPropertyPreview, WidthPropertyFull } from "../../components/cheatsheet/Width/WidthProperty";
import { WidthValuePreview, WidthValueFull, WidthComputedValue } from "../../components/cheatsheet/Width/WidthValue";
import { MinWidthComputedValue, MinWidthValuePreview, MinWidthValueFull } from "../../components/cheatsheet/MinWidth/MinWidthValue";

export default function SizingDashboard() {
    const { selectedElement: { elementStyles, computedStyles } } = useContext(SelectedContext);
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
                ComputedExplanation={<WidthComputedValue value={sizingStyles?.width} computedStyles={computedStyles} />}
            />
            <HoverableProperty
                propertyTitle="Min"
                propertyFullName="min-width"
                value={sizingStyles?.minWidth}
                computedStyles={computedStyles}
                onChange={(e) => setSizingKey('minWidth', e.target.value)}
                PropertyFull={<WidthPropertyFull computedStyles={computedStyles} />}
                PropertyPreview={<WidthPropertyPreview computedStyles={computedStyles} />}
                UnitFull={<MinWidthValueFull value={sizingStyles?.minWidth} computedStyles={computedStyles} />}
                UnitPreview={<MinWidthValuePreview value={sizingStyles?.minWidth} computedStyles={computedStyles} />}
                ComputedExplanation={<MinWidthComputedValue value={sizingStyles?.minWidth} computedStyles={computedStyles} />}
            />
            <HoverableProperty
                propertyTitle="H"
                propertyFullName="height"
                value={sizingStyles?.height}
                computedStyles={computedStyles}
                onChange={(e) => setSizingKey('height', e.target.value)}
                PropertyFull={<WidthPropertyFull computedStyles={computedStyles} />}
                PropertyPreview={<WidthPropertyPreview computedStyles={computedStyles} />}
                UnitFull={<WidthValueFull value={sizingStyles?.width} computedStyles={computedStyles} />}
                UnitPreview={<WidthValuePreview value={sizingStyles?.width} computedStyles={computedStyles} />}
            />
            <HoverableProperty
                propertyTitle="Min"
                propertyFullName="min-height"
                value={sizingStyles?.minHeight}
                computedStyles={computedStyles}
                onChange={(e) => setSizingKey('minHeight', e.target.value)}
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