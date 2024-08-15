import { createContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";

export const RecipeList = createContext({});
const RecipeListProvider = ({ children }) => {
  const [url, setUrl] = useState("https://dummyjson.com/recipes");
  const [textToShow, setTextToShow] = useState("");
  return (
    <RecipeList.Provider
      value={{
        url,
        setUrl,
        textToShow,
        setTextToShow,
      }}
    >
      {children}
    </RecipeList.Provider>
  );
};
export default RecipeListProvider;
