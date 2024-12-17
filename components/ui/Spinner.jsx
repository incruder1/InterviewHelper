// Spinner.js
import React from "react";

const Spinner = ({ size = "w-12 h-12", color = "border-t-4 border-t-blue-500", speed = "animate-spin" }) => {
  return (
    <div className={`border-4 border-gray-200 rounded-full ${color} ${speed} ${size}`} />
  );
};

export { Spinner };
