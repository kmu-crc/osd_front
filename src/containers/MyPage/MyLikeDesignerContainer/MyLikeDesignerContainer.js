import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyLikeDesignerRequest } from "actions/MyDetail";
import ContentList from "components/Commons/ContentList";

class MyLikeDesignerContainer extends Component {
  componentWillMount() {
    this.props.GetMyLikeDesignerRequest(this.props.location.state.token);
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
    MyLikeDesigner: state.MyDetail.status.MyLikeDesigner
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyLikeDesignerRequest: (token) => {
      return dispatch(GetMyLikeDesignerRequest(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLikeDesignerContainer);
