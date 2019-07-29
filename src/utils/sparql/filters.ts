import { Filter } from "../../components/FiltersList";
import { labelOf } from "../../utils";

export interface Binding {
  [filterName: string]: { type: string; value: string };
}

export type SparqlQueryResults = {
  head: {
    vars: string[];
  };
  results: {
    bindings: Binding[];
  };
};

export const mapQueryResultsToFilters = (queryResults: SparqlQueryResults) => {
  return (
    queryResults &&
    queryResults.results &&
    queryResults.results.bindings.reduce((memo: Filter[], entry: Binding) => {
      const [filterIDData, filterLabelData] = Object.keys(entry);
      const filterName = filterIDData.replace("ID", "");
      const filter: Filter | undefined = memo.find(
        (entry: any) => entry.name === filterName
      );
      const filterValue = {
        id: entry[filterIDData].value,
        label: filterLabelData
          ? entry[filterLabelData].value
          : labelOf(entry[filterIDData].value)
      };
      if (filter) {
        // don't push the same ID to the filter list
        // There may be repeats
        // and we don't want to display them
        if (
          filter.values.find(filter => filter.id === entry[filterIDData].value)
        ) {
          return memo;
        }

        // If it's not a repeat, add it to the values list
        filter.values.push(filterValue);

        // sort the values alphabetically (should be done last, but whatever)
        filter.values.sort((a, b) => {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });
      } else {
        memo.push({
          name: filterName,
          values: [filterValue]
        });
      }
      return memo;
    }, [])
  );
};
