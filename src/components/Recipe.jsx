import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useEffect } from "react";
import styles from "./Recipe.module.css";
const Rating = ({ rating }) => {
  const starPercentage = (rating / 5) * 100;

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>
        <div
          className={styles["stars-inner"]}
          style={{ width: `${starPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};
const Recipe = ({ recipeData }) => {
  const [condition, setCondition] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState("");
  const url = recipeData["image"];
  useEffect(() => {
    const picture = new Image();
    picture.onload = () => {
      setImageSrc(picture.src);
      setLoading(false);
    };
    picture.onerror = () => {
      alert("Failed to load image");
      setLoading(false);
    };
    picture.src = url;
  }, [url]);
  return (
    <>
      <div className={`card ${styles.card}`} style={{ width: "18rem" }}>
        {loading ? (
          <div
            style={{
              height: "200px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className={styles.loader}></div>
          </div>
        ) : (
          <img
            src={imageSrc}
            className="card-img-top card-img"
            alt={recipeData.name}
          />
        )}

        <div className={`card-body ${styles["card-body"]}`}>
          <h5 className="card-title">{recipeData.name}</h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cuisine : {recipeData.cuisine}</li>
          <li className="list-group-item">
            Difficulty: {recipeData.difficulty}
          </li>
          <li className="list-group-item">
            Meal Type: {recipeData.mealType[0]}
          </li>
        </ul>
        <div className={`card-body ${styles["card-body"]}`}>
          <Rating rating={recipeData.rating} />
          <button
            className={`card-link ${styles["card-link"]}`}
            onClick={() => setCondition(true)}
          >
            See Details
          </button>
        </div>
      </div>
      {condition && (
        <div className={styles.details}>
          <div className={styles.tagsBox}>
            <span>
              {recipeData.tags.map((tag) => (
                <h3>#{tag}</h3>
              ))}
            </span>

            <RxCross1
              className={styles.cross}
              onClick={() => setCondition(false)}
            />
          </div>
          <div className={styles.information}>
            <div>
              <h3>Preparation Time: {recipeData.prepTimeMinutes}</h3>
              <h3>Ingredients</h3>
              <ul>
                {recipeData.ingredients.map((intgredient) => (
                  <li>{intgredient}</li>
                ))}
              </ul>
              <h3>Instructions</h3>
              <ul>
                {recipeData.instructions.map((instruction) => (
                  <li>{instruction}</li>
                ))}
              </ul>
            </div>
            <span>
              <h3>{recipeData.name}</h3>
              <img src={imageSrc} />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Recipe;
