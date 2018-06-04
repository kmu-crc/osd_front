import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyLikeDesignRequest } from "actions/Users/MyDetail";
import ContentList from "components/Commons/ContentList";

class MyLikeDesignContainer extends Component {
  componentWillMount() {
    this.props.GetMyLikeDesignRequest(this.props.location.state.token);
  }

  render() {
    return(
      <div>
        <ContentList data={this.props.MyLikeDesign} columns={4} type="design"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    MyLikeDesign: state.MyDetail.status.MyLikeDesign
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyLikeDesignRequest: (token) => {
      return dispatch(GetMyLikeDesignRequest(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLikeDesignContainer);
