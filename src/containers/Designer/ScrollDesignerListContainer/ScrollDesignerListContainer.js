import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerListRequest } from "actions/Designer";
import ScrollList from "components/Commons/ScrollList";
import Expert from "components/Experts/Expert";
import Expert_small from "components/Experts/Expert_small";

class ScrollDesignerListContainer extends Component {
  async componentDidMount() {
    await this.props.GetDesignerListRequest(0, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }

  getList = (page) => {
    return this.props.GetDesignerListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.keyword);
  }

  render() {
    return (
      <ScrollList getListRequest={this.getList}
        isSmall={this.props.isSmall}
        ListComponent={this.props.isSmall==true?Expert_small:Expert}
        type="designer"
        dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.DesignerList.status.DesignerList,
    dataListAdded: state.DesignerList.status.DesignerListAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignerListRequest: (page, sort, categoryLevel1, categoryLevel2, keyword) => {
      return dispatch(GetDesignerListRequest(page, sort, categoryLevel1, categoryLevel2, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignerListContainer);
