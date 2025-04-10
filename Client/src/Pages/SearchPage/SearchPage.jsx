import React from "react";
import TopBar from "../../Components/TopBar/TopBar";
import LeftPanelSearch from "../../Components/LeftPanelSearch/LeftPanelSearch";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Grid from "../../Components/Grid/Grid";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";

export default function SearchPage() {
  const [duration, setDuration] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [cuisine, setCuisine] = useState("All");
  const [diet, setDiet] = useState("All");
  const [keyword, setKeyword] = useState("");
  return (
    <div>
      <TopBar />
      <Container style={{ marginTop: "70px" }}>
        <Row>
          <Col>
            <LeftPanelSearch
              setDuration={setDuration}
              setDifficulty={setDifficulty}
              setCuisine={setCuisine}
              setDiet={setDiet}
            />
          </Col>
          <Col xs={9} style={{ marginBottom: "100px" }}>
            <SearchBar setKeyword={setKeyword} />
            <Grid
              duration={duration}
              difficulty={difficulty}
              cuisine={cuisine}
              diet={diet}
              keyword={keyword}
            />
          </Col>
        </Row>
      </Container>
      <Card style={{ textAlign: "left" }}>
        <Row>
          <Col>
            Didn’t find enough recipes? Let’s fix that! 🧑‍🍳✨ <br /> We’ve teamed
            up with world-class AI to bring you smart, personalized recipes{" "}
            <br />
            based on what you already have at home. Just tell us your
            ingredients, <br />
            and we’ll handle the rest — easy, fast, and tailored to you. 👉 to
            <br />
            generate recipes with AI and turn your kitchen into a five-star
            experience.
          </Col>
          <Col>
            <Button
              variant="danger"
              href="https://www.chatgpt.com"
              style={{ width: "270px", marginTop: "50px" }}
            >
              Click here{" "}
            </Button>{" "}
          </Col>
        </Row>
      </Card>
      <Footer />
    </div>
  );
}
