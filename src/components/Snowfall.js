import React from "react";
import "./Snowfall.css";

const Snowfall = () => {
const isMobile = window.innerWidth <= 768; // Check if it's a mobile device

const snowflakes = Array.from({ length: isMobile ? 35 : 50 }).map((_, index) => {
    const topPosition = Math.random() * -100; // Random initial top position
    const size = isMobile ? Math.random() * 12 + 5 : Math.random() * 18 + 6; // Adjust size based on device type
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
            ❄️
        </div>
    );
});

  return <>{snowflakes}</>;
};

export default Snowfall;
