/* eslint-disable no-undef */
import { IS_PRODUCTION } from "../utils/constants";
import { ObjectStringKeys, FixMeLater } from "../types/general"
import { DataModel } from "../types/messages";

function updateStyle(changes: ObjectStringKeys) {
    if (IS_PRODUCTION) {
        chrome.devtools.inspectedWindow.eval(
            `updateSelectedElement(${JSON.stringify(changes)})`,
            { useContentScriptContext: true }
        );
        //console.log("Updated element");
    } else {
        console.log("UPDATESTYLE NOT ACTIVATED");
        console.log(`Changes: ${JSON.stringify(changes)}`);
    }
}

function listenForElementChanges(setDataObj: (value: DataModel) => void) {
    if (IS_PRODUCTION) {
        //getElementStyles(setStyles, setComputedStyles);
        chrome.runtime.onMessage.addListener(
            function(request: DataModel, sender, sendResponse) {
                console.log("Computed styles received on extension side");
                console.log(request)
                setDataObj(request)
                sendResponse({'response': 'element received'});
            }
        );
    }
}

function getElementStyles() {
    /* Finds the computed and inline styles of the current selected styles */
    if (IS_PRODUCTION) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs: FixMeLater) {
            chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(response) {
                console.log(response?.styles);
            });
        });
    }
}

export { updateStyle, listenForElementChanges, getElementStyles };