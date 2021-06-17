import React from "react";

const About = (props) => {
  return (
    <div className="about">
      <p>This is a web based app that helps users to convert certain currencies to Canadian Dollar.</p>
      <p>Let's go back and try it!</p>
      <button onClick={props.history.goBack}>Go back</button>
    </div>
  );
};

export default About;