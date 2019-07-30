import { useNexus } from "@bbp/react-nexus";
import { mapQueryResultsToFilters } from "../../utils/sparql/filters";
import { makeDatasetFromSparlQueryResponse } from "../../utils/sparql/dataset";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

export const useFilterQuery = ({
  orgLabel,
  projectLabel,
  viewID,
  query
}: {
  orgLabel: string;
  projectLabel: string;
  viewID: string;
  query: string;
}) => {
  const { data, loading, error } = useNexus<any>(nexus =>
    nexus.View.sparqlQuery(orgLabel, projectLabel, viewID, query)
  );

  return {
    data: data && mapQueryResultsToFilters(data),
    loading,
    error
  };
};

export const useDatasetQuery = ({
  orgLabel,
  projectLabel,
  viewID,
  query
}: {
  orgLabel: string;
  projectLabel: string;
  viewID: string;
  query: string;
}) => {
  const { data, loading, error } = useNexus<any>(
    nexus => nexus.View.sparqlQuery(orgLabel, projectLabel, viewID, query),
    [query]
  );

  console.log(data, query);

  return {
    data: data && makeDatasetFromSparlQueryResponse(data),
    loading,
    error
  };
};
