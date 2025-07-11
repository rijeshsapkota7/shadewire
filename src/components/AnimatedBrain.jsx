// src/components/AnimatedBrain.jsx
import React from "react";
import Lottie from "lottie-react";
import brainAnimation from "../JSON/air.json";

const AnimatedBrain = () => {
  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      <Lottie
        animationData={brainAnimation}
        loop={true}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default AnimatedBrain;
