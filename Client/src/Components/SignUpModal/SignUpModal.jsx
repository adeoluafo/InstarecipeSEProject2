import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../UserContext";
import { supabase } from "../../client";

//this component is the modal button on the signup page that helps create a new user
function MyVerticallyCenteredModal(props) {
  const { userContext, setUserContext } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const insertIntoUserTable = async (user_id) => {
    try {
      // Make the create user API request
    
      const { error } = await supabase
        .from("User")
        .insert({ user_id: user_id, favorites: {} });
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  const handleCreate = async (e) => {
    //e.preventDefault();

    try {
      // Make the create user API request

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      console.log(data);

      if (error == null) {
        //set user context
        
        const tempUser = data.user;
        console.log("temp user",tempUser)
        setUserContext(tempUser);
        insertIntoUserTable(tempUser.id);
        // Navigate to the home page after successful login
        location.reload();
      } else {
        // Handle the create failure case
        alert(error);
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("creation failed: " + error);
    }
  };
  console.log(email, password)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            onClick={() => {
              handleCreate();
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

export default function SignUpModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setModalShow(true)}>
        Sign up
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
