import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGroupDetailRequest } from "../../actions/Group";
import GroupDetail from "../../components/GroupDetail";

class GroupDetailContainer extends Component {

  componentDidMount(){
    console.log(this.props.id);
    this.props.GetGroupDetailRequest(this.props.id);
  }
  
  render() {
    return(
      <div>
        <GroupDetail GroupDetail={this.props.GroupDetail}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    GroupDetail: state.GroupDetail.status.GroupDetail
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetGroupDetailRequest: (id) => {
        return dispatch(GetGroupDetailRequest(id))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetailContainer);
