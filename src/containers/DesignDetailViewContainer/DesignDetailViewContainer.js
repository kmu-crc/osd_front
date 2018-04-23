import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailViewRequest } from "../../actions/Design";
import DetailView from "../../components/DetailView";

class DesignDetailViewContainer extends Component {

  componentDidMount() {
    this.props.GetDesignDetailViewRequest(this.props.id);
  }

  render() {
    return (
      <div>
        <DetailView DesignDetailView={this.props.DesignDetailView} />
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
