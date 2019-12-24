import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "actions/Design";
import ScrollListTest from "components/Commons/ScrollListTest";
import Design from "components/Designs/Design";

class ScrollDesignListContainer extends Component {
  componentWillMount() {
    this.props.GetDesignListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }
  getList = (page) => {
    return this.props.GetDesignListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }
  render() {
    return (
      <React.Fragment>
        {/* <Design /> */}
        <ScrollListTest
          getListRequest={this.getList}
          ListComponent={Design}
          dataList={this.props.dataList}
          dataListAdded={this.props.dataListAdded}
          mobile={4} tablet={4} computer={4} largeScreen={4} widescreen={4} customClass="largeCustom" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.DesignList.status.DesignList,
    dataListAdded: state.DesignList.status.DesignListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignListRequest: (page, sort, categoryLevel1, categoryLevel2, keyword) => {
      return dispatch(GetDesignListRequest(page, sort, categoryLevel1, categoryLevel2, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignListContainer);
