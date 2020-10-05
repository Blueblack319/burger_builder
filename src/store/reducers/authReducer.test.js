import reducer from "./authReducer";
import actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the intial state", () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
  //   it("should store the token upon login", () => {
  //     expect(
  //       reducer(undefined, {
  //         type: actionTypes.AUTH_SUCCESS,
  //         idToken: "Some token",
  //         userId: "Some user",
  //       })
  //     ).toEqaul({
  //       idToken: "Some token",
  //       userId: "Some user",
  //       error: null,
  //       loading: false,
  //       authRedirectPath: "/",
  //     });
  //   });
});
