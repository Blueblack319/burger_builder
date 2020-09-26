import React from "react";
import PropTypes from "prop-types";

import BuildControl from "./BuildControl/BuildControl";

import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => {
        return (
          <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={props.addIngredient.bind(this, ctrl.type)}
            removed={props.removeIngredient.bind(this, ctrl.type)}
            disabled={props.disabled[ctrl.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  addIngredient: PropTypes.func,
  removeIngredient: PropTypes.func,
  disabled: PropTypes.object,
  purchasable: PropTypes.bool,
  price: PropTypes.number,
  ordered: PropTypes.func,
};

export default BuildControls;
