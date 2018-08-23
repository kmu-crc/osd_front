import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetWaitingDesignRequest, DeleteDesignInGroupRequest, UpdateDesignInGroupRequest, GetDesignInGroupRequest } from "actions/Group";
import ContentList from "components/Commons/ContentList";

class WaitingDesignContainer extends Component {
  componentWillMount(){
    this.props.GetWaitingDesignRequest(this.props.id, this.props.sort)
    .then(res => {
      if (res.waitingDesign) {
        const num = res.waitingDesign.length;
        this.props.getCount(num);
      } else {
        this.props.getCount(0);
      }
    });
  }

  setOut = (id) => {
    this.props.DeleteDesignInGroupRequest(this.props.id, id)
    .then(res => {
      if (res.data.success === true) {
        this.props.GetWaitingDesignRequest(this.props.id, this.props.sort)
        .then(res => {
          if (res.waitingDesign) {
            const num = res.waitingDesign.length;
            this.props.getCount(num);
          } else {
            this.props.getCount(0);
          }
        });
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
        .then(res => {
          if (res.waitingDesign) {
            const num = res.waitingDesign.length;
            this.props.getCount(num);
          } else {
            this.props.getCount(0);
          }
        })
        .then(this.props.GetDesignInGroupRequest(this.props.id, null, null));
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
    },
    GetDesignInGroupRequest: (id, page, sort) => {
      return dispatch(GetDesignInGroupRequest(id, page, sort))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitingDesignContainer);
