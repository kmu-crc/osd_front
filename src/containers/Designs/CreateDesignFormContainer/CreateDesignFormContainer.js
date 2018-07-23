import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CreateDesignForm from "components/Designs/CreateDesignForm";
import { CreateDesignRequest } from "actions/Designs/CreateDesign";
import { SearchMemberRequest } from "actions/Commons/Search";
import { GetCategoryLevel2Request } from "actions/Categorys";

class CreateDesignFormContainer extends Component {
  render() {
    return(
      <CreateDesignForm {...this.props}/>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    members: state.Search.status.members,
    cate1: state.Categorys.status.level1,
    cate2: state.Categorys.status.level2
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateDesignRequest: (data, token) => {
      return dispatch(CreateDesignRequest(data, token));
    },
    SearchMemberRequest: (data, token) => {
      return dispatch(SearchMemberRequest(data, token));
    },
    GetCategoryLevel2Request: (id) => {
      return dispatch(GetCategoryLevel2Request(id));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateDesignFormContainer));
