import * as React from "react";
import { useFilterQuery } from "../hooks/sparql/useSparqlFilterQuery";
import FiltersList from "../components/FiltersList";

const FiltersContainer: React.FunctionComponent<{
  orgLabel: string;
  projectLabel: string;
  viewID: string;
  query: string;
}> = props => {
  const { loading, error, data } = useFilterQuery(props);

  const appliedFilters = {};

  const handleUpdateFilters = () => {};

  return (
    !loading && (
      <FiltersList
        {...{
          handleUpdateFilters,
          appliedFilters,
          filters: data
        }}
      />
    )
  );
};

export default FiltersContainer;
