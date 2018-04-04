import React, { Component } from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

class ClientTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {};

  }
  render() {
    return(
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

ClientTemplate.propTypes = {

};

export default ClientTemplate;
