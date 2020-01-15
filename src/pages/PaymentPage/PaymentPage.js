import React, { Component } from "react";
import PaymentContainer from 'containers/Payment/PaymentContainer';

class PaymentPage extends Component {
  render() {
    console.log("thumbnail",this.props.match.params.thumbnail);
    return(
        <PaymentContainer id={this.props.match.params.id} token={this.props.token}>

        </PaymentContainer>
    );
  }
}

export default PaymentPage;
