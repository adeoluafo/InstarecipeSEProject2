import React, { useState, useEffect, useContext } from "react";
import "./RecipeDetailsPage.css";

// 📍 React Router hook for accessing route state
import { useLocation } from "react-router-dom";

// 📦 UI Components
import TopBar from "../../Components/TopBar/TopBar";
import Stack from "react-bootstrap/esm/Stack";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Footer from "../../Components/Footer/Footer";

// 🧾 Icons
import { IoPeople } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";
import { PiBowlFoodFill } from "react-icons/pi";
import { FaUserCircle } from "react-icons/fa";
import { FcRating } from "react-icons/fc";

// 📬 Supabase for data fetching
import { supabase } from "../../client";

// 💬 Comments modal
import CommentsModal from "../../Components/CommentsModal/CommentsModal";

// 🌍 Global context for saving last explored cuisine
import { LastExploredContext } from "../../UserContext";

// 🧠 Main component for displaying a single recipe in full detail
export default function RecipeDetailsPage() {
  const location = useLocation();
  const Id_data = location.state; // Get state passed via React Router navigation
  const Id = Id_data.recipeId;    // Extract recipe ID from route state

  const [recipe, setRecipe] = useState(null);       // Current recipe data
  const [comments, setComments] = useState(null);   // Recipe's comments

  const { setLastExploredContext } = useContext(LastExploredContext); // Save last explored cuisine

  // 🚀 Fetch the recipe data on mount
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data, error } = await supabase
          .from("Recipes")
          .select()
          .eq("id", Id); // Fetch recipe by ID

        if (!error) {
          const newRecipe = data[0];
          setRecipe(newRecipe);                     // Save recipe to state
          setComments(newRecipe.comments);          // Save comments
          setLastExploredContext(newRecipe.cuisine); // Set last explored cuisine
        } else {
          alert(error.message);
        }
      } catch (error) {
        alert("Fetch Recipe failed: " + error.message);
      }
    };

    if (Id) {
      fetchRecipe(); // Only run if we have a valid ID
    }
  }, []);

  // ✅ Render only if recipe data is loaded
  if (recipe != null) {
    const directions = recipe.directions;
    const ingredients = recipe.ingredients;

    console.log(comments); // Debugging

    return (
      <div>
        <TopBar />

        <Stack gap={3}>
          {/* 📸 Header Section with Image and Basic Info */}
          <Container>
            <Row style={{ marginTop: "70px" }}>
              {/* Left: Recipe Image */}
              <Col>
                <Image
                  src={recipe.image_url}
                  rounded
                  style={{ width: "100%" }}
                />
              </Col>

              {/* Right: Title, Description, Info Table */}
              <Col style={{ textAlign: "left" }}>
                <h1>{recipe.title}</h1>
                <p style={{ marginTop: "20px", fontSize: "20px", marginBottom: "20px" }}>
                  {recipe.description}
                </p>

                {/* 🧾 Info Table for Cuisine, Time, Servings */}
                <Table striped bordered hover style={{ fontSize: "21px" }}>
                  <thead>
                    <tr>
                      <th>
                        <PiBowlFoodFill style={{ marginLeft: "40px" }} />
                        <br />
                        {recipe.cuisine} Cuisine
                      </th>
                      <th>
                        <CiTimer style={{ marginLeft: "40px" }} />
                        <br />
                        {recipe.time} Minutes
                      </th>
                      <th>
                        <IoPeople style={{ marginLeft: "40px" }} />
                        <br />
                        {recipe.servings} Servings
                      </th>
                    </tr>
                  </thead>
                </Table>

                {/* 🍽 Course & Diet Info */}
                <p style={{ fontSize: "17px" }}>Course: {recipe.course}</p>
                <p style={{ fontSize: "17px" }}>Diet: {recipe.diet}</p>
              </Col>
            </Row>
          </Container>

          {/* 🥣 Ingredients + 🧑‍🍳 Directions Section */}
          <Container>
            <Row style={{ marginTop: "30px" }}>
              {/* Left: Directions / Instructions */}
              <Col xs={7} style={{ textAlign: "left" }}>
                <h4 style={{ marginBottom: "20px" }}>How to make It</h4>
                <ListGroup as="ol" numbered>
                  {directions.map((direction, index) => (
                    <ListGroup.Item as="li" key={index}>
                      {direction}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>

              {/* Right: Ingredients List */}
              <Col style={{ textAlign: "left" }}>
                <h4 style={{ marginBottom: "20px" }}>Ingredients</h4>
                <ListGroup variant="primary">
                  {ingredients.map((ingredient, index) => (
                    <ListGroup.Item as="li" key={index}>
                      {ingredient}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </Container>

          {/* 💬 Comments Section */}
          <Container style={{ marginTop: "20px", textAlign: "left" }}>
            <h4 style={{ marginBottom: "20px" }}>Comments</h4>

            {/* Existing Comments */}
            <ListGroup>
              {comments.map((comment, index) => (
                <ListGroup.Item as="li" key={index}>
                  <FaUserCircle style={{ fontSize: "30px" }} />
                  <br />
                  {/* Static rating stars */}
                  <FcRating />
                  <FcRating />
                  <FcRating />
                  <FcRating />
                  <FcRating />

                  {/* Comment content */}
                  <p>Time spent: {comment.time}</p>
                  <p>Rating: {comment.rating}</p>
                  <p>Serving: {comment.serving}</p>
                  <p>Difficulty: {comment.difficulty}</p>
                  <p>Tip: {comment.directions}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* ➕ Add New Comment Button/Modal */}
            <CommentsModal
              recipe_id={recipe.id}
              comments={comments}
              setComments={setComments}
            />
          </Container>

          {/* 🔚 Footer */}
          <Footer />
        </Stack>
      </div>
    );
  }

  // ⏳ Optional: return a loading state while recipe is being fetched
}
