import React, { useEffect, useState } from "react";

import Aux from "../../hoc/Aux/Aux";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildContols/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

export const BurgerBuilder = (props) => {
  const [isOrdered, setIsOrdered] = useState(false);
  // state = {
  //   ordered: false,
  // };

  useEffect(() => {
    props.onInitIngredients();
  }, []);
  // componentDidMount() {
  //   this.props.onInitIngredients();
  // }

  const handleUpdatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const handleOrdered = () => {
    if (props.isAuth) {
      setIsOrdered(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const handleCancleOrder = () => {
    setIsOrdered(false);
  };

  const handleContinueOrder = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disableInfo = {
    ...props.ings,
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? (
    <p>Ingredients can not be loaded!</p>
  ) : (
    <Spinner />
  );

  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          addIngredient={props.onIngredientAdded}
          removeIngredient={props.onIngredientRemoved}
          disabled={disableInfo}
          purchasable={handleUpdatePurchaseState(props.ings)}
          price={props.price}
          ordered={handleOrdered}
          isAuth={props.isAuth}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        cancleOrder={handleCancleOrder}
        continueOrder={handleContinueOrder}
        ingredients={props.ings}
        price={parseFloat(props.price)}
      />
    );
  }

  return (
    <Aux>
      <Modal ordered={isOrdered} cancleOrder={handleCancleOrder}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilderReducer.ingredients,
    price: state.burgerBuilderReducer.totalPrice,
    error: state.burgerBuilderReducer.error,
    isAuth: state.authReducer.idToken != null,
    buildingBurger: state.burgerBuilderReducer.buildingBurger,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actionCreators.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchase: () => dispatch(actionCreators.initPurchase()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
