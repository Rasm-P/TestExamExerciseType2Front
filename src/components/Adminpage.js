import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { catchHttpErrors } from "../utils";
import { Prompt } from "react-router-dom";

const Adminpage = ({ loggedIn, allCategories, CategoryFacade }) => {
  return (
    <div>
      {loggedIn ? (
        <div>
          <CategoryCount
            loggedIn={loggedIn}
            allCategories={allCategories}
            CategoryFacade={CategoryFacade}
          />
          <CreateCateogry
          CategoryFacade={CategoryFacade}
          />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
};

const CategoryCount = ({ allCategories, CategoryFacade }) => {
  const [isBlocking, setIsBlocking] = useState(false);
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState("");

  function handleSubmit(event) {
    console.log("1." + event.target.value);
    event.preventDefault();
    CategoryFacade.FetchCategoryCount(category.value)
      .then(data => setNumber(data))
      .catch(catchHttpErrors);
    event.target.reset();
    setIsBlocking(false);
  }

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    setCategory({ ...category, value });
    setIsBlocking(true);
  };

  return (
    <div>
      <p>
        Select one of the categories and get a count for number of interactions
      </p>
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
          Get count
        </button>
      </form>
      {!(number === "") ? (
        <div>
          <p>Category: {category.value}</p>
          <p>Count: {number.count}</p>
        </div>
      ) : null}
    </div>
  );
};

const CreateCateogry = ({CategoryFacade }) => {
  const emptyCategory = { category: "", requestList: [] };
  const [category, setCategory] = useState({ ...emptyCategory });
  let [isBlocking, setIsBlocking] = useState(false);

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.id;
    setCategory({ ...category, [name]: value });
    setIsBlocking(true);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(category);
    if(category.category !== "") {
      CategoryFacade.AddCategory(category);
    }
    setCategory({ ...emptyCategory });
    event.target.reset();
    setIsBlocking(false);
  }

  return (
    <div>
      <h2>Create a category</h2>
      <form
        className="form-horizontal"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Prompt
          when={isBlocking}
          message={location =>
            `Are you sure you want to go to ${location.pathname}`
          }
        />
        <div className="form-group">
          <div className="col-sm-9">
            <input
              className="form-control"
              id="category"
              placeholder="Enter the new category name"
              defaultValue={category.category}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Adminpage;
