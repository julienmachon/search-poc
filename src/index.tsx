import * as React from "react";
import { render } from "react-dom";

import Filters from "./Filters";
import Results from "./Results";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Filters />
      <Results />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
