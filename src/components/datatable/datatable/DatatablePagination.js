import React from "react";

const DatatablePagination = ({
  defaultValue,
  setPageSize,
  gotoPage,
  pageSize,
}) => {
  return (
    <div className="py-3">
      <span className="goToPage">
        Go to page:{" "}
        <input
          type="number"
          defaultValue={defaultValue}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            if (page >= 0) {
              gotoPage(page);
            }
          }}
          style={{ width: "50px" }}
        />
      </span>{" "}
      <select
        className="mx-2"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
        >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DatatablePagination;
