import React, { Component } from "react";
import { connect } from "react-redux";
import SearchList from "components/Commons/SearchList";

class SearchContainer extends Component {
  render() {
    return (<SearchList {...this.props} />);
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
