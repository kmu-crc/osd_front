import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest } from "actions/Group";
import ScrollList from "components/Commons/ScrollList";
import Group from "components/Groups/Group";

class GroupInGroupContainer extends Component {
  componentWillMount() {
    this.props.GetGroupInGroupRequest(this.props.match.params.id, 0, this.props.match.params.sort);
  }

  shouldComponentUpdate(nextProps){
    if (JSON.stringify(this.props.match.params.sort) !== JSON.stringify(nextProps.match.params.sort)) {
      this.props.GetGroupInGroupRequest(this.props.match.params.id, 0, nextProps.match.params.sort);
    }
    return true;
  }

  getList = (page) => {
    return this.props.GetGroupInGroupRequest(this.props.match.params.id, page, this.props.match.params.sort);
  }

  render() {
    return(
      <div>
        <ScrollList rerender={true}
                    getListRequest={this.getList}
                    ListComponent={Group}
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                    mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GroupDetail.status.GroupInGroup,
    dataListAdded: state.GroupDetail.status.GroupInGroupAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupInGroupRequest: (id, page, sort) => {
        return dispatch(GetGroupInGroupRequest(id, page, sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupInGroupContainer);
