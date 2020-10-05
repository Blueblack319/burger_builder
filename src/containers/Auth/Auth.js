import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Form/Input/Input";
import { auth, setAuthRedirectPath } from "../../store/actions/authAction";

import classes from "./Auth.module.css";

import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updatedObject, checkValidity } from "../../shared/utility";

const Auth = (props) => {
  const { buildingBurger, onSetAuthRedirectPath } = props;
  const [authForm, setAuthForm] = useState({
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
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!buildingBurger) {
      onSetAuthRedirectPath("/");
    }
  }, [buildingBurger, onSetAuthRedirectPath]);

  const handleInputChanged = (event, controlName) => {
    const updatedControl = updatedObject(authForm[controlName], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        authForm[controlName].validation
      ),
      touched: true,
    });
    const updatedAuthForm = updatedObject(authForm, {
      [controlName]: updatedControl,
    });
    let formIsValid = true;
    for (let controlName in updatedAuthForm) {
      formIsValid = updatedAuthForm[controlName].valid && formIsValid;
    }
    setAuthForm(updatedAuthForm);
    setFormIsValid(formIsValid);
  };

  const handleFormSubmitted = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  };

  const handleSwitchAuthMethod = () => {
    if (isSignUp) {
      setIsSignUp(false);
    } else {
      setIsSignUp(true);
    }
  };

  const formElementArray = [];
  for (let control in authForm) {
    formElementArray.push({
      id: control,
      config: authForm[control],
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
        changed={(event) => handleInputChanged(event, formElement.id)}
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
      />
    );
  });

  if (props.loading) {
    formElements = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = props.error.message;
  }
  let authRedirect = null;
  if (props.isAuth) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
      <form onSubmit={handleFormSubmitted}>
        {formElements}
        <Button btnType="Success" disabled={!formIsValid}>
          Submit
        </Button>
      </form>
      <Button btnType="Danger" clicked={handleSwitchAuthMethod}>
        SWITCH TO {isSignUp ? "LOG IN" : "SING UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuth: state.authReducer.idToken != null,
    buildingBurger: state.burgerBuilderReducer.buildingBurger,
    authRedirectPath: state.authReducer.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(auth(email, password, isSignUp)),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
