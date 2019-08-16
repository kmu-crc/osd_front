import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ModifyDesignInfo from "components/Designs/ModifyDesignInfo";
import { GetDesignDetailRequest, UpdateDesignInfoRequest } from "redux/modules/design";
import { GetCategoryLevel1Request, GetCategoryLevel2Request } from "redux/modules/category";
import { SearchMemberRequest } from "redux/modules/search";

class ModifyDesignInfoContainer extends Component {
  render() {
    return (
      <ModifyDesignInfo {...this.props} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    DesignDetail: state.DesignDetail.status.DesignDetail,
    category1: state.Categorys.status.level1,
    category2: state.Categorys.status.level2,
    members: state.Search.status.members
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignDetailRequest: (id, token) => {
      return dispatch(GetDesignDetailRequest(id, token))
    },
    GetCategoryLevel1Request: () => {
      return dispatch(GetCategoryLevel1Request());
    },
    GetCategoryLevel2Request: (id) => {
      return dispatch(GetCategoryLevel2Request(id));
    },
    UpdateDesignInfoRequest: (data, id, token) => {
      return dispatch(UpdateDesignInfoRequest(data, id, token));
    },
    SearchMemberRequest: (data, token) => {
      return dispatch(SearchMemberRequest(data, token));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyDesignInfoContainer));
