import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CreateRequestRequest, GetRequestListRequest, GetRequestTotalCountRequest,RequestListInit } from "actions/Request";
import RequestList from "components/Request/RequestList";
import RequestList_mobile from "mobileComponents/RequestList_mobile";
import styled from "styled-components";

const Wrapper = styled.div`
  padding:0px 30px;
`
const Wrapper_mobile = styled.div`
  padding:0px 10px;
`

class RequestListContainer extends Component {
  render() {
    return (
    <React.Fragment>
      {
      window.innerWidth>=500?
      <Wrapper>
      <RequestList {...this.props} />
      </Wrapper>
      :
      <Wrapper_mobile>
      <RequestList_mobile {...this.props}/>
      </Wrapper_mobile>
      }
    </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2,
  category3: state.CategoryAll.status.category3,
});
const mapDispatchToProps = (dispatch) => ({
  CreateRequestRequest: (data, token) => dispatch(CreateRequestRequest(data, token)),
  RequestListInit: () => dispatch(RequestListInit()),
  GetRequestListRequest: (type, page, cate1, cate2, cate3, sort, keyword) => dispatch(GetRequestListRequest(type, page, cate1, cate2, cate3, sort, keyword)),
  GetRequestTotalCountRequest: (category1, category2, category3) => dispatch(GetRequestTotalCountRequest(category1, category2, category3))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestListContainer);
