import React, { Component } from 'react';
import { connect } from "react-redux";
import { GetDesignCardRequest } from "actions/Designs/DesignCard";
import DesignBoard from "components/Designs/DesignBoard";

class DesignBoardContainer extends Component {
  render() {
    return(
      <DesignBoard {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    list: state.DesignDetailStepCard.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignCardRequest: (id, board_id) => {
      return dispatch(GetDesignCardRequest(id, board_id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignBoardContainer);
