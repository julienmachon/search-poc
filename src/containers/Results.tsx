import * as React from "react";
import { useDatasetQuery } from "../hooks/sparql/useSparqlFilterQuery";
import { AppliedFilters } from "../components/FiltersList";
import Results from "../components/Results";
import { DatasetQueryConfig, makeDatasetQuery } from "../utils/sparql/dataset";

const FiltersContainer: React.FunctionComponent<{
  orgLabel: string;
  projectLabel: string;
  viewID: string;
  datasetQueryConfig: DatasetQueryConfig;
  appliedFilters: AppliedFilters;
}> = props => {
  const {
    datasetQueryConfig,
    appliedFilters,
    orgLabel,
    projectLabel,
    viewID
  } = props;

  const query = makeDatasetQuery(datasetQueryConfig, appliedFilters, 20, 0);

  console.log({ query, appliedFilters });

  const { loading, error, data } = useDatasetQuery({
    orgLabel,
    projectLabel,
    viewID,
    query
  });

  return !loading && <Results {...data} />;
};

export default FiltersContainer;
