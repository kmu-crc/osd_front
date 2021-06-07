import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateProductForm from "components/Products/CreateProductForm";
import CreateProductForm_mobile from "mobileComponents/CreateProductForm_mobile";
import { CreateDesignRequest } from "actions/Products/CreateProduct";
import { SearchMemberRequest } from "actions/Commons/Search";
import styled from "styled-components";
import ContentBox from "components/Commons/ContentBox";

const Wrapper = styled(ContentBox)`
  width:100%;
  margin-top:20px;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`;
const Wrapper_mobile = styled.div`
  padding:0px 10px;
`;
class CreateProductFormContainer extends Component {

  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth>=500?
          <Wrapper>
          <CreateProductForm {...this.props} />
          </Wrapper>
          :
          <Wrapper_mobile>
          <CreateProductForm_mobile {...this.props}/>
          </Wrapper_mobile>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  members: state.Search.status.members,
  userInfo: state.Authentication.status.userInfo,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  category3: state.CategoryAll.status.category3,
});

const mapDispatchToProps = (dispatch) => ({
  CreateDesignRequest: (data, token) => dispatch(CreateDesignRequest(data, token)),
  SearchMemberRequest: (id, data, token) => dispatch(SearchMemberRequest(id, data, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProductFormContainer));
