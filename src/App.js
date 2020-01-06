import React, { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { catchHttpErrors } from "./utils";
import "./App.css";
import StartPage from "./components/Home";
import LogIn from "./components/LogIn";
import Header from "./components/Header";
import Logout from "./components/Logout";
import Jokesbycategory from "./components/Jokesbycategory";
import Adminpage from "./components/Adminpage";

const NoMatch = () => {
  return <h3>The page was not found.</h3>;
};

function App({ loginFacade, CategoryFacade }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [allCategories, setAllCategories] = useState([]);

  // check token regularly
  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(loginFacade.loggedIn());
    }, 10000);
    setLoggedIn(loginFacade.loggedIn());
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    CategoryFacade
      .FetchAllCategories()
      .then(data => setAllCategories(data))
      .catch(catchHttpErrors);
  }, []);

  return (
    <Router>
      <Header loginFacade={loginFacade} loggedIn={loggedIn}/>
      <Switch>

        <Route exact path="/">
          <StartPage />
        </Route>

        <Route path="/login">
          <LogIn
            apiFacade={loginFacade}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        </Route>

        <Route path="/logout">
          <Logout 
          apiFacade={loginFacade}
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          />
        </Route>

        <Route path="/jokesbycategory">
          <Jokesbycategory 
            loggedIn={loggedIn}
            allCategories={allCategories}
            CategoryFacade={CategoryFacade}
            />
        </Route>

        <Route path="/adminpage">
          <Adminpage />
        </Route>

        <Route>
          <NoMatch />
        </Route>

      </Switch>
    </Router>
  );
}
export default App;
