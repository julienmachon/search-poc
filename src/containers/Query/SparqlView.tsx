import { useNexus } from "@bbp/react-nexus";
import { Filter } from "../../components/FiltersList";
import { labelOf } from "../../utils";

export interface Binding {
  [filterName: string]: { type: string; value: string };
}

const useQuerySparqlView = ({
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
  const state = useNexus<any>(nexus =>
    nexus.View.sparqlQuery(orgLabel, projectLabel, viewID, query)
  );

  return state;
};

const mapQueryResultsToFilters = (queryResults: any) => {
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

export const useFilterQuery = () => {
  const query = `    prefix nxs: <https://neuroshapes.org/>
  prefix nxv: <https://bluebrain.github.io/nexus/vocabulary/>
  prefix prov: <http://www.w3.org/ns/prov#>
  prefix schema: <http://schema.org/>
  prefix nshapes: <https://neuroshapes.org/dash/>

  SELECT DISTINCT ?typeID ?speciesLabel ?speciesID  ?brainRegionID ?brainRegionLabel ?projectID ?strainID ?strainLabel ?mTypeLabel ?agentID
  {
    { 
      ?s nxs:contribution / prov:agent ?agentID
    } UNION {
      ?s nxs:annotation / nxs:hasBody ?noteBody .
       ?noteBody <http://www.w3.org/2000/01/rdf-schema#label> ?mTypeLabel
    } UNION {
      ?s nxs:brainLocation / nxs:brainRegion ?brainRegionID .
      # ?s nxv:constrainedBy nshapes:dataset .
      OPTIONAL { ?brainRegionID nxs:label ?brainRegionLabel }
    } UNION {
      ?s nxs:species ?speciesID .
      # ?s nxv:constrainedBy nshapes:dataset .
      OPTIONAL { ?speciesID nxs:label ?speciesLabel }
    } UNION {
      ?s nxs:strain ?strainID .
      # ?s nxv:constrainedBy nshapes:dataset .
      OPTIONAL { ?strainID nxs:label ?strainLabel }
    } UNION {
      ?s nxv:project ?projectID .
    } UNION {
      ?s rdf:type ?typeID .
      FILTER(STRSTARTS(STR(?typeID), "https://bbp-nexus.epfl.ch/vocabs/bbp/neurosciencegraph/core/v0.1.0/"))
      # ?s nxv:constrainedBy nshapes:dataset .
    }
  }`;
  const { data, loading, error } = useQuerySparqlView({
    orgLabel: "bbp",
    projectLabel: "nmc",
    viewID: "nxv:defaultSparqlIndex",
    query
  });
  return {
    data: data && mapQueryResultsToFilters(data),
    loading,
    error
  };
};
