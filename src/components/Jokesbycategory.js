import React, { useState, useEffect } from "react";
import utils, { catchHttpErrors } from "../utils";
import uuid from "uuid/v1";
import {
  Prompt,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

const Jokesbycategory = ({ loggedIn, allCategories, CategoryFacade }) => {
  const [jokes, setJokes] = useState("");

  return (
    <div>
      <h1>Joke By Category</h1>
      <p>Select one of the categories and get a joke!</p>
      <p>
        To get multible jokes sepparaate your category requests by comma like
        this: food,fashion,history...
      </p>
      <Categories
        setJokes={setJokes}
        loggedIn={loggedIn}
        allCategories={allCategories}
        CategoryFacade={CategoryFacade}
      />
      {!jokes == "" ? <Jokes jokes={jokes} /> : null}
    </div>
  );
};

const Categories = ({ setJokes, loggedIn, allCategories, CategoryFacade }) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [categories, setCategories] = useState("");

  function handleSubmit(event) {
    console.log("1." + event.target.value);
    event.preventDefault();
    if (loggedIn === true) {
      CategoryFacade.FetchJokesByCategoryV2(categories.value)
        .then(data => setJokes(data))
        .catch(catchHttpErrors);
    } else {
      CategoryFacade.FetchJokesByCategory(categories.value)
        .then(data => setJokes(data))
        .catch(catchHttpErrors);
    }
    event.target.reset();
    setIsBlocking(false);
  }

  const handleChange = event => {
    console.log("1." + event.target.value);
    console.log("2." + categories.value);
    const target = event.target;
    const value = target.value;
    setCategories({ ...categories, value });
    setIsBlocking(true);
  };

  return (
    <div>
      <form
        className="form-horizontal"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <input list="categories" name="category" />
        <datalist id="categories">
          {allCategories.map(category => {
            return <option key={category.id} value={category.category} />;
          })}
        </datalist>
        <button type="submit" className="btn btn-primary">
          Get joke
        </button>
      </form>
    </div>
  );
};

const Jokes = ({ jokes }) => {
  console.log("3." + jokes);
  return (
    <div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Joke</th>
              <th>Reference</th>
            </tr>
          </thead>
          <tbody>
            {jokes.jokes.map(j => (
              <tr>
                <td key={uuid()}>{j.category}</td>
                <td key={uuid()}>{j.joke}</td>
                <td key={uuid()}>{jokes.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
      </div>
    </div>
  );
};

export default Jokesbycategory;
