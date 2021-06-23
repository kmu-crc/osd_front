import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetGalleryDetailRequest } from "actions/Gallery";
// import GroupDetail from "components/Groups/GroupDetail";
import GalleryDetail from "components/Gallery/GalleryDetail/GalleryDetail";
import GalleryDetail_mobile from "mobileComponents/GalleryDetail_mobile";
import styled from "styled-components";
const Wrapper = styled.div`
  margin:20px 30px
`
const Wrapper_mobile = styled.div`
  margin:0px 10px;
`
class GalleryDetailContainer extends Component {
  componentDidMount(){
    this.props.GetGalleryDetailRequest(this.props.id)
  }
  render() {
    return(
      <React.Fragment>
        {
          window.innerWidth>=500?
          <Wrapper>
          <GalleryDetail {...this.props}/>
          </Wrapper>
          :
          <Wrapper_mobile>
          <GalleryDetail_mobile {...this.props}/>
          </Wrapper_mobile>
        
        }
      </React.Fragment>
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
