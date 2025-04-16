// Import React and required hooks
import React from "react";
import { useContext, useEffect, useState } from "react";

// Import components from your project
import TopBar from "../../Components/TopBar/TopBar";
import Footer from "../../Components/Footer/Footer";
import EditRecipeModal from "../../Components/EditRecipeModal/EditRecipeModal";
import CreateRecipeModal from "../../Components/CreateRecipeModal/CreateRecipeModal";
import DeleteRecipeModal from "../../Components/DeleteRecipeModal/DeleteRecipeModal";
import PublishRecipeModal from "../../Components/PublishRecipeModal/PublishRecipeModal";

// Import Bootstrap components
import Stack from "react-bootstrap/esm/Stack";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from "react-bootstrap/esm/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/ListGroup";

// Import context and database client
import { UserContext, RecipesContext } from "../../UserContext";
import { supabase } from "../../client";

// Main Dashboard component
export default function DashboardPage() {
  // Access logged-in user's information from context
  const { userContext } = useContext(UserContext);

  // Access all recipes (from context)
  const { recipesContext, setRecipesContext } = useContext(RecipesContext);

  // State to store user's draft and published recipes
  const [drafts, setDrafts] = useState([]);
  const [posts, setPosts] = useState([]);

  // When recipes are updated, filter the list into drafts and posts
  useEffect(() => {
    function filterRecipes() {
      // Filter user's draft recipes (not published)
      const newDraftList = recipesContext.filter((recipe) => {
        return !recipe.is_published && recipe.author_id === userContext.id;
      });

      // Filter user's published recipes
      const newPostsList = recipesContext.filter((recipe) => {
        return recipe.is_published && recipe.author_id === userContext.id;
      });

      setDrafts(newDraftList);
      setPosts(newPostsList);
    }

    filterRecipes();
  }, [recipesContext]);

  return (
    <div>
      {/* Top navigation bar */}
      <TopBar />

      {/* Main content stack with spacing */}
      <Stack gap={3} style={{ marginTop: "70px" }}>
        <Container>
          {/* Welcome card with user info and intro */}
          <Card style={{ backgroundColor: "rgba(255, 192, 203, 0.63)" }}>
            <Row>
              {/* Left side: user avatar + email */}
              <Col>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                  style={{ width: "50%" }}
                />
                <h6 style={{ marginTop: "12px" }}>{userContext.email}</h6>
              </Col>

              {/* Right side: greeting, description, and CreateRecipeModal */}
              <Col style={{ textAlign: "left" }}>
                <h4>👋 Hey there, Kitchen Star!✨</h4> <br />
                <p>
                  Welcome to your recipe dashboard! 🍽️
                  <br />
                  Here’s what you can do:
                  <br />
                  📝 Create tasty new recipes from scratch
                  <br />
                  🧂 Edit and spice up your existing creations
                  <br />
                  🚀 Publish drafts when they’re ready to shine
                  <br />
                  🗂️ View all your published masterpieces
                  <br />
                  🗑️ Delete the ones that didn’t quite hit the spot
                  <br />
                </p>
                Let’s get cooking! 👩🏾‍🍳🔥
                <br />
                <CreateRecipeModal />
              </Col>
            </Row>
          </Card>

          {/* Drafts Section */}
          <h4 style={{ textAlign: "left", marginTop: "50px" }}>Drafts</h4>
          <Card style={{ backgroundColor: "rgba(255, 192, 203, 0.63)" }}>
            <ListGroup>
              {/* Map over draft recipes */}
              {drafts.map((recipe) => (
                <Card key={recipe.id}>
                  <Row style={{ padding: "10px", margin: "30px 0" }}>
                    {/* Recipe image */}
                    <Col style={{ alignContent: "center" }}>
                      <Image
                        src={recipe.image_url}
                        style={{ width: "100%", padding: "20px" }}
                      />
                    </Col>

                    {/* Recipe title and ingredients */}
                    <Col>
                      <h5>{recipe.title}</h5>
                      <h6 style={{ marginTop: "20px" }}>Ingredients</h6>
                      <ListGroup style={{ textAlign: "left" }}>
                        {recipe.ingredients.map((ingredient, index) => (
                          <ListGroup.Item as="li" key={index}>
                            {ingredient}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>

                    {/* Directions and action buttons */}
                    <Col>
                      <h6>Directions</h6>
                      <ListGroup as="ol" numbered style={{ textAlign: "left" }}>
                        {recipe.directions.map((direction, index) => (
                          <ListGroup.Item as="li" key={index}>
                            {direction}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>

                      {/* Edit / Delete / Publish buttons */}
                      <Row style={{ textAlign: "right", marginTop: "50px" }}>
                        <Col>
                          <EditRecipeModal recipe={recipe} />
                        </Col>
                        <Col>
                          <DeleteRecipeModal recipe_id={recipe.id} />
                        </Col>
                        <Col>
                          <PublishRecipeModal recipe_id={recipe.id} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              ))}
            </ListGroup>
          </Card>

          {/* Posts Section */}
          <h4 style={{ textAlign: "left", marginTop: "50px" }}>Posts</h4>
          <Card style={{ backgroundColor: "rgba(255, 192, 203, 0.63)" }}>
            <ListGroup>
              {/* Map over published posts */}
              {posts.map((recipe) => (
                <Card key={recipe.id}>
                  <Row style={{ padding: "10px", margin: "30px 0" }}>
                    {/* Recipe image */}
                    <Col style={{ alignContent: "center" }}>
                      <Image
                        src={recipe.image_url}
                        style={{ width: "100%", padding: "20px" }}
                      />
                    </Col>

                    {/* Recipe title and ingredients */}
                    <Col>
                      <h5>{recipe.title}</h5>
                      <h6 style={{ marginTop: "20px" }}>Ingredients</h6>
                      <ListGroup style={{ textAlign: "left" }}>
                        {recipe.ingredients.map((ingredient, index) => (
                          <ListGroup.Item as="li" key={index}>
                            {ingredient}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Col>

                    {/* Directions and action buttons */}
                    <Col>
                      <h6>Directions</h6>
                      <ListGroup as="ol" numbered style={{ textAlign: "left" }}>
                        {recipe.directions.map((direction, index) => (
                          <ListGroup.Item as="li" key={index}>
                            {direction}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>

                      {/* Edit and delete buttons only (already published) */}
                      <Row style={{ textAlign: "right", marginTop: "50px" }}>
                        <Col>
                          <EditRecipeModal recipe={recipe} />
                        </Col>
                        <Col>
                          <DeleteRecipeModal recipe_id={recipe.id} />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              ))}
            </ListGroup>
          </Card>
        </Container>

        {/* Footer */}
        <Footer />
      </Stack>
    </div>
  );
}
