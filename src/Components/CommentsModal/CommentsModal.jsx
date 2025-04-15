import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { supabase } from "../../client";

// 🔧 Modal component for creating and submitting a comment/update for a recipe
function MyVerticallyCenteredModal(props) {
  // Form input states
  const [time, setTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [difficulty, setDifficulty] = useState("Easy");
  const [directions, setDirections] = useState("");
  const [rating, setRating] = useState(0);

  const comments = props.comments;
  const recipe_id = props.recipe_id;

  // ✅ Handles form submission - updates the recipe's "comments" array in Supabase
  const handleCreate = async () => {
    let tempComments = [...comments]; // clone current comments
    const newComment = {
      time: time,
      rating: rating,
      serving: servings,
      difficulty: difficulty,
      directions: directions,
    };
    tempComments.push(newComment); // add new comment to the array

    try {
      const { error } = await supabase
        .from("Recipes")
        .update({ comments: tempComments }) // update comments array in DB
        .eq("id", recipe_id); // match specific recipe by id

      if (!error) {
        props.setComments(tempComments); // update local state
      } else {
        console.log(error);
        alert(error.message);
      }
    } catch (error) {
      alert("Create Recipes failed: " + error.message);
    }
  };

  // 🎨 The actual modal UI
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
          {/* Rating Slider */}
          <Form.Group className="mb-3">
            <Form.Label>Rating: {rating}</Form.Label>
            <Form.Range
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              max={5}
            />
          </Form.Group>

          {/* Time Input */}
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              required
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>

          {/* Serving Input */}
          <Form.Group className="mb-3">
            <Form.Label>Serving</Form.Label>
            <Form.Control
              required
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
            />
          </Form.Group>

          {/* Difficulty Dropdown */}
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Difficulty"
            className="mb-3"
          >
            <Form.Select
              defaultValue={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Form.Select>
          </FloatingLabel>

          {/* Directions/Tip */}
          <Form.Group className="mb-3">
            <Form.Label>Tip</Form.Label>
            <Form.Control
              required
              as="textarea"
              value={directions}
              onChange={(e) => setDirections(e.target.value)}
            />
          </Form.Group>

          {/* Post Button */}
          <Button
            onClick={() => {
              handleCreate(true);
              props.onHide(); // close the modal
            }}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
          >
            Post
          </Button>
        </Form>
      </Modal.Body>

      {/* Modal Footer */}
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// 📦 Wrapper component that includes the "Add Comment" button and triggers the modal
export default function CommentsModal({ recipe_id, comments, setComments }) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {/* Button to open modal */}
      <Button
        variant="danger"
        style={{ marginTop: "20px" }}
        onClick={() => setModalShow(true)}
      >
        Add Comment
      </Button>

      {/* Comment Creation Modal */}
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
