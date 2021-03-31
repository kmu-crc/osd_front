import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGalleryListDetailRequest } from "actions/Gallery";
import ScrollList from "components/Commons/ScrollList";
import Item_mini from "components/Items/Item_mini";
import styled from "styled-components";
const Wrapper = styled.div`
  width:100%;
  height:100%;
  overflow-y:${props=>props.isScroll?"overlay":"hidden"};
  overflow-x:hidden;
`

class ItemInGalleryContainer extends Component {
  componentWillMount() {
    this.props.GetGalleryListDetailRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetGalleryListDetailRequest(this.props.id, page);
  }

  render() {
    console.log(this.props);
    return(
      <Wrapper isScroll={this.props.dataListAdded.length>4?true:false}>
        <ScrollList
          
          cols={6} type="item" getListRequest={this.getList} ListComponent={Item_mini}
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />
      </Wrapper>

      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GalleryList.status.HaveInGalleryItem,
    dataListAdded: state.GalleryList.status.HaveInGalleryItemAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetGalleryListDetailRequest: (id, page) => {
        return dispatch(GetGalleryListDetailRequest(id, page))
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemInGalleryContainer);
