import React from "react";

const Loader = ({ text }) => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        width: "100%",
        height: "100%",
        borderRadius: "0.3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:'grey'
      }}
    >
      Loading {text}
    </div>
  );
};

export default Loader;
