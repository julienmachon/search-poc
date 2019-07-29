import * as React from "react";
import Filters from "./Filters";
import Results from "../components/Results";
import { AppliedFilters, FilterUpdatePayload } from "../components/FiltersList";

const Workspace: React.FunctionComponent<{
  sparqlFilterQuery: {
    orgLabel: string;
    projectLabel: string;
    viewID: string;
    query: string;
  };
}> = props => {
  const [appliedFilters, setAppliedFilters] = React.useState<AppliedFilters>(
    {}
  );
  const { sparqlFilterQuery } = props;

  const updateFilters = (filterUpdate: FilterUpdatePayload) => {
    setAppliedFilters({
      ...appliedFilters,
      [filterUpdate.facetName]: filterUpdate.values
    });
  };

  return (
    <>
      <Filters {...{ ...sparqlFilterQuery, appliedFilters, updateFilters }} />
      <Results />
    </>
  );
};

export default Workspace;
