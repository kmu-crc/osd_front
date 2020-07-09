import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateProductForm from "components/Products/CreateProductForm";
import { CreateDesignRequest } from "actions/Products/CreateProduct";
import { SearchMemberRequest } from "actions/Commons/Search";

class CreateProductFormContainer extends Component {
  componentDidMount() {
    console.log("designer:", this.props, this.props.keep == null);
    if (this.props.keep == null) {
      // if (this.props.userInfo.isDesigner === 0 || this.props.userInfo.isMaker === 0) {
      //   alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.");
      //   this.props.history.push("/myPage");
      //   ;
      // }
    }
  }

  render() {
    return (
      <React.Fragment>
        {/* {this.props.keep// || this.props.userInfo.isDesigner === 1 || this.props.userInfo.isMaker === 1 ?*/}
        <CreateProductForm {...this.props} />
        {/* : <p style={{ color: "#FFF" }}> 권한을 확인 중입니다.</p>} */}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  members: state.Search.status.members,
  userInfo: state.Authentication.status.userInfo,
  category1: state.CategoryAll.status.category1,
  category2: state.CategoryAll.status.category2
});

const mapDispatchToProps = (dispatch) => ({
  CreateDesignRequest: (data, token) => dispatch(CreateDesignRequest(data, token)),
  SearchMemberRequest: (id, data, token) => dispatch(SearchMemberRequest(id, data, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProductFormContainer));
