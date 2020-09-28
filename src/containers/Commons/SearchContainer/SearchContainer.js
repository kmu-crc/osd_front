import React, { Component } from "react";
import { connect } from "react-redux";
import SearchList from "components/Commons/SearchList";
import { GetItemSearchCountRequest } from "actions/Design";
import { GetMakerSearchCountRequest } from "actions/Maker";
import { GetDesignerSearchCountRequest } from "actions/Designer";

class SearchContainer extends Component {
  render() {
    return (<SearchList {...this.props} />);
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  GetItemSearchCountRequest: (sort, categoryLevel1, categoryLevel2, keyword) => {
    return dispatch(GetItemSearchCountRequest(sort, categoryLevel1, categoryLevel2, keyword))
  },
  GetMakerSearchCountRequest: (sort, categoryLevel1, categoryLevel2, keyword) => {
    return dispatch(GetMakerSearchCountRequest(sort, categoryLevel1, categoryLevel2, keyword))
  },
  GetDesignerSearchCountRequest: (sort, categoryLevel1, categoryLevel2, keyword) => {
    return dispatch(GetDesignerSearchCountRequest(sort, categoryLevel1, categoryLevel2, keyword))
  }

});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
