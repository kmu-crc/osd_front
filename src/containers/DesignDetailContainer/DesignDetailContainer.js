import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailRequest } from "../../actions/Design";
import DesignDetail from "../../components/DesignDetail";

class DesignDetailContainer extends Component {
  render() {
    return (
      <div>
        <DesignDetail {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetail: state.DesignDetail.status.DesignDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailRequest: (id) => {
      return dispatch(GetDesignDetailRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailContainer);
