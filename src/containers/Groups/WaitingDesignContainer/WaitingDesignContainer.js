import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetWaitingDesignRequest, DeleteDesignInGroupRequest, UpdateDesignInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class WaitingDesignContainer extends Component {
  componentWillMount(){
    this.props.GetWaitingDesignRequest(this.props.id, this.props.sort);
  }

  setOut = (id) => {
    this.props.DeleteDesignInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetWaitingDesignRequest(this.props.id, this.props.sort)
      }
    }).catch(err => {
      console.log(err);
    });
  }

  setAccept = (id) => {
    this.props.UpdateDesignInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetWaitingDesignRequest(this.props.id, this.props.sort)
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return(
      <ContentList data={this.props.waitingDesign} type="design"
                   handleClick={this.setOut} handleAccept={this.setAccept}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    waitingDesign: state.GroupWaitingList.status.waitingDesign
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetWaitingDesignRequest : (id, sort) => {
      return dispatch(GetWaitingDesignRequest(id, sort))
    },
    DeleteDesignInGroupRequest : (id, designId) => {
      return dispatch(DeleteDesignInGroupRequest(id, designId))
    },
    UpdateDesignInGroupRequest : (id, designId) => {
      return dispatch(UpdateDesignInGroupRequest(id, designId))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingDesignContainer);
