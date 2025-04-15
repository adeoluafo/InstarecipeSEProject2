import React from "react";
import "./Footer.css";

// 🧱 Layout components from React Bootstrap
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

// 📱 Social media icons
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

// 📦 Footer component — contains branding, links, and social icons
export default function Footer() {
  return (
    <Row style={{ marginTop: "30px", marginBottom: "30px" }}>
      {/* 🔝 Top section of footer with logo and social icons */}
      <Row style={{ marginBottom: "20px", textAlign: "left" }}>
        {/* 🧁 InstaRecipe brand title */}
        <Col xs={9}>
          <h3 style={{ color: "rgb(221, 111, 130)" }}>InstaRecipe</h3>
        </Col>

        {/* 📱 Social media icons aligned to the right */}
        <Col style={{ textAlign: "right", fontSize: "30px" }}>
          <FaFacebook />
          <FaTwitter />
          <FaInstagram />
        </Col>
      </Row>

      {/* 📚 Footer column links — informational & navigational */}
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
