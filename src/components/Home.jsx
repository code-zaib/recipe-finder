import React, { useContext, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Recipe from "./Recipe";
import { RecipeList } from "./recipe-list-store";
import styles from "./Home.module.css";
import main from "../assets/main.png";
const Home = () => {
  const [homePageRecipe, setHomePageRecipe] = useState({});
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [fetchCondition, setFetchCondition] = useState(false);
  const { setInputText } = useContext(RecipeList);
  useEffect(() => {
    setFetchCondition(true);
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        setHomePageRecipe(data);
        setFetchCondition(false);
        const recipeCount = data.recipes.length;
        const randomIndices = [];

        while (randomIndices.length < 3) {
          const randomIndex = Math.floor(Math.random() * recipeCount);
          if (!randomIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
          }
        }
        setRandomNumbers(randomIndices);
      });
  }, []);
  return (
    <>
      <div className={styles.firstSection}>
        <img src={main} className={styles.mainImage}></img>
        <div className={styles.textCon}>
          <h2>
            Discover the Taste of Home: Where Every Recipe is a Delicious
            Adventure!
          </h2>
          <Link
            onClick={() => setInputText("")}
            to={"/recipes"}
            className={styles.button}
          >
            Get Recipes
            <FaLongArrowAltRight
              style={{ marginLeft: "30px" }}
              className={styles.leftArrow}
            />
          </Link>
        </div>
      </div>
      {fetchCondition ? (
        <div className="loaderCon">
          <div className="loader"></div>
        </div>
      ) : (
        <div className={styles.secondSection}>
          <div className="cardsSection">
            {randomNumbers.map((random) => (
              <Recipe
                key={random}
                recipeData={homePageRecipe.recipes[random]}
              />
            ))}
          </div>
          <Link
            className={styles.moreBtn}
            to={"/recipes"}
            onClick={() => setInputText("")}
          >
            See more
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
