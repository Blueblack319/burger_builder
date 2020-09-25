import actionTypes from "./actionTypes";

export const changeInput = (event, inputIdentifier) => {
  return {
    type: actionTypes.CHANGE_INPUT,
    event,
    inputIdentifier,
  };
};
