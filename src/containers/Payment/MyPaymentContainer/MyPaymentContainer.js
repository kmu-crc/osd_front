import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { GetMyPaymentRequest } from "actions/Payment";
// import Designer from "components/Designers/Designer";
import ScrollList from "components/Commons/ScrollList";

class MyPaymentContainer extends Component {
  componentWillMount() {
    // this.props.GetMyLikeDesignerRequest(this.props.token, 0);
  }

  getList = (page) => {
    // return this.props.GetMyLikeDesignerRequest(this.props.token, page);
  }

  render() {
    return (
      <ScrollList
        getListRequest={this.getList}
        // ListComponent={Item}
        type="item"
        dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />
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
    // GetMyLikeDesignerRequest: (token, page) => {
    // return dispatch(GetMyLikeDesignerRequest(token, page));
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPaymentContainer);
