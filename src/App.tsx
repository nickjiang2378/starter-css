/* eslint-disable no-undef */

import './App.css';
import React from "react";
import EditDashboard from './EditDashboard';

if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development"
  // && /VIVID_ENABLED=true/.test(document.cookie)
) {
  import("vivid-studio").then((v) => v.run());
  import("vivid-studio/style.css");
}

function App() {
  return (
    <div className="App">
      <EditDashboard />
    </div>
  );
}

export default App;

