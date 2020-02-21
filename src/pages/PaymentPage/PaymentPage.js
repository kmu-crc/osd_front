import React, { Component } from "react";
import PaymentContainer from 'containers/Payment/PaymentContainer';

class PaymentPage extends Component {
  render() {
    return (
      <PaymentContainer
        id={this.props.match.params.id}
        item={this.props.location.state && this.props.location.state.item}
        options={this.props.location.state && this.props.location.state.options}
      />
    );
  }
}

export default PaymentPage;
