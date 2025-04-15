import React, { useContext } from "react";
import "./RecipeCard.css";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc"; // Heart icons
import { FavoritesContext, UserContext } from "../../UserContext";
import { supabase } from "../../client";

// 📦 Component to display a single recipe card with image, title, and like button
export default function RecipeCard({ image, title, id }) {
  const { favoritesContext, setFavoritesContext } = useContext(FavoritesContext);
  const { userContext } = useContext(UserContext);

  // ✅ Only render if favoritesContext is available
  if (favoritesContext != null) {
    const favorites = favoritesContext.favorites; // Get user's favorites map

    // 🔄 Update favorite status in Supabase and local context
    const updateFavorites = async (action) => {
      let tempFavorites = { ...favorites };
      tempFavorites[id] = action === "add"; // true if adding, false if removing

      try {
        console.log(tempFavorites); // Debug log

        // ✏️ Update favorites in the "User" table
        const { error } = await supabase
          .from("User")
          .update({ favorites: tempFavorites })
          .eq("user_id", userContext.id);

        console.log(error); // Debug log

        if (!error) {
          // ✅ Update was successful: update local context
          let tempFavoritesContext = { ...favoritesContext };
          tempFavoritesContext["favorites"] = tempFavorites;
          setFavoritesContext(tempFavoritesContext);
        } else {
          alert(error.message);
        }
      } catch (error) {
        alert("Updating favorites failed: " + error.message);
      }
    };

    // 💖 Function to render the correct like button based on favorite status
    function likeButton() {
      if (favorites[id] === true) {
        // Already favorited — show filled heart
        return (
          <Button
            variant="unknown"
            style={{ width: "27px" }}
            onClick={() => updateFavorites("remove")}
          >
            <FcLike style={{ fontSize: "25px" }} />
          </Button>
        );
      } else {
        // Not favorited — show empty heart
        return (
          <Button
            variant="unknown"
            style={{ width: "27px" }}
            onClick={() => updateFavorites("add")}
          >
            <FcLikePlaceholder style={{ fontSize: "25px" }} />
          </Button>
        );
      }
    }

    console.log(favoritesContext); // Debug log for favorites context

    // 🧱 Render the card with image, title, and like button
    return (
      <Card
        style={{
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)", // subtle shadow for elevation
        }}
      >
        {/* 📸 Clickable image that links to the recipe detail page */}
        <Link to={`/recipe/${id}`} state={{ recipeId: id }}>
          <Card.Img variant="top" src={image} />
        </Link>

        <Card.Body>
          <Row>
            <Col xs={9}>
              {/* 🧾 Recipe title */}
              <Card.Title>{title}</Card.Title>
            </Col>
            <Col>
              {/* 💖 Like/unlike button */}
              {likeButton()}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }

  // 🛑 Return nothing if context hasn't loaded yet
}
