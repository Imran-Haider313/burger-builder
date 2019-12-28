import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import axios from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler";

const INGREDIENTS_PRICE = {
  meat: 1,
  cheese: 0.3,
  salad: 0.4,
  bacon: 1.9
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    isPurchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-e6390.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => this.setState({ error: true }));
  }

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
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Imran Naqvi",
        email: "example.gmail.com"
      }
    };
    axios
      .post("/orders.json", order)
      .then(response => this.setState({ loading: false }))
      .catch(error => this.setState({ loading: false }));
    this.setState({ purchasing: false });
  };

  render() {
    let burger;
    let orderSummary;

    burger = this.state.error ? "Ingredients can't be loaded" : <Spinner />;

    if (this.state.ingredients) {
      let disabledInfo = { ...this.state.ingredients };
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }

      burger = (
        <Aux>
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

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancel={this.handleModalClose}
          purchaseContinue={this.handlePurchaseContinue}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          onModalClose={this.handleModalClose}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
