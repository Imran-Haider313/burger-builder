import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import classes from './Auth.css';
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address"
        },
        validations: {
          isRequired: true
        },
        isValid: false,
        touched: false,
        value: ""
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        validations: {
          isRequired: true,
          minLength: 6
        },
        isValid: false,
        touched: false,
        value: ""
      },
    },
    isSignUp: true,
  };

  componentDidMount () {
    if (!this.props.burgerBuilding && this.props.authRedirectPath !== '/') {
      this.props.setAuthRedirectPath()
    }
  }

  checkValidity(val, validations) {

    let isValid = false;
    if (validations.isRequired) {
      isValid = val.trim() !== "";
    } else {
      return true;
    }

    return isValid;
  }

  inputChangedHandler = (event, formElementId) => {

    const formElements = {
      ...this.state.controls
    };

    const updatedFormElement = {
      ...formElements[formElementId]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validations
    );
    updatedFormElement.touched = true;
    formElements[formElementId] = updatedFormElement;
    let isFormValid = true;
    for (let _input in formElements) {
      isFormValid = formElements[_input].isValid && isFormValid;
    }

    this.setState({
      controls: formElements,
      isFormValid
    });
  };

  handleAuthentication = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    )
  };

  SwitchAuthMode = () => {
    this.setState(prevState => ({
      isSignUp: !prevState.isSignUp
    }));
  };

  render () {

    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = (
      <form onSubmit={this.handleAuthentication}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.isValid}
            shouldValidate={formElement.config.validations}
            touched={formElement.config.touched}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
           onClick={this.handleAuthentication}
        >
          {this.state.isSignUp ? 'SignUp' : 'SignIn'}
        </Button>
      </form>
    );

    let shouldRedirect = null;

    if (this.props.isAuthenticated) {
      shouldRedirect= <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className={classes.Auth}>
        {shouldRedirect}
        {form}
        <Button
          btnType="Success"
           clicked={this.SwitchAuthMode}
        >
          Switch to {this.state.isSignUp ? 'SignIn' : 'SignUp'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    burgerBuilding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
