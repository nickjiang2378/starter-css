import { useEffect, useState } from "react";
import FillDashboard from "./FillDashboard/FillDashboard";
import BorderDashboard from "./BorderDashboard/BorderDashboard";
import EffectsDashboard from "./EffectsDashboard/EffectsDashboard";
import TextDashboard from "./TextDashboard/TextDashboard";
import SizingDashboard from "./SizingDashboard/SizingDashboard";
import FlexVisualizer from "./FlexVisualizer/FlexVisualizer";
import { listenForElementChanges } from "../scripts/updateStyle"; 
import { Divider } from "@mui/material";
import { IS_PRODUCTION } from "../utils/constants";
import { SelectedContext } from "../SelectedContext";

export default function EditDashboard() {
    const [elementStyles, setElementStyles] = useState(null);
    const [computedStyles, setComputedStyles] = useState(null);
    const [containingBlock, setContainingBlock] = useState(null);

    useEffect(() => {
      //console.log("Listening for element style changes");
      listenForElementChanges(setElementStyles, setComputedStyles, setContainingBlock);
    }, []);

    useEffect(() => {
      console.log("Computed styles, element styles, containing block changed");
      console.log(containingBlock);
    }, [elementStyles, computedStyles, containingBlock]);

    if (computedStyles != null || !IS_PRODUCTION) {
      return (
        <SelectedContext.Provider value={{ selectedElement: {elementStyles, computedStyles}, containingBlock}}>
          <div>
            <FlexVisualizer />
            <Divider />
            <TextDashboard />
            <Divider />
            <FillDashboard elementStyles={elementStyles} computedStyles={computedStyles} />
            <Divider />
            <BorderDashboard elementStyles={elementStyles} computedStyles={computedStyles} />
            <Divider />
            <EffectsDashboard />
          </div>
        </SelectedContext.Provider>
      );
    } else {
      return <div>Waiting for computed styles</div>;
    }
}