import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./datatable/datatable/DataTable";
// import { columns } from "./usage";
import { useSso } from "../sso/sso/SsoProvider";
import { IDLE } from "../sso/constants";
import { useCloumns } from "./useColumns";

export const IssueList = () => {
  const [data, setData] = useState([]);
  const { columns, isDeleted } = useCloumns();
  const { token } = useSso();
  useEffect(() => {
    const fetch = async () => {
      try {
        let url = `${process.env.REACT_APP_API_URL}/api/v1/auth/issueTracker`;
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log( res );
        setData(res.data.result);
      } catch (err) {
        console.log({ err });
      }
    };
    if (token && token !== IDLE) {
      fetch();
    }
  }, [token, isDeleted]);

  // const currentData = React.useMemo(() => {
  //   return data;
  // }, [data, onDelete]);
  return (
    <div className="pb-30" style={{ marginTop: "60px" }}>
      <main className="container-fluid">
        <section className="container issues-wrapper">
          <div className="issues-container shadow text-start">
            <h2 className="mb-3 fs-30">New issues</h2>
            <DataTable columns={columns} data={data} />
          </div>
        </section>
      </main>
    </div>
  );
};
