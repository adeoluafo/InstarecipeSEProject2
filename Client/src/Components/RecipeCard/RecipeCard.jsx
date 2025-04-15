import React from "react";
import "./RecipeCard.css";
import Card from "react-bootstrap/Card";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext, UserContext } from "../../UserContext";
import Button from "react-bootstrap/esm/Button";
import { supabase } from "../../client";

export default function RecipeCard({ image, title, id }) {
  const { favoritesContext, setFavoritesContext } =
    useContext(FavoritesContext);
  const { userContext } = useContext(UserContext);
  if (favoritesContext !=null){
    const favorites = favoritesContext.favorites;
    const updateFavorites = async (action) => {
      let tempFavorites = { ...favorites };
      tempFavorites[id] = action == "add";
      try {
        console.log(tempFavorites);
        const { error } = await supabase
          .from("User")
          .update({ favorites: tempFavorites })
          .eq("user_id", userContext.id);
        console.log(error)
        if (error == null) {
          let tempFavoritesContext = { ...favoritesContext };
          tempFavoritesContext["favorites"] = tempFavorites;
          setFavoritesContext(tempFavoritesContext);
        } else {
          alert(error);
        }
      } catch (error) {
        alert("Fetch Recipes failed: " + error);
      }
    };
    function likeButton() {
      if (favorites[id] && favorites[id] == true) {
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
    console.log(favoritesContext);
    return (
      <Card
        style={{
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2",
        }}
      >
        <Link to={`/recipe/${id}`} state={{ recipeId: id }}>
          <Card.Img variant="top" src={image} />
        </Link>
  
        <Card.Body>
          <Row>
            <Col xs={9}>
              <Card.Title>{title}</Card.Title>
            </Col>
            <Col>{likeButton()}</Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
  
  }