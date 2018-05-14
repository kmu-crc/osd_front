import React, { Component } from "react";
import { connect } from 'react-redux';
import Main from "../../components/Main";

class MainContainer extends Component {
  render() {
    return(
      <Main userValid={this.props.valid}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    valid: state.Authentication.status.valid
  };
};

export default connect(mapStateToProps)(MainContainer);
