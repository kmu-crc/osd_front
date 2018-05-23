import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class GroupInGroupContainer extends Component {
  componentWillMount() {
    this.props.GetGroupInGroupRequest(this.props.match.params.id, this.props.match.params.sort);
  }

  shouldComponentUpdate(nextProps) {
    if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
      this.props.GetGroupInGroupRequest(this.props.match.params.id, nextProps.match.params.sort);
      return true;
    } else {
      return false;
    }
  }

  render() {
    return(
      <div>
        <ContentList data={this.props.GroupInGroup} columns={4} type="group" rerender="true"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GroupInGroup: state.GroupDetail.status.GroupInGroup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupInGroupRequest: (id, sort) => {
        return dispatch(GetGroupInGroupRequest(id, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupInGroupContainer);
