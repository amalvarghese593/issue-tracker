import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./datatable/datatable/DataTable";
import { useSso } from "../sso/sso/SsoProvider";
import { IDLE } from "../sso/constants";
import { useCloumns } from "./useColumns";
import "./index.css";
import { useIssuesData } from "../data-store/issue-context";

export const IssueList = () => {
  // const dataRef = useRef([]);
  // const [data, setData] = useState([]);
  const { columns } = useCloumns();

  // const currentData = React.useMemo(() => {
  //   if (isDeleted) {
  //     dataRef.current = dataRef.current.filter(
  //       (item) => item._id !== isDeleted
  //     );
  //   }
  //   return dataRef.current;
  // }, [data, isDeleted]);
  const { data } = useIssuesData();
  const [filters, setFilters] = useState({});
  const priorityOptions = ["High", "Medium", "Low"];
  const statusOptions = ["Resolved", "Unresolved", "In Progress", "open"];
  const appNameOptions = ["i-Verified", "My-ATS"];
  const ticketOptions = [
    "I want to report a bug",
    "What is WebPipl Customer Care Number?",
    "I want to provide feedback",
    "I want to request a new feature",
    "I want to consult Marketing team",
    "I want to consult HR team",
    "UI issue",
    "Backend issue",
  ];
  const onAddFilter = (filterType, filterValue) => {
    setFilters((prev) => {
      const obj = { ...prev };
      obj[filterType] = filterValue;
      return obj;
    });
  };
  const onRemoveFilter = (filterType) => {
    setFilters((prev) => {
      const obj = { ...prev };
      delete obj[filterType];
      return obj;
    });
  };
  const filteredData = React.useMemo(() => {
    const filterTypes = Object.keys(filters);
    if (!filterTypes.length) {
      return data;
    } else {
      return data.filter((row) => {
        /* checking if a row matches every filter type in the filters array */
        for (let i = 0; i < filterTypes.length; i++) {
          if (row[filterTypes[i]] !== filters[filterTypes[i]]) return false;
        }
        return true;
      });
    }
  }, [data, filters]);

  return (
    <div className="pb-30">
      <main className="container-fluid">
        <section className="container issues-wrapper">
          <div className="filters-cntr">
            {/* <span>
              Filters <i className="far fa-filter"></i> :
            </span> */}
            <Filter
              filters={filters}
              onAddFilter={onAddFilter}
              options={statusOptions}
              label="Status"
              name="status"
            />
            <Filter
              filters={filters}
              onAddFilter={onAddFilter}
              options={priorityOptions}
              label="Priority"
              name="priority"
            />
            <Filter
              filters={filters}
              onAddFilter={onAddFilter}
              options={appNameOptions}
              label="App name"
              name="appName"
            />
            <Filter
              filters={filters}
              onAddFilter={onAddFilter}
              options={ticketOptions}
              label="Ticket type"
              name="typeOfTicket"
            />
          </div>
          <FilterCards
            label="Applied filters"
            filters={filters}
            onRemoveFilter={onRemoveFilter}
          />
          <StatusIndicator statusOptions={statusOptions} />
          <div className="issues-container shadow text-start">
            {/* <h2 className="mb-3 fs-30">New issues</h2> */}
            <DataTable
              columns={columns}
              data={filteredData}
              countTitleLabel="Total records found:"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

const Filter = ({ options, label, name, onAddFilter, filters }) => {
  return (
    <span className="filter">
      <label htmlFor="">{label}</label>
      <select
        onChange={(e) => onAddFilter(name, e.target.value)}
        value={filters[name] || ""}
      >
        <option value="">--Select--</option>
        {options.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
    </span>
  );
};

const FilterCards = ({ filters, onRemoveFilter, label }) => {
  return !!Object.keys(filters).length ? (
    <div className="filter-card">
      <div className="filter-chips-cntr">
        {Object.keys(filters).map((filter, idx) => (
          <span className="filter-chip" key={idx}>
            {filters[filter]}
            <span className="close-btn" onClick={() => onRemoveFilter(filter)}>
              <i className="fad fa-times-square"></i>
            </span>
          </span>
        ))}
      </div>
    </div>
  ) : undefined;
};

const StatusIndicator = ({ statusOptions }) => {
  return (
    <section className="status-indicator-cntr">
      {statusOptions.map((cls, idx) => (
        <span className="status-indicator" key={idx}>
          <span
            className={`status-color bg-${cls.toLowerCase().replace(" ", "")}`}
          ></span>
          {cls}
        </span>
      ))}
    </section>
  );
};
