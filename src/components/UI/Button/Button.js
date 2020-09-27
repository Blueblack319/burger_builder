import React, { Component } from "react";

import classes from "./Button.module.css";

<<<<<<< HEAD
// const Button = (props) => (
//   <button
//     className={[classes.Button, classes[props.btnType]].join(" ")}
//     onClick={props.clicked}
//   >
//     {props.children}
//   </button>
// );
class Button extends Component {
  state = {
    btnType: null,
    text: "",
  };

  componentDidMount() {
    console.log(this.props.location);
  }
  render() {
    return (
      <button
        className={[classes.Button, classes[this.props.btnType]].join(" ")}
        onClick={this.props.clicked}
      >
        {this.props.children}
      </button>
    );
  }
}
=======
const Button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);
>>>>>>> course

export default Button;
