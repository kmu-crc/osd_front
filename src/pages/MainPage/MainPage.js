import React, { Component } from "react";
import MainContainer from "containers/MainContainer";

class MainPage extends Component {
  render() {
    return(
        <MainContainer history={this.props.history}/>
    );
  }
}

export default MainPage;
