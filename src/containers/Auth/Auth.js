import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Form/Input/Input";
import { auth } from "../../store/actions/authAction";

import classes from "./Auth.module.css";

import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

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
    isSingUp: true,
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
      this.state.controls.password.value,
      this.state.isSingUp
    );
  };

  handleSwitchAuthMethod = () => {
    if (this.state.isSingUp) {
      this.setState({ isSingUp: false });
    } else {
      this.setState({ isSingUp: true });
    }
  };

  render() {
    const formElementArray = [];
    for (let control in this.state.controls) {
      formElementArray.push({
        id: control,
        config: this.state.controls[control],
      });
    }
    let formElements = formElementArray.map((formElement) => {
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

    if (this.props.loading) {
      formElements = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = this.props.error.message;
    }
    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to="/" />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.handleFormSubmitted}>
          {formElements}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.handleSwitchAuthMethod}>
          SWITCH TO {this.state.isSingUp ? "LOG IN" : "SING UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuth: state.authReducer.idToken != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(auth(email, password, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
