import React, { Component } from "react";
import CreateDesigner from 'components/Designers/CreateDesigner/CreateDesigner';
import CreateDesigner_mobile from 'mobileComponents/CreateDesigner_mobile';
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";
import { connect } from "react-redux";
import { InsertDesignerDetailRequest } from "actions/Users/UserInfo";
import { CreateDesignRequest } from "actions/Products/CreateProduct";

const Wrapper = styled(ContentBox)`
  width:100%;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`
const Wrapper_mobile = styled.div`
  width:100%;
  padding:0px 10px;
`
class CreateDesignerContainer extends Component {
  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <Wrapper>
            <CreateDesigner  {...this.props} />
          </Wrapper>
          :
          <Wrapper_mobile>
            <CreateDesigner_mobile  {...this.props} />
          </Wrapper_mobile>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
});
const mapDispatchToProps = (dispatch) => ({
  InsertDesignerDetailRequest: (data, token) => dispatch(InsertDesignerDetailRequest(data, token)),
  CreateDesignRequest: (data, token) => dispatch(CreateDesignRequest(data, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateDesignerContainer);
