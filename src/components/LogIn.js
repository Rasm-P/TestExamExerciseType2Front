import React, { useEffect, useState } from "react";
import { catchHttpErrors, makeOptions } from "../utils";
import configuration from "../settings";
import { handleHttpErrors } from "../utils";

const LogIn = ({ apiFacade, loggedIn, setLoggedIn }) => {
  const logout = () => {
    apiFacade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    apiFacade
      .login(user, pass)
      .then(res => setLoggedIn(true))
      .catch(err => {
        console.log(err);
        err.fullError.then(function(result) {
          alert(result.message);
        });
        catchHttpErrors(err);
      });
  };
  return (
    <div>
      {!loggedIn ? (
        <LogInForm login={login} />
      ) : (
        <LoggedIn apiFacade={apiFacade} logout={logout} />
      )}
    </div>
  );
};

export default LogIn;

const LogInForm = ({ login }) => {
  const emptyUser = { username: "", password: "" };
  const [user, setUser] = useState(emptyUser);

  const handleChange = event => {
    event.preventDefault();
    setUser({ ...user, [event.target.id]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log("Submission..");
    login(user.username, user.password);
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        className="form-horizontal"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <div className="col-sm-9">
            <input
              className="form-control"
              placeholder="User Name"
              id="username"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-9">
            <input
              className="form-control"
              placeholder="Password"
              id="password"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

const LoggedIn = ({ apiFacade, logout }) => {
  const options = makeOptions("GET", true);
  const [data, setData] = useState("Fetching");
  const user = fetch(
    configuration.URL + "/api/starwars/" + apiFacade.tokenDecoder().roles,
    options
  )
    .then(handleHttpErrors)
    .then(data => {
      setData(data.msg);
    });

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{data}</h3>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
