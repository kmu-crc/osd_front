import React, { Component } from "react";
import CartContainer from 'containers/Cart/CartContainer';

class CartPage extends Component {
    render() {
      return(
        <React.Fragment>
            <CartContainer/>
        </React.Fragment>
      );
    }
  }
  export default CartPage;