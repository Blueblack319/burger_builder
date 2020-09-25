// import actionType from "../actions/actionTypes";

import actionTypes from "../actions/actionTypes";

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
  formIsValid: false,
};

const checkValidity = (value, rules) => {
  let isValid = true;
  // if (rules) {
  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  // }
  return isValid;
};

const formValidityUpdated = (updatedOrderForm) => {
  let formIsValid = true;
  for (let inputIdentifier in updatedOrderForm) {
    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
  }
  return formIsValid;
};

const orderElementUpdated = (state, action) => {
  const updatedOrderElement = {
    ...state.orderForm[action.inputIdentifier],
  };
  updatedOrderElement.value = action.event.target.value;
  updatedOrderElement.valid = checkValidity(
    updatedOrderElement.value,
    updatedOrderElement.validation
  );
  updatedOrderElement.touched = true;
  return updatedOrderElement;
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_INPUT:
      const updatedOrderElement = orderElementUpdated(state, action);
      const updatedOrderForm = {
        ...state.orderForm,
        [action.inputIdentifier]: updatedOrderElement,
      };
      const updatedFormValidity = formValidityUpdated(updatedOrderForm);
      return {
        ...state,
        orderForm: {
          ...state.orderForm,
          [action.inputIdentifier]: updatedOrderElement,
        },
        formIsValid: updatedFormValidity,
      };
    default:
      return state;
  }
};

export default orderReducer;
