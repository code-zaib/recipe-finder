import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";
import { Outlet } from "react-router-dom";
import RecipeListProvider from "./components/recipe-list-store.jsx";
const App = () => {
  return (
    <RecipeListProvider>
      <Header />
      <Outlet />
      <Footer />
    </RecipeListProvider>
  );
};
export default App;
