import React, { useState } from "react";
import TopBar from "../../Components/TopBar/TopBar";
import LeftPanelSearch from "../../Components/LeftPanelSearch/LeftPanelSearch";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Grid from "../../Components/Grid/Grid";
import Footer from "../../Components/Footer/Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function SearchPage() {
  const [duration, setDuration] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const [diet, setDiet] = useState("All");
  const [mealType, setMealType] = useState("All");
  const [rating, setRating] = useState("All");
  const [keyword, setKeyword] = useState("");

  return (
    <div>
      <TopBar />
      <Container fluid style={{ marginTop: "70px", padding: "20px" }}>
        <Row>
          <Col xs={12} md={4} lg={3} style={{ marginBottom: "30px" }}>
            <LeftPanelSearch
              setDuration={setDuration}
              setDifficulty={setDifficulty}
              setCuisine={setCuisine}
              setDiet={setDiet}
              setMealType={setMealType}
              setRating={setRating}
            />
          </Col>
          <Col xs={12} md={8} lg={9} style={{ marginBottom: "100px" }}>
            <SearchBar setKeyword={setKeyword} />
            <Grid
              duration={duration}
              difficulty={difficulty}
              cuisine={cuisine}
              diet={diet}
              mealType={mealType}
              rating={rating}
              keyword={keyword}
            />
          </Col>
        </Row>
      </Container>
      <Card style={{ textAlign: "left" }}>
        <Row>
          <Col>
            Didn’t find enough recipes? Let’s fix that! 🧑‍🍳✨ <br /> We’ve teamed
            up with world-class AI to bring you smart, personalized recipes.
          </Col>
          <Col>
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
      <Footer />
    </div>
  );
}
