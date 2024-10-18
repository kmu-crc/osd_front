import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import CreateDesign from "components/Designs/CreateDesign"
import CreateDesignMobile from "components/Designs/CreateDesign/CreateDesignMobile"
import {
  CreateDesignBoardRequest, UpdateDesignTime, UpdateCardTitleRequest, GetDesignCardRequest, UpdateDesignBoardRequest, DeleteDesignBoardRequest,
  CreateDesignRequest, GetDesignDetailRequest, GetDesignBoardRequest
} from "redux/modules/design"
import { SearchMemberRequest } from "redux/modules/search"
import { GetCategoryAllRequest } from "redux/modules/category"
import opendesigncss from "opendesign_style"
import { isMobile } from "constant";

class CreateDesignFormContainer extends Component {
  constructor(props) {
    super(props);
    this.gotoMyModify = this.gotoMyModify.bind(this);
    this.searchMember = this.searchMember.bind(this);
  }
  componentDidMount() {
    // if (this.props.userInfo.is_designer === 0) {
    // alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.")
    // this.props.history.push("/myModify")
    // }
    this.props.GetCategoryAllRequest()
  }
  gotoMyModify() {
    // alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.")
    // this.props.history.push("/myModify")
  }
  searchMember(value) {
    this.props.SearchMemberRequest(null, { key: value }, this.props.token);
  }
  render() {

    return (isMobile()
      ? <CreateDesignMobile searchMember={this.searchMember} {...this.props} />
      : <CreateDesign {...this.props} />)
  }
}


const mapStateToProps = (state) => {
  return {
    DesignDetail: state.Design.status.DesignDetail,
    token: state.Authentication.status.token,
    members: state.Search.status.members,
    userInfo: state.Authentication.status.userInfo,
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
    category3: state.Category.status.category3,
    DesignDetailStep: state.DesignCard.status.DesignDetailStep,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateDesignBoardRequest: (data, design_id, token) => {
      return dispatch(CreateDesignBoardRequest(data, design_id, token));
    },
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token));
    },
    GetDesignBoardRequest: (id) => {
      return dispatch(GetDesignBoardRequest(id));
    },
    UpdateDesignTime: (design_id, token) => {
      return dispatch(UpdateDesignTime(design_id, token));
    },
    UpdateCardTitleRequest: (data, token, id) => {
      return dispatch(UpdateCardTitleRequest(data, token, id));
    },
    GetDesignCardRequest: (id, board_id) => {
      return dispatch(GetDesignCardRequest(id, board_id));
    },
    UpdateDesignBoardRequest: (id, token, data) => {
      return dispatch(UpdateDesignBoardRequest(id, token, data));
    },
    DeleteDesignBoardRequest: (id, board_id, token) => {
      return dispatch(DeleteDesignBoardRequest(id, board_id, token))
    },
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest());
    },
    CreateDesignRequest: (data, token) => {
      return dispatch(CreateDesignRequest(data, token));
    },
    SearchMemberRequest: (id, data, token) => {
      return dispatch(SearchMemberRequest(id, data, token));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateDesignFormContainer));


