import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  usePagination,
  useSortBy,
  useRowSelect,
  useExpanded,
} from "react-table";
import "./index.css";
// import { useLocation } from "react-router-dom";
import { useExportData } from "./useExportHook";
import { useResponsive } from "./useResponsive";
import DatatablePagination from "./DatatablePagination";
// import ColumnHidding from "./ColumnHidding";
import DataTableCollapsableRow from "./DataTableCollapsableRow";
// import useViewport, { isVisible } from "./useDataTableViewPort";
// import { useLocation, useNavigate } from "react-router-dom";
// import getExportFileBlob from "./excell.module";

const Styles = styled.div`
  .pagination button {
    margin: 0px 3px;
    border: 1px solid #0e4692;
    background: #fff;
    padding: 5px 10px;
    color: #0e4692;
  }
  .pagination button:disabled {
    background: #fff;
    color: rgba(16, 16, 16, 0.3);
    border: 1px solid #f2eeeec7;
  }
  .pagination span {
    margin: 0px 5px;
  }
  .pagination select {
    margin-left: 10px;
  }
`;

const GlobalFilter = ({
  // preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchLabel,
}) => {
  // const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <DataTableSearch
      searchLabel={searchLabel}
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, isAllChecked, disableSelection, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <label className={`checkbox  `}>
          <input
            type="checkbox"
            disabled={disableSelection}
            ref={resolvedRef}
            {...rest}
          />
          <span
            className={`checkbox-indicator ${
              isAllChecked ? "checked-all" : ""
            }`}
          ></span>
        </label>
      </>
    );
  }
);
const DataTable = ({
  id: tableId,
  exportable,
  title,
  onSelect,
  hidden = [],
  progress: isLoading,
  columns,
  data,
  enableSelect,
  onCheckboxRender,
  disableCheckboxFn,
  countTitleLabel,
  // getExportFileBlob,
  disablePagination,
  disableSearch,
  customPageSize,
  columnHiding,
  searchLabel,
}) => {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const [expanded, setExpanded] = React.useState({ firstName: true });
  const [collapsed, setCollapsed] = useState("");
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    exportData,
    getToggleHideAllColumnsProps,
    allColumns,

    state: { rows, pageIndex, pageSize, selectedRowIds, hiddenColumns },
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      // getExportFileBlob: getExportFileBlob,
      onExpandedChange: setExpanded,
      expanded: { expanded },
      initialState: {
        tableId: tableId,
        autoResetPage: false,
        pageIndex: 0,
        hiddenColumns: hidden,
        showPagination: false,
        disableSortBy: true,
        pageSize: disablePagination
          ? customPageSize || 350
          : customPageSize || 30,
      },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    useExportData,
    useResponsive,

    (hooks) => {
      if (!enableSelect) return null;
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => {
            if (onCheckboxRender) {
              onCheckboxRender(row.original);
            }
            return (
              <div>
                <IndeterminateCheckbox
                  disableSelection={
                    disableCheckboxFn
                      ? disableCheckboxFn?.(row.original)
                      : false
                  }
                  {...row.getToggleRowSelectedProps()}
                />
              </div>
            );
          },
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {}, [rows]);

  useEffect(() => {
    const selectedIds = Object.keys(selectedRowIds);
    var selectedRowsData = selectedIds
      .map((x) => data[x])
      .filter((x) => x != null);
    onSelect?.(selectedRowsData);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [selectedRowIds]);
  const handleCollapse = (rowIndex) => {
    setCollapsed(rowIndex);
  };
  const hasAnyCollapsed = useMemo(() =>
    allColumns.some((column) => column?.collapsed)
  );

  const isFirstColumn = useMemo(() => {
    let uncollapsedColumns = [];
    for (let column of allColumns) {
      if (!column.collapsed && column.isVisible) {
        uncollapsedColumns.push(column);
      }
    }
    return uncollapsedColumns?.[0] || {};
  }, [allColumns, hiddenColumns]);

  return (
    <Styles>
      {countTitleLabel && (
        <strong className="">{`${countTitleLabel} ${data?.length}`}</strong>
      )}
      <div className="pb-4 bg-white shadowContainer">
        <div className="d-flex flex-column  tableFilter">
          <section className="d-flex justify-between items-center tableFilter">
            {!disablePagination ? (
              <DatatablePagination
                defaultValue={pageIndex + 1}
                setPageSize={setPageSize}
                gotoPage={gotoPage}
                pageSize={pageSize}
              />
            ) : (
              <div className="datatable-title">
                {typeof title === "string" ? (
                  <h4>{title}</h4>
                ) : (
                  typeof title !== "undefined" && title
                )}

                {enableSelect && (
                  <small style={{ opacity: "0.8", fontWeight: "lighter" }}>
                    Select rows to save by clicking on checkbox
                  </small>
                )}
              </div>
            )}
            {!disableSearch && (
              <div className="text-end my-2 flex flex-row ">
                {exportable === true && (
                  <button
                    className="me-2 mr-2 rounded-3 columns-btn nav-link bg-light flex justify-between items-center inline-flex justify-center rounded-1 font-medium "
                    onClick={() => {
                      exportData("xlsx", true);
                    }}
                  >
                    <i className="fal fa-file-export me-1"></i> Export
                  </button>
                )}
                {/* {columnHiding && (
                  <ColumnHidding
                    allColumns={allColumns}
                    getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
                  />
                )} */}
                <GlobalFilter
                  searchLabel={searchLabel}
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </div>
            )}
          </section>
          {/* <small>Showing 2 of</small> */}
        </div>

        <div
          className="tableContainer"
          style={{ borderBottom: disablePagination ? 0 : "2px solid #f7f7f7" }}
        >
          <table {...getTableProps()} id={tableId || "table"}>
            <thead className="cf">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) =>
                    column.collapsed && column.collapsed === true ? null : (
                      <th
                        style={{ width: 20, overflow: "hidden" }}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        <div
                          className={`d-flex justify-between ${
                            column.render("Header") === "Action" &&
                            "justify-center"
                          }`}
                        >
                          <div className="headerLable">
                            {column.render("Header")}
                            {column.collapsed}
                          </div>
                          {column.canSort && (
                            <div className="me-4 d-flex flex-row flex-nowrap items-center justify-center sortableSection">
                              <i
                                className="fas fa-caret-up sortUp"
                                style={{ fontSize: "23px" }}
                              ></i>
                              <i
                                className="fas fa-caret-down sortDown"
                                style={{ fontSize: "23px" }}
                              ></i>
                            </div>
                          )}
                        </div>
                      </th>
                    )
                  )}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {isLoading || page.length === 0 ? (
                <tr>
                  <></>
                  <td
                    style={{ width: 20, overflow: "hidden" }}
                    className="text-center"
                    colSpan={columns.length}
                  >
                    {isLoading ? (
                      <Fragment>
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </Fragment>
                    ) : (
                      "No data"
                    )}
                  </td>
                </tr>
              ) : (
                page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Fragment key={i}>
                      <tr {...row.getRowProps()} className="table-row">
                        {row.cells.map((cell, cellIdx) => {
                          return typeof cell.column.collapsed !== "undefined" ||
                            collapsed === false ? null : (
                            <td {...cell.getCellProps()} key={cellIdx}>
                              {hasAnyCollapsed &&
                                isFirstColumn.id === cell?.column?.id && (
                                  <div
                                    // className="border border-danger"
                                    style={{
                                      display: "inline-block",
                                      padding: "3px 3px 3px 6px",
                                      // border: "1px solid #555",
                                      borderRadius: ".4em",
                                      backgroundColor: "#e9e4e4",
                                    }}
                                  >
                                    <CollapseButton
                                      handleCollapse={handleCollapse}
                                      collapsed={collapsed}
                                      index={i}
                                    />
                                  </div>
                                )}
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                      {i === collapsed && (
                        <tr>
                          <td colSpan={row.cells?.length}>
                            <DataTableCollapsableRow
                              row={row}
                              hiddenColumns={allColumns
                                ?.filter((col) => col.collapsed === true)
                                .map((c) => c.id)}
                            />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {!disablePagination && (
          <div className="pagination mt-4 d-flex justify-content-between bg-white">
            <div>
              <span>
                Page
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
            </div>
            <div>
              <button
                className="double-backward-arrow"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <DoubleArrowIcon />
              </button>
              <button
                className="backward-arrow"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <UniqueArrowIcon />
              </button>
              <button
                className="forward-arrow"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <UniqueArrowIcon />
              </button>
              <button
                className="double-forward-arrow"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <DoubleArrowIcon />
              </button>
            </div>
          </div>
        )}
      </div>
    </Styles>
  );
};

const DataTableSearch = ({ searchLabel, onChange, value }) => {
  const inputRef = useRef(null);
  const foucsInput = () => (inputRef ? inputRef.current.focus() : () => {});
  return (
    <div className="table-search">
      <article className="table-search-input">
        <div onClick={foucsInput}>
          <i className="bi bi-search"></i>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={searchLabel || "Enter your keyword"}
        />
      </article>
    </div>
  );
};

export default DataTable;

const CollapseButton = ({ collapsed, handleCollapse, index }) => {
  return (
    <Fragment>
      <button
        className="p-0 m-0 border-0 bg-transparent collapse-row-btn"
        style={{ padding: "10px", border: "1px solid green" }}
        onClick={() =>
          index === collapsed ? handleCollapse("") : handleCollapse(index)
        }
      >
        {index === collapsed ? (
          // <i className="fa fa-minus-circle me-2 fs-18 text-primary"></i>
          // <i className="fa-regular fa-minus"></i>
          <i className="fa-solid fa-minus"></i>
        ) : (
          // <i className="fa-regular fa-plus"></i>
          <i className="fa-solid fa-plus"></i>
          // <i className="fa fa-plus-circle fs-18 text-secondary"></i>
        )}
      </button>
    </Fragment>
  );
};

const DoubleArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="currentColor"
    className="bi bi-chevron-double-left"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
    <path
      fillRule="evenodd"
      d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);
const UniqueArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="currentColor"
    className="bi bi-chevron-left"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);
