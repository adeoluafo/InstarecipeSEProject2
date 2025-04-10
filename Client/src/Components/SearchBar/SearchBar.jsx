import React from "react";
import "./SearchBar.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SearchBar({ setKeyword }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <Row>
        <Col xs={10}>
          <Form.Control
            type="email"
            placeholder="Search by keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col>
          <Button variant="secondary">Search</Button>
        </Col>
      </Row>
    </div>
  );
}
