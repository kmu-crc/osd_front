import React, { Component } from "react";
import HeaderContainer from "containers/Commons/HeaderContainer";
import Footer from "components/Commons/Footer";

class ClientTemplate extends Component {
  state = {
    menuActive: false
  };
  onClose = e => {
    const target = e.target;
    if (target.classList.contains("subMenu")) {
      return;
    }
    if (this.state.menuActive) {
      console.log("onClose", target);
      this.setState({ menuActive: false });
    }
  };
  onActive = e => {
    console.log("onActive", e.target);
    this.setState({ menuActive: !this.state.menuActive });
  };
  render() {
    return (
      <div style={{ position: "relative" }} onClick={this.onClose}>
        <HeaderContainer
          onClose={this.onClose}
          onActive={this.onActive}
          active={this.state.menuActive}
        />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default ClientTemplate;
