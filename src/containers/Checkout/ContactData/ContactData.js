import React, { Component } from "react";
import classes from "./ContactData.css";
import Button from "../../../components/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Spinner/Spinner";
import Input from "../../../components/Input/Input";

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
        validations: {},
        isValid: true,
        touched: false,
        value: ""
      }
    },
    isFormValid: false,
    loading: false
  };

  handleOrder = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let _id in this.state.orderForm) {
      formData[_id] = this.state.orderForm[_id].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      formData
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };

  checkValidity(val, validations) {
    let isValid = false;

    if (validations.isRequired) {
      isValid = val.trim() !== "";
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
    if (this.state.loading) {
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

export default ContactData;
