import actionTypes from "../actions/actionTypes";
import { updatedObject } from "./utility";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  ingredients: null,
  totalPrice: 6.9,
  error: false,
  buildingBurger: false,
};

const addIngredient = (state, action) => {
  const updatedIngredient = updatedObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  });
  return updatedObject(state, {
    ingredients: updatedIngredient,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    buildingBurger: true,
  });
};

const removeIngredient = (state, action) => {
  const updatedIngredients = updatedObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  });
  return updatedObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
    buildingBurger: true,
  });
};

const setIngredients = (state, action) => {
  return updatedObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 6.9,
    error: false,
    buildingBurger: false,
  });
};

const fetchIngredientFailed = (state, action) => {
  return updatedObject(state, {
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
