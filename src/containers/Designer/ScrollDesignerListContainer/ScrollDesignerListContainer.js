import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerListRequest } from "actions/Designer";
import ScrollDesignerList from "components/Designers/ScrollDesignerList";

class ScrollDesignerListContainer extends Component {
  render() {
    return(
      <div>
        <ScrollDesignerList {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerList: state.DesignerList.status.DesignerList,
    DesignerListAdded: state.DesignerList.status.DesignerListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignerListRequest: (sort, categoryLevel1, categoryLevel2, page) => {
        return dispatch(GetDesignerListRequest(sort, categoryLevel1, categoryLevel2, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignerListContainer);
