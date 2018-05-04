import React, { Component } from 'react';
import HeaderContainer from "../../containers/HeaderContainer";
import Footer from "../../components/Footer";

class ClientTemplate extends Component {
  render() {
    return(
      <div style={{position: "relative"}}>
        <HeaderContainer />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default ClientTemplate;
