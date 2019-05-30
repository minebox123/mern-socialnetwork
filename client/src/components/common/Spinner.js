import React from "react";
import gear from "./gear.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={gear}
        alt="Loading..."
        style={{ width: 100, margin: "auto", display: "block" }}
      />
    </div>
  );
};

export default Spinner;
