import React, { useContext } from "react";
import "./Grid.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import { RecipesContext } from "../../UserContext";

// 🧱 Main component for displaying filtered recipe cards in a grid
export default function Grid({ duration, difficulty, cuisine, diet, keyword, mealType, rating }) {
  const { recipesContext } = useContext(RecipesContext); // Access all recipes from context

  // 🔍 Keyword search filtering function
  function runSearch(recipeList, text) {
    if (text !== "") {
      const inputText = text.toLowerCase();

      // Filter by checking if keyword exists in any of the listed fields
      const newRecipeList = recipeList.filter((recipe) =>
        recipe.course.toLowerCase().includes(inputText) ||
        recipe.cuisine.toLowerCase().includes(inputText) ||
        recipe.difficulty.toLowerCase().includes(inputText) ||
        recipe.diet.toLowerCase().includes(inputText) ||
        recipe.title.toLowerCase().includes(inputText)
      );

      return newRecipeList;
    }

    // If no keyword, return full list
    return recipeList;
  }

  // 🧠 Apply all filters sequentially and return filtered recipes
  function whatToParse() {
    let tempRecipes = [...recipesContext]; // clone the original list

    // ⏱ Filter by duration
    if (duration !== "All") {
      tempRecipes = tempRecipes.filter((recipe) =>
        duration === "Less"
          ? parseInt(recipe.time) < 30
          : parseInt(recipe.time) >= 30
      );
    }

    // 🎓 Filter by difficulty
    if (difficulty !== "All") {
      tempRecipes = tempRecipes.filter(
        (recipe) =>
          recipe.difficulty.toLowerCase() === difficulty.toLowerCase()
      );
    }

    // 🍝 Filter by cuisine
    if (cuisine !== "All") {
      tempRecipes = tempRecipes.filter(
        (recipe) =>
          recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
      );
    }

    // 🥗 Filter by diet
    if (diet !== "All") {
      tempRecipes = tempRecipes.filter(
        (recipe) =>
          recipe.diet.toLowerCase() === diet.toLowerCase()
      );
    }

    // 🍳 Filter by meal type (breakfast, lunch, dinner, etc.)
    if (mealType !== "All") {
      tempRecipes = tempRecipes.filter(
        (recipe) =>
          recipe.meal_type &&
          recipe.meal_type.trim().toLowerCase() === mealType.toLowerCase()
      );
    }

    // ⭐ Filter by user rating (rounded ranges)
    if (rating !== "All") {
      const ratingValue = parseInt(rating);
      const minRating = ratingValue - 0.5;
      const maxRating = ratingValue;

      tempRecipes = tempRecipes.filter((recipe) => {
        const r = parseFloat(recipe.rating) || 0;
        return r >= minRating && r <= maxRating + 0.5;
      });
    }

    // 🔍 Apply keyword search as final filter
    tempRecipes = runSearch(tempRecipes, keyword);

    return tempRecipes;
  }

  console.log(recipesContext); // for debugging - shows all recipe data in console

  // 🖼️ Render the filtered recipe list as a grid of cards
  return (
    <div className="grid-container">
      {recipesContext &&
        whatToParse().map(
          (recipe) =>
            recipe.is_published === true && ( // only show published recipes
              <RecipeCard
                key={recipe.id}
                image={recipe.image_url}
                title={recipe.title}
                id={recipe.id}
              />
            )
        )}
    </div>
  );
}
