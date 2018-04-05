import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignListRequest } from "../../actions/Design";
import DesignList from "../../components/DesignList";

class DesignListContainer extends Component {
  componentWillMount(){
    this.props.GetDesignListRequest(null, null, null);
    console.log(this.props.DesignList)
  }
  render() {
    return(
      <div>
        <DesignList DesignList={this.props.DesignList}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignList: state.DesignList.status.DesignList
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
