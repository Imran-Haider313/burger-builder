import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/Modal/Modal";

const INGREDIENTS_PRICE = {
  meat: 1,
  cheese: 0.3,
  salad: 0.4,
  bacon: 1.9
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      meat: 0,
      cheese: 0,
      salad: 0,
      bacon: 0
    },
    totalPrice: 4,
    isPurchasable: false,
    purchasing: false
  };

  updatePurchasable = () => {
    const ingredientsClone = {
      ...this.state.ingredients
    };

    const sum = Object.keys(ingredientsClone)
      .map(igKey => {
        return ingredientsClone[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ isPurchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    const updatedCountForThisIngredient = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCountForThisIngredient;
    const newTotalPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];

    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: newTotalPrice
      },
      () => this.updatePurchasable()
    );
  };

  removeIngredientHandler = type => {
    const updatedCountForThisIngredient = this.state.ingredients[type] - 1;
    if (updatedCountForThisIngredient < 0) {
      return;
    }
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCountForThisIngredient;
    const newTotalPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];

    this.setState(
      {
        ingredients: updatedIngredients,
        totalPrice: newTotalPrice
      },
      () => this.updatePurchasable()
    );
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  handleModalClose = () => {
    this.setState({ purchasing: false });
  };

  handlePurchaseContinue = () => {
    console.log("You Continue");
  };
  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          onModalClose={this.handleModalClose}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancel={this.handleModalClose}
            purchaseContinue={this.handlePurchaseContinue}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onIngredientAddition={this.addIngredientHandler}
          onIngredientRemoval={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.totalPrice}
          ordered={this.purchaseHandler}
          isPurchasable={this.state.isPurchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
