import actionTypes from "../actions/actionTypes";
import { updatedObject } from "./utility";

const initState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false,
};

const authStart = (state, action) => {
  return updatedObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updatedObject(state, {
    idToken: action.idToken,
    userId: action.localId,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updatedObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updatedObject(state, {
    idToken: null,
    userId: null,
  });
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
