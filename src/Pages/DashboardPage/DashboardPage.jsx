  import React from "react";
  import TopBar from "../../Components/TopBar/TopBar";
  import Stack from "react-bootstrap/esm/Stack";
  import Container from "react-bootstrap/esm/Container";
  import Row from "react-bootstrap/esm/Row";
  import Image from "react-bootstrap/esm/Image";
  import { UserContext, RecipesContext } from "../../UserContext";
  import { useContext, useEffect, useState } from "react";
  import Col from "react-bootstrap/esm/Col";
  import Card from "react-bootstrap/Card";
  import Footer from "../../Components/Footer/Footer";
  import Button from "react-bootstrap/esm/Button";
  import ListGroup from "react-bootstrap/ListGroup";
  import { supabase } from "../../client";
  import EditRecipeModal from "../../Components/EditRecipeModal/EditRecipeModal";
  import CreateRecipeModal from "../../Components/CreateRecipeModal/CreateRecipeModal";
  import DeleteRecipeModal from "../../Components/DeleteRecipeModal/DeleteRecipeModal";
  import PublishRecipeModal from "../../Components/PublishRecipeModal/PublishRecipeModal";

  export default function DashboardPage() {
    const { userContext } = useContext(UserContext);
    const { recipesContext, setRecipesContext } = useContext(RecipesContext);
    const [drafts, setDrafts] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      function filterRecipes() {
        const newDraftList = recipesContext.filter((recipe) => {
          if (
            recipe.is_published == false &&
            recipe.author_id == userContext.id
          ) {
            return true;
          } else {
            return false;
          }
        });
        const newPostsList = recipesContext.filter((recipe) => {
          if (recipe.is_published == true && recipe.author_id == userContext.id) {
            return true;
          } else {
            return false;
          }
        });
        setDrafts(newDraftList);
        setPosts(newPostsList);
      }

      filterRecipes();
    }, [recipesContext]);

    return (
      <div>
        <TopBar />
        <Stack gap={3} style={{ marginTop: "70px" }}>
          <Container>
            <Card style={{ backgroundColor: "rgba(255, 192, 203, 0.63)" }}>
              <Row>
                <Col>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
                    style={{ width: "50%" }}
                  />
                  <h6 style={{ marginTop: "12px" }}>{userContext.email}</h6>
                </Col>
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
            <h4 style={{ textAlign: "left", marginTop: "50px" }}>Drafts</h4>
            <Card style={{ backgroundColor: "rgba(255, 192, 203, 0.63)" }}>
              <ListGroup>
                {drafts.map((recipe) => (
                  <Card key={recipe.id}>
                    <Row
                      style={{
                        padding: "10px",
                        marginBottom: "30px",
                        marginTop: "30px",
                      }}
                    >
                      <Col style={{ alignContent: "center" }}>
                        <Image
                          src={recipe.image_url}
                          style={{ width: "100%", padding: "20px" }}
                        />
                      </Col>
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
                      <Col>
                        <h6>Directions</h6>
                        <ListGroup as="ol" numbered style={{ textAlign: "left" }}>
                          {recipe.directions.map((direction, index) => (
                            <ListGroup.Item as="li" key={index}>
                              {direction}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <Row
                          style={{
                            textAlign: "right",
                            marginTop: "50px",
                          }}
                        >
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
            <h4 style={{ textAlign: "left", marginTop: "50px" }}>Posts</h4>
            <Card style={{ backgroundColor: "rgba(255, 192, 203, 0.63)" }}>
              <ListGroup>
                {posts.map((recipe) => (
                  <Card key={recipe.id}>
                    <Row
                      style={{
                        padding: "10px",
                        marginBottom: "30px",
                        marginTop: "30px",
                      }}
                    >
                      <Col style={{ alignContent: "center" }}>
                        <Image
                          src={recipe.image_url}
                          style={{ width: "100%", padding: "20px" }}
                        />
                      </Col>
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
                      <Col>
                        <h6>Directions</h6>
                        <ListGroup as="ol" numbered style={{ textAlign: "left" }}>
                          {recipe.directions.map((direction, index) => (
                            <ListGroup.Item as="li" key={index}>
                              {direction}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                        <Row
                          style={{
                            textAlign: "right",
                            marginTop: "50px",
                          }}
                        >
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
          <Footer />
        </Stack>
      </div>
    );
  }
