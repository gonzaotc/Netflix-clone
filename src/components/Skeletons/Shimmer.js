import React from "react";

const Shimmer = ({ movieNumber = 0 }) => {
  console.log(movieNumber)
  return (
    <div className="shimmer-wrapper" style={{ "--i": movieNumber }}>
      <div className="shimmer"></div>
    </div>
  );
};

export default Shimmer;
