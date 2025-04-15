import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Card from "react-bootstrap/Card"; // imported but not used in this file
import { useNavigate } from "react-router-dom"; // also imported but unused
import { UserContext, RecipesContext } from "../../UserContext";
import { supabase } from "../../client";

// 🍳 Modal component for creating a new recipe
function MyVerticallyCenteredModal(props) {
  const { userContext, setUserContext } = useContext(UserContext);
  const { setRecipesContext } = useContext(RecipesContext);

  // 🔧 State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState(0);
  const [difficulty, setDifficulty] = useState("Easy");
  const [diet, setDiet] = useState("Regular");
  const [cuisine, setCuisine] = useState("Italian");
  const [course, setCourse] = useState("");
  const [imageFile, setImageFile] = useState(null); // image file input
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");

  // 🖼️ Default image URL based on cuisine (used if no image uploaded)
  const imageDictionary = {
    Italian: "...",
    Mexican: "...",
    Indian: "...",
    Japanese: "...",
    Thai: "...",
    "Middle Eastern": "..."
  };

  // 🔄 Fetch recipes again after creation to refresh state
  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase.from("Recipes").select();
      if (!error) {
        setRecipesContext(data);
        // 🔄 Reset all form states
        setTitle("");
        setDescription("");
        setTime("");
        setServings(0);
        setCuisine("Italian");
        setDiet("Regular");
        setDifficulty("Easy");
        setCourse("");
        setIngredients("");
        setDirections("");
      } else {
        console.log(error);
        alert(error.message);
      }
    } catch (error) {
      alert("Fetch Recipes failed: " + error.message);
    }
  };

  // 📝 Convert long text into a list of sentences (for ingredients or directions)
  function createList(text) {
    text = text.replace(/\n/g, ""); // remove line breaks
    const array =
      text
        .match(/[^.!?\n]+[.!?]?/g)
        ?.map((s) => s.trim())
        .filter(Boolean) || [];
    return array;
  }

  // ✅ Handles recipe creation, including image upload and DB insert
  const handleCreate = async (is_published) => {
    let imageUrl = imageDictionary[cuisine]; // fallback image

    // 🖼️ Upload custom image to Supabase storage if provided
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `recipe-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("recipe-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        alert("Image upload failed: " + uploadError.message);
        return;
      }

      const { data } = supabase
        .storage
        .from("recipe-images")
        .getPublicUrl(filePath);

      imageUrl = data.publicUrl;
    }

    // 🍳 Insert new recipe with uploaded or default image
    try {
      const { error } = await supabase.from("Recipes").insert({
        title,
        description,
        time: time.toString(),
        servings,
        difficulty,
        diet,
        cuisine,
        course,
        ingredients: createList(ingredients),
        directions: createList(directions),
        image_url: imageUrl,
        author_id: userContext.id,
        comments: [],
        is_published: is_published,
      });

      if (!error) {
        fetchRecipes();
      } else {
        console.log(error);
        alert(error.message);
      }
    } catch (error) {
      alert("Insert recipe failed: " + error.message);
    }
  };

  // 🧪 Debug: log ingredients list
  console.log(createList(ingredients));

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

          {/* 📜 Description */}
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

          {/* 🎓 Course */}
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

          {/* 🧂 Ingredients */}
          <Form.Group className="mb-3">
            <Form.Label>Ingredients</Form.Label>
            <p>Each sentence counts as one ingredient</p>
            <Form.Control
              required
              as="textarea"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
          </Form.Group>

          {/* 🖼️ Image upload */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Recipe Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Form.Group>

          {/* 👨‍🍳 Directions */}
          <Form.Group className="mb-3">
            <Form.Label>Directions</Form.Label>
            <p>Each sentence counts as one step</p>
            <Form.Control
              required
              as="textarea"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
            />
          </Form.Group>

          {/* 💾 Buttons */}
          <Button variant="dark" onClick={() => {
            handleCreate(false);
            props.onHide();
          }}>
            Save as Draft
          </Button>{" "}
          <Button
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
            onClick={() => {
              handleCreate(true);
              props.onHide();
            }}
          >
            Create
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

// 🧱 Wrapper component to trigger modal with "Create New" button
export default function CreateRecipeModal() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button
        variant="danger"
        style={{ marginTop: "20px" }}
        onClick={() => setModalShow(true)}
      >
        Create New
      </Button>

      {/* Renders modal if triggered */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
