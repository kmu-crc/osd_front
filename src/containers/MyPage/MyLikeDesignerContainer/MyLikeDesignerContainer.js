import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyLikeDesignerRequest } from "actions/Users/MyDetail";
import ScrollList from "components/Commons/ScrollList";
import Designer from "components/Designers/Designer";

class MyLikeDesignerContainer extends Component {

  getList = (page) => {
    return this.props.GetMyLikeDesignerRequest(this.props.location.state.token, page);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} 
                    ListComponent={Designer} 
                    dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} 
                    mobile={8} tablet={8} computer={5} largeScreen={4} widescreen={4} customClass="largeCustom"/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.MyDetail.status.MyLikeDesigner,
    dataListAdded: state.MyDetail.status.MyLikeDesignerAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyLikeDesignerRequest: (token, page) => {
      return dispatch(GetMyLikeDesignerRequest(token, page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLikeDesignerContainer);
