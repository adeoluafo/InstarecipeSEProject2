import React from "react";
import "./Youtube.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Youtube() {
  return (
    <div style={{ marginTop: "40px", textAlign: "left" }}>
      <h3>Videos</h3>
      <Row>
        <Col>
          <iframe
            style={{ borderRadius: "16px" }}
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/ZJy1ajvMU1k?si=yPUITh4wszKKh2BK"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Col>
        <Col>
          <iframe
            style={{ borderRadius: "16px" }}
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/pKAGEC12bog?si=G9xX9wxLV-UTfGrG"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Col>
        <Col>
          <iframe
            style={{ borderRadius: "16px" }}
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/yYWk38MCtHo?si=IAACyhZD1AFPclVA"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Col>
      </Row>
    </div>
  );
}
