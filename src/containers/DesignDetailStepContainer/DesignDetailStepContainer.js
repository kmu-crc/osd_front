import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailStepRequest } from "../../actions/Design";
import DetailStep from "../../components/DetailStep";

class DesignDetailStepContainer extends Component {

  componentDidMount() {
    this.props.GetDesignDetailStepRequest(this.props.id);
  }

  render() {
    return (
      <div>
        <DetailStep DesignDetailStep={this.props.DesignDetailStep} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetailStep: state.DesignDetailStep.status.DesignDetailStep
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailStepRequest: (id) => {
      return dispatch(GetDesignDetailStepRequest(id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailStepContainer);
