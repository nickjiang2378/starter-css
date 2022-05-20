/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function updateElement(element, changes) {
    console.log(changes);
    Object.keys(changes).forEach((key) => {
        element.style[key] = changes[key];
    })
    //element.style["backgroundColor"] = "red";
}

function updateSelectedElement(changes) {
    /* Updates the style attributes of the selected element */
    if ($0) {
        console.log(changes);
        updateElement($0, changes);
    }
    console.log("Updated selected element's styles");
}

function sendElementStyles(element) {
    /* Sends the current selected element's attributes through Chrome runtime */
    console.log("Sending element styles to backend");
    let styles = element.style;
    let computedStyles = window.getComputedStyle(element);
    chrome.runtime.sendMessage({ 
        "styles": styles,
        "computedStyles": computedStyles
    }, (response) => {
        console.log(response?.response);
    });
}