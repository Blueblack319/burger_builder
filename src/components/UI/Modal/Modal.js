import React, { Component } from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.module.css";

const Modal = (props) => {
  // shouldComponentUpdate = (nextProps, nextState) => {
  //   return (
  //     nextProps.ordered !== this.props.ordered ||
  //     nextProps.children !== this.props.children
  //   );
  // };

  return (
    <Aux>
      <Backdrop show={props.ordered} clicked={props.cancleOrder} />
      <div
        className={classes.Modal}
        style={{
          transform: props.ordered ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.ordered ? "1" : "0",
          zIndex: props.ordered ? "500" : "-1",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

Modal.propTypes = {
  ordered: PropTypes.bool,
  cancleOrder: PropTypes.func,
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.ordered === nextProps.ordered &&
    prevProps.children === nextProps.children
  );
};

export default React.memo(Modal, areEqual);
