import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignerListRequest } from "actions/Designer";
import { GetCategoryLevel2Request } from "actions/Categorys";
import DesignerList from "components/Designers/DesignerList";

class DesignerListContainer extends Component {

  render() {
    return(
      <div>
        <DesignerList {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerList: state.DesignerList.status.DesignerList,
    DesignerListAdded: state.DesignerList.status.DesignerListAdded,
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignerListRequest: (page, sort) => {
        return dispatch(GetDesignerListRequest(page, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignerListContainer);
