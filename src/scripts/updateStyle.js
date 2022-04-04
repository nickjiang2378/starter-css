/* eslint-disable no-undef */
const ACTIVATE = true;

export function updateStyle(changes) {
    console.log("Change clicked")
    /*chrome.devtools.inspectedWindow.eval(
        "updateElement($0)",
        { useContentScriptContext: true }
    );*/
    /*let changes = {
        "backgroundColor": "red"
    };*/
    //console.log(`updateSelectedElement(${JSON.stringify(changes)})`);
    //console.log(chrome.devtools)
    if (ACTIVATE) {
        chrome.devtools.inspectedWindow.eval(
            `updateSelectedElement(${JSON.stringify(changes)})`,
            { useContentScriptContext: true }
        );
        console.log("Passed point");
    }
}

export function listenForElementChanges(setStyles) {
    if (ACTIVATE) {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
            console.log("Request received");
            console.log(request);
            setStyles(request?.styles);
            sendResponse({'response': 'element received'});
            }
        );
    }
}