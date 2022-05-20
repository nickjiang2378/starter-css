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
    updateDashboardSettings();
    function updateDashboardSettings() {
      console.log("Altering dashboard settings")
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

    // Update the dashboard's settings every time you select a different element
    chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
      console.log("Changed the selected element");
      updateDashboardSettings();
    }); 

    // Updates the dashboard's settings every time you switch to the DesignEasy panel
    sidebar.onShown.addListener(() => {
      console.log("Switched to DesignEasy panel!");
      updateDashboardSettings();
    });

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
