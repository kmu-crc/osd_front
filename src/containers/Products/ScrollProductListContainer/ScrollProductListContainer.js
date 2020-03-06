import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "actions/Design";
import ScrollList from "components/Commons/ScrollList";
import Item from "components/Items/Item";
// import Design from "components/Designs/Design";

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
        <ScrollList
          type="item"
          getListRequest={this.getList}
          ListComponent={Item}
          dataList={this.props.dataList}
          dataListAdded={this.props.dataListAdded}
          />
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
