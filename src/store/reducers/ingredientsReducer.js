import actionType from "../actions";

const initialState = {
  ingredients: {
    bacon: 1,
    salad: 1,
    cheese: 1,
    meat: 1,
  },
};

const ingredientReducer = (state = initialState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case actionType.ADD_INGREDIENT: {
      const oldCount = state.ingredients[action.ingType];
      const newCount = oldCount + 1;
      const updatedIngredient = { ...state.ingredients };
      updatedIngredient[action.ingType] = newCount;
      return {
        ...state,
        ingredients: updatedIngredient,
      };
    }
    case actionType.REMOVE_INGREDIENT: {
      const oldCount = state.ingredients[action.ingType];
      if (oldCount <= 0) {
        return state;
      }
      const newCount = oldCount - 1;
      const updatedIngredient = { ...state.ingredients };
      updatedIngredient[action.ingType] = newCount;
      return {
        state,
        ingredients: updatedIngredient,
      };
    }
  }
  return state;
};

export default ingredientReducer;
