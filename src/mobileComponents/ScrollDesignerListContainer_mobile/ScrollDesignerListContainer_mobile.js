import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignerListRequest } from "actions/Designer";
import ScrollList_mobile from "mobileComponents/ScrollList_mobile";
import Expert_mobile_big from "components/Experts/Expert_mobile_big";
import styled from "styled-components";

const Wrapper = styled.div`
  width:100%;
  display:flex;
  margin-left:8px;
`

class ScrollDesignerListContainer_mobile
 extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.sort !== prevProps.sort || this.props.cate1 !== prevProps.cate1 || this.props.cate2 !== prevProps.cate2 || this.props.cate3 !== prevProps.cate3 || this.props.keyword !== prevProps.keyword) {
      this.getList(0);
    }
  }
  componentWillMount() {
    this.getList(0);
  }
  getList = (page) => {
    return this.props.GetDesignerListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.cate3, this.props.keyword);
  }

  render() {
    return (
      <Wrapper>
      <ScrollList_mobile
        getListRequest={this.getList}
        ListComponent={Expert_mobile_big}
        type="designer"
        dataList={this.props.dataList} dataListAdded={this.props.dataListAdded}
      />
      </Wrapper>
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
    GetDesignerListRequest: (page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword) => {
      return dispatch(GetDesignerListRequest(page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignerListContainer_mobile);
