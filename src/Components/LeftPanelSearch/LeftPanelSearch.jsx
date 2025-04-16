import React, { useState, useContext } from "react";
import "./LeftPanelSearch.css";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { RecipesContext } from "../../UserContext";

export default function LeftPanelSearch({
  setDuration,
  setDifficulty,
  setCuisine,
  setDiet,
  setMealType,
  setRating,
}) {
  const [selectedTrendingId, setSelectedTrendingId] = useState("All");
  const { recipesContext } = useContext(RecipesContext);
  const navigate = useNavigate();

  const handleTrendingSelect = (e) => {
    const recipeId = e.target.value;
    setSelectedTrendingId(recipeId);
    if (recipeId !== "All") {
      navigate(`/recipe/${recipeId}`);
    }
  };

  return (
    <div style={{ textAlign: "left", marginTop: "20px" }}>
      <h2 style={{ marginBottom: "30px" }}>Recipes</h2>

      {/* 🔥 Trending Recipe Dropdown (limited to 3 items) */}
      <FloatingLabel
        controlId="floatingSelectTrending"
        label="Trending Recipes"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Select trending recipe"
          value={selectedTrendingId}
          onChange={handleTrendingSelect}
        >
          <option value="All">Select a recipe</option>
          {recipesContext &&
            recipesContext
              .slice(0, 3) // ✅ Limit to first 3 recipes
              .map((recipe) => (
                <option key={recipe.id} value={recipe.id}>
                  {recipe.title}
                </option>
              ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelectDuration"
        label="Duration"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Select duration"
          defaultValue="All"
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="Less">Less than 30 minutes</option>
          <option value="More">More than 30 minutes</option>
          <option value="All">All</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelectDifficulty"
        label="Difficulty"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Select difficulty"
          defaultValue="All"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="All">All</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelectCuisine"
        label="Cuisine"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Select cuisine"
          defaultValue="All"
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Japanese">Japanese</option>
          <option value="Thai">Thai</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="All">All</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelectDiet"
        label="Diet"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Select diet"
          defaultValue="All"
          onChange={(e) => setDiet(e.target.value)}
        >
          <option value="Regular">Regular</option>
          <option value="Keto">Keto</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="All">All</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelectMealType"
        label="Meal Type"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Select meal type"
          defaultValue="All"
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Dessert">Dessert</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelectRating"
        label="User Rating"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Select rating"
          defaultValue="All"
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="All">All</option>
          <option value="5">5 ★</option>
          <option value="4">4 ★</option>
          <option value="3">3 ★</option>
          <option value="2">2 ★</option>
          <option value="1">1 ★</option>
        </Form.Select>
      </FloatingLabel>
    </div>
  );
}
