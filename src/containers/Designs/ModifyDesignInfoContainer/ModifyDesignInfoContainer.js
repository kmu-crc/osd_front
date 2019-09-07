import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ModifyDesign from "components/Designs/ModifyDesign"
import { GetDesignDetailRequest,UpdateDesignInfoRequest,DeleteDesignRequest } from "redux/modules/design"
import { SearchMemberRequest } from "redux/modules/search"
import { GetCategoryAllRequest } from "redux/modules/category"

class ModifyDesignInfoContainer extends Component {

  componentDidMount() {
    // if (this.props.userInfo.is_designer === 0) {
    //   alert("해당 디자인 게시글에 권한이 없습니다.")
    //   this.props.history.push("/myModify")
    // }
    this.props.GetCategoryAllRequest();
    this.props.GetDesignDetailRequest(this.props.match.params.id, this.props.token)
  }
  render() {
    console.log("ModifyDesignContainers:", this.props)
    return (<>
      {this.props.userInfo.is_designer === 1 ? <ModifyDesign {...this.props} /> : <p style={{ color: "#000" }}> 권한을 확인 중입니다.</p>}
    </>)
  }
}


const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    members: state.Search.status.members,
    userInfo: state.Authentication.status.userInfo,
    DesignDetail: state.Design.status.DesignDetail,
    cate1: state.Category.status.category1,
    cate2: state.Category.status.category2
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token));
    },
    UpdateDesignInfoRequest: (id, token) => {
      return dispatch(UpdateDesignInfoRequest());
    },
    SearchMemberRequest: (id, data, token) => {
      return dispatch(SearchMemberRequest(id, data, token));
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest());
    },
    DeleteDesignRequest:(id,token) => {
      return dispatch(DeleteDesignRequest(id,token));
    }

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignInfoContainer));
