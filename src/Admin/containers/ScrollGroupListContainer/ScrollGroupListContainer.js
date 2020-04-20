import React, { Component } from "react";
import { connect } from "react-redux";
import { GetAllGroupListRequest } from "actions/Group";
import ScrollList from "../../components/ScrollList";
import Group from "../../components/Group";

class ScrollGroupListContainer extends Component {
  componentWillMount(){
    this.props.GetAllGroupListRequest();
  }
  getList = () => {
    return this.props.GetAllGroupListRequest();
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList}
                    ListComponent={Group}
                    type="Group"
                    dataList={this.props.dataList} 
                    customClass="largeCustom"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GroupList.status.GroupList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
        GetAllGroupListRequest: () => {
        return dispatch(GetAllGroupListRequest())
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollGroupListContainer);
