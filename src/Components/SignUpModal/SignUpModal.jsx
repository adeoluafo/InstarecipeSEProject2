import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../UserContext"; // Global user state context
import { supabase } from "../../client"; // Supabase client for auth and DB access

// 👤 Modal component for registering a new user
function MyVerticallyCenteredModal(props) {
  const { userContext, setUserContext } = useContext(UserContext);

  // 📥 Form input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🧾 Inserts new user into the custom "User" table with an empty favorites object
  const insertIntoUserTable = async (user_id) => {
    try {
      const { error } = await supabase
        .from("User")
        .insert({ user_id: user_id, favorites: {} });

      if (error) {
        console.log(error);
        alert("User table insert failed: " + error.message);
      }
    } catch (error) {
      alert("Creation failed: " + error.message);
    }
  };

  // 🔐 Handles account creation with Supabase Auth and user table setup
  const handleCreate = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log(data);

      if (!error) {
        const tempUser = data.user; // user info returned from Supabase
        console.log("temp user", tempUser);

        // 💾 Store user in global context
        setUserContext(tempUser);

        // 🛠 Add to the "User" table for favorites support
        insertIntoUserTable(tempUser.id);

        // 🔄 Refresh page after sign-up
        location.reload();
      } else {
        alert(error.message); // display any signup error
      }
    } catch (error) {
      alert("Creation failed: " + error.message);
    }
  };

  // Debug: log current input values
  console.log(email, password);

  // 🧱 Modal layout with form
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
        {/* 📩 Email + Password input form */}
        <Form>
          {/* Email field */}
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* Password field */}
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Submit button */}
          <Button
            onClick={handleCreate}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
          >
            Create
          </Button>
        </Form>
      </Modal.Body>

      {/* Close modal button */}
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// 🔲 Wrapper component that displays the "Sign up" button and manages modal visibility
export default function SignUpModal() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {/* Main button to open sign-up modal */}
      <Button variant="danger" onClick={() => setModalShow(true)}>
        Sign up
      </Button>

      {/* Render the modal when modalShow is true */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
