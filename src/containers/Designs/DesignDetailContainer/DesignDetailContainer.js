import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import DesignDetail from "components/Designs/DesignDetail"
import {
  ForkDesignRequest, ForkDesignListRequest, JoinDesignRequest, GetoutDesignRequest,
  DeleteDesignRequest, GetDesignDetailRequest, DesignDetailResetRequest, UpdateDesignViewRequest,
  GetDesignCountRequest, GetLikeDesignRequest, LikeDesignRequest, UnlikeDesignRequest, DESIGN_NOT_FOUND
} from "redux/modules/design"
import Loading from "components/Commons/Loading";

class DesignDetailContainer extends Component {
  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id)
  }
  goBack() {
    alert("wrong access")
    window.history.go(-1)
  }
  render() {
    console.log("PROPS_DESIGNDETAIL")
    console.log(this.props)
    return (<>{this.props.status === "INIT" ? <Loading /> :
      this.props.status === DESIGN_NOT_FOUND ? this.goBack() :
        <DesignDetail {...this.props} />}</>)
  }
}

const mapStateToProps = (state) => {
  return {
    DesignForked: state.Design.status.DesignForked,
    status: state.Design.DesignDetail.status,
    new_design_id: state.Design.status.new_design_id,
    forked_list: state.Design.status.list,
    DesignDetail: state.Design.status.DesignDetail,
    Count: state.Design.status.Count,
    userInfo: state.Authentication.status.userInfo,
    valid: state.Authentication.status.valid,
    token: state.Authentication.status.token,
    like: state.Design.status.like
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token))
    },
    DesignDetailResetRequest: () => {
      return dispatch(DesignDetailResetRequest())
    },
    GetLikeDesignRequest: (id, token) => {
      return dispatch(GetLikeDesignRequest(id, token))
    },
    LikeDesignRequest: (id, token) => {
      return dispatch(LikeDesignRequest(id, token))
    },
    UnlikeDesignRequest: (id, token) => {
      return dispatch(UnlikeDesignRequest(id, token))
    },
    GetDesignCountRequest: (id) => {
      return dispatch(GetDesignCountRequest(id))
    },
    UpdateDesignViewRequest: (id) => {
      return dispatch(UpdateDesignViewRequest(id))
    },
    DeleteDesignRequest: (id, token) => {
      return dispatch(DeleteDesignRequest(id, token))
    },
    JoinDesignRequest: (id, data, flag, token) => {
      return dispatch(JoinDesignRequest(id, data, flag, token))
    },
    GetoutDesignRequest: (id, token) => {
      return dispatch(GetoutDesignRequest(id, token))
    },
    ForkDesignRequest: (designId, userId, token) => {
      return dispatch(ForkDesignRequest(designId, userId, token))
    },
    ForkDesignListRequest: (id, token) => {
      return dispatch(ForkDesignListRequest(id, token))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DesignDetailContainer));
