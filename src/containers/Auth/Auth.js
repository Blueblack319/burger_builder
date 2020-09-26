import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Form/Input/Input";
import { auth } from "../../store/actions/authAction";

import classes from "./Auth.module.css";

import { connect } from "react-redux";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail address",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        value: "",
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        validation: {
          required: true,
          minlength: 6,
        },
        valid: false,
        touched: false,
        value: "",
      },
    },
    formIsValid: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minlength) {
      isValid = value.length >= rules.minlength && isValid;
    }
    if (rules.maxlength) {
      isValid = value.length <= rules.maxlength && isValid;
    }
    return isValid;
  };

  handleInputChanged = (event, identifier) => {
    const updatedControlForm = { ...this.state.controls };
    const updatedControlElement = updatedControlForm[identifier];
    updatedControlElement.value = event.target.value;
    updatedControlElement.valid = this.checkValidity(
      updatedControlElement.value,
      updatedControlElement.validation
    );
    updatedControlElement.touched = true;
    updatedControlForm[identifier] = updatedControlElement;
    let formIsValid = true;
    for (let identifier in updatedControlForm) {
      formIsValid = updatedControlForm[identifier].valid && formIsValid;
    }
    this.setState({ controls: updatedControlForm, formIsValid });
  };

  handleFormSubmitted = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };
  render() {
    const formElementArray = [];
    for (let control in this.state.controls) {
      formElementArray.push({
        id: control,
        config: this.state.controls[control],
      });
    }
    const formElements = formElementArray.map((formElement) => {
      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          shouldValidate={formElement.config.validation}
          changed={(event) => this.handleInputChanged(event, formElement.id)}
          touched={formElement.config.touched}
          invalid={!formElement.config.valid}
        />
      );
    });
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.handleFormSubmitted}>
          {formElements}
          <Button btnType="Success">Submit</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
