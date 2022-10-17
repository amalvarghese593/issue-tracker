import React from "react";

const DataTableCollapsableRow = ({ row, hiddenColumns }) => {
  return (
    <div className="row">
      {row?.allCells.map((cell, idx) => {
        // console.log("cell", cell.column?.detailedGrid);
        return hiddenColumns?.includes(cell.column.id) &&
          cell.column.collapsed ? (
          <div
            className={
              cell.column?.detailedGrid
                ? `${cell.column?.detailedGrid} mb-2`
                : `col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 mb-2`
            }
            key={idx}
          >
            <span className="fs-13 " style={{ opacity: "0.8" }}>
              {cell.column.Header}:
            </span>
            <div className="ms-1 fs-14">{cell.render("Cell")}</div>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default DataTableCollapsableRow;
