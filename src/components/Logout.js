import React from "react";
import { Redirect } from "react-router-dom";

const Logout = ({ apiFacade, loggedIn, setLoggedIn }) => {
  const logout = () => {
    apiFacade.logout();
    setLoggedIn(false);
  };
  return (
    <div className="col-sm-offset-3 col-sm-9">
      {loggedIn ? (
        <LoggedIn apiFacade={apiFacade} logout={logout} />
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

export default Logout;

const LoggedIn = ({ apiFacade, logout }) => {
  const role = apiFacade.tokenDecoder().roles;
  const username = apiFacade.tokenDecoder().username;

  return (
    <div>
      <h2>You are logged in as:</h2>
      <h3>Role: {role}</h3>
      <h3>Username: {username}</h3>
      <button onClick={logout} className="btn btn-primary">
        Logout
      </button>
    </div>
  );
};
