import React from "react";
import "./SearchBar.css"; // 🎨 Custom styles for the search bar
import Form from "react-bootstrap/Form"; // 📥 Bootstrap form component
import Button from "react-bootstrap/Button"; // 🔘 Bootstrap button
import Row from "react-bootstrap/Row"; // 📐 Bootstrap row layout
import Col from "react-bootstrap/Col"; // 📏 Bootstrap column layout

// 🔍 Component that renders a search bar and a button
export default function SearchBar({ setKeyword }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <Row>
        {/* 📥 Search input field */}
        <Col xs={10}>
          <Form.Control
            type="text" // 
            placeholder="Search by keyword"
            onChange={(e) => setKeyword(e.target.value)} // Update keyword state on change
          />
        </Col>

        {/* 🔘 Search button (currently non-functional / decorative) */}
        <Col>
          <Button variant="secondary">Search</Button>
        </Col>
      </Row>
    </div>
  );
}
