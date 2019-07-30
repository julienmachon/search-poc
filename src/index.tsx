import * as React from "react";
import { render } from "react-dom";
import { NexusClient, createNexusClient } from "@bbp/nexus-sdk";
import { NexusProvider } from "@bbp/react-nexus";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { setUpSession, setToken } from "./utils/auth";
import Header from "./components/Header";
import SparqlView from "./containers/SparqlView";
import { SETTINGS } from "./config";
import Details from "./views/Details";

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
        <Router>
          <Switch>
            <Route path="/" exact>
              <SparqlView
                sparqlDatasetQueryConfig={SETTINGS.sparqlDatasetQueryConfig}
                sparqlFilterQuery={SETTINGS.sparqlFilterQuery}
              />
            </Route>
            <Route
              path="/details/:id"
              render={props => {
                return <Details id={props.match.params.id} />;
              }}
            />
          </Switch>
        </Router>
      </div>
    </NexusProvider>,
    rootElement
  );
}
main();
