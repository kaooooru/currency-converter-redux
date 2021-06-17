import React from "react";

const Main = (props) => {
  return (
    <div className="main">
      <h1>Currency Converter</h1>
      <p>Let's convert!</p>
      <button onClick={() => props.history.push("/converter")}>Get Stated</button>
    </div>
  );
};

export default Main;