import React, { useState, useEffect, useContext } from "react";
import "./RecipeDetailsPage.css";

// ✅ UseParams to get recipe ID from URL
import { useParams } from "react-router-dom";

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
  const { id: Id } = useParams(); // ✅ Get recipe ID from route
  const [recipe, setRecipe] = useState(null);       // Recipe data
  const [comments, setComments] = useState(null);   // Recipe comments
  const { setLastExploredContext } = useContext(LastExploredContext); // Global context

  // 🚀 Fetch the recipe data on mount
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data, error } = await supabase
          .from("Recipes")
          .select()
          .eq("id", Id)
          .single(); // ✅ only one match expected

        if (!error) {
          setRecipe(data);
          setComments(data.comments);
          setLastExploredContext(data.cuisine);
        } else {
          alert(error.message);
        }
      } catch (error) {
        alert("Fetch Recipe failed: " + error.message);
      }
    };

    if (Id) {
      fetchRecipe();
    }
  }, [Id]);

  // ✅ Render only if recipe data is loaded
  if (!recipe) {
    return <div style={{ marginTop: "100px", textAlign: "center" }}>Loading...</div>;
  }

  const directions = recipe.directions || [];
  const ingredients = recipe.ingredients || [];

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

              <p style={{ fontSize: "17px" }}>Course: {recipe.course}</p>
              <p style={{ fontSize: "17px" }}>Diet: {recipe.diet}</p>
            </Col>
          </Row>
        </Container>

        {/* 🥣 Ingredients + 🧑‍🍳 Directions Section */}
        <Container>
          <Row style={{ marginTop: "30px" }}>
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
          <ListGroup>
            {comments.map((comment, index) => (
              <ListGroup.Item as="li" key={index}>
                <FaUserCircle style={{ fontSize: "30px" }} />
                <br />
                <FcRating /><FcRating /><FcRating /><FcRating /><FcRating />
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
