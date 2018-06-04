import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDesignListRequest } from "actions/Users/MyDetail";
import ContentList from "components/Commons/ContentList";

class MyDesignContainer extends Component {
  render() {
    return(
      <div>
        <ContentList data={this.props.MyDesign} columns={4} type="design"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    MyDesign: state.MyDetail.status.MyDesign
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDesignListRequest: (token) => {
      return dispatch(GetMyDesignListRequest(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDesignContainer);
