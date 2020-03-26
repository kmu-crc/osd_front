import React, { Component } from "react";
import { connect } from "react-redux";
import SearchListRe from "components/Commons/SearchListRe";
import { GetDesignListCountRequest } from "redux/modules/design";
import { GetCategoryAllRequest } from "redux/modules/category"

class SearchContainer extends Component {
  render() {
    return (
      <SearchListRe {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  category1: state.Category.status.category1,
  category2: state.Category.status.category2,
  groups: state.GroupList.status.GroupListAdded,
  designs: state.DesignList.status.DesignListAdded,
  designers: state.DesignerList.status.DesignerListAdded,
  group_status: state.GroupList.GroupList.status,
  design_status: state.DesignList.DesignList.status,
  designer_status: state.DesignerList.DesignerList.status,
});

const mapDispatchToProps = (dispatch) => ({
  GetCategoryAllRequest: () => dispatch(GetCategoryAllRequest()),
  GetDesignListCountRequest: (cate1, cate2) => dispatch(GetDesignListCountRequest(cate1, cate2))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);