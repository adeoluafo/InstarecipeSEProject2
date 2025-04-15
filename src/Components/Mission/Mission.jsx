import React from "react";
import "./Mission.css"; // 🎨 Custom CSS for layout and styling
import Button from "react-bootstrap/Button"; // 🔘 Bootstrap button component

// 💡 Simple hero section to promote the platform's mission
export default function Mission() {
  return (
    <div className="hero"> {/* 🖼️ Outer container for the mission section */}
      <div className="hero-content"> {/* 📄 Content container inside hero */}
        {/* 📢 Headline */}
        <h2>
          Choose from thousands
          <br /> of recipes
        </h2>

        {/* 📝 Supporting description */}
        <p>
          Discover easy-to-follow recipes made with fresh ingredients. <br />
          Cook confidently and create delicious meals your whole family <br />
          will love.
        </p>

        {/* 🔴 Call-to-action button (currently disabled) */}
        <Button variant="danger" disabled>
          Sign Up Today
        </Button>
      </div>
    </div>
  );
}
