import React, { Component } from 'react';
import ClientTemplate from '../../templates';
class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    return(
      <ClientTemplate>
        <div>desginList</div>
      </ClientTemplate>
    );
  }
}

MainPage.propTypes = {

};

export default MainPage;
