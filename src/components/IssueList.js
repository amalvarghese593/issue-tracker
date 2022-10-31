import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DataTable from "./datatable/datatable/DataTable";
import { useSso } from "../sso/sso/SsoProvider";
import { IDLE } from "../sso/constants";
import { useCloumns } from "./useColumns";
import "./index.css";
import { useIssuesData } from "../data-store/data-context";

export const IssueList = () => {
  // const dataRef = useRef([]);
  // const [data, setData] = useState([]);
  const { columns } = useCloumns();

  // const { token } = useSso();
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       let url = `${process.env.REACT_APP_API_URL}/api/v1/auth/issueTracker`;
  //       const res = await axios.get(url, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       dataRef.current = res.data.result;
  //       setData(res.data.result);
  //     } catch (err) {
  //       console.log({ err });
  //     }
  //   };
  //   if (token && token !== IDLE) {
  //     fetch();
  //   }
  // }, [token]);

  // const currentData = React.useMemo(() => {
  //   if (isDeleted) {
  //     dataRef.current = dataRef.current.filter(
  //       (item) => item._id !== isDeleted
  //     );
  //   }
  //   return dataRef.current;
  // }, [data, isDeleted]);
  const { data: currentData } = useIssuesData();
  return (
    <div className="pb-30" style={{ marginTop: "60px" }}>
      <main className="container-fluid">
        <section className="container issues-wrapper">
          <div className="issues-container shadow text-start">
            <h2 className="mb-3 fs-30">New issues</h2>
            <DataTable columns={columns} data={currentData} />
          </div>
        </section>
      </main>
    </div>
  );
};
