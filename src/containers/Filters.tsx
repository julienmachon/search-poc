import * as React from "react";
import { useFilterQuery } from "../hooks/sparql";
import FiltersList, {
  AppliedFilters,
  FilterUpdatePayload
} from "../components/Filters";

const FiltersContainer: React.FunctionComponent<{
  orgLabel: string;
  projectLabel: string;
  viewID: string;
  query: string;
  appliedFilters: AppliedFilters;
  updateFilters?: (filterUpdate: FilterUpdatePayload) => void;
}> = props => {
  const { updateFilters, appliedFilters, ...rest } = props;
  const { loading, error, data } = useFilterQuery(rest);

  return (
    !loading && (
      <FiltersList
        {...{
          updateFilters,
          appliedFilters,
          filters: data
        }}
      />
    )
  );
};

export default FiltersContainer;
