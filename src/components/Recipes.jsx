import React, { useContext, useEffect, useState, useRef } from "react";
import { RecipeList } from "./recipe-list-store";
import styles from "./Recipes.module.css";
import Recipe from "./Recipe";
import { BiMenuAltRight } from "react-icons/bi";
const Recipes = () => {
  const { textToShow, setTextToShow, url, setUrl } = useContext(RecipeList);
  const [fetchCondition, setFetchCondition] = useState(false);
  const [recipePageRecipes, setRecipePageRecipes] = useState([]);
  const [newRecipes, setNewRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [meal, setMeal] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setFetchCondition(true);
      setRecipePageRecipes([]);
      setNewRecipes([]);
      setCurrentPage(0);
      let response = await fetch(url);
      const data = await response.json();
      setRecipePageRecipes(data.recipes);
      setFetchCondition(false);
    };

    fetchData();
  }, [url]);
  useEffect(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const Recipes = recipePageRecipes.slice(start, end);
    setNewRecipes(Recipes);
  }, [currentPage, recipePageRecipes, itemsPerPage]);

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < recipePageRecipes.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const setMealType = () => {
    if (meal != "") {
      setUrl(`https://dummyjson.com/recipes/meal-type/${meal}`);
      setTextToShow(meal);
      setMeal("");
    }
  };
  return (
    <>
      {fetchCondition ? (
        <div className={styles.loaderCon}>
          <div className="loader"></div>
        </div>
      ) : (
        <div className={styles.recipeSection}>
          <span className={styles.searchBox}>
            <input
              type="text"
              placeholder="recipes by meal type"
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && meal !== "") {
                  setUrl(`https://dummyjson.com/recipes/meal-type/${meal}`);
                  setTextToShow(meal);
                  setMeal("");
                }
              }}
            />
            <button onClick={setMealType}>search</button>
          </span>
          {newRecipes.length === 0 ? (
            <h3
              style={{
                width: "100%",
                height: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#C850C0",
              }}
            >
              No recipes found with this name
            </h3>
          ) : (
            <h3 className={styles.heading}>
              {textToShow == ""
                ? "Here are some of the Latest Recipes for Today"
                : " Recipes found for " + textToShow}
            </h3>
          )}

          <div className={"cardsSection"}>
            {newRecipes.map((recipe, index) => (
              <Recipe key={index} recipeData={recipe} />
            ))}
          </div>
          <div className={styles.buttonsCon}>
            {currentPage > 0 && (
              <button onClick={handlePrevious}>Previous</button>
            )}
            {(currentPage + 1) * itemsPerPage < recipePageRecipes.length && (
              <button onClick={handleNext}>Next</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Recipes;
