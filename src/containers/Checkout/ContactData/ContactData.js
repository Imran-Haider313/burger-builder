import React, { Component } from "react";
import classes from "./ContactData.css";
import Button from "../../../components/Button/Button";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };

  handleOrder = event => {
    console.log(this.props);
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Imran Naqvi",
        email: "example.gmail.com"
      }
    };
    console.log(order);
    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => this.setState({ loading: false }));
  };
  render() {
    let form;
    if (this.state.loading) {
      form = <Spinner />;
    } else {
      form = (
        <form>
          <input
            type="text"
            name="name"
            className={classes.Input}
            placeholder="Enter Name"
          />
          <input
            type="text"
            name="email"
            className={classes.Input}
            placeholder="Enter Email"
          />
          <input
            type="text"
            name="address"
            className={classes.Input}
            placeholder="Enter address"
          />

          <Button
            btnType="Success"
            className={classes.Input}
            clicked={this.handleOrder}
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
