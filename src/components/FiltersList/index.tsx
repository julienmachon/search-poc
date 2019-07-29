import * as React from "react";
import { Checkbox, Collapse, Badge } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";

export interface Filter {
  name: string;
  values: {
    id: string;
    label: string;
  }[];
}

export interface AppliedFilters {
  [filterName: string]: string[];
}

export interface FilterUpdatePayload {
  facetName: string;
  values: string[];
}

interface FilterProps {
  appliedFilters?: AppliedFilters;
  filters?: Filter[];
  updateFilters?: (filterUpdate: FilterUpdatePayload) => void;
}

const FacetList: React.FunctionComponent<FilterProps> = props => {
  const { appliedFilters = {}, filters, updateFilters = () => {} } = props;

  const handleChange = (facetName: string, values: any[]) => {
    updateFilters({
      facetName,
      values
    });
  };

  return (
    <div className="facet-list">
      <Collapse bordered={false}>
        {filters &&
          !!filters.length &&
          filters.map((facet, index) => {
            const groupAppliedFilters = appliedFilters[facet.name];
            const groupAppliedFiltersCount = groupAppliedFilters
              ? groupAppliedFilters.length
              : 0;
            const header = (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ width: "60%" }}>{facet.name}</div>
                <div style={{ width: "20%" }}>
                  <Badge
                    count={groupAppliedFiltersCount}
                    style={{ backgroundColor: "#44c7f4" }}
                  />
                </div>
                <div>{facet.values.length}</div>
              </div>
            );
            return (
              <CollapsePanel header={header} key={`$${index}`}>
                <Checkbox.Group
                  style={{ width: "100%" }}
                  onChange={values => handleChange(facet.name, values)}
                >
                  <ul className="checkbox-list">
                    {facet.values.map(value => {
                      return (
                        <li key={value.id}>
                          <Checkbox
                            value={value.id}
                            checked={
                              groupAppliedFilters &&
                              groupAppliedFilters.indexOf(value.id) >= 0
                            }
                          >
                            {value.label}
                          </Checkbox>
                        </li>
                      );
                    })}
                  </ul>
                </Checkbox.Group>
              </CollapsePanel>
            );
          })}
      </Collapse>
    </div>
  );
};

export default FacetList;
