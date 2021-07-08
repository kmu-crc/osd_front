import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "actions/Design";
import Item_mobile from "components/Items/Item_mobile";
import styled from "styled-components";
import ScrollList_mobile from "mobileComponents/ScrollList_mobile";
const Wrapper = styled.div`
  width:100%;
  display:flex;
  margin-left:8px;
`
class ScrollProductListContainer_mobile extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.sort !== prevProps.sort || this.props.cate1 !== prevProps.cate1 || this.props.cate2 !== prevProps.cate2 || this.props.cate3 !== prevProps.cate3 || this.props.keyword !== prevProps.keyword) {
      this.getList(0);
    }
  }
  componentWillMount() {
    this.getList(0);
  }
  getList = (page) => {
    return this.props.GetDesignListRequest(page, this.props.sort, this.props.cate1, this.props.cate2, this.props.cate3, this.props.keyword);
  }
  render() {
    return (
      <React.Fragment>
        <Wrapper isSearch={this.props.isSearch}>
          <ScrollList_mobile
            type="item"
            getListRequest={this.getList}
            ListComponent={Item_mobile}
            dataList={this.props.dataList}
            dataListAdded={this.props.dataListAdded}
          />
        </Wrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.DesignList.status.DesignList,
    dataListAdded: state.DesignList.status.DesignListAdded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetDesignListRequest: (page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword) => {
      return dispatch(GetDesignListRequest(page, sort, categoryLevel1, categoryLevel2, categoryLevel3, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollProductListContainer_mobile);
