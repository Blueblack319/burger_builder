import React, { Component } from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // For Check
  componentDidUpdate = () => {
    console.log("[OrderSummary.js] componentDidUpdate");
  };
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span>
              {igKey}: {this.props.ingredients[igKey]}
            </span>
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to Checkout?</p>
        <p>
          <strong>Total Price: {this.props.price}$</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.cancleOrder}>
          Cancle
        </Button>
        <Button btnType="Success" clicked={this.props.continueOrder}>
          Continue
        </Button>
      </Aux>
    );
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object,
  price: PropTypes.number,
  cancleOrder: PropTypes.func,
  continueOrder: PropTypes.func,
};

export default OrderSummary;
