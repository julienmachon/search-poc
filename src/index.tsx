import * as React from "react";
import { render } from "react-dom";
import Header from "./components/Header";

import "antd/dist/antd.css";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Header />
      <h1>Search POC</h1>
      <h2>🔍🔍🔍🔍🔍🔍</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
