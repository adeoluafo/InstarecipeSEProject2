import React from "react";
import { supabase } from "../../client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../UserContext";
import "./LoginModal.css";

//this is the login modal
function MyVerticallyCenteredModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserContext } = useContext(UserContext);
  //this function checks the database for an existing user
  const handleLogin = async (e) => {
    //e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      
      console.log(error);

      if (error == null) {
        // Update the user context
        setUserContext(data.user);
        // Navigate to the home page after successful login
        location.reload();
      } else {
        // Handle the login failure case
        alert(error);
      }
    } catch (error) {
      // Handle any network or API request errors
      alert("Login failed: " + error);
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
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            onClick={() => handleLogin()}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
          >
            Login
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

export default function LoginModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        style={{ marginRight: "10px" }}
        variant="outline-primary"
        onClick={() => setModalShow(true)}
      >
        Sign In
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
