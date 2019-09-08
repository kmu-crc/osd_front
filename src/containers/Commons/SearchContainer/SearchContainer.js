import React, { Component } from "react";
import { connect } from "react-redux";
import SearchListRe from "components/Commons/SearchListRe";
import { GetDesignListCountRequest} from "redux/modules/design";

import { GetCategoryAllRequest } from "redux/modules/category"

class SearchContainer extends Component {
  render() {
    return(
        <SearchListRe {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category1: state.Category.status.category1,
    category2: state.Category.status.category2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetCategoryAllRequest: () => {
      return dispatch(GetCategoryAllRequest());
    },
    GetDesignListCountRequest : (cate1, cate2)=>{
      return dispatch(GetDesignListCountRequest(cate1,cate2));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);