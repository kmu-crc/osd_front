import React, { Component } from 'react'
import { connect } from 'react-redux'
import MypageHeader from 'components/MypageHeader';
import MypageBody from 'components/MypageBody';
import MypageHeader_mobile from 'components/MypageHeader_mobile';
import MypageBody_mobile from 'components/MypageBody_mobile';
import {
  GetMyDetailRequest,
} from "redux/modules/personal";
import {
  GetDesignerCountRequest,
  GetGroupInDesignerRequest,
  GetRelatedGroupInDesignerRequest,
  GetLikeInDesignerRequest,
  GetMyDesignInDesignerRequest,
  GetLikeGroupInDesignerRequest,
  GetLikeDesignerInDesignerRequest,

  GetTheBestDesignDesignerRequest,

} from "redux/modules/designer";
import { SignOutRequest, } from "redux/modules/auth";

class MyDetailContainer extends Component {
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token);
    this.props.GetDesignerCountRequest(this.props.userInfo.uid);
  }

  render() {
    return (
      <React.Fragment>
        {
          window.innerWidth<500?
          <React.Fragment>
          <MypageHeader_mobile {...this.props} />
          <MypageBody_mobile {...this.props} id={this.props.userInfo.uid} />
          </React.Fragment>
          :
          <React.Fragment>
          <MypageHeader {...this.props} />
          <MypageBody {...this.props} id={this.props.userInfo.uid} />  
          </React.Fragment>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    MyDetail: state.Personal.status.MyDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    Count: state.Designer.status.Count,
    TheBestDesign: state.Designer.status.TheBestDesign,
    MyDesign: state.Designer.status.MyDesignInDesigner,
    MyDesignAdded: state.Designer.status.MyDesignInDesignerAdded,
    MyLikeDesign: state.Designer.status.LikeInDesigner,
    MyLikeDesignAdded: state.Designer.status.LikeInDesignerAdded,
    MyLikeGroup: state.Designer.status.LikeGroupInDesigner,
    MyLikeGroupAdded: state.Designer.status.LikeGroupInDesignerAdded,
    MyLikeDesigner: state.Designer.status.LikeDesignerInDesigner,
    MyLikeDesignerAdded: state.Designer.status.LikeDesignerInDesignerAdded,
    MyGroup: state.Designer.status.GroupInDesigner,
    MyGroupAdded: state.Designer.status.GroupInDesignerAdded,
    RelatedGroup: state.Designer.status.RelatedGroupInDesigner,
    RelatedGroupAdded: state.Designer.status.RelatedGroupInDesignerAdded,
  };
};

const mapDispatchToProps = (dispatch) => ({
  GetDesignerCountRequest: (id) => dispatch(GetDesignerCountRequest(id)),
  GetMyDetailRequest: (token) => dispatch(GetMyDetailRequest(token)),

  GetGroupInDesignerRequest: (id, page, sort) => dispatch(GetGroupInDesignerRequest(id, page, sort)),
  GetRelatedGroupInDesignerRequest: (id, page, sort) => dispatch(GetRelatedGroupInDesignerRequest(id, page, sort)),
  GetLikeInDesignerRequest: (id, page, sort) => dispatch(GetLikeInDesignerRequest(id, page, sort)),
  GetMyDesignInDesignerRequest: (id, page, sort) => dispatch(GetMyDesignInDesignerRequest(id, page, sort)),
  GetLikeGroupInDesignerRequest: (id, page, sort) => dispatch(GetLikeGroupInDesignerRequest(id, page, sort)),
  GetLikeDesignerInDesignerRequest: (id, page, sort) => dispatch(GetLikeDesignerInDesignerRequest(id, page, sort)),

  GetTheBestDesignDesignerRequest: (id) => dispatch(GetTheBestDesignDesignerRequest(id)),
  SignOutRequest: () => dispatch(SignOutRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MyDetailContainer)
