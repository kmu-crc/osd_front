import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailViewRequest } from "../../actions/Design";
import DetailView from "../../components/DetailView";

class DesignDetailViewContainer extends Component {
  render() {
    return (
      <div>
        <DetailView {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetailView: state.DesignDetailView.status.DesignDetailView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailViewRequest: (id) => {
      return dispatch(GetDesignDetailViewRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailViewContainer);
