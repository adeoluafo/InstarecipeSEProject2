import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { RecipesContext } from "../../UserContext";
import { supabase } from "../../client";

// ✅ Modal component that asks the user to confirm publishing a recipe
function MyVerticallyCenteredModal(props) {
  const { setRecipesContext } = useContext(RecipesContext); // access recipe context updater
  const recipe_id = props.recipe_id; // get the ID of the recipe to publish

  // 🔄 Re-fetch recipes from Supabase after publishing to refresh local state
  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase.from("Recipes").select();
      if (!error) {
        setRecipesContext(data); // update context with fresh data
      } else {
        console.log(error);
        alert(error.message);
      }
    } catch (error) {
      alert("Fetch Recipes failed: " + error.message);
    }
  };

  // 🚀 Set the recipe's "is_published" field to true in Supabase
  const handlePublish = async () => {
    try {
      const { error } = await supabase
        .from("Recipes")
        .update({ is_published: true })
        .eq("id", recipe_id); // only update the selected recipe

      if (!error) {
        fetchRecipes(); // refresh after publish
      } else {
        console.log(error);
        alert(error.message);
      }
    } catch (error) {
      alert("Publishing failed: " + error.message);
    }
  };

  // 🧱 Modal UI Layout
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Publish this Recipe?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* ❌ No button - closes modal */}
        <Button onClick={props.onHide} variant="dark">
          No
        </Button>

        {/* ✅ Yes button - calls publish and closes modal */}
        <Button
          onClick={() => {
            handlePublish();
            props.onHide();
          }}
          style={{ backgroundColor: "rgba(227, 80, 124)", marginLeft: "20px" }}
        >
          Yes
        </Button>
      </Modal.Body>

      {/* 🔚 Footer with a Close button */}
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// 📦 Wrapper component for "Publish" button that shows the modal
export default function PublishRecipeModal({ recipe_id }) {
  const [modalShow, setModalShow] = React.useState(false); // state to show/hide modal

  return (
    <>
      {/* 🟢 Publish button that opens the modal */}
      <Button variant="outline-success" onClick={() => setModalShow(true)}>
        Publish
      </Button>

      {/* 🧾 Modal with confirmation and Supabase logic */}
      <MyVerticallyCenteredModal
        recipe_id={recipe_id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
