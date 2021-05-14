import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetHaveInGalleryRequest } from "actions/Gallery";
import ScrollList from "mobileComponents/NoInfiniteScrollList_mobile/NoInfiniteScrollList_mobile";
import Gallery_mobile from "components/Gallery/Gallery_mobile/Gallery_mobile";
import ModifyGallery from "components/Gallery/ModifyGallery/ModifyGallery";
import styled from "styled-components";
const ScrollBox = styled.div`
    min-width:100%;
    height: 100%;
    overflow:overlay;
`;

class HaveInGalleryContainer_mobile extends Component {
  componentWillMount() {
    this.props.GetHaveInGalleryRequest(this.props.id, 0)
    .then(()=>{
      this.props.handleHaveGallery&&this.props.handleHaveGallery(this.props.dataList&&this.props.dataList.length>0?true:false);
    })
  }

  getList = (page) => {
    return this.props.GetHaveInGalleryRequest(this.props.id, page);
  }

  render() {
    return (
      <ScrollBox
      isScroll={this.props.dataListAdded.length>4?true:false}
      >
        <ScrollList
          cols={8} type="gallery" getListRequest={this.getList} ListComponent={Gallery_mobile}
          dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} handler={this.props.handlerIsGalleryModify} /> 
      </ScrollBox>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataList: state.GalleryList.status.HaveInGallery,
    dataListAdded: state.GalleryList.status.HaveInGalleryAdded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetHaveInGalleryRequest: (id, page) => {
      return dispatch(GetHaveInGalleryRequest(id, page))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HaveInGalleryContainer_mobile);
