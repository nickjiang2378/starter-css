/* eslint-disable no-undef */
import { IS_PRODUCTION } from "../utils/constants";

function updateStyle(changes) {
    if (IS_PRODUCTION) {
        chrome.devtools.inspectedWindow.eval(
            `updateSelectedElement(${JSON.stringify(changes)})`,
            { useContentScriptContext: true }
        );
        //console.log("Updated element");
    } else {
        console.log("UPDATESTYLE NOT ACTIVATED");
    }
}

function listenForElementChanges(setStyles, setComputedStyles) {
    if (IS_PRODUCTION) {
        //getElementStyles(setStyles, setComputedStyles);
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                console.log("Computed styles received on extension side");
                setStyles(request?.selected?.styles);
                setComputedStyles(request?.selected?.computedStyles);
                sendResponse({'response': 'element received'});
            }
        );
    }
}

function getElementStyles(setStyles, setComputedStyles) {
    /* Finds the computed and inline styles of the current selected styles */
    if (IS_PRODUCTION) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(response) {
                console.log(response?.styles);
            });
        });
    }
}

export { updateStyle, listenForElementChanges, getElementStyles };