import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetHaveInGalleryRequest } from "actions/Gallery";
import ScrollList from "components/Commons/ScrollList";
import Gallery from "components/Gallery/Gallery/Gallery";
import ModifyGallery from "components/Gallery/ModifyGallery/ModifyGallery";
import styled from "styled-components";
const ScrollBox = styled.div`
    width: 100%;
    height: 100%;
`;

class HaveInGalleryContainer extends Component {
  componentWillMount() {
    this.props.GetHaveInGalleryRequest(this.props.id, 0);
  }

  getList = (page) => {
    return this.props.GetHaveInGalleryRequest(this.props.id, page);
  }

  render() {
    // console.log(this.props.handlerIsGalleryModify);
    return (
      <ScrollBox>
        <ScrollList
          cols={6} type="gallery" getListRequest={this.getList} ListComponent={this.props.isModify === true ? ModifyGallery : Gallery}
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

export default connect(mapStateToProps, mapDispatchToProps)(HaveInGalleryContainer);
