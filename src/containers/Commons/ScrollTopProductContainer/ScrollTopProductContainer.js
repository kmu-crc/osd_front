import React, { Component } from "react";
import { connect } from "react-redux";
import { GetTopDesignListRequest } from "actions/Commons/TopList";
import ScrollListNew from "components/Commons/ScrollListNew";
import Loading from "components/Commons/Loading";
import Item from "components/Items/Item";

class ScrollTopProductContainer extends Component {
  componentWillMount() {
    this.props.GetTopDesignListRequest(0);
  }
  getList = (page) => {
    return this.props.GetTopDesignListRequest(page);
  }
  render() {
    return (
      this.props.status === "INIT" ? <Loading /> :
        <ScrollListNew
          getListRequest={this.getList}
          ListComponent={Item}
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
          customClass="largeCustom" />
    );
  }
};

const mapStateToProps = (state) => ({
  dataList: state.TopList.status.DesignList,
  dataListAdded: state.TopList.status.DesignListAdded,
  status: state.TopList.TopList.status
});

const mapDispatchToProps = (dispatch) => ({
  GetTopDesignListRequest: (page) => dispatch(GetTopDesignListRequest(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollTopProductContainer);
