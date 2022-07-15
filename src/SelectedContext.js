import { createContext } from "react";

export const SelectedContext = createContext({
    selectedElement: null,
    containingBlock: null
});