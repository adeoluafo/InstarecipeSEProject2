import React, { useState, useContext } from "react";
import { supabase } from "../../client";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../UserContext";
import "./LoginModal.css";

// 🔐 This is the login modal component that allows users to sign in
function MyVerticallyCenteredModal(props) {
  // 👤 Login form input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserContext } = useContext(UserContext); // Access and update global user context

  // ✅ Handle login using Supabase Auth
  const handleLogin = async () => {
    try {
      // Attempt to sign in using email & password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      console.log(error); // Debug log

      if (error == null) {
        // ✅ Login successful: update global user context
        setUserContext(data.user);
        // 🔄 Refresh page to reflect login state
        location.reload();
      } else {
        // ❌ Login failed: show alert with error
        alert(error.message);
      }
    } catch (error) {
      // 🌐 Catch any unexpected network or client-side errors
      alert("Login failed: " + error.message);
    }
  };

  console.log(email, password); // Debug: show email/password in console

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
        {/* 📩 Email + Password Form */}
        <Form>
          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* 🔐 Login Button */}
          <Button
            onClick={handleLogin}
            style={{ backgroundColor: "rgba(227, 80, 124)" }}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>

      {/* ❌ Modal Footer - Close Button */}
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// 📦 Wrapper component that renders the "Sign In" button and manages modal visibility
export default function LoginModal() {
  const [modalShow, setModalShow] = useState(false); // Modal toggle state

  return (
    <>
      {/* 🟦 Button to open login modal */}
      <Button
        style={{ marginRight: "10px" }}
        variant="outline-primary"
        onClick={() => setModalShow(true)}
      >
        Sign In
      </Button>

      {/* 🧾 Login Modal with Auth logic */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
