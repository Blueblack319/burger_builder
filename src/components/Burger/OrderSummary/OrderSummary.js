import React from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import { Link } from "react-router-dom";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span>
          {igKey}: {props.ingredients[igKey]}
        </span>
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
      <p>
        <strong>Total Price: {props.price}$</strong>
      </p>
      <Button btnType="Danger" clicked={props.cancleOrder}>
        Cancle
      </Button>
      <Link to="/checkout">
        <Button btnType="Success" clicked={props.continueOrder}>
          Continue
        </Button>
      </Link>
    </Aux>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  cancleOrder: PropTypes.func,
  continueOrder: PropTypes.func,
};

export default OrderSummary;
