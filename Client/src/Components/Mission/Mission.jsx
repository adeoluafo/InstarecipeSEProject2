import React from "react";
import "./Mission.css";
import Button from "react-bootstrap/Button";

export default function Mission() {
  return (
    <div class="hero">
      <div class="hero-content">
        <h2>
          Choose from thousands
          <br /> of recipes
        </h2>
        <p>
          Discover easy-to-follow recipes made with fresh ingredients. <br />
          Cook confidently and create delicious meals your whole family <br />
          will love.
        </p>
        <Button variant="danger" disabled>
          Sign Up Today
        </Button>
      </div>
    </div>
  );
}
