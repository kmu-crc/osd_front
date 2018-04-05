import React, { Component } from 'react';
import Header from "../../components/Header";

class ClientTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    return(
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

ClientTemplate.propTypes = {

};

export default ClientTemplate;
