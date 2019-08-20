import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import CreateDesign from "components/Designs/CreateDesign"
import { CreateDesignRequest } from "redux/modules/design"
import { SearchMemberRequest } from "redux/modules/search"
import { GetCategoryAllRequest } from "redux/modules/category"

class CreateDesignFormContainer extends Component {

  componentDidMount() {
    if (this.props.userInfo.is_designer === 0) {
      alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.")
      this.props.history.push("/myModify")
    }
    this.props.GetCategoryAllRequest()
  }
  render() {
    console.log("props:", this.props.userInfo)
    return (<>
      {this.props.userInfo.is_designer === 1 ? <CreateDesign {...this.props} /> : <p style={{ color: "#000" }}> 권한을 확인 중입니다.</p>}
    </>)
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    members: state.Search.status.members,
    userInfo: state.Authentication.status.userInfo,
    cate1: state.Category.status.category1,
    cate2: state.Category.status.category2
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
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateDesignFormContainer));
