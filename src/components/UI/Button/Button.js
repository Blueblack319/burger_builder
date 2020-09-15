import React, { Component } from "react";

import classes from "./Button.module.css";

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

export default Button;
