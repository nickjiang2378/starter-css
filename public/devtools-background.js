/* eslint-disable no-undef */
console.log("Devtools-background.js activated")

chrome.devtools.panels.elements.createSidebarPane("StarterCSS",
  function(sidebar) {
    let onTab = true;
    // sidebar initialization code here
    sidebar.setPage("index.html");
    console.log("Created sidebar panel")
    function updateDashboardSettings() {
      //console.log("Altering dashboard settings")
      if (onTab) {
        chrome.devtools.inspectedWindow.eval(
          "sendElementStyles($0)",
          { useContentScriptContext: true }
        )
      } else {
        console.log(`On Tab: ${onTab}`)
      }
    }

    let ticker = 0;

    // Update the dashboard's settings every time you select a different element
    chrome.devtools.panels.elements.onSelectionChanged.addListener(() => {
      console.log("Dashboard updated: Changed the selected element");
      updateDashboardSettings();
    }); 

    // Updates the dashboard's settings every time you switch to the DesignEasy panel
    sidebar.onShown.addListener(() => {
      onTab = true;
      console.log("Dashboard updated: Switched to DesignEasy panel! " + ticker);
      updateDashboardSettings();

      const options = {
        method: 'POST',
        headers: {accept: 'text/plain', 'content-type': 'application/json'},
        body: JSON.stringify([{properties: {token: 'c669da53b5fec6c7879cdb3b5e82b6de'}, event: 'Switched to StarterCSS Tab'}])
      };
      
      fetch('https://api.mixpanel.com/track?ip=1', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));

    });

    // When you move away from the StarterCSS tab, none of the element updates should run
    sidebar.onHidden.addListener(() => {
      onTab = false;
    })
  
});
