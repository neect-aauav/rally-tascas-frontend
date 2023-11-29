// Snowfall.js
import React from "react";
import "./Snowfall.css";

const Snowfall = () => {
  const snowflakes = Array.from({ length: 50 }).map((_, index) => {
    const topPosition = Math.random() * -100; // Random initial top position
    const size = Math.random() * 20 + 4;
    const duration = Math.random() * 5 + 10; // Random animation duration between 5 and 10 seconds
    const delay = Math.random() * -20; // Random delay to stagger the start times
    const leftPosition = Math.random() * 100; // Random horizontal position

    return (
      <div
        key={index}
        className="snowflake"
        style={{
          top: `${topPosition}%`,
          left: `${leftPosition}%`,
          width: `${size}px`,
          height: `${size}px`,
          fontSize: `${size}px`,
          opacity: Math.random(),
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        ❄
      </div>
    );
  });

  return <>{snowflakes}</>;
};

export default Snowfall;
