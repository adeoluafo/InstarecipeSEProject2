import React from "react"; // React core import
import "./Homepage.css"; // CSS for styling the HomePage
import TopBar from "../../Components/TopBar/TopBar"; // Navigation bar at the top
import Mission from "../../Components/Mission/Mission"; // Component that displays the app’s mission or intro
import Stack from "react-bootstrap/Stack"; // Bootstrap layout component
import Container from "react-bootstrap/Container"; // Bootstrap container for responsive layout
import Row from "react-bootstrap/Row"; // Bootstrap row layout
import Col from "react-bootstrap/Col"; // Bootstrap column layout
import LeftPanelSearch from "../../Components/LeftPanelSearch/LeftPanelSearch"; // Filters and trending search component
import SearchBar from "../../Components/SearchBar/SearchBar"; // Keyword search bar
import Grid from "../../Components/Grid/Grid"; // Recipe card grid component
import Youtube from "../../Components/Youtube/Youtube"; // Optional Youtube section (maybe tutorial or promotion)
import Footer from "../../Components/Footer/Footer"; // Footer for the page
import { useEffect, useState, useContext } from "react"; // React hooks
import {
  RecipesContext, 
  FavoritesContext,
  UserContext,
} from "../../UserContext"; // Custom context providers for state management
import { supabase } from "../../client"; // Supabase client for database operations

export default function HomePage() {
  // Access global recipe context
  const { recipesContext, setRecipesContext } = useContext(RecipesContext);
  // Access global favorites context
  const { favoritesContext, setFavoritesContext } = useContext(FavoritesContext);
  // Access logged-in user context
  const { userContext } = useContext(UserContext);

  // Local filter states
  const [duration, setDuration] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const [diet, setDiet] = useState("All");
  const [mealType, setMealType] = useState("All");
  const [rating, setRating] = useState("All");
  const [keyword, setKeyword] = useState("");

  // Fetch recipes and user favorites when component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data, error } = await supabase.from("Recipes").select();
        if (error == null) {
          setRecipesContext(data); // Store all recipes in context
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
          .eq("user_id", userContext.id); // Filter by logged-in user
        if (error == null) {
          setFavoritesContext(data[0]); // Save favorite recipes
        } else {
          alert(error);
        }
      } catch (error) {
        alert("Fetch favorites failed: " + error);
      }
    };

    // Only fetch data if user is logged in
    if (userContext != null) {
      fetchRecipes();
      fetchFavorites();
    }
  }, []);

  console.log(userContext); // For debugging user info

  return (
    <div>
      {/* Top navigation bar */}
      <TopBar />

      {/* Stack layout with spacing */}
      <Stack gap={3}>
        {/* Mission/Intro Section */}
        <Mission />

        {/* Main content layout */}
        <Container>
          <Row>
            {/* Left column - filter panel */}
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

            {/* Right column - search bar and grid */}
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

        {/* Youtube and Footer Section */}
        <Youtube />
        <Footer />
      </Stack>
    </div>
  );
}
