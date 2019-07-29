import { useNexus } from "@bbp/react-nexus";
import { mapQueryResultsToFilters } from "../../utils/sparql/filters";

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
