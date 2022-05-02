import { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FillDashboard from "./FillDashboard/FillDashboard";
import BorderDashboard from "./BorderDashboard/BorderDashboard";
import EffectsDashboard from "./EffectsDashboard/EffectsDashboard";
import TextDashboard from "./TextDashboard/TextDashboard";
import { listenForElementChanges } from "../scripts/updateStyle"; 
import { Divider } from "@mui/material";

export default function EditDashboard() {
    const [elementStyles, setElementStyles] = useState(null);
    const [computedStyles, setComputedStyles] = useState(null);

    useEffect(() => {
      console.log("Listening for element style changes");
      listenForElementChanges(setElementStyles, setComputedStyles);
    }, []);

    useEffect(() => {
      console.log(elementStyles);
      console.log(computedStyles);
    }, [elementStyles, computedStyles]);

    return (
      <div>
        <TextDashboard />
        <Divider />
        <FillDashboard />
        <Divider />
        <BorderDashboard />
        <Divider />
        <EffectsDashboard />
        
      </div>
      );
}