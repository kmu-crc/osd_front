import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "actions/Design";
//import ScrollDesignList from "components/Designs/ScrollDesignList";
import ScrollList from "components/Commons/ScrollList";
import Design from "components/Designs/Design";

class ScrollDesignListContainer extends Component {
  getList = (page) => {
    return this.props.GetDesignListRequest(page, this.props.sort, this.props.cate1, this.props.cate2);
  }

  render() {
    return(
      <div>
        <ScrollList getListRequest={this.getList} ListComponent={Design} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} columns={5}/>
      </div>
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
      GetDesignListRequest: (sort, categoryLevel1, categoryLevel2, page) => {
        return dispatch(GetDesignListRequest(sort, categoryLevel1, categoryLevel2, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignListContainer);
