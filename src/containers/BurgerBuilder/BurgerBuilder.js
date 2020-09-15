import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildContols/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import classes from "./BurgerBuilder.module.css";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 6.9,
    purchasable: true,
    ordered: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios({
      url: "https://react-burger-builder-bc2e4.firebaseio.com/ingredients.json",
      method: "get",
    })
      .then((res) => {
        this.setState({ ingredients: res.data });
      })
      .catch((error) => this.setState({ error: true }));
  }

  handleUpdatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  handleAdded = (type) => {
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = newCount;
    const priceAddition = INGREDIENT_PRICE[type];
    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice + priceAddition;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIngredient,
    });
    this.handleUpdatePurchaseState(updatedIngredient);
  };

  handleRemoved = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const newCount = oldCount - 1;
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = newCount;
    const priceDeduction = INGREDIENT_PRICE[type];
    const oldTotalPrice = this.state.totalPrice;
    const newTotalPrice = oldTotalPrice - priceDeduction;
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: updatedIngredient,
    });
    this.handleUpdatePurchaseState(updatedIngredient);
  };

  handleOrdered = () => {
    this.setState({ ordered: true });
  };

  handleCancleOrder = () => {
    this.setState({ ordered: false });
  };

  handleContinueOrder = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Crazybirdz",
        address: {
          street: "TestStreet 1",
          zipCode: "32543",
          country: "South Korea",
        },
        email: "test@test.com",
      },
      deliveryMode: "fastest",
    };

    axios({
      method: "post",
      url: "orders.json",
      data: order,
    })
      .then((response) => this.setState({ loading: false, ordered: false }))
      .catch((error) => this.setState({ loading: false, ordered: false }));
  };

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can not be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.handleAdded}
            removeIngredient={this.handleRemoved}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.handleOrdered}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          cancleOrder={this.handleCancleOrder}
          continueOrder={this.handleContinueOrder}
          ingredients={this.state.ingredients}
          price={parseFloat(this.state.totalPrice.toFixed(2))}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <div className={classes.Content}>
        <Modal
          ordered={this.state.ordered}
          cancleOrder={this.handleCancleOrder}
        >
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
