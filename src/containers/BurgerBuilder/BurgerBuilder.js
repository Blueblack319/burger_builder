import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildContols/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import actionType from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasable: true,
    ordered: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios({
    //   url: "https://react-burger-builder-bc2e4.firebaseio.com/ingredients.json",
    //   method: "get",
    // })
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((error) => this.setState({ error: true }));
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
    this.props.onAddIngredient(type);
    this.props.onAddTotalPrice(type);
    this.handleUpdatePurchaseState(this.props.ingredients);
  };

  handleRemoved = (type) => {
    this.props.onRemoveIngredient(type);
    this.props.onSubstractTotalPrice(type);
    this.handleUpdatePurchaseState(this.props.ingredients);
  };

  handleOrdered = () => {
    this.setState({ ordered: true });
  };

  handleCancleOrder = () => {
    this.setState({ ordered: false });
  };

  handleContinueOrder = () => {
    const queryParams = [];
    for (let i in this.props.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.props.ingredients[i])
      );
    }
    queryParams.push("price=" + this.props.totalPrice);
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
      // state: { ingredients: this.state.ingredients },
    });
  };

  render() {
    const disableInfo = {
      ...this.props.ingredients,
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

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            addIngredient={this.handleAdded}
            removeIngredient={this.handleRemoved}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            price={this.props.totalPrice}
            ordered={this.handleOrdered}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          cancleOrder={this.handleCancleOrder}
          continueOrder={this.handleContinueOrder}
          ingredients={this.props.ingredients}
          price={parseFloat(this.props.totalPrice.toFixed(2))}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          ordered={this.state.ordered}
          cancleOrder={this.handleCancleOrder}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredientsReducer.ingredients,
    totalPrice: state.priceReducer.totalPrice,
    ingredientsPrice: state.priceReducer.ingredientsPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (type) =>
      dispatch({ type: actionType.ADD_INGREDIENT, ingType: type }),
    onRemoveIngredient: (type) =>
      dispatch({ type: actionType.REMOVE_INGREDIENT, ingType: type }),
    onAddTotalPrice: (type) =>
      dispatch({ type: actionType.ADD_TOTAL_PRICE, ingType: type }),
    onSubstractTotalPrice: (type) =>
      dispatch({ type: actionType.SUBSTRACT_TOTAL_PRICE, ingType: type }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
