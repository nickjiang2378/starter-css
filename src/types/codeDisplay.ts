import { ObjectStringKeys } from "./general";

export interface CodeDisplayModel {
    selectedElement: ObjectStringKeys;
    childElements: ObjectStringKeys[];
    containingElement: ObjectStringKeys
}