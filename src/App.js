import "./App.css";
import { IssueList } from "./components/IssueList";
import { RaiseTicket } from "./components/RaiseTicket";
import { Outlet, Route, Routes } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { PrivateRoute } from "./components/routing/PrivateRoute";
import React from "react";
import { IssuesProvider } from "./data-store/issue-context";
import { ErrorBanner } from "./components/error-banner-component/ErrorBanner";
import { useErrorContext } from "./data-store/error-context";

function App() {
  const { error } = useErrorContext();
  return (
    <div className="App">
      {error && <ErrorBanner msg={error.message || "my custom error"} />}
      <Routes>
        <Route path="/" element={<Homepage />}>
          {/* <Route
          path="/"
          element={
            <PrivateRoute redirectTo="/not-authenticated">
              <IssueList />
            </PrivateRoute>
          }
        />
        <Route
          path="/raise-ticket"
          element={
            <PrivateRoute redirectTo="/not-authenticated">
              <RaiseTicket />
            </PrivateRoute>
          }
        /> */}
          <Route
            // path="/"
            element={<PrivateRoute redirectTo="/not-authenticated" />}
          >
            <Route
              index
              element={
                <IssuesProvider>
                  <IssueList />
                </IssuesProvider>
              }
            />
            <Route path="raise-ticket" element={<RaiseTicket />} />
          </Route>
          <Route
            path="/not-authenticated"
            element={<h1>please login to access the page</h1>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

const Homepage = () => {
  const location = useLocation();
  return (
    <>
      <menu className="bg-light container-fluid">
        <nav className="container navbar">
          <img src="./webpipl-logo.png" alt="logo" width={"150px"} />
          {location.pathname === "/" && <RaiseTktBtn />}
        </nav>
      </menu>
      <Outlet />
    </>
  );
};

const RaiseTktBtn = () => {
  const navigate = useNavigate();
  const raiseTicket = () => navigate("/raise-ticket");
  return (
    <div className="raise-ticket-btn-container">
      <button className="btn button btn-secondary" onClick={raiseTicket}>
        Raise new ticket
      </button>
    </div>
  );
};
