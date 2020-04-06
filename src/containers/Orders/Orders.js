import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {

  componentDidMount () {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;

    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.order.loading,
    orders: state.order.orders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
