import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyLikeDesignerRequest } from "actions/Users/MyDetail";
import ScrollList from "components/Commons/ScrollList";
import Designer from "components/Designers/Designer";

class MyLikeDesignerContainer extends Component {
  componentWillMount(){
    this.props.GetMyLikeDesignerRequest(this.props.location.state.token, 0);
  }

  getList = (page) => {
    return this.props.GetMyLikeDesignerRequest(this.props.location.state.token, page);
  }

  render() {
    return(
      <ScrollList getListRequest={this.getList}
                  ListComponent={Designer}
                  type="Designer"
                  dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                  mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom"/>
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
