import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  UserContext,
  RecipesContext,
  FavoritesContext,
  LastExploredContext,
} from "./UserContext.js";
import HomePage from "./Pages/HomePage/Homepage.jsx";
import RecipeDetailsPage from "./Pages/RecipeDetailsPage/RecipeDetailsPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchPage from "./Pages/SearchPage/SearchPage.jsx";
import DashboardPage from "./Pages/DashboardPage/DashboardPage.jsx";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage.jsx";

function App() {
  //initialize all isecontext variables
  const [userContext, setUserContext] = useState(() => {
    try {
      const storedUser = localStorage.getItem("userContext");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });
  const [recipesContext, setRecipesContext] = useState(() => {
    try {
      const storedRecipes = localStorage.getItem("recipesContext");
      return storedRecipes ? JSON.parse(storedRecipes) : null;
    } catch (error) {
      console.error("Error parsing stored recipes:", error);
      return null;
    }
  });
  const [favoritesContext, setFavoritesContext] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem("favoritesContext");
      return storedFavorites ? JSON.parse(storedFavorites) : null;
    } catch (error) {
      console.error("Error parsing stored favorites:", error);
      return null;
    }
  });
  const [lastExploredContext, setLastExploredContext] = useState(() => {
    try {
      const storedLastExplored = localStorage.getItem("lastExploredContext");
      return storedLastExplored ? JSON.parse(storedLastExplored) : "Italian";
    } catch (error) {
      console.error("Error parsing stored lastExplored:", error);
      return "Italian";
    }
  });

  useEffect(() => {
    // Save the usecontext data to storage whenever the state changes
    if (userContext) {
      localStorage.setItem("userContext", JSON.stringify(userContext));
    } else {
      localStorage.removeItem("userContext");
    }
    if (recipesContext) {
      localStorage.setItem("recipesContext", JSON.stringify(recipesContext));
    } else {
      localStorage.removeItem("recipesContext");
    }
    if (favoritesContext) {
      localStorage.setItem(
        "favoritesContext",
        JSON.stringify(favoritesContext)
      );
    } else {
      localStorage.removeItem("favoritesContext");
    }
    if (lastExploredContext) {
      localStorage.setItem(
        "lastExploredContext",
        JSON.stringify(lastExploredContext)
      );
    } else {
      localStorage.removeItem("lastExploredContext");
    }
  }, [userContext, recipesContext, favoritesContext, lastExploredContext]);
  //wrap the usecontext around your declared routes
  return (
    <div className="app">
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <RecipesContext.Provider value={{ recipesContext, setRecipesContext }}>
          <FavoritesContext.Provider
            value={{ favoritesContext, setFavoritesContext }}
          >
            <LastExploredContext.Provider
              value={{ lastExploredContext, setLastExploredContext }}
            >
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
              </BrowserRouter>
            </LastExploredContext.Provider>
          </FavoritesContext.Provider>
        </RecipesContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
