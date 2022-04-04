/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function updateElement(element, changes) {
    console.log(changes);
    Object.keys(changes).forEach((key) => {
        element.style[key] = changes[key];
    })
    //element.style["backgroundColor"] = "red";
    console.log("updated element");
}

function updateSelectedElement(changes) {
    if ($0) {
        console.log("Selected element detected")
        console.log(changes);
        updateElement($0, changes);
    }
    console.log("Updated selected element");
}