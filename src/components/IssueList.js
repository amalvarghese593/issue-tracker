import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./datatable/datatable/DataTable";
import { columns } from "./usage";

export const IssueList = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "https://nextmov.webpipl.com/api/v1/auth/issueTracker"
        );
        setData(res.data.result);
      } catch (err) {
        console.log({ err });
      }
    };
    fetch();
  }, []);
  return (
    <div className="pb-30">
      <main>
        <section className="container issues-wrapper">
          <div className="issues-container shadow text-start">
            <h2 className="mb-3 fs-30">Frequent issues</h2>
            <DataTable columns={columns} data={data} />
          </div>
        </section>
      </main>
    </div>
  );
};
