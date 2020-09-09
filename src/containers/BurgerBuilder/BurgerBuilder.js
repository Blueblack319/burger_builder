import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 1,
      bacon: 1,
      meat: 2,
      cheese: 2,
    },
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredient} />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
