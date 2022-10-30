import { ObjectStringKeys } from "./general";

export interface FlexContainer {
    display?: any;
    justifyContent?: any;
    alignItems?: any;
    flexDirection?: any;
    alignContent?: any;
    flexWrap?: any;
    gap?: any;
}

export interface FlexChild {
    flex?: any;
    alignSelf?: any;
}

export interface VisualizerElement {
    id: string;
    displayName: string;
    code: ObjectStringKeys
}