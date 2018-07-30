import React, { Component } from "react";
import { connect } from "react-redux";
import { GetTopDesignListRequest } from "actions/Commons/TopList";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";
import Loading from "components/Commons/Loading";

class ScrollTopDesignContainer extends Component {
  componentWillMount(){
    this.props.GetTopDesignListRequest(0);
  }

  getList = (page) => {
    return this.props.GetTopDesignListRequest(page);
  }

  render() {
    return(
      <div>
        {this.props.status === "INIT" ?
        <Loading/>
        :
        <ScrollList getListRequest={this.getList}
        ListComponent={Design}
        dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
        mobile={16} tablet={8} computer={5} largeScreen={4} widescreen={4} customClass="largeCustom"/>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.TopList.status.DesignList,
    dataListAdded: state.TopList.status.DesignListAdded,
    status: state.TopList.TopList.status
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
