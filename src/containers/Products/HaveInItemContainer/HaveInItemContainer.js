import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetHaveInItemRequest } from "actions/Product";
import ScrollList from "components/Commons/ScrollList";
import Item from "components/Items/Item";
import styled from "styled-components";
const ScrollBox = styled.div`
    width: 100%;
    height: 100%;
`;
class HaveInItemContainer extends Component {
  componentWillMount() {
    this.props.GetHaveInItemRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetHaveInItemRequest(this.props.id, page);
  }

  render() {
    console.log("test-----",this.props);
    return(
      <ScrollBox>
        <ScrollList
          cols={6} type="item" getListRequest={this.getList} ListComponent={Item}
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />       
      </ScrollBox>

      
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

export default connect(mapStateToProps, mapDispatchToProps)(HaveInItemContainer);
