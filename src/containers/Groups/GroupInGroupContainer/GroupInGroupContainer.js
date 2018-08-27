import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupInGroupRequest } from "actions/Group";
import ScrollList from "components/Commons/ScrollList";
import Group from "components/Groups/Group";

class GroupInGroupContainer extends Component {
  componentWillMount() {
    this.props.GetGroupInGroupRequest(this.props.id, 0, this.props.sort);
  }

  shouldComponentUpdate(nextProps){
    if (JSON.stringify(this.props.sort) !== JSON.stringify(nextProps.sort)) {
      this.props.GetGroupInGroupRequest(this.props.id, 0, nextProps.sort);
    }
    return true;
  }

  getList = (page) => {
    return this.props.GetGroupInGroupRequest(this.props.id, page, this.props.sort);
  }

  render() {
    return(
      <div>
        <ScrollList rerender={true}
                    getListRequest={this.getList}
                    ListComponent={Group}
                    type="Group"
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                    mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom"/>
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
