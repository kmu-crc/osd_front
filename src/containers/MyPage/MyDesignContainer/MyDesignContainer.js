import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetMyDesignListRequest } from "redux/modules/personal";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class MyDesignContainer extends Component {
  componentWillMount() {
    this.props.GetMyDesignListRequest(this.props.token, 0);
  }

  getList = (page) => {
    return this.props.GetMyDesignListRequest(this.props.token, page);
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
    dataList: state.MyDetail.status.MyDesign,
    dataListAdded: state.MyDetail.status.MyDesignAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyDesignListRequest: (token, page) => {
      return dispatch(GetMyDesignListRequest(token, page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDesignContainer);
