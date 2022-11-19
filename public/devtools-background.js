/* eslint-disable no-undef */
console.log("Devtools-background.js activated")

chrome.devtools.panels.elements.createSidebarPane("StarterCSS",
  function(sidebar) {
    // sidebar initialization code here
    sidebar.setPage("index.html");
    console.log("Created sidebar panel")
    function updateDashboardSettings() {
      //console.log("Altering dashboard settings")
      chrome.devtools.inspectedWindow.eval(
        "sendElementStyles($0)",
        { useContentScriptContext: true }
      )
    }

    // Update the dashboard's settings every time you select a different element
    chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
      console.log("Dashboard updated: Changed the selected element");
      updateDashboardSettings();
    }); 

    // Updates the dashboard's settings every time you switch to the DesignEasy panel
    sidebar.onShown.addListener(() => {
      console.log("Dashboard updated: Switched to DesignEasy panel!");
      updateDashboardSettings();
    });

  
});
