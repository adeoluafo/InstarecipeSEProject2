import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { supabase } from "../../client";

//this component is the modal for updating the recipe

function MyVerticallyCenteredModal(props) {
  const [time, setTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [difficulty, setDifficulty] = useState("Easy");
  const [directions, setDirections] = useState("");
  const [rating, setRating] = useState(0);
  const comments = props.comments;
  const recipe_id = props.recipe_id;
  const handleCreate = async () => {
    let tempComments = [...comments];
    const newComment = {
      time: time,
      rating: rating,
      serving: servings,
      difficulty: difficulty,
      directions: directions,
    };
    tempComments = [...tempComments, newComment];
    try {
      const { error } = await supabase
        .from("Recipes")
        .update({
          comments: tempComments,
        })
        .eq("id", recipe_id);
      if (error == null) {
        props.setComments(tempComments);
        //fetchRecipes();
      } else {
        console.log(error);
        alert(error);
      }
    } catch (error) {
      alert("Create Recipes failed: " + error);
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Rating: {rating}</Form.Label>
            <Form.Range
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              max={5}
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
            <Form.Label>Serving</Form.Label>
            <Form.Control
              required
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
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
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Tip</Form.Label>

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
              handleCreate(true);
              props.onHide();
            }}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
          >
            Post
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

export default function CommentsModal({ recipe_id, comments, setComments }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant="danger"
        style={{ marginTop: "20px" }}
        onClick={() => setModalShow(true)}
      >
        Add Comment
      </Button>

      <MyVerticallyCenteredModal
        recipe_id={recipe_id}
        comments={comments}
        setComments={setComments}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
