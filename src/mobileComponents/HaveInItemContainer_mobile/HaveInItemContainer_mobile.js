import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetHaveInItemRequest } from "actions/Product";
import ScrollList from "mobileComponents/NoInfiniteScrollList_mobile/NoInfiniteScrollList_mobile";
import Item_mobile from "components/Items/Item_mobile";
import styled from "styled-components";
const ScrollBox = styled.div`
    min-width:100%;
    height: 100%;
    overflow:overlay;
    // border:1px solid black;
`;
class HaveInItemContainer_mobile extends Component {
  componentWillMount() {
    this.props.GetHaveInItemRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetHaveInItemRequest(this.props.id, page);
  }

  render() {
    return(
        <ScrollList
          cols={8} type="item" getListRequest={this.getList} ListComponent={Item_mobile}
          isMini={true} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />       
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.ItemDetail.status.HaveInItem,
    dataListAdded: state.ItemDetail.status.HaveInItemAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetHaveInItemRequest: (id, page) => {
        return dispatch(GetHaveInItemRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HaveInItemContainer_mobile);
