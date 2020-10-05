import React, { useCallback, useEffect, useState } from "react";

import Aux from "../../hoc/Aux/Aux";
import axios from "../../axios-orders";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildContols/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import classes from "./BurgerBuilder.module.css";

import { useDispatch, useSelector } from "react-redux";
import * as actionCreators from "../../store/actions/index";

export const BurgerBuilder = (props) => {
  const [isPurchased, setIsPurchased] = useState(false);

  const ings = useSelector((state) => state.burgerBuilderReducer.ingredients);
  const price = useSelector((state) => state.burgerBuilderReducer.totalPrice);
  const error = useSelector((state) => state.burgerBuilderReducer.error);
  const isAuth = useSelector((state) => state.authReducer.idToken != null);

  const dispatch = useDispatch();

  const onIngredientAdded = (ingName) =>
    dispatch(actionCreators.addIngredient(ingName));
  const onIngredientRemoved = (ingName) =>
    dispatch(actionCreators.removeIngredient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actionCreators.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actionCreators.initPurchase());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actionCreators.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
    // eslint-disable-next-line
  }, [onInitIngredients]);

  const handleUpdatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const handleOrdered = () => {
    if (isAuth) {
      setIsPurchased(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const handleCancleOrder = () => {
    setIsPurchased(false);
  };

  const handleContinueOrder = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disableInfo = {
    ...ings,
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p>Ingredients can not be loaded!</p> : <Spinner />;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingredients={ings} />
        <BuildControls
          addIngredient={onIngredientAdded}
          removeIngredient={onIngredientRemoved}
          disabled={disableInfo}
          purchasable={handleUpdatePurchaseState(ings)}
          price={price}
          ordered={handleOrdered}
          isAuth={isAuth}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        cancleOrder={handleCancleOrder}
        continueOrder={handleContinueOrder}
        ingredients={ings}
        price={parseFloat(price)}
      />
    );
  }

  return (
    <div className={classes.Content}>
      <Modal ordered={isPurchased} cancleOrder={handleCancleOrder}>
        {orderSummary}
      </Modal>
      {burger}
    </div>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
