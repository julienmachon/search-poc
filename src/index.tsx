import * as React from "react";
import { render } from "react-dom";

import FiltersList from "./components/FiltersList";
import Results from "./components/Results";

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
