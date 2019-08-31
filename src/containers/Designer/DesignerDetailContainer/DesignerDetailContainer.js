import React, { Component } from "react"
import { connect } from "react-redux"
import { GetDesignerDetailRequest, GetDesignerCountRequest,
    GetLikeDesignerRequest, LikeDesignerRequest,
    UnlikeDesignerRequest, GetLikeInDesignerRequest,
    GetMyDesignInDesignerRequest,
} from "redux/modules/designer"

import DesignerDetailHeader from "components/Designers/DesignerDetailHeader"
import DesignerDetailBody from "components/Designers/DesignerDetailBody"
class DesignerDetailContainer extends Component {

  componentWillMount() {
    console.log(this.props.id);
    this.props.GetDesignerDetailRequest(this.props.id);
    this.props.GetDesignerCountRequest(this.props.id);
  }

  render() {
     // return <DesignerDetail {...this.props}/>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignerDetailRequest: (id) => {
      return dispatch(GetDesignerDetailRequest(id))
    },
    GetLikeDesignerRequest: (id, token) => {
      return dispatch(GetLikeDesignerRequest(id, token))
    },
    LikeDesignerRequest: (id, token) => {
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignerDetailContainer);
