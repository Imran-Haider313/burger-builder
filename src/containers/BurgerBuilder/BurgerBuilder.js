import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };
  componentDidMount() {
    this.props.onInitIngredients();
  }
  updatePurchasable = () => {
    const ingredientsClone = {
      ...this.props.ings
    };

    const sum = Object.keys(ingredientsClone)
      .map(igKey => {
        return ingredientsClone[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  handleModalClose = () => {
    this.setState({ purchasing: false });
  };

  handlePurchaseContinue = () => {
    this.props.onPurchaseInit()
    this.props.history.push("/checkout");
  };

  render() {
    let burger;
    let orderSummary;

    burger = this.props.error ? "Ingredients can't be loaded" : <Spinner />;

    if (this.props.ings) {
      let disabledInfo = { ...this.props.ings };
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }

      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            onIngredientAddition={this.props.onIngredientAdded}
            onIngredientRemoval={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            price={this.props.price}
            ordered={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
            isPurchasable={this.updatePurchasable()}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancel={this.handleModalClose}
          purchaseContinue={this.handlePurchaseContinue}
          price={this.props.price}
        />
      );
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgerBuilder, axios));
