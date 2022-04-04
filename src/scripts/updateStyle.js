/* eslint-disable no-undef */
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
    chrome.devtools.inspectedWindow.eval(
        `console.log("Test"); updateSelectedElement(${JSON.stringify(changes)})`,
        { useContentScriptContext: true }
    );
    console.log("Passed point");
  }