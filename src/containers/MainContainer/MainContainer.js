import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "components/Main";
import { GetTopDesignListRequest, GetTopDesignerListRequest } from "actions/Commons/TopList";

class MainContainer extends Component {
  componentDidMount(){
    this.props.GetTopDesignListRequest();
    this.props.GetTopDesignerListRequest();
  }
  render() {
    return(
      <Main/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.TopList.status.DesignList,
    DesignerList: state.TopList.status.DesignerList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetTopDesignListRequest: () => {
      return dispatch(GetTopDesignListRequest())
    },
    GetTopDesignerListRequest: () => {
      return dispatch(GetTopDesignerListRequest())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
