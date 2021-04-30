import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetHaveInItemRequest } from "actions/Product";
import ScrollList from "components/Commons/ScrollList";
import Item_mini from "components/Items/Item_mini";
import styled from "styled-components";
const ScrollBox = styled.div`
    min-width:103%;
    height: 100%;

    // overflow:${props=>props.isScroll?"overlay":"hidden"};
    overflow:overlay;
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
      <ScrollBox
      isScroll={this.props.dataListAdded.length>4?true:false}
      >
        <ScrollList
          cols={8} type="item" getListRequest={this.getList} ListComponent={Item_mini}
          isMini={true} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />       
        
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
