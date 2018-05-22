import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerDetailRequest } from "actions/Designer";
import DesignerDetail from "components/Designers/DesignerDetail";

class GroupDetailContainer extends Component {

  render() {
    return(
      <div>
        <DesignerDetail {...this.props}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerDetail: state.DesignerDetail.status.DesignerDetail,
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignerDetailRequest: (id) => {
        return dispatch(GetDesignerDetailRequest(id))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
