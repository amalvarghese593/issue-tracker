import Select from "./forms-controls/forms/Select";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    accessor: "appName",
    Header: "Application",
    breakpoint: "",
    Cell: ({ row: { original } }) => {
      return (
        <div
          className="flex items-start flex-column"
          style={{ display: "inline-block", marginLeft: "10px" }}>
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
        <div className="flex items-start flex-column">{original.title}</div>
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
            }}>
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
          <a target="_blank" rel="noopener noreferrer" href="issue.jpg">
            <img src="issue.jpg" alt="issue" className="thumbnail" />
          </a>
          {original.image}
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
      return (
        <div>
          {role === "dev" ? (
            <div
              className="flex items-start flex-column"
              style={{ width: "75%" }}>
              <Select
                options={["Resolved", "Unresolved", "In Progress"]}
                height="40px"
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
      const navigate = useNavigate();
      const raiseTicket = (e) => {
        navigate("/raise-ticket", { state: { data: original } });
      };
      return (
        <div>
          <div
            className="flex items-start flex-column"
            // style={{ width: "75%" }}
          >
            {/* <Select options={["Resolved", "Unresolved"]} height="40px" /> */}
            <button className="btn button btn-secondary" onClick={raiseTicket}>
              Raise ticket
            </button>
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
