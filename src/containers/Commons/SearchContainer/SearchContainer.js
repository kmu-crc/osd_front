import React, { Component } from "react";
import { connect } from "react-redux";
import Re_SearchList from "components/Commons/Re_SearchList";
// import { GetCategoryLevel2Request } from "actions/Categorys";

class SearchContainer extends Component {
  render() {
    return(
      <Re_SearchList {...this.props}/>
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
