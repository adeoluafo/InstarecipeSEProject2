import React from "react";
import "./FavoritesPage.css";
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import {
  FavoritesContext,
  LastExploredContext,
  RecipesContext,
} from "../../UserContext";
import { useState, useContext, useEffect } from "react";
import { supabase } from "../../client";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";

export default function FavoritesPage() {
  const { favoritesContext } = useContext(FavoritesContext);
  const { lastExploredContext } = useContext(LastExploredContext);
  const { recipesContext } = useContext(RecipesContext);
  const favorites = favoritesContext.favorites;
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    function createArray() {
      let newArray = [];
      Object.entries(favorites).map(([key, value]) => {
        if (value == true) {
          newArray = [...newArray, key];
        }
      });
      return newArray;
    }
    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase
          .from("Recipes")
          .select()
          .in("id", createArray());
        if (error == null) {
          setRecipes(data);
        } else {
          alert(error);
        }
      } catch (error) {
        alert("Fetch favorites failed: " + error);
      }
    };
    fetchRecipes();
  }, []);
  function showReccomendations() {
    const tempRecipes = recipesContext.filter((recipe) => {
      if (recipe.cuisine == lastExploredContext) {
        return true;
      } else {
        return false;
      }
    });
    return tempRecipes;
  }
  console.log(lastExploredContext);
  return (
    <div>
      <TopBar />
      <div className="grid-container">
        {favoritesContext &&
          recipes.map(
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

      <Card style={{ marginTop: "120px", textAlign: "left" }}>
        <h4 style={{ marginBottom: "30px" }}>Recommended section</h4>
        <Row>
          <Col>
            <h5>Hungry for more? 🍽️</h5>
            <p>
              Last time, you explored the delicious world of{" "}
              {lastExploredContext}
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
          <Col xs={9}>
            <div className="grid-container">
              {recipesContext &&
                showReccomendations().map(
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
          </Col>
        </Row>
      </Card>
      <Footer />
    </div>
  );
}
