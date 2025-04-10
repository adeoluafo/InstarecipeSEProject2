import React from "react";
import "./Footer.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
      <Row style={{ marginBottom: "20px", textAlign: "left" }}>
        <Col xs={9}>
          <h3
            style={{
              color: "rgb(221, 111, 130)",
            }}
          >
            InstaRecipe
          </h3>
        </Col>
        <Col style={{ textAlign: "right", fontSize: "30px" }}>
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </Col>
      </Row>
      <Col style={{ textAlign: "left" }}>
        <p>Presentations</p>
        <p>Professionals</p>
        <p>Stores</p>
      </Col>
      <Col style={{ textAlign: "left" }}>
        <p>Webinars</p>

        <p>Workshops</p>

        <p>Local Meetups</p>
      </Col>
      <Col style={{ textAlign: "left" }}>
        <p>Our Initiatives</p>
        <p>Giving Back</p>
        <p>Communities</p>
      </Col>
      <Col style={{ textAlign: "left" }}>
        <p>Contact Form</p>
        <p>Work With Us</p>
        <p>Visit Us</p>
      </Col>
    </Row>
  );
}
