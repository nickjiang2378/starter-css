/* eslint-disable no-undef */
console.log("Devtools.js")

let btn = document.getElementById("alterBtn");
btn.addEventListener("click", () => {
    console.log("Btn clicked")
    /*chrome.devtools.inspectedWindow.eval(
        "updateElement($0)",
        { useContentScriptContext: true }
    );*/
    let changes = {
        "backgroundColor": "red"
    };
    console.log(`updateSelectedElement(${JSON.stringify(changes)})`)
    chrome.devtools.inspectedWindow.eval(
        `updateSelectedElement(${JSON.stringify(changes)})`,
        { useContentScriptContext: true }
    );
})