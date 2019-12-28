import React, { Component } from "react";
import Modal from "../components/Modal/Modal";
import Aux from "./Aux";

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(null, error => {
        this.setState({ error });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    handleModalClose = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal onModalClose={this.handleModalClose} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          ;
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default WithErrorHandler;
