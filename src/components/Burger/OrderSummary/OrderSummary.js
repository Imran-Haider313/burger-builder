import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../Button/Button";

class OrderSummary extends Component {
  componentWillUpdate() {
    console.log("[OrderSummary] willUpdate");
  }
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(
      igKey => (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}> {igKey} </span> :
          {this.props.ingredients[igKey]}
        </li>
      )
    );
    return (
      <Aux>
        <h3> Your Order </h3>
        <p> A delicious burger with the following ingredients </p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p> Continue to checkout? </p>
        <Button btnType="Danger" clicked={this.props.purchaseCancel}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
