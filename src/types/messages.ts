/* Defines the interfaces for messages passed between the browser and extension */

import React from "react";
import { ObjectStringKeys, FixMeLater } from "./general"

export interface ElementModel {
    elementType?: string;
    computedStyles?: ObjectStringKeys;
    inlineStyles?: ObjectStringKeys;
}

export interface DataModel {
    containingElement: ElementModel | null;
    selectedElement: ElementModel | null;
    childElements: ElementModel[];
}

export interface SetDataModel {
    code?: StyleChangesModel
    setCode: FixMeLater
}

export type StoreModel = DataModel & SetDataModel;

export interface StyleChangesModel {
    containingElementChanges: ObjectStringKeys;
    selectedElementChanges: ObjectStringKeys;
    childElementChanges: ObjectStringKeys[];
}