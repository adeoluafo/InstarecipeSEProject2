import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// 🌍 Global contexts for managing shared app state
import {
  UserContext,
  RecipesContext,
  FavoritesContext,
  LastExploredContext,
} from "./UserContext.js";

// 🧩 App pages
import HomePage from "./Pages/HomePage/Homepage.jsx";
import RecipeDetailsPage from "./Pages/RecipeDetailsPage/RecipeDetailsPage.jsx";
import SearchPage from "./Pages/SearchPage/SearchPage.jsx";
import DashboardPage from "./Pages/DashboardPage/DashboardPage.jsx";
import FavoritesPage from "./Pages/FavoritesPage/FavoritesPage.jsx";

// 💄 Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// 🔧 Main App Component
function App() {
  // 🧠 User context (login session, auth, etc.)
  const [userContext, setUserContext] = useState(() => {
    try {
      const storedUser = localStorage.getItem("userContext");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });

  // 🍽️ Recipes context (global list of recipes)
  const [recipesContext, setRecipesContext] = useState(() => {
    try {
      const storedRecipes = localStorage.getItem("recipesContext");
      return storedRecipes ? JSON.parse(storedRecipes) : null;
    } catch (error) {
      console.error("Error parsing stored recipes:", error);
      return null;
    }
  });

  // 💖 Favorites context (recipes marked as favorites)
  const [favoritesContext, setFavoritesContext] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem("favoritesContext");
      return storedFavorites ? JSON.parse(storedFavorites) : null;
    } catch (error) {
      console.error("Error parsing stored favorites:", error);
      return null;
    }
  });

  // 🌍 Last explored cuisine (used for personalization/recommendations)
  const [lastExploredContext, setLastExploredContext] = useState(() => {
    try {
      const storedLastExplored = localStorage.getItem("lastExploredContext");
      return storedLastExplored ? JSON.parse(storedLastExplored) : "Italian";
    } catch (error) {
      console.error("Error parsing stored lastExplored:", error);
      return "Italian";
    }
  });

  // 💾 Sync context data to localStorage when it changes
  useEffect(() => {
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
      localStorage.setItem("favoritesContext", JSON.stringify(favoritesContext));
    } else {
      localStorage.removeItem("favoritesContext");
    }

    if (lastExploredContext) {
      localStorage.setItem("lastExploredContext", JSON.stringify(lastExploredContext));
    } else {
      localStorage.removeItem("lastExploredContext");
    }
  }, [userContext, recipesContext, favoritesContext, lastExploredContext]);

  // 🧱 App layout and route definitions wrapped with context providers
  return (
    <div className="app">
      {/* Global user authentication context */}
      <UserContext.Provider value={{ userContext, setUserContext }}>

        {/* Global recipes context */}
        <RecipesContext.Provider value={{ recipesContext, setRecipesContext }}>

          {/* Global favorites context */}
          <FavoritesContext.Provider value={{ favoritesContext, setFavoritesContext }}>

            {/* Global context for last explored cuisine (used in recommendations) */}
            <LastExploredContext.Provider value={{ lastExploredContext, setLastExploredContext }}>

              {/* 🌐 Routing for the app */}
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
