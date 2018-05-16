import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignDetailStepCardRequest } from "actions/Design";
import DetailCard from "components/Designs/DetailCard";

class DesignDetailStepCardContainer extends Component {

  componentDidMount() {
    this.props.GetDesignDetailStepCardRequest(this.props.id, this.props.card_id);
  }

  render() {
    return (
      <div>
        <DetailCard DesignDetailStepCard={this.props.DesignDetailStepCard} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignDetailStepCard: state.DesignDetailStepCard.status.DesignDetailStepCard
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailStepCardRequest: (id, card_id) => {
      return dispatch(GetDesignDetailStepCardRequest(id, card_id))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignDetailStepCardContainer);
