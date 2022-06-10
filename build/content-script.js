/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/* Executes within the context of the browser */

const observer = new MutationObserver(function(mutations) {
    for (let mutation of mutations) {
        if (mutation.type === "attributes") {
            //console.log(mutation.target);
            sendElementStyles(mutation.target);
            break;
        }
    }
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting === "hello") {
            try {
                let elementAttributes = getElementAttributes($0);
                sendResponse(elementAttributes);
            } catch (e) {
                sendResponse({});
            }
        }
    }
);

function updateElement(element, changes) {
    let computedStyles = window.getComputedStyle(element);
    Object.keys(changes).forEach((key) => {
        if (computedStyles[key] !== changes[key]) {
            console.log(`New val of ${key}: ${changes[key]}`);
            element.style[key] = changes[key];
        }
    })
}

function updateSelectedElement(changes) {
    /* Updates the style attributes of the selected element */
    if ($0) {
        updateElement($0, changes);
    }
    //console.log("Updated selected element's styles with the following changes:");
    //console.log(changes);
}

function sendElementStyles(element) {
    /* Sends the current selected element's attributes through Chrome runtime */
    //console.log("Sending element styles to backend: ");
    //console.log(element);
    let elementAttributes = getElementAttributes(element);
    console.log(`Computed Opacity: ${elementAttributes.computedStyles?.opacity}`);
    chrome.runtime.sendMessage(elementAttributes, (response) => {
        console.log(`Response: ${response?.response}`);
    });
}

function getElementAttributes(element) {
    let styles = element.style;
    let computedStyles = window.getComputedStyle(element);
    return {
        "styles": styles,
        "computedStyles": computedStyles
    }
}

function listenToElement(element) {
    //console.log("Listening to new selected element");
    console.log(element);
    sendElementStyles(element);
    //listenForAttributeChanges(observer, element);
}

function listenForAttributeChanges(observer, element) {
    observer.disconnect();
    observer.observe(element, { attributes : true, attributeFilter : ['style', 'class'] }); 
}