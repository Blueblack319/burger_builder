import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildContols/BuildControls";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0,
    },
    totalPrice: 4,
  };

  handleAdded = (type) => {
    const oldCount = this.state.ingredient[type];
    const newCount = oldCount + 1;
    const updatedIngredient = { ...this.state.ingredient };
    updatedIngredient[type] = newCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + priceAddition;
    this.setState({ totalPrice: newTotalPrice, ingredient: updatedIngredient });
  };

  handleRemoved = (type) => {
    const oldCount = this.state.ingredient[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredient = { ...this.state.ingredient };
    updatedIngredient[type] = newCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + priceDeduction;
    this.setState({ totalPrice: newTotalPrice, ingredient: updatedIngredient });
  };

  render() {
    const disableInfo = {
      ...this.state.ingredient,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredient} />
        <BuildControls
          ingredientAdded={this.handleAdded}
          ingredientRemoved={this.handleRemoved}
          disabled={disableInfo}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
