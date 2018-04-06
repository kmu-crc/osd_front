import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetDesignerListRequest } from "../../actions/Designer";
import DesignerList from "../../components/DesignerList";

class DesignerListContainer extends Component {

  componentWillMount(){
    this.props.GetDesignerListRequest(null);
  }
  
  render() {
    return(
      <div>
        <DesignerList DesignerList={this.props.DesignerList}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DesignerList: state.DesignerList.status.DesignerList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      GetDesignerListRequest: (sort) => {
        return dispatch(GetDesignerListRequest(sort))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesignerListContainer);
