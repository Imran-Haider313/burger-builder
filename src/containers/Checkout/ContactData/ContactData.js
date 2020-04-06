import React, { Component } from "react";
import classes from "./ContactData.css";
import Button from "../../../components/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Spinner/Spinner";
import Input from "../../../components/Input/Input";
import { connect } from "react-redux";
import WithErrorHandler from "../../../hoc/WithErrorHandler";
import * as actions from "../../../store/actions";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        validations: {
          isRequired: true
        },
        isValid: false,
        touched: false,
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        validations: {
          isRequired: true
        },
        isValid: false,
        touched: false,
        value: ""
      },
      postalCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        validations: {
          isRequired: true
        },
        isValid: false,
        touched: false,
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        validations: {
          isRequired: true
        },
        isValid: false,
        touched: false,
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Email"
        },
        validations: {
          isRequired: true
        },
        isValid: false,
        touched: false,
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validations: { isRequired: false },
        isValid: true,
        touched: true,
        value: ""
      }
    },
    isFormValid: false
  };

  handleOrder = event => {
    event.preventDefault();
    const formData = {};
    for (let _id in this.state.orderForm) {
      formData[_id] = this.state.orderForm[_id].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      formData
    };

    this.props.onOrder(order);
  };

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
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[formElementId]
    };

    updatedFormElement.value = event.target.value;
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validations
    );
    updatedFormElement.touched = true;
    updatedOrderForm[formElementId] = updatedFormElement;
    let isFormValid = true;
    for (let _input in updatedOrderForm) {
      isFormValid = updatedOrderForm[_input].isValid && isFormValid;
    }

    console.log(isFormValid);
    this.setState({
      orderForm: updatedOrderForm,
      isFormValid
    });
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form;
    if (this.props.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form onSubmit={this.handleOrder}>
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
            className={classes.Input}
            clicked={this.handleOrder}
            disabled={!this.state.isFormValid}
          >
            Order
          </Button>
        </form>
      );
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrder: order => dispatch(actions.purchaseBurger(order))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, axios));
