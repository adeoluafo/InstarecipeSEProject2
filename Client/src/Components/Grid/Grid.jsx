import React from "react";
import "./Grid.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import { useContext } from "react";
import { RecipesContext } from "../../UserContext";

export default function Grid({ duration, difficulty, cuisine, diet, keyword }) {
  const { recipesContext } = useContext(RecipesContext);
  function runSearch(recipeList, text) {
    if (text != "") {
      const inputText = text.toLowerCase();
      const newRecipeList = recipeList.filter((recipe) => {
        if (
          recipe.course.toLowerCase().includes(inputText) ||
          recipe.cuisine.toLowerCase().includes(inputText) ||
          recipe.difficulty.toLowerCase().includes(inputText) ||
          recipe.diet.toLowerCase().includes(inputText) ||
          recipe.title.toLowerCase().includes(inputText)
        ) {
          return true;
        } else {
          return false;
        }
      });
      return newRecipeList;
    } else if (text === "") {
      return recipeList;
    }
  }

  function whatToParse() {
    let tempRecipes = [...recipesContext];
    if (duration != "All") {
      tempRecipes = tempRecipes.filter((recipe) => {
        if (duration == "Less") {
          if (parseInt(recipe.time) < 30) {
            return true;
          } else {
            return false;
          }
        } else {
          if (parseInt(recipe.time) >= 30) {
            return true;
          } else {
            return false;
          }
        }
      });
    }
    if (difficulty != "All") {
      tempRecipes = tempRecipes.filter((recipe) => {
        if (recipe.difficulty.toLowerCase() == difficulty.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
    }
    if (cuisine != "All") {
      tempRecipes = tempRecipes.filter((recipe) => {
        if (recipe.cuisine.toLowerCase() == cuisine.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
    }
    if (diet != "All") {
      tempRecipes = tempRecipes.filter((recipe) => {
        if (recipe.diet.toLowerCase() == diet.toLowerCase()) {
          return true;
        } else {
          return false;
        }
      });
    }

    tempRecipes = runSearch(tempRecipes, keyword);
    return tempRecipes;
  }
  console.log(recipesContext);
  return (
    <div className="grid-container">
      {recipesContext &&
        whatToParse().map(
          (recipe) =>
            recipe.is_published == true && (
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
