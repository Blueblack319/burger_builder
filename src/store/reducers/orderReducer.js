// import actionType from "../actions/actionTypes";

const initialState = {
  orderForm: {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your name",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      value: "",
    },
    steet: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      value: "",
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
      value: "",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-mail",
      },
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
      value: "",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
      valid: true,
      value: "",
    },
  },
};

const orderReducer = (state = initialState, action) => {
  return state;
};

export default orderReducer;
