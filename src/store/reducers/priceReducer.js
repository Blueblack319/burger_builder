import actionType from "../actions";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const initialState = {
  totalPrice: 6.9,
};

const priceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_TOTAL_PRICE: {
      const priceAddition = INGREDIENTS_PRICE[action.ingType];
      const oldTotalPrice = state.totalPrice;
      const newTotalPrice = oldTotalPrice + priceAddition;
      return {
        totalPrice: newTotalPrice,
      };
    }
    case actionType.SUBSTRACT_TOTAL_PRICE: {
      const priceDeduction = INGREDIENTS_PRICE[action.ingType];
      const oldTotalPrice = state.totalPrice;
      const newTotalPrice = oldTotalPrice - priceDeduction;
      return {
        totalPrice: newTotalPrice,
      };
    }
    default:
      return state;
  }
};

export default priceReducer;
