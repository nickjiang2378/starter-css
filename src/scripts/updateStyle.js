/* eslint-disable no-undef */
const ACTIVATE = true;

export function updateStyle(changes) {
    if (ACTIVATE) {
        chrome.devtools.inspectedWindow.eval(
            `updateSelectedElement(${JSON.stringify(changes)})`,
            { useContentScriptContext: true }
        );
        //console.log("Updated element");
    } else {
        console.log("UPDATESTYLE NOT ACTIVATED");
    }
}

export function listenForElementChanges(setStyles, setComputedStyles) {
    if (ACTIVATE) {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                setStyles(request?.styles);
                setComputedStyles(request?.computedStyles);
                sendResponse({'response': 'element received'});
            }
        );
    }
}