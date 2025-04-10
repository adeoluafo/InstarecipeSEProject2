import React from "react";
import "./TopBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
import {
  UserContext,
  RecipesContext,
  FavoritesContext,
} from "../../UserContext";
import { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const { userContext, setUserContext } = useContext(UserContext);
  const { setRecipesContext } = useContext(RecipesContext);
  const { setFavoritesContext } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    setUserContext(null);
    setRecipesContext(null);
    setFavoritesContext(null);
    navigate("/");
  };
  return (
    <Navbar
      fixed="top"
      style={{
        display: "flex",
        flexWrap: "nowrap",
        Width: "100%",
        margin: "30px",
        marginLeft: "10%",
        marginRight: "10%",
        borderRadius: "10px",
        borderColor: "rgb(221, 111, 130)",

        borderStyle: "outset",
      }}
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand
          style={{
            color: "rgb(221, 111, 130)",
            font: "caption",
            marginRight: "80px",
          }}
        >
          InstaRecipe
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dashboard" disabled={userContext == null}>
              Dashboard
            </Nav.Link>
            <Nav.Link href="/search" disabled={userContext == null}>
              Search
            </Nav.Link>
            <Nav.Link href="/favorites" disabled={userContext == null}>
              Favorites
            </Nav.Link>
          </Nav>
          <Nav>
            {userContext != null ? (
              <>
                <FaRegUserCircle
                  style={{ fontSize: "28px", marginTop: "5px" }}
                />
                &nbsp;
                <Button variant="danger" onClick={() => handleSignOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <LoginModal />
                <SignUpModal />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
