/* Defines the interfaces for messages passed between the browser and extension */

import { ObjectStringKeys } from "./general"

export interface ElementModel {
    elementType?: string;
    computedStyles?: ObjectStringKeys;
    inlineStyles?: ObjectStringKeys;
}

export interface DataModel {
    containingElement: ElementModel;
    selectedElement: ElementModel;
    childElements: Array<ElementModel>;
}