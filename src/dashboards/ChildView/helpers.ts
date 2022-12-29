import { ObjectStringKeys } from "../../types/general";

function isFlexBox(styles: ObjectStringKeys | undefined) {
    if (!styles) {
        return false;
    }
    return styles.display === "flex" || styles.display === "inlineFlex"
}

function isGrid(styles: ObjectStringKeys | undefined) {
    if (!styles) {
        return false;
    }
    return styles.display === "grid" || styles.display === "inlineGrid"
}

export {
    isFlexBox,
    isGrid
}