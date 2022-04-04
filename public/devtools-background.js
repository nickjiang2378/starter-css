/* eslint-disable no-undef */
console.log("Devtools-background.js activated")
/*chrome.devtools.panels.create("My Panel",
    "images/get_started16.png",
    "devtools.html",
    function(panel) {
      // code invoked on panel creation
    }
);*/
chrome.devtools.panels.elements.createSidebarPane("DesignEasy",
  function(sidebar) {
    // sidebar initialization code here
    sidebar.setPage("index.html");
    console.log("Created sidebar panel")
    update();
    function update() {
      console.log("Change detected")
      chrome.devtools.inspectedWindow.eval(
        "sendElementStyles($0)",
        { useContentScriptContext: true }
      )
      //console.log(document.getElementById("alterBtn"));
      /*chrome.devtools.inspectedWindow.eval(
        "updateElement($0)",
        { useContentScriptContext: true }
      )*/
    }
    chrome.devtools.panels.elements.onSelectionChanged.addListener(update);

    /*function update(e) {
      sidebar.setExpression(
        `window.getComputedStyle($0)`,
        `Client position`
      );
    }
    update();
    console.log("Created sidebar panel")
    chrome.devtools.panels.elements.onSelectionChanged.addListener(update);*/
  
});
