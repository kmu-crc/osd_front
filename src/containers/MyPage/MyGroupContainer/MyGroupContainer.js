import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyGroupListRequest } from "actions/MyDetail";
import ContentList from "components/Commons/ContentList";

class MyGroupContainer extends Component {
  componentWillMount() {
    this.props.GetMyGroupListRequest(this.props.location.state.token);
  }

  render() {
    return(
      <div>
        <ContentList data={this.props.MyGroup} columns={4} type="group"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    MyGroup: state.MyDetail.status.MyGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyGroupListRequest: (token) => {
      return dispatch(GetMyGroupListRequest(token));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyGroupContainer);
