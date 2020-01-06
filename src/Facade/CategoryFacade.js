import { handleHttpErrors, makeOptions } from "../utils";
import configuration from "../settings";

const CategoryFacade = (() => {

  function FetchJokesByCategory(categories) {
    const options = makeOptions("GET", false);
    const us = fetch(configuration.URL + "/api/jokeByCategory/" + categories, options).then(
      handleHttpErrors
    );
    return us;
  }

  function FetchJokesByCategoryV2(categories) {
    const options = makeOptions("GET", true);
    const us = fetch(configuration.URL + "/api/jokeByCategoryV2/" + categories, options).then(
      handleHttpErrors
    );
    return us;
  }

  function FetchCategoryCount(category) {
    const options = makeOptions("GET", true);
    const us = fetch(configuration.URL + "/api/categoryCount/" + category, options).then(
      handleHttpErrors
    );
    return us;
  }

  function FetchAllCategories() {
    const options = makeOptions("GET", false);
    const us = fetch(configuration.URL + "/api/categoryCount", options).then(
      handleHttpErrors
    );
    return us;
  }

  function AddCategory(category) {
      const options = makeOptions("POST", true, category);
      return fetch(configuration.URL + "/api/newCategory/", options).then(handleHttpErrors);
    
  }

  function DeleteCategory(id) {
    const options = makeOptions("DELETE", true);
    return fetch(configuration.URL + "/api​/newCategory​/" + id, options).then(
      handleHttpErrors
    );
  }

  return {
    FetchJokesByCategory: FetchJokesByCategory,
    FetchJokesByCategoryV2: FetchJokesByCategoryV2,
    FetchCategoryCount: FetchCategoryCount,
    FetchAllCategories: FetchAllCategories,
    AddCategory: AddCategory,
    DeleteCategory: DeleteCategory
  };
})();

export default CategoryFacade;
