import React, { Component } from "react";
import { connect } from "react-redux";
import SearchListRe from "components/Commons/SearchListRe";
// import { GetCategoryLevel2Request } from "actions/Categorys";

class SearchContainer extends Component {
  render() {
    return(
      <SearchListRe {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // GetCategoryLevel2Request: (id) => {
    //   return dispatch(GetCategoryLevel2Request(id));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
