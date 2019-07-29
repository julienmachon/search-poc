import * as React from "react";
import { render } from "react-dom";
import Header from "./components/Header";
import FiltersList from "./components/FiltersList";
import Results from "./components/Results";

import "antd/dist/antd.css";
import "./styles.css";

const appliedFacets = {};
const filters = [
  {
    name: "Brain Region",
    values: [
      {
        id: "Somatosensory Cortex",
        label: "Somatosensory Cortex"
      }
    ]
  },
  {
    name: "M-Type",
    values: [
      {
        id: "123",
        label: "Layer 5 PC"
      }
    ]
  }
];
const handleUpdateFacets = () => {};

function App() {
  return (
    <div className="App">
      <Header />
      <FiltersList
        appliedFilters={appliedFacets}
        filters={filters}
        updateFilters={handleUpdateFacets}
      />
      <Results />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
