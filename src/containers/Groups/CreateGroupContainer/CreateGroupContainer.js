import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CreateGroup from "components/Groups/CreateGroup";
import { CreateNewGroupRequest } from "redux/modules/group";

import styled from "styled-components";

const Content = styled.div`
  margin-left:100px;
  margin-top:90px;
`

class CreateGroupContainer extends Component {
  render() {
    return (
      <Content>
        <CreateGroup {...this.props} />
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateNewGroupRequest: (data, token) => {
      return dispatch(CreateNewGroupRequest(data, token))
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGroupContainer));
