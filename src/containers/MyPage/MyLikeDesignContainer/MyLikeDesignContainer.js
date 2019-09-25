import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyLikeDesignRequest } from "redux/modules/personal";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class MyLikeDesignContainer extends Component {
  componentWillMount() {
    this.props.GetMyLikeDesignRequest(this.props.token, 0);
  }

  getList = (page) => {
    return this.props.GetMyLikeDesignRequest(this.props.token, page);
  }

  render() {
    return (
      <ScrollList getListRequest={this.getList}
        type="design"
        dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
        mobile={16} tablet={8} computer={8} largeScreen={5} widescreen={2} customClass="largeCustom" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.MyDetail.status.MyLikeDesign,
    dataListAdded: state.MyDetail.status.MyLikeDesignAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyLikeDesignRequest: (token, page) => {
      return dispatch(GetMyLikeDesignRequest(token, page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLikeDesignContainer);
