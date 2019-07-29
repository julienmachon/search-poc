import * as React from "react";
import { render } from "react-dom";
import { NexusClient, createNexusClient } from "@bbp/nexus-sdk";
import { NexusProvider } from "@bbp/react-nexus";
import { setUpSession, setToken } from "./utils/auth";
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

async function main() {
  // setup user session
  const [userManager, user] = await setUpSession();
  // create nexus instance
  const nexus: NexusClient = createNexusClient({
    uri: "https://dev.nexus.ocp.bbp.epfl.ch/v1",
    fetch,
    links: [setToken]
  });

  const rootElement = document.getElementById("root");
  render(
    <NexusProvider nexusClient={nexus}>
      <div className="App">
        <Header user={user} userManager={userManager} />
        <FiltersList
          appliedFilters={appliedFacets}
          filters={filters}
          updateFilters={handleUpdateFacets}
        />
        <Results />
      </div>
    </NexusProvider>,
    rootElement
  );
}
main();
