import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetWaitingDesignRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class WaitingDesignContainer extends Component {
  componentWillMount(){
    this.props.GetWaitingDesignRequest(this.props.match.params.id, this.props.match.params.sort);
  }

  render() {
    return(
      <ContentList data={this.props.waitingDesign} type="design"/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    waitingDesign: state.GroupWaitingList.status.waitingDesign
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetWaitingDesignRequest : (id, sort) => {
      return dispatch(GetWaitingDesignRequest(id, sort))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingDesignContainer);
