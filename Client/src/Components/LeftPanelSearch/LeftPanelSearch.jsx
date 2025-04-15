import React from "react";
import "./LeftPanelSearch.css";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function LeftPanelSearch({
  setDuration,
  setDifficulty,
  setCuisine,
  setDiet,
}) {
  return (
    <div style={{ textAlign: "left", marginTop: "20px" }}>
      <h2 style={{ marginBottom: "30px" }}>Recipes</h2>
      <FloatingLabel
        controlId="floatingSelectGrid"
        label="Duration"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Floating label select example"
          defaultValue="All"
          onChange={(e) => setDuration(e.target.value)}
        >
          <option value="Less">Less than 30 minutes</option>
          <option value="More">More than 30 minutes</option>
          <option value="All">All</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingSelectGrid"
        label="Difficulty"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Floating label select example"
          defaultValue="All"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
          <option value="All">All</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingSelectGrid"
        label="Cuisine"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Floating label select example"
          defaultValue="All"
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
          <option value="Japanese">Japanese</option>
          <option value="Thai">Thai</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="All">All</option>
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingSelectGrid"
        label="Diet"
        style={{ marginBottom: "20px" }}
      >
        <Form.Select
          aria-label="Floating label select example"
          defaultValue="All"
          onChange={(e) => setDiet(e.target.value)}
        >
          <option value="Regular">Regular</option>
          <option value="Keto">Keto</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="All">All</option>
        </Form.Select>
      </FloatingLabel>
    </div>
  );
}
