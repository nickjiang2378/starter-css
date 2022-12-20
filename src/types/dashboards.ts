import { ObjectStringKeys } from "./general";

export interface AppearanceStyles {
    borderStyle?: any;
    borderWidth?: any;
    borderColor?: any;
    borderRadius?: any;
    borderTopLeftRadius?: any;
    borderBottomLeftRadius?: any;
    borderTopRightRadius?: any;
    borderBottomRightRadius?: any;
    backgroundColor?: any;
    outlineWidth?: any;
    outlineStyle?: any;
    outlineColor?: any;
    outlineOffset?: any;
}
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

export interface VisualizerFlexChild {
    id: string;
    displayName: string;
    code: FlexChild;
}

export type Option = {
    label: string,
    display?: React.ReactNode
}