import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useContext } from "react";
import { RecipesContext } from "../../UserContext";
import { supabase } from "../../client";

//this component is the modal for updating the recipe

function MyVerticallyCenteredModal(props) {
  const { setRecipesContext } = useContext(RecipesContext);
  const recipe_id = props.recipe_id;
  //this function makes update request to the server
  const fetchRecipes = async () => {
    try {
      const { data, error } = await supabase.from("Recipes").select();
      if (error == null) {
        setRecipesContext(data);
      } else {
        console.log(error);
        alert(error);
      }
    } catch (error) {
      alert("Fetch Recipes failed: " + error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await supabase
        .from("Recipes")
        .delete()
        .eq("id", recipe_id);
      console.log(response);
      if (response.error == null) {
        fetchRecipes();
      } else {
        console.log(error);
        alert(error);
      }
    } catch (error) {
      alert("Fetch Recipes failed: " + error);
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
          Delete this Recipe?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button
          onClick={() => {
            props.onHide();
          }}
          variant="dark"
        >
          No
        </Button>
        <Button
          onClick={() => {
            handleDelete();
            props.onHide();
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

export default function DeleteRecipeModal({ recipe_id }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setModalShow(true)}>
        Delete
      </Button>

      <MyVerticallyCenteredModal
        recipe_id={recipe_id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
