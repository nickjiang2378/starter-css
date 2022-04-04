/* eslint-disable no-undef */
import logo from './logo.svg';
import './App.css';
import EditDashboard from './pages/EditDashboard';

function btnClicked() {
  console.log("Btn clicked")
  /*chrome.devtools.inspectedWindow.eval(
      "updateElement($0)",
      { useContentScriptContext: true }
  );*/
  let changes = {
      "backgroundColor": "red"
  };
  console.log(`updateSelectedElement(${JSON.stringify(changes)})`);
  console.log(chrome.devtools)
  chrome.devtools.inspectedWindow.eval(
      `console.log("Test"); updateSelectedElement(${JSON.stringify(changes)})`,
      { useContentScriptContext: true }
  );
  console.log("Passed point");
}

function App() {
  return (
    <div className="App">
      <EditDashboard />
    </div>
  );
}

export default App;
