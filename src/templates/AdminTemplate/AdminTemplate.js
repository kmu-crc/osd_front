import React, { Component } from "react";
import AdminHeaderContainer from "containers/Commons/AdminHeaderContainer";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";

const Foot = styled.footer`
  background-color: #191919;
  position: fixed;
  z-index: 100;
  bottom: 0px;
  width: 100%;
  color: #fff;
  & .ui.grid>.row {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  & .statusBar {
    text-align: center;
  }
`;

class Footer extends Component {
  render() {
    return(
      <Foot>
        <Grid padded={true} columns={1}>
          <Grid.Row>
            <Grid.Column className="statusBar">오픈소스디자인 관리자 앱입니다.</Grid.Column>
          </Grid.Row>
        </Grid>
      </Foot>
    );
  }
}

class AdminTemplate extends Component {
  componentDidMount() {
    console.log("isActive", this.props.isActive);
  }
  onClose = e => {
    if (this.props.isActive !== "INIT") {
      this.props.SetActive("INIT");
    }
  };
  render() {
    return (
      <div style={{ height:window.document.body.offsetHeight+70,position: "relative" , paddingBottom: "33px", paddingTop: "60px"}} onClick={this.onClose}>
        <AdminHeaderContainer active={this.props.isActive} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default AdminTemplate;



