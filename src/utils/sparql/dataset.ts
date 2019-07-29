import { SparqlQueryResults, Binding } from "./filters";

export const makeDatasetFromSparlQueryResponse = (
  response: SparqlQueryResults
) => {
  return response.results.bindings.reduce(
    (prev: { items: any[]; total: number }, binding: Binding) => {
      const [key] = Object.keys(binding);
      if (key === "total") {
        prev.total = Number(binding[key].value);
      } else if (!binding[key]) {
        return prev;
      } else {
        const self = binding[key].value;
        if (self) {
          prev.items.push(self);
        }
      }
      return prev;
    },
    {
      items: [],
      total: 0
    }
  );
};

export type DatasetQueryConfig = {
  vocab: string;
  graphs: { [filterName: string]: string };
};

export const makeDatasetQuery = (
  datasetQueryConfig: DatasetQueryConfig,
  appliedFilters: { [filterName: string]: string[] },
  size: number,
  from: number
): string => {
  // graphQueries look like this
  // {
  //   brainRegion: `
  // Graph ?g {
  //   VALUES ?search { #{values} }
  //   ?s1 nxs:brainRegion ?search .
  // }
  //   `
  // }

  const graphQueries = Object.keys(datasetQueryConfig.graphs)
    .map(key => {
      // unparsed query looks like this
      // Graph ?g {
      //   VALUES ?search { #{values} }
      //   ?s1 nxs:brainRegion ?search .
      // }
      const unparsedQuery = datasetQueryConfig.graphs[key];

      // we dont need to parse this for now...
      // mainly because I don't know how to handle these query caes
      // where you always want it to be used
      if (key === "constrainedBy") {
        return unparsedQuery;
      }

      // lets get the list of ids for this applied facet key
      // in our example, the key would be brainRegion
      // and the ids would be something like http://api.brain-map.org/api/v2/data/Structure/778
      const ids = appliedFilters[key];

      if (ids && ids.length) {
        // for the sparql query to work we need to always wrap URIs in <>
        const values = (ids || []).map(id => `<${id}>`).join(" ");

        // now we need to add the appliedFacet values, if available
        const parseQuery = unparsedQuery.replace("#{values}", values);
        return parseQuery;
      }
      return null;
    })
    .filter(queryString => !!queryString)
    .join("");

  return `
  ${datasetQueryConfig.vocab}

  SELECT ?total ?s
     WITH {
      SELECT DISTINCT ?s {
        ${graphQueries}
      }
     } AS %resultSet

   WHERE {
        {
           SELECT (COUNT(?s) AS ?total)
           WHERE { INCLUDE %resultSet }
        }
        UNION
       {
           SELECT *
           WHERE { INCLUDE %resultSet }
           ORDER BY ?s
           LIMIT ${size}
           OFFSET ${from}
        }
     }
   `;
};
