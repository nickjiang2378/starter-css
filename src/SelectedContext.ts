import { createContext } from "react";
import { DataModel } from "./types/messages";

export const SelectedContext = createContext<DataModel>({
    selectedElement: null,
    containingElement: null,
    childElements: [],
});