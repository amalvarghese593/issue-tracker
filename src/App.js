import "./App.css";
import { IssueList } from "./components/IssueList";
import { RaiseTicket } from "./components/RaiseTicket";
import { Route, Routes, Navigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const raiseTicket = () => {
    navigate("/raise-ticket");
  };
  const location = useLocation();
  return (
    <div className="App">
      <menu className="bg-light">
        <nav className="container navbar">
          <img src="./webpipl-logo.png" alt="logo" width={"150px"} />
          {location.pathname === "/helpdesk" && (
            <div className="raise-ticket-btn-container">
              <button className="btn btn-secondary" onClick={raiseTicket}>
                Raise new ticket
              </button>
            </div>
          )}
        </nav>
      </menu>
      <Routes>
        <Route path="/" element={<Navigate to="/helpdesk" />} />
        <Route path="/helpdesk" element={<IssueList />} />
        <Route path="/raise-ticket" element={<RaiseTicket />} />
      </Routes>
    </div>
  );
}

export default App;
