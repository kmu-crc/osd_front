import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGalleryDetailRequest } from "actions/Gallery";
// import GroupDetail from "components/Groups/GroupDetail";
import GalleryDetail from "components/Gallery/GalleryDetail/GalleryDetail";

class GalleryDetailContainer extends Component {
  componentDidMount(){
    this.props.GetGalleryDetailRequest(this.props.id)
  }
  render() {
    return(
      <GalleryDetail {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    galleryDetail: state.GalleryDetail.status.galleryDetail,
    userInfo: state.Authentication.status.userInfo,
    token: state.Authentication.status.token,
    dataList: state.ItemDetail.status.AllHaveInItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    GetGalleryDetailRequest: (id) => {
        return dispatch(GetGalleryDetailRequest(id))
      },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryDetailContainer);
