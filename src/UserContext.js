// 📦 Import React's createContext function
import { createContext } from "react";

// 👤 UserContext will hold information about the currently logged-in user
const UserContext = createContext();

// 🍽 RecipesContext will hold all available recipes in the app
const RecipesContext = createContext();

// ❤️ FavoritesContext will store the list of recipes the user has favorited
const FavoritesContext = createContext();

// 🌍 LastExploredContext will remember the last cuisine the user explored
const LastExploredContext = createContext();

// 🚀 Export all contexts so they can be used throughout the app
export { 
  UserContext, 
  RecipesContext, 
  FavoritesContext, 
  LastExploredContext 
};

