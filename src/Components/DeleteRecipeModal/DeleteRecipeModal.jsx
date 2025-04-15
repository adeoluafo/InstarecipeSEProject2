import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { RecipesContext } from "../../UserContext";
import { supabase } from "../../client";

// 🔥 Modal component for confirming and performing recipe deletion
function MyVerticallyCenteredModal(props) {
  const { setRecipesContext } = useContext(RecipesContext); // access global recipe updater
  const recipe_id = props.recipe_id; // get recipe ID from parent props

  // 🔄 Fetch updated recipes from Supabase after deletion
  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase.from("Recipes").select();
      if (error == null) {
        setRecipesContext(data); // update recipes in context
      } else {
        console.log(error);
        alert(error.message);
      }
    } catch (error) {
      alert("Fetch Recipes failed: " + error.message);
    }
  };

  // ❌ Handle deletion of the recipe from Supabase
  const handleDelete = async () => {
    try {
      const response = await supabase
        .from("Recipes")
        .delete()
        .eq("id", recipe_id); // delete by matching ID
      console.log(response);

      if (response.error == null) {
        fetchRecipes(); // refresh after deletion
      } else {
        console.log(response.error);
        alert(response.error.message);
      }
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  // 🧱 Modal layout
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete this Recipe?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* ❌ Cancel */}
        <Button onClick={props.onHide} variant="dark">
          No
        </Button>

        {/* ✅ Confirm deletion */}
        <Button
          onClick={() => {
            handleDelete();
            props.onHide(); // close modal
          }}
          style={{ backgroundColor: "rgba(227, 80, 124)", marginLeft: "20px" }}
        >
          Yes
        </Button>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// 🔲 Wrapper component for the "Delete" button and triggering the modal
export default function DeleteRecipeModal({ recipe_id }) {
  const [modalShow, setModalShow] = React.useState(false); // toggle modal state

  return (
    <>
      {/* Delete button that opens the confirmation modal */}
      <Button variant="danger" onClick={() => setModalShow(true)}>
        Delete
      </Button>

      {/* Modal with deletion logic */}
      <MyVerticallyCenteredModal
        recipe_id={recipe_id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
