import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateProductForm from "components/Products/CreateProductForm";
import { CreateDesignRequest } from "actions/Products/CreateProduct";
import { SearchMemberRequest } from "actions/Commons/Search";
import { GetCategoryLevel2Request } from "actions/Categorys";

class CreateProductFormContainer extends Component {
  componentDidMount() {
    if (this.props.userInfo.is_designer === 0) {
      alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.")
      this.props.history.push("/myModify")
    }
  }
  render() {
    return (
      <div>{
        this.props.userInfo.is_designer === 1 ? (
          <CreateProductForm {...this.props} />
        ) : (<p style={{ color: "#FFF" }}> 권한을 확인 중입니다.</p>)
      }</div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    members: state.Search.status.members,
    userInfo: state.Authentication.status.userInfo,
    cate1: state.Categorys.status.level1,
    cate2: state.Categorys.status.level2
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateDesignRequest: (data, token) => {
      return dispatch(CreateDesignRequest(data, token));
    },
    SearchMemberRequest: (id, data, token) => {
      return dispatch(SearchMemberRequest(id, data, token));
    },
    GetCategoryLevel2Request: (id) => {
      return dispatch(GetCategoryLevel2Request(id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProductFormContainer));
