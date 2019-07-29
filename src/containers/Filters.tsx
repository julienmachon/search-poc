import * as React from "react";
import { useFilterQuery } from "./Query/SparqlView";
import FiltersList from "../components/FiltersList";

const FiltersContainer: React.FunctionComponent<{}> = props => {
  const { loading, error, data } = useFilterQuery();

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
