import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/logout";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onAutoAuthTry();
  }

  render() {
    let routes;
      if (this.props.isAuthenticated) {
        routes = (
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout} />
              <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        )
      } else {
        routes = (
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        )
      }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoAuthTry: () => dispatch(actions.authCheckState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
