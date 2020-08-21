import React, { Component } from "react";
import { connect } from "react-redux";
import GridEditor from "components/Designs/GridEditor";
import GridEditorMobile from "components/Designs/GridEditor/GridEditorMobile";
import {
  CreateDesignBoardRequest, DeleteDesignBoardRequest,
  GetDesignDetailRequest, GetCardDetailRequest, GetDesignCardRequest, GetDesignBoardRequest,
  UpdateCardTitleRequest, UpdateDesignBoardRequest, UpdateDesignTime
} from "redux/modules/design";
import opendesigncss from "opendesign_style";

class DesignDetailStepContainer extends Component {
  componentDidMount() {
    this.props.GetDesignBoardRequest(this.props.design.uid);
  }
  render() {
    const mobile = window.innerWidth <= opendesigncss.resolutions.SmallMaxWidth;
    //console.log("items ::::", this.props.DesignDetailStep)
    return (mobile
      ? <GridEditorMobile {...this.props} />
      : <GridEditor {...this.props} />)
  }
}

const mapStateToProps = (state) => ({
  token: state.Authentication.status.token,
  userInfo: state.Authentication.status.userInfo,
  DesignDetailStepCard: state.DesignCard.status.DesignDetailStepCard,
  DesignDetailStep: state.DesignCard.status.DesignDetailStep,
});

const mapDispatchToProps = (dispatch) => ({
  CreateDesignBoardRequest: (data, design_id, token) => { return dispatch(CreateDesignBoardRequest(data, design_id, token)); },
  GetCardDetailRequest: (id) => { return dispatch(GetCardDetailRequest(id)); },
  GetDesignDetailRequest: (id, token) => { return dispatch(GetDesignDetailRequest(id, token)); },
  GetDesignBoardRequest: (id) => { return dispatch(GetDesignBoardRequest(id)); },
  UpdateDesignTime: (design_id, token) => { return dispatch(UpdateDesignTime(design_id, token)); },
  UpdateCardTitleRequest: (data, token, id) => { return dispatch(UpdateCardTitleRequest(data, token, id)); },
  GetDesignCardRequest: (id, board_id) => { return dispatch(GetDesignCardRequest(id, board_id)); },
  UpdateDesignBoardRequest: (id, token, data) => { return dispatch(UpdateDesignBoardRequest(id, token, data)); },
  DeleteDesignBoardRequest: (id, board_id, token) => { return dispatch(DeleteDesignBoardRequest(id, board_id, token)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailStepContainer)
