import React from "react";
import Select from "./forms-controls/forms/Select";
import { useSso } from "../sso/sso/SsoProvider";
import axios from "axios";
import { IDLE } from "../sso/constants";
import { replace } from "formik";
import { useState } from "react";
import { PopoverCustom } from "./Popover";
import img from "../assets/images/issue.jpg";

export const useCloumns = () => {
  const { token } = useSso();
  const [isDeleted, setIsDeleted] = useState();
  const columns = [
    {
      accessor: "appName",
      Header: "Application",
      breakpoint: "",
      Cell: ({ row: { original } }) => {
        return (
          <div
            className="flex items-start flex-column"
            style={{ display: "inline-block", marginLeft: "10px" }}
          >
            {original.appName}
          </div>
        );
      },
    },
    {
      accessor: "title",
      Header: "Title",
      breakpoint: "xs sm",
      Cell: ({ row: { original } }) => {
        return (
          <div className="popover-cntr">
            <PopoverCustom label={original.title} component={BtnControl}>
              <PanelContent title={original.title} />
            </PopoverCustom>
          </div>
        );
      },
    },
    {
      accessor: "typeOfTicket",
      Header: "Ticket type",
      breakpoint: "xs",

      Cell: ({ row: { original } }) => {
        return (
          <div className="flex items-start flex-column">
            {original.typeOfTicket}
          </div>
        );
      },
    },
    {
      accessor: "description",
      Header: "Description",
      breakpoint: "xs sm md",
      Cell: ({ row: { original } }) => {
        return (
          <div className="flex items-start flex-column">
            {original.description}
          </div>
        );
      },
    },
    {
      accessor: "priority",
      Header: "Priority",
      breakpoint: "",
      Cell: ({ row: { original } }) => {
        const colorScheme = {
          High: { bg: "#dc354540", color: "#dc3545" },
          Medium: { bg: "#ffa50054", color: "#ab7004" },
          Low: { bg: "#fafac8", color: "#cccc0d" },
        };
        return (
          <div className="flex items-start">
            <div
              className="flex items-start flex-column"
              style={{
                backgroundColor: colorScheme[original.priority]?.bg,
                color: colorScheme[original.priority]?.color,
                padding: "4px 4px",
                borderRadius: "9px",
                display: "inline-block",
                fontWeight: "bold",
              }}
            >
              {original.priority}
            </div>
          </div>
        );
      },
    },
    {
      accessor: "image",
      Header: "Issue snapshot",
      breakpoint: "xs sm md lg xlg",

      Cell: ({ row: { original } }) => {
        return (
          <div className="flex items-start flex-column">
            {original.image !== "no-photo.jpg" ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${process.env.REACT_APP_IMAGE_BASEURL}/${original.image}`}
              >
                <img
                  src={`${process.env.REACT_APP_IMAGE_BASEURL}/${original.image}`}
                  alt="issue"
                  className="thumbnail"
                />
              </a>
            ) : (
              <span>N/A</span>
            )}
            {/* {original.image !== "no-photo.jpg" && original.image} */}
          </div>
        );
      },
    },
    {
      accessor: "createdBy.name",
      Header: "Created by",
      breakpoint: "xs sm md lg xlg",
    },
    {
      accessor: "status",
      Header: "Status",
      breakpoint: "xs",

      Cell: ({ row: { original } }) => {
        const role = "dev";
        const updateStatus = (e) => {
          const fetch = async () => {
            try {
              let url = `${process.env.REACT_APP_API_URL}/api/v1/auth/issueTracker/updateIssueStatus/${original._id}`;
              console.log({ token });
              const res = await axios({
                url,
                method: "PUT",
                data: { status: e.target.value },
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            } catch (err) {
              console.log({ err });
            }
          };
          if (token && token !== IDLE) {
            fetch();
          }
        };
        return (
          <div>
            {role === "dev" ? (
              <div
                className="flex items-start flex-column"
                style={{ width: "75%" }}
              >
                <Select
                  options={["Resolved", "Unresolved", "In Progress"]}
                  height="40px"
                  onChange={updateStatus}
                />
              </div>
            ) : (
              <span>
                {original.status === "open"
                  ? "Unresolved"
                  : original.status === "In Progress"
                  ? "In Progress"
                  : "Resolved"}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessor: "action",
      Header: "Action",
      breakpoint: "xs sm md lg",

      Cell: ({ row: { original } }) => {
        // const raiseTicket = (e) => {
        //   navigate("/raise-ticket", { state: { data: original } });
        // };
        const deleteTicket = () => {
          const fetch = async () => {
            try {
              let url = `${process.env.REACT_APP_API_URL}/api/v1/auth/issueTracker/${original._id}`;
              const res = await axios.delete(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setIsDeleted(original._id);
              // setIsDeleted((prev) => !prev);
            } catch (err) {
              console.log({ err });
            }
          };
          if (token && token !== IDLE) {
            fetch();
          }
        };
        return (
          <div>
            <div className="flex items-start flex-column">
              <button
                className="btn button btn-secondary"
                onClick={deleteTicket}
              >
                Delete ticket
              </button>
              {/* <button className="btn button btn-secondary" onClick={raiseTicket}>
                    Raise ticket
                  </button> */}
            </div>
          </div>
        );
      },
    },
    //   {
    //     accessor: "jobId",
    //     Header: "Job ID",
    //     Cell: ({ row: { original } }) => {
    //       return (
    //         <NavLink to={`/app/candidate/jobs/${original?._id}`}>
    //           {original?.jobId}
    //         </NavLink>
    //       );
    //     },
    //   },
    //   {
    //     accessor: "jobTitle",
    //     Header: "Job Title",
    //   },
    //   {
    //     accessor: "salary",
    //     Header: (
    //       <span>
    //         CTC <sub>in Lacs</sub>
    //       </span>
    //     ),
    //   },
    //   {
    //     accessor: "experience",
    //     Header: (
    //       <span>
    //         Experience <sub>in Years</sub>
    //       </span>
    //     ),
    //   },
    //   {
    //     accessor: "skills",
    //     Header: "Skills",
    //   Cell: ({ row: { original } }) => {
    //     return original?.skills?.map((skill, idx) => (
    //       <span className="chip me-1" key={idx}>
    //         {skill}
    //       </span>
    //     ));
    //   },
    //   },

    //   {
    //     accessor: "name",
    //     Header: () => "Apply",
    //     Cell: ({ row: { original } }) => {
    //       return <div className="flex items-center flex-column"></div>;
    //     },
    //   },
    // {
    //   accessor: (row) =>
    //     getLatestSchedule(row?.candidates)?.slotId?.dateAndTime
    //       ? formatDate(
    //           getLatestSchedule(row?.candidates)?.slotId?.dateAndTime,
    //           "MMM do yyyy h:mm a"
    //         )
    //       : "Not scheduled",
    //   Header: "Schedule Date",
    // },
  ];
  return { columns, isDeleted };
};

const PanelContent = ({ title }) => {
  return (
    <>
      <h1>{title}</h1>
      <img src={img} alt="No image" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, voluptas.
        Nemo rerum cupiditate sed accusantium praesentium repudiandae
        repellendus consectetur. Magni labore consequatur iusto officiis? Quis,
        quidem? Illo veniam facere eum.
      </p>
    </>
  );
};

const BtnControl = React.forwardRef(({ label, ...rest }, ref) => {
  return (
    <button
      ref={ref}
      {...rest}
      type="button"
      style={{
        border: "none",
        outline: "none",
        padding: "5px",
        textDecoration: "underline",
      }}
    >
      {label}
    </button>
  );
});
