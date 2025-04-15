import React from "react";
import "./Homepage.css";
import TopBar from "../../Components/TopBar/TopBar";
import Mission from "../../Components/Mission/Mission";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LeftPanelSearch from "../../Components/LeftPanelSearch/LeftPanelSearch";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Grid from "../../Components/Grid/Grid";
import Youtube from "../../Components/Youtube/Youtube";
import Footer from "../../Components/Footer/Footer";
import { useEffect, useState, useContext } from "react";
import {
  RecipesContext,
  FavoritesContext,
  UserContext,
} from "../../UserContext";
import { supabase } from "../../client";

export default function HomePage() {
  const { recipesContext, setRecipesContext } = useContext(RecipesContext);
  const { favoritesContext, setFavoritesContext } =
    useContext(FavoritesContext);
  const { userContext } = useContext(UserContext);

  const [duration, setDuration] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const [diet, setDiet] = useState("All");
  const [mealType, setMealType] = useState("All");
  const [rating, setRating] = useState("All");
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase.from("Recipes").select();
        if (error == null) {
          setRecipesContext(data);
        } else {
          alert(error);
        }
      } catch (error) {
        alert("Fetch Recipes failed: " + error);
      }
    };
    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from("User")
          .select()
          .eq("user_id", userContext.id);
        console.log(userContext);
        if (error == null) {
          setFavoritesContext(data[0]);
        } else {
          alert(error);
        }
      } catch (error) {
        alert("Fetch favorites failed: " + error);
      }
    };

    if (userContext != null) {
      fetchRecipes();
      fetchFavorites();
    }
  }, []);
console.log(userContext);
  return (
    <div>
      <TopBar />
      <Stack gap={3}>
        <Mission />
        <Container>
          <Row>
            <Col>
            <LeftPanelSearch
                setDuration={setDuration}
                setDifficulty={setDifficulty}
                setCuisine={setCuisine}
                setDiet={setDiet}
                setMealType={setMealType}
                setRating={setRating}
            />

            </Col>
            <Col xs={9}>
              <SearchBar setKeyword={setKeyword} />
              <Grid
                  duration={duration}
                  difficulty={difficulty}
                  cuisine={cuisine}
                  diet={diet}
                  keyword={keyword}
                  mealType={mealType}
                  rating={rating}
                />

            </Col>
          </Row>
        </Container>
        <Youtube />
        <Footer />
      </Stack>
    </div>
  );
}
