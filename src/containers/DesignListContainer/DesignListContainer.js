import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "../../actions/Design";
import DesignList from "../../components/DesignList";

class DesignListContainer extends Component {

  componentWillMount(){
    this.props.GetDesignListRequest(null, null, null);
  }
  
  render() {
    return(
      <div>
        <DesignList userValid={this.props.valid} userInfo={this.props.userInfo} DesignList={this.props.DesignList}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList,
    valid: state.Authentication.status.valid,
    userInfo: state.Authentication.status.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignListRequest: (sort, categoryLevel1, categoryLevel2) => {
        return dispatch(GetDesignListRequest(sort, categoryLevel1, categoryLevel2))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignListContainer);
