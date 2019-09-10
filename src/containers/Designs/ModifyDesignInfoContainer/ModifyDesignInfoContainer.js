import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ModifyDesign from "components/Designs/ModifyDesign"
import {
  DeleteDesignRequest,
  CreateDesignBoardRequest, UpdateDesignTime, UpdateCardTitleRequest, GetDesignCardRequest, UpdateDesignBoardRequest, DeleteDesignBoardRequest,
  CreateDesignRequest, GetDesignDetailRequest, GetDesignBoardRequest
} from "redux/modules/design"
import { SearchMemberRequest } from "redux/modules/search"
import { GetCategoryAllRequest } from "redux/modules/category"

class ModifyDesignInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.gotoMyModify = this.gotoMyModify.bind(this);
  }
  componentDidMount() {
    if (this.props.userInfo.is_designer === 0) {
      alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.")
      this.props.history.push("/myModify")
    }
    this.props.GetCategoryAllRequest()
      .then(() => {
        this.props.GetDesignDetailRequest(this.props.id, this.props.token)
      })
  }
  gotoMyModify() {
    alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.")
    this.props.history.push("/myModify")
  }
  render() {
    console.log("props:", this.props)
    return (<>
      {
        this.props.userInfo.is_designer === 1 ?
          <ModifyDesign {...this.props} />
          : this.gotoMyModify()
      }
    </>)
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
    DeleteDesignRequest: (id, token) => {
      return dispatch(DeleteDesignRequest(id, token))
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignInfoContainer));
