import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import Spinner from "../../components/Spinner/Spinner";
import withErrorHandler from "../../hoc/WithErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {

  componentDidMount () {
    console.log('this.props.token', this.props.token);
    this.props.onFetchOrders(this.props.token);
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
    orders: state.order.orders,
    token: state.auth.token,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
