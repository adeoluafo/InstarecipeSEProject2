import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card"; // not used in this component
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom"; // not used either
import { UserContext, RecipesContext } from "../../UserContext";
import { supabase } from "../../client";

// 🧾 Modal for editing an existing recipe
function MyVerticallyCenteredModal(props) {
  const { userContext, setUserContext } = useContext(UserContext);
  const { setRecipesContext } = useContext(RecipesContext);
  const recipe = props.recipe;

  // 🧠 Set initial state based on the recipe being edited
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [time, setTime] = useState(recipe.time);
  const [servings, setServings] = useState(recipe.servings);
  const [difficulty, setDifficulty] = useState(recipe.difficulty);
  const [diet, setDiet] = useState(recipe.diet);
  const [cuisine, setCuisine] = useState(recipe.cuisine);
  const [course, setCourse] = useState(recipe.course);
  const [ingredients, setIngredients] = useState(recipe.ingredients); // expects array
  const [directions, setDirections] = useState(recipe.directions);   // expects array

  // 🖼️ Default images by cuisine
  const imageDictionary = {
    Italian: "https://static.wixstatic.com/media/...",
    Mexican: "https://www.allrecipes.com/thmb/...",
    Indian: "https://media.istockphoto.com/id/1292563627/photo/...",
    Japanese: "https://images.pexels.com/photos/2098085/...",
    Thai: "https://img77.uenicdn.com/image/...",
    "Middle Eastern": "https://media.istockphoto.com/id/833390070/photo/..."
  };

  // 🔄 Refresh recipes from Supabase
  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase.from("Recipes").select();
      if (!error) {
        setRecipesContext(data);
      } else {
        console.log(error);
        alert(error.message);
      }
    } catch (error) {
      alert("Fetch Recipes failed: " + error.message);
    }
  };

  // ✏️ Handles editing the recipe in the database
  const handleEdit = async () => {
    try {
      const { error } = await supabase
        .from("Recipes")
        .update({
          title,
          description,
          time: time.toString(),
          servings,
          difficulty,
          diet,
          cuisine,
          course,
          ingredients,
          directions,
          image_url: imageDictionary[cuisine] // uses default image
        })
        .eq("id", recipe.id); // updates only this recipe

      if (!error) {
        fetchRecipes(); // update local state
      } else {
        console.log(error);
        alert(error.message);
      }
    } catch (error) {
      alert("Edit failed: " + error.message);
    }
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Recipe</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* 🔤 Title */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* 📝 Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* ⏱ Time */}
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              required
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>

          {/* 🍽 Servings */}
          <Form.Group className="mb-3">
            <Form.Label>Servings</Form.Label>
            <Form.Control
              required
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </Form.Group>

          {/* 🧾 Course */}
          <Form.Group className="mb-3">
            <Form.Label>Course</Form.Label>
            <Form.Control
              required
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </Form.Group>

          {/* 📊 Difficulty */}
          <FloatingLabel label="Difficulty" className="mb-3">
            <Form.Select
              defaultValue={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Form.Select>
          </FloatingLabel>

          {/* 🌍 Cuisine */}
          <FloatingLabel label="Cuisine" className="mb-3">
            <Form.Select
              defaultValue={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            >
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
              <option value="Thai">Thai</option>
              <option value="Middle Eastern">Middle Eastern</option>
            </Form.Select>
          </FloatingLabel>

          {/* 🥗 Diet */}
          <FloatingLabel label="Diet" className="mb-3">
            <Form.Select
              defaultValue={diet}
              onChange={(e) => setDiet(e.target.value)}
            >
              <option value="Regular">Regular</option>
              <option value="Keto">Keto</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Gluten-Free">Gluten-Free</option>
            </Form.Select>
          </FloatingLabel>

          {/* 🧂 Ingredients (editable list of items) */}
          <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            {ingredients.map((ingredient, index) => (
              <Form.Control
                key={index}
                required
                as="textarea"
                value={ingredient}
                style={{ marginBottom: "5px" }}
                onChange={(e) => {
                  const temp = [...ingredients];
                  temp[index] = e.target.value;
                  setIngredients(temp);
                }}
              />
            ))}
          </Form.Group>

          {/* 🍳 Directions (editable list of steps) */}
          <Form.Group className="mb-3">
            <Form.Label>Directions</Form.Label>
            {directions.map((direction, index) => (
              <Form.Control
                key={index}
                required
                as="textarea"
                value={direction}
                style={{ marginBottom: "5px" }}
                onChange={(e) => {
                  const temp = [...directions];
                  temp[index] = e.target.value;
                  setDirections(temp);
                }}
              />
            ))}
          </Form.Group>

          {/* ✅ Submit */}
          <Button
            onClick={() => {
              handleEdit();
              props.onHide(); // close modal
            }}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
          >
            Update
          </Button>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// 🧱 Wrapper component to trigger the edit modal from a button
export default function EditRecipeModal({ recipe }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {/* ✏️ Edit Button */}
      <Button variant="outline-success" onClick={() => setModalShow(true)}>
        Edit
      </Button>

      {/* Renders the modal when triggered */}
      <MyVerticallyCenteredModal
        recipe={recipe}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
