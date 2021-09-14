import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import ModifyDesign from "components/Designs/ModifyDesign"
import ModifyDesignMobile from "components/Designs/ModifyDesign/ModifyDesignMobile"
import {
  DeleteDesignRequest, UpdateDesignInfoRequest,
  CreateDesignBoardRequest, UpdateDesignTime, UpdateCardTitleRequest, GetDesignCardRequest, UpdateDesignBoardRequest, DeleteDesignBoardRequest,
  CreateDesignRequest, GetDesignDetailRequest, GetDesignBoardRequest
} from "redux/modules/design"
import { SearchMemberRequest } from "redux/modules/search"
import { GetCategoryAllRequest } from "redux/modules/category"
import { geturl } from "config"
import Loading from "components/Commons/Loading"
import { alert } from "components/Commons/Alert/Alert";
import opendesigncss from "opendesign_style";
import styled from "styled-components";
const Wrapper =styled.div`
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
`
// import { confirm } from "components/Commons/Confirm/Confirm";

class ModifyDesignInfoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.gotoMyModify = this.gotoMyModify.bind(this);
  }
  async componentDidMount() {
    if (this.props.userInfo.is_designer === 0) {
      await alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.", "확인")
      this.props.history.push("/myModify")
    }
    this.props.GetCategoryAllRequest()
      .then(() => {
        this.props.GetDesignDetailRequest(this.props.id, this.props.token)
      })
  }
  async gotoMyModify() {
    await alert("디자이너가 아닙니다. 개인정보 페이지에 가셔서 디자이너로 등록하여주세요.", "확인")
    this.props.history.push("/myModify")
  }
  async goBack() {
    await alert("디자인 수정 권한이 없습니다", "확인");
    window.location.href = geturl() + '/designDetail/' + this.props.id;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.DesignDetail.uid != null) {
      if ((nextProps.DesignDetail !== this.props.DesignDetail) && nextProps.DesignDetail.uid != null) {
        this.setState({ loading: false });
      }
    }
  }
  render() {
    const mobile = window.innerWidth <= opendesigncss.resolutions.SmallMaxWidth;

    return (<React.Fragment>
      {this.state.loading ? <Loading /> :
        this.props.userInfo.is_designer === 1 ?
          this.props.userInfo.uid === this.props.DesignDetail.user_id ?
            mobile
            ?<ModifyDesignMobile {...this.props} />
            :<Wrapper><ModifyDesign {...this.props} /></Wrapper>
            : this.goBack()
          : this.gotoMyModify()}
    </React.Fragment>)
  }
}

const mapStateToProps = (state) => ({
  DesignDetail: state.Design.status.DesignDetail,
  token: state.Authentication.status.token,
  members: state.Search.status.members,
  userInfo: state.Authentication.status.userInfo,
  category1: state.Category.status.category1,
  category2: state.Category.status.category2,
  category3: state.Category.status.category3,
  DesignDetailStep: state.DesignCard.status.DesignDetailStep,
});

const mapDispatchToProps = (dispatch) => ({
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
  },
  UpdateDesignInfoRequest: (data, id, token) => {
    return dispatch(UpdateDesignInfoRequest(data, id, token));
  }
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignInfoContainer));
