import { useEffect, useState, useContext } from "react";
import { TextField } from "@mui/material";

import StandardLayout from "../StandardLayout";
import { useUpdateSizing, useSizingStyles } from "./sizingHooks";

import { SelectedContext } from "../../SelectedContext";

import HoverableProperty from "../../components/HoverableProperty"
import { WidthPropertyPreview, WidthPropertyFull } from "../../components/cheatsheet/Width/WidthProperty";
import { WidthValuePreview, WidthValueFull, WidthComputedValue } from "../../components/cheatsheet/Width/WidthValue";

import { MinWidthPropertyPreview, MinWidthPropertyFull } from "../../components/cheatsheet/MinWidth/MinWidthProperty";
import { MinWidthComputedValue, MinWidthValuePreview, MinWidthValueFull } from "../../components/cheatsheet/MinWidth/MinWidthValue";

import { HeightPropertyPreview, HeightPropertyFull } from "../../components/cheatsheet/Height/HeightProperty";
import { HeightComputedValue, HeightValuePreview, HeightValueFull } from "../../components/cheatsheet/Height/HeightValue";

import { MinHeightPropertyPreview, MinHeightPropertyFull } from "../../components/cheatsheet/MinHeight/MinHeightProperty";
import { MinHeightComputedValue, MinHeightValuePreview, MinHeightValueFull } from "../../components/cheatsheet/MinHeight/MinHeightValue";

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
            <StandardLayout
                begin={
                    <HoverableProperty
                        propertyTitle="W"
                        propertyFullName="width"
                        value={sizingStyles?.width}
                        computedStyles={computedStyles}
                        onChange={(e) => setSizingKey('width', e.target.value)}
                        PropertyFull={<WidthPropertyFull computedStyles={computedStyles} />}
                        PropertyPreview={<WidthPropertyPreview computedStyles={computedStyles} />}
                        UnitFull={<WidthValueFull value={sizingStyles?.width} computedStyles={computedStyles} />}
                        UnitPreview={<WidthValuePreview value={sizingStyles?.width} computedStyles={computedStyles} />}
                        ComputedExplanation={<WidthComputedValue value={sizingStyles?.width} />}
                    />
                }
                middle={
                    <HoverableProperty
                        propertyTitle="H"
                        propertyFullName="height"
                        value={sizingStyles?.height}
                        computedStyles={computedStyles}
                        onChange={(e) => setSizingKey('height', e.target.value)}
                        PropertyFull={<HeightPropertyFull />}
                        PropertyPreview={<HeightPropertyPreview />}
                        UnitFull={<HeightValueFull value={sizingStyles?.height}/>}
                        UnitPreview={<HeightValuePreview value={sizingStyles?.height} />}
                        ComputedExplanation={<HeightComputedValue value={sizingStyles?.height} />}
                    />
                }
            />
            <StandardLayout
                sx={{ marginTop: '20px' }}
                begin={
                    <HoverableProperty
                        propertyTitle="Min"
                        propertyFullName="min-width"
                        value={sizingStyles?.minWidth}
                        computedStyles={computedStyles}
                        onChange={(e) => setSizingKey('minWidth', e.target.value)}
                        PropertyFull={<MinWidthPropertyFull />}
                        PropertyPreview={<MinWidthPropertyPreview />}
                        UnitFull={<MinWidthValueFull value={sizingStyles?.minWidth} />}
                        UnitPreview={<MinWidthValuePreview value={sizingStyles?.minWidth} />}
                        ComputedExplanation={<MinWidthComputedValue value={sizingStyles?.minWidth}/>}
                    />
                }
                middle={
                    <HoverableProperty
                        propertyTitle="Min"
                        propertyFullName="min-height"
                        value={sizingStyles?.minHeight}
                        computedStyles={computedStyles}
                        onChange={(e) => setSizingKey('minHeight', e.target.value)}
                        PropertyFull={<MinHeightPropertyFull />}
                        PropertyPreview={<MinHeightPropertyPreview />}
                        UnitFull={<MinHeightValueFull value={sizingStyles?.minHeight} />}
                        UnitPreview={<MinHeightValuePreview value={sizingStyles?.minHeight} />}
                        ComputedExplanation={<MinHeightComputedValue value={sizingStyles?.minHeight}/>}
                    />
                }
            />
            
        </div>

    );
}