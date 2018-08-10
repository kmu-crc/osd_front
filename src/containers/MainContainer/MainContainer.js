import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "components/Main";

class MainContainer extends Component {
  render() {
    return(
      <Main history={this.props.history}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
