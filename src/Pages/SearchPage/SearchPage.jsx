import React, { useState } from "react";

// 🧩 UI Components
import TopBar from "../../Components/TopBar/TopBar";
import LeftPanelSearch from "../../Components/LeftPanelSearch/LeftPanelSearch";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Grid from "../../Components/Grid/Grid";
import Footer from "../../Components/Footer/Footer";

// 📦 Bootstrap Layout Components
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

// 🔍 Main page for searching and filtering recipes
export default function SearchPage() {
  // 🧠 Local state for each filter category
  const [duration, setDuration] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const [diet, setDiet] = useState("All");
  const [keyword, setKeyword] = useState(""); // 🔠 Keyword search

  return (
    <div>
      {/* 🔝 Top Navigation Bar */}
      <TopBar />

      {/* 🧱 Main Content Layout */}
      <Container style={{ marginTop: "70px" }}>
        <Row>
          {/* 🧭 Sidebar with filters (left side) */}
          <Col>
            <LeftPanelSearch
              setDuration={setDuration}
              setDifficulty={setDifficulty}
              setCuisine={setCuisine}
              setDiet={setDiet}
              // You can add setMealType and setRating if needed later
            />
          </Col>

          {/* 🔍 Search bar and filtered grid (right side) */}
          <Col xs={9} style={{ marginBottom: "100px" }}>
            <SearchBar setKeyword={setKeyword} />

            {/* 🧮 Grid of filtered recipe cards */}
            <Grid
              duration={duration}
              difficulty={difficulty}
              cuisine={cuisine}
              diet={diet}
              keyword={keyword}
              // You can also pass mealType and rating props here if used
            />
          </Col>
        </Row>
      </Container>

      {/* 💡 AI Suggestion Card */}
      <Card style={{ textAlign: "left" }}>
        <Row>
          <Col>
            {/* 📣 Informational message promoting AI recipe generation */}
            Didn’t find enough recipes? Let’s fix that! 🧑‍🍳✨ <br />
            We’ve teamed up with world-class AI to bring you smart, personalized recipes <br />
            based on what you already have at home. Just tell us your ingredients, <br />
            and we’ll handle the rest — easy, fast, and tailored to you. 👉 <br />
            Generate recipes with AI and turn your kitchen into a five-star experience.
          </Col>

          <Col>
            {/* 🔗 CTA button linking to external AI tool (ChatGPT) */}
            <Button
              variant="danger"
              href="https://www.chatgpt.com"
              style={{ width: "270px", marginTop: "50px" }}
            >
              Click here
            </Button>
          </Col>
        </Row>
      </Card>

      {/* 🔚 Footer */}
      <Footer />
    </div>
  );
}
