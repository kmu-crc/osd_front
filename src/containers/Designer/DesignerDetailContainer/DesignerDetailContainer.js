import React, { Component } from "react"
import { connect } from "react-redux"
import {
  GetDesignerDetailRequest, GetDesignerCountRequest,
  GetLikeDesignerRequest, LikeDesignerRequest,
  UnlikeDesignerRequest, GetLikeInDesignerRequest,
  GetMyDesignInDesignerRequest, GetGroupInDesignerRequest, GetRelatedGroupInDesignerRequest,
  GetLikeGroupInDesignerRequest, GetLikeDesignerInDesignerRequest,
} from "redux/modules/designer"

import DesignerDetailHeader from "components/Designers/DesignerDetailHeader"
import DesignerDetailBody from "components/Designers/DesignerDetailBody"
import DesignerDetailHeader_mobile from "components/Designers/DesignerDetailHeader_mobile"
import DesignerDetailBody_mobile from "components/Designers/DesignerDetailBody_mobile"

import { isMobile } from "constant";

class DesignerDetailContainer extends Component {

  componentWillMount() {
    this.props.GetDesignerDetailRequest(this.props.id)
      .then(this.props.GetDesignerCountRequest(this.props.id))
      .then(this.props.userInfo && this.props.GetLikeDesignerRequest(this.props.id, this.props.token))
  }
  render() {
    return (isMobile()
      ? <React.Fragment>
        <DesignerDetailHeader_mobile {...this.props} />
        <DesignerDetailBody_mobile {...this.props} />
      </React.Fragment>

      : <React.Fragment>
        <DesignerDetailHeader {...this.props} />
        <DesignerDetailBody {...this.props} />
      </React.Fragment>);
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerDetail: state.Designer.status.DesignerDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.Designer.status.like,
    Count: state.Designer.status.Count,
    MyDesignInDesigner: state.Designer.status.MyDesignInDesigner,
    MyDesignInDesignerAdded: state.Designer.status.MyDesignInDesignerAdded,
    LikeInDesigner: state.Designer.status.LikeInDesigner,
    LikeInDesignerAdded: state.Designer.status.LikeInDesignerAdded,
    LikeGroupInDesigner: state.Designer.status.LikeGroupInDesigner,
    LikeGroupInDesignerAdded: state.Designer.status.LikeGroupInDesignerAdded,
    LikeDesignerInDesigner: state.Designer.status.LikeDesignerInDesigner,
    LikeDesignerInDesignerAdded: state.Designer.status.LikeDesignerInDesignerAdded,
    GroupInDesigner: state.Designer.status.GroupInDesigner,
    RelatedGroupInDesigner: state.Designer.status.RelatedGroupInDesigner,
    GroupInDesignerAdded: state.Designer.status.GroupInDesignerAdded,
    RelatedGroupInDesignerAdded: state.Designer.status.RelatedGroupInDesignerAdded,
  };
};

const mapDispatchToProps = (dispatch) => ({
  // get info
  GetDesignerDetailRequest: (id) => dispatch(GetDesignerDetailRequest(id)),
  GetDesignerCountRequest: (id) => dispatch(GetDesignerCountRequest(id)),
  GetLikeDesignerRequest: (id, token) => dispatch(GetLikeDesignerRequest(id, token)),//이 디자이너를 내가 관심있는지 없는지

  // operating
  LikeDesignerRequest: (id, token) => dispatch(LikeDesignerRequest(id, token)),//다자이너를 좋아요 눌렀을 때
  UnlikeDesignerRequest: (id, token) => dispatch(UnlikeDesignerRequest(id, token)),

  // get list
  GetLikeInDesignerRequest: (id, page, sort) => dispatch(GetLikeInDesignerRequest(id, page, sort)),
  GetMyDesignInDesignerRequest: (id, page, sort) => dispatch(GetMyDesignInDesignerRequest(id, page, sort)),
  GetGroupInDesignerRequest: (id, page, sort) => dispatch(GetGroupInDesignerRequest(id, page, sort)),
  GetRelatedGroupInDesignerRequest: (id, page, sort) => dispatch(GetRelatedGroupInDesignerRequest(id, page, sort)),
  GetLikeGroupInDesignerRequest: (id, page, sort) => dispatch(GetLikeGroupInDesignerRequest(id, page, sort)),
  GetLikeDesignerInDesignerRequest: (id, page, sort) => dispatch(GetLikeDesignerInDesignerRequest(id, page, sort))//디자이너가 관심있는 디자이너
});

export default connect(mapStateToProps, mapDispatchToProps)(DesignerDetailContainer);
