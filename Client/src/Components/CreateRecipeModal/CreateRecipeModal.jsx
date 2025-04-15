import React from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { UserContext, RecipesContext } from "../../UserContext";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { supabase } from "../../client";

//this component is the modal for updating the recipe

function MyVerticallyCenteredModal(props) {
  const { userContext, setUserContext } = useContext(UserContext);
  const { setRecipesContext } = useContext(RecipesContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [servings, setServings] = useState(0);
  const [difficulty, setDifficulty] = useState("Easy");
  const [diet, setDiet] = useState("Regular");
  const [cuisine, setCuisine] = useState("Italian");
  const [course, setCourse] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const imageDictionary = {
    Italian:
      "https://static.wixstatic.com/media/2cbff6_ac782b0eaff94ec0881f0299fdb76ab6~mv2.jpg/v1/fill/w_900,h_700,al_c,q_85/2cbff6_ac782b0eaff94ec0881f0299fdb76ab6~mv2.jpg",
    Mexican:
      "https://www.allrecipes.com/thmb/Y4brle_IWwQ6ll1v4i69TO5sbfI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/102108380-Authentic-Mexican-Cuisine-Photo-by-Meredith-ebaca57279a548d6b6ef266493497fc3.jpg",
    Indian:
      "https://media.istockphoto.com/id/1292563627/photo/assorted-south-indian-breakfast-foods-on-wooden-background-ghee-dosa-uttappam-medhu-vada.jpg?s=612x612&w=0&k=20&c=HvuYT3RiWj5YsvP2_pJrSWIcZUXhnTKqjKhdN3j_SgY=",
    Japanese:
      "https://images.pexels.com/photos/2098085/pexels-photo-2098085.jpeg?cs=srgb&dl=pexels-rajesh-tp-749235-2098085.jpg&fm=jpg",
    Thai: "https://img77.uenicdn.com/image/upload/v1684866693/business/015a869d-d333-4348-aa40-fa3fc741e9a8.jpg",
    "Middle Eastern":
      "https://media.istockphoto.com/id/833390070/photo/arabic-dishes-and-meze.jpg?s=612x612&w=0&k=20&c=MtWWS3THa19Mnb96iOGfpxOGwdmYNM-Xi0_zAEW9mTY=",
  };
  //this function makes update request to the server
  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase.from("Recipes").select();
      if (error == null) {
        setRecipesContext(data);
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
        alert(error);
      }
    } catch (error) {
      alert("Fetch Recipes failed: " + error);
    }
  };
  function createList(text) {
    text = text.replace(/\n/g, "");
    const array =
      text
        .match(/[^.!?\n]+[.!?]?/g)
        ?.map((s) => s.trim())
        .filter(Boolean) || [];
    return array;
  }
  const handleCreate = async (is_published) => {
    try {
      const { error } = await supabase.from("Recipes").insert({
        title: title,
        description: description,
        time: time.toString(),
        servings: servings,
        difficulty: difficulty,
        diet: diet,
        cuisine: cuisine,
        course: course,
        ingredients: createList(ingredients),
        directions: createList(directions),
        image_url: imageDictionary[cuisine],
        author_id: userContext.id,
        comments: [],
        is_published: is_published,
      });
      if (error == null) {
        fetchRecipes();
      } else {
        console.log(error);
        alert(error);
      }
    } catch (error) {
      alert("Fetch Recipes failed: " + error);
    }
  };
  console.log(createList(ingredients));
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Recipe
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="username"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Time</Form.Label>
            <Form.Control
              required
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Servings</Form.Label>
            <Form.Control
              required
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Course</Form.Label>
            <Form.Control
              required
              type="username"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            />
          </Form.Group>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Difficulty"
            style={{ marginBottom: "20px" }}
          >
            <Form.Select
              aria-label="Floating label select example"
              defaultValue={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Cuisine"
            style={{ marginBottom: "20px" }}
          >
            <Form.Select
              aria-label="Floating label select example"
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

          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Diet"
            style={{ marginBottom: "20px" }}
          >
            <Form.Select
              aria-label="Floating label select example"
              defaultValue={diet}
              onChange={(e) => setDiet(e.target.value)}
            >
              <option value="Regular">Regular</option>
              <option value="Keto">Keto</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Gluten-Free">Gluten-Free</option>
            </Form.Select>
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Ingredients</Form.Label>
            <p>Each sentence counts as one ingredient</p>
            <Form.Control
              style={{ marginBottom: "5px" }}
              required
              as="textarea"
              type="ingredient"
              value={ingredients}
              onChange={(e) => {
                setIngredients(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Directions</Form.Label>
            <p>Each sentence counts as one step</p>

            <Form.Control
              style={{ marginBottom: "5px" }}
              required
              as="textarea"
              type="directions"
              value={directions}
              onChange={(e) => {
                setDirections(e.target.value);
              }}
            />
          </Form.Group>
          <Button
            onClick={() => {
              handleCreate(false);
              props.onHide();
            }}
            variant="dark"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => {
              handleCreate(true);
              props.onHide();
            }}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
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

export default function CreateRecipeModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant="danger"
        style={{ marginTop: "20px" }}
        onClick={() => setModalShow(true)}
      >
        Create New
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
