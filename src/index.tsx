import * as React from "react";
import { render } from "react-dom";
import { NexusClient, createNexusClient } from "@bbp/nexus-sdk";
import { NexusProvider } from "@bbp/react-nexus";
import { setUpSession, setToken } from "./utils/auth";
import Header from "./components/Header";
import Workspace from "./containers/Workspace";
import { SETTINGS } from "./config";

import "antd/dist/antd.css";
import "./styles.css";

async function main() {
  const [userManager, user] = await setUpSession();
  // create nexus instance
  const nexus: NexusClient = createNexusClient({
    uri: SETTINGS.environment,
    fetch,
    links: [setToken]
  });

  const rootElement = document.getElementById("root");
  render(
    <NexusProvider nexusClient={nexus}>
      <div className="App">
        <Header user={user} userManager={userManager} />
        <Workspace sparqlFilterQuery={SETTINGS.sparqlFilterQuery} />
      </div>
    </NexusProvider>,
    rootElement
  );
}
main();
