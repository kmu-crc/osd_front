import React, { Component } from 'react';
import HeaderContainer from "containers/Commons/HeaderContainer";
import Footer from "components/Commons/Footer";
import ContentBox from "components/Commons/ContentBox";

class ClientTemplate extends Component {
  render() {
    return(
      <div style={{position: "relative"}}>
        <HeaderContainer />
        <ContentBox>
          {this.props.children}
        </ContentBox>
        <Footer />
      </div>
    );
  }
}

export default ClientTemplate;
