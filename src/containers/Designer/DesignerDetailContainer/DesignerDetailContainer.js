import React, { Component } from "react"
import { connect } from "react-redux"
import { GetDesignerDetailRequest, GetDesignerCountRequest,
    GetLikeDesignerRequest, LikeDesignerRequest,
    UnlikeDesignerRequest, GetLikeInDesignerRequest,
    GetMyDesignInDesignerRequest,GetGroupInDesignerRequest,
    GetLikeGroupInDesignerRequest,GetLikeDesignerInDesignerRequest,
} from "redux/modules/designer"

import DesignerDetailHeader from "components/Designers/DesignerDetailHeader"
import DesignerDetailBody from "components/Designers/DesignerDetailBody"
class DesignerDetailContainer extends Component {

  componentWillMount() {
    this.props.GetDesignerDetailRequest(this.props.id)
    .then(() => { this.props.GetLikeDesignerRequest(this.props.id, this.props.token) })
    this.props.GetDesignerCountRequest(this.props.id);
    
  }

  render() {
    console.log("DESIGN DETAIL::",this.props)
    return (
      <React.Fragment>
        <DesignerDetailHeader {...this.props}/>
        <DesignerDetailBody {...this.props}/>
      </React.Fragment>
    );
    }
}

const mapStateToProps = (state) => {
  return {
    DesignerDetail: state.Designer.status.DesignerDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    like: state.Designer.status.like,
    Count: state.Designer.status.Count,

    MyDesignInDesigner:state.Designer.status.MyDesignInDesigner,
    MyDesignInDesignerAdded:state.Designer.status.MyDesignInDesignerAdded,
    LikeInDesigner:state.Designer.status.LikeInDesigner,
    LikeInDesignerAdded:state.Designer.status.LikeInDesignerAdded,
    LikeGroupInDesigner:state.Designer.status.LikeGroupInDesigner,
    LikeGroupInDesignerAdded:state.Designer.status.LikeGroupInDesignerAdded,
    LikeDesignerInDesigner:state.Designer.status.LikeDesignerInDesigner,
    LikeDesignerInDesignerAdded:state.Designer.status.LikeDesignerInDesignerAdded,
    GroupInDesigner:state.Designer.status.GroupInDesigner,
    GroupInDesignerAdded:state.Designer.status.GroupInDesignerAdded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignerDetailRequest: (id) => {
      return dispatch(GetDesignerDetailRequest(id))
    },
    GetLikeDesignerRequest: (id, token) => {//이 디자이너를 내가 관심있는지 없는지
      return dispatch(GetLikeDesignerRequest(id, token))
    },
    LikeDesignerRequest: (id, token) => {//다자이너를 좋아요 눌렀을 때
      return dispatch(LikeDesignerRequest(id, token))
    },
    UnlikeDesignerRequest: (id, token) => {
      return dispatch(UnlikeDesignerRequest(id, token))
    },
    GetDesignerCountRequest: (id) => {
      return dispatch(GetDesignerCountRequest(id))
    },
    GetLikeInDesignerRequest:(id, page)=>{
      return dispatch(GetLikeInDesignerRequest(id, page));
    },
    GetMyDesignInDesignerRequest : (id, page)=>{
      return dispatch(GetMyDesignInDesignerRequest(id, page));
    },
    GetGroupInDesignerRequest:(id, page)=>{
      return dispatch(GetGroupInDesignerRequest(id, page));
    },
    GetLikeGroupInDesignerRequest:(id, page)=>{
      return dispatch(GetLikeGroupInDesignerRequest(id, page));
    },
    GetLikeDesignerInDesignerRequest:(id, page)=>{//디자이너가 관심있는 디자이너
      return dispatch(GetLikeDesignerInDesignerRequest(id, page));
    }

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignerDetailContainer);
