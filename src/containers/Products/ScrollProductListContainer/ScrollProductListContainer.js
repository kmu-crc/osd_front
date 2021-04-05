import React, { Component } from "react";
import { connect } from "react-redux";
import { GetDesignListRequest } from "actions/Design";
import ScrollList from "components/Commons/ScrollList";
import Item from "components/Items/Item";
import Item_small from "components/Items/Item_small";
import styled from "styled-components";
// import Design from "components/Designs/Design";
const Wrapper = styled.div`
  width:100%;
  display:flex;
  // justify-content:center;
  padding-left:${props=>props.isSearch==null?"8px":"10px"};
`
class ScrollDesignListContainer extends Component {
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
          <ScrollList
            type="item"
            isSmall={this.props.isSmall}
            getListRequest={this.getList}
            ListComponent={this.props.isSmall == true ? Item_small : Item}
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
    GetDesignListRequest: (page, sort, categoryLevel1, categoryLevel2, keyword) => {
      return dispatch(GetDesignListRequest(page, sort, categoryLevel1, categoryLevel2, keyword))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollDesignListContainer);
