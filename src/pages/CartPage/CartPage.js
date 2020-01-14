import React, { Component } from "react";
import CartContainer from 'containers/Cart/CartContainer';

class CartPage extends Component {
    render() {
      return(
        <React.Fragment>
            <CartContainer id={this.props.match.params.id}/>
        </React.Fragment>
      );
    }
  }
  export default CartPage;