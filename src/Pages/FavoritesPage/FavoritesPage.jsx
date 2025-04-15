import React, { useState, useContext, useEffect } from "react";
import "./FavoritesPage.css";
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import { FavoritesContext, LastExploredContext, RecipesContext } from "../../UserContext";
import { supabase } from "../../client";

// 💖 Page for displaying user's favorite recipes and recommendations
export default function FavoritesPage() {
  // 🌐 Get global context values
  const { favoritesContext } = useContext(FavoritesContext); // User's favorites
  const { lastExploredContext } = useContext(LastExploredContext); // Last explored cuisine
  const { recipesContext } = useContext(RecipesContext); // All recipes

  // 💾 Local state for recipes pulled from Supabase
  const [recipes, setRecipes] = useState([]);

  // Extract favorites mapping from context
  const favorites = favoritesContext.favorites;

  // 🧠 useEffect to fetch favorited recipes from Supabase on component mount
  useEffect(() => {
    // Create an array of favorited recipe IDs
    function createArray() {
      let newArray = [];
      Object.entries(favorites).map(([key, value]) => {
        if (value === true) {
          newArray = [...newArray, key];
        }
      });
      return newArray;
    }

    // 🔄 Fetch favorite recipes by IDs
    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase
          .from("Recipes")
          .select()
          .in("id", createArray()); // fetch recipes where id is in the favorites list
          
        if (!error) {
          setRecipes(data);
        } else {
          alert(error.message);
        }
      } catch (error) {
        alert("Fetch favorites failed: " + error.message);
      }
    };

    fetchRecipes();
  }, []);

  // 🧠 Filter recommendations based on last explored cuisine
  function showReccomendations() {
    const tempRecipes = recipesContext.filter((recipe) => {
      return recipe.cuisine === lastExploredContext;
    });
    return tempRecipes;
  }

  console.log(lastExploredContext); // Debugging last explored cuisine

  return (
    <div>
      <TopBar />

      {/* 💖 Favorites Grid Section */}
      <div className="grid-container">
        {favoritesContext &&
          recipes.map(
            (recipe) =>
              recipe.is_published === true && (
                <RecipeCard
                  key={recipe.id}
                  image={recipe.image_url}
                  title={recipe.title}
                  id={recipe.id}
                />
              )
          )}
      </div>

      {/* 🌟 Recommendations Section based on last explored cuisine */}
      <Card style={{ marginTop: "120px", textAlign: "left" }}>
        <h4 style={{ marginBottom: "30px" }}>Recommended section</h4>
        <Row>
          <Col>
            {/* ✨ Contextual message based on user's last interaction */}
            <h5>Hungry for more? 🍽️</h5>
            <p>
              Last time, you explored the delicious world of {lastExploredContext}
              <br />
              tasty choice! Whether it was bold spices, comforting classics, or
              <br />
              something totally new, your tastebuds clearly know what they’re
              <br />
              doing. Based on that flavorful journey, we’ve cooked up some fresh
              <br />
              recommendations to keep the vibe going. Ready to dig in?
              <br />
            </p>
          </Col>

          {/* 🧠 Recommendation Grid */}
          <Col xs={9}>
            <div className="grid-container">
              {recipesContext &&
                showReccomendations().map(
                  (recipe) =>
                    recipe.is_published === true && (
                      <RecipeCard
                        key={recipe.id}
                        image={recipe.image_url}
                        title={recipe.title}
                        id={recipe.id}
                      />
                    )
                )}
            </div>
          </Col>
        </Row>
      </Card>

      {/* 🔚 Footer */}
      <Footer />
    </div>
  );
}
