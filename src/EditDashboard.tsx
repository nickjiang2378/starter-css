import React, { useEffect, useState } from "react";
// import FillDashboard from "./FillDashboard/FillDashboard";
import BorderDashboard from "./dashboards/AppearanceDashboard/BorderSettings/BorderSettings";
// import EffectsDashboard from "./EffectsDashboard/EffectsDashboard";
// import TextDashboard from "./TextDashboard/TextDashboard";
// import SizingDashboard from "./SizingDashboard/SizingDashboard";
import FlexVisualizer from "./dashboards/FlexVisualizer/FlexVisualizer";
import AppearanceDashboard from "./dashboards/AppearanceDashboard/AppearanceDashboard";
import { listenForElementChanges } from "./scripts/updateStyle"; 
import { Divider } from "@mui/material";
import { IS_PRODUCTION } from "./utils/constants";
import { SelectedContext } from "./SelectedContext";

import { DataModel } from "./types/messages";

export default function EditDashboard() {
  const [dataObj, setDataObj] = useState<DataModel>({
    selectedElement: null,
    containingElement: null,
    childElements: []
  });

  useEffect(() => {
    console.log("Listening for element style changes");
    listenForElementChanges(setDataObj);
  }, []);

  useEffect(() => {
    console.log("New Message")
    console.log(dataObj);
  }, [dataObj]);

  console.log(dataObj);
  return (
    <SelectedContext.Provider value={dataObj}>
      <div>
        <AppearanceDashboard />
        <Divider />
        <FlexVisualizer />
      </div>
    </SelectedContext.Provider>
  );
}