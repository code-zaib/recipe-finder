import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mixing from "../assets/mixing.png";
import { RecipeList } from "./recipe-list-store";
import styles from "./Header.module.css";
const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setTextToShow, setUrl } = useContext(RecipeList);
  const [inputValue, setInputValue] = useState("");
  const onInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.key == "Enter") {
      setTextToShow(inputValue);
      setUrl(`https://dummyjson.com/recipes/tag/${inputValue}`);
      setInputValue("");
      if (pathname != "/recipes") {
        navigate("/recipes");
      }
    }
  };
  const pageChange = (event) => {
    if (inputValue != "") {
      setTextToShow(inputValue);
      setUrl(`https://dummyjson.com/recipes/tag/${inputValue}`);
      setInputValue("");
      if (pathname != "/recipes") {
        navigate("/recipes");
      }
    }
  };

  return (
    <nav className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src={mixing}></img>
        <h3>recipe world</h3>
      </Link>
      <ul>
        <li className={`${pathname == "/" && styles.activeList}`}>
          <Link to={"/"} className={styles.list}>
            Home
          </Link>
        </li>
        <li className={`${pathname == "/recipes" && styles.activeList}`}>
          <Link
            to={"/recipes"}
            className={styles.list}
            onClick={() => {
              setUrl("https://dummyjson.com/recipes");
              setTextToShow("");
            }}
          >
            Recipes
          </Link>
        </li>
        <li className={`${pathname == "/about" && styles.activeList}`}>
          <Link to={"/about"} className={styles.list}>
            About
          </Link>
        </li>
        <li className={` ${pathname == "/contact" && styles.activeList}`}>
          <Link to={"/contact"} className={styles.list}>
            Contact
          </Link>
        </li>
      </ul>
      <span className={styles.searchBox}>
        <input
          type="text"
          placeholder="search recipes here"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onInputChange}
        />
        <button onClick={pageChange}>search</button>
      </span>
    </nav>
  );
};

export default Header;
