import React, { useEffect } from "react";
import "./RecipeDetailsPage.css";
import { useLocation } from "react-router-dom";
import TopBar from "../../Components/TopBar/TopBar";
import Stack from "react-bootstrap/esm/Stack";
import { useState, useContext } from "react";
import { supabase } from "../../client";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import { IoPeople } from "react-icons/io5";
import { CiTimer } from "react-icons/ci";
import { PiBowlFoodFill } from "react-icons/pi";
import ListGroup from "react-bootstrap/ListGroup";
import { FaUserCircle } from "react-icons/fa";
import { FcRating } from "react-icons/fc";
import Footer from "../../Components/Footer/Footer";
import CommentsModal from "../../Components/CommentsModal/CommentsModal";
import { LastExploredContext } from "../../UserContext";

export default function RecipeDetailsPage() {
  const location = useLocation();
  const Id_data = location.state; // Access the passed props
  const Id = Id_data.recipeId;
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState(null);
  const { setLastExploredContext } = useContext(LastExploredContext);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data, error } = await supabase
          .from("Recipes")
          .select()
          .eq("id", Id);
        if (error == null) {
          const newRecipe = data[0];
          setRecipe(newRecipe);
          setLastExploredContext(newRecipe.cuisine);
          setComments(newRecipe.comments);
        } else {
          alert(error);
        }
      } catch (error) {
        alert("Fetch Recipe failed: " + error);
      }
    };
    if (Id) {
      fetchRecipe();
    }
  }, []);

  if (recipe != null) {
    const directions = recipe.directions;
    const ingredients = recipe.ingredients;

    console.log(comments);
    return (
      <div>
        <TopBar />

        <Stack gap={3}>
          <Container>
            <Row style={{ marginTop: "70px" }}>
              <Col>
                <Image
                  src={recipe.image_url}
                  rounded
                  style={{ width: "100%" }}
                />
              </Col>
              <Col style={{ textAlign: "left" }}>
                <h1>{recipe.title}</h1>
                <p
                  style={{
                    marginTop: "20px",
                    fontSize: "20px",
                    marginBottom: "20px",
                  }}
                >
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
          <Container style={{ marginTop: "20px", textAlign: "left" }}>
            <h4 style={{ marginBottom: "20px" }}>Comments</h4>
            <ListGroup>
              {comments.map((comment, index) => (
                <ListGroup.Item as="li" key={index}>
                  <FaUserCircle style={{ fontSize: "30px" }} />
                  <br />
                  <FcRating />
                  <FcRating />
                  <FcRating />
                  <FcRating />
                  <FcRating />
                  <p> Time spent: {comment.time}</p>
                  <p> Rating: {comment.rating} </p>
                  <p> Serving: {comment.serving}</p>
                  <p> Difficulty: {comment.difficulty} </p>
                  <p> Tip: {comment.directions}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <CommentsModal
              recipe_id={recipe.id}
              comments={comments}
              setComments={setComments}
            />
          </Container>
          <Footer />
        </Stack>
      </div>
    );
  }
}
