import React, { Component } from "react";
import { connect } from "react-redux";
import { GetTopDesignListRequest } from "actions/Commons/TopList";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class ScrollTopDesignContainer extends Component {
  componentWillMount(){
    this.props.GetTopDesignListRequest(0);
  }

  getList = (page) => {
    return this.props.GetTopDesignListRequest(page);
  }

  render() {
    return(
      <ScrollList getListRequest={this.getList}
                  ListComponent={Design}
                  dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
                  mobile={16} tablet={5} computer={4} largeScreen={2} widescreen={2} customClass="largeCustom"/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.TopList.status.DesignList,
    dataListAdded: state.TopList.status.DesignListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetTopDesignListRequest: (page) => {
      return dispatch(GetTopDesignListRequest(page))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTopDesignContainer);
