import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailRequest, GetDesignDetailViewRequest } from "../../actions/Design";
import DesignDetail from "../../components/DesignDetail";
import DetailView from "../../components/DetailView";

class DesignDetailContainer extends Component {

  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id);
    this.props.GetDesignDetailViewRequest(this.props.id);
  }

  render() {
    return (
      <div>
        <DesignDetail DesignDetail={this.props.DesignDetail} />
        <DetailView DesignDetailView={this.props.DesignDetailView} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetail: state.DesignDetail.status.DesignDetail,
    DesignDetailView: state.DesignDetailView.status.DesignDetailView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailRequest: (id) => {
      return dispatch(GetDesignDetailRequest(id))
    },
    GetDesignDetailViewRequest: (id) => {
      return dispatch(GetDesignDetailViewRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailContainer);
