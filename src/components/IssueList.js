import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./datatable/datatable/DataTable";
import { columns } from "./usage";
import { useNavigate } from "react-router-dom";

export const IssueList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
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
  const raiseTicket = () => {
    navigate("/raise-ticket");
  };
  return (
    <div className="pb-30">
      <main>
        {/* <menu className="bg-light">
          <nav className="container navbar">
            <img src="./webpipl-logo.png" alt="logo" width={"150px"} />
            <div className="raise-ticket-btn-container">
              <button className="btn btn-secondary" onClick={raiseTicket}>
                Raise a ticket
              </button>
            </div>
          </nav>
        </menu> */}
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
