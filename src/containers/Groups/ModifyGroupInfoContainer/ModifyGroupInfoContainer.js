import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ModifyGroup from "components/Groups/ModifyGroup/ModifyGroup";
import ModifyGroup_mobile from "mobileComponents/ModifyGroup_mobile";
import { UpdateGroupRequest,DeleteGroupRequest } from "actions/Group";
import { GetAllHaveInItemRequest } from "actions/Product"
import { GetGalleryDetailRequest } from "actions/Gallery";
import { GetHaveInGalleryRequest } from "actions/Gallery";
import styled from 'styled-components';
// import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
// import mainSlide from "source/mainSlide.jpg";
// import Modal from 'react-awesome-modal';
import {Modal} from 'semantic-ui-react';
import market_style from "market_style";

const GalleryModal = styled(Modal)`
  max-width:940px !important;
  width:100% !important;
  position: relative;
  z-index:3;
  border-radius:20px !important;
  
  .titleBox{
    display:flex;
    justify-content:space-between;
  }
  .title{
    width:max-content;
    font-family:Noto Sans KR, Medium;
    font-size:${market_style.font.size.normal1};
    font-weight:500;
    color:black;
  }
  .pointer{
    cursor:pointer;
  }
  .hrline{
    width:100%;
    border:1px solid #EFEFEF;
    margin-top:10px;
  }
  .content{
    border-radius:20px !important;
    width:100% !important;
    height:max-content !important;
  }
`
class ModifyGroupInfoContainer extends Component {

  constructor(props){
    super(props);
    this.state = {open:false}
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  async componentDidMount(){
    console.log("?",this.props.id);
    await this.props.GetAllHaveInItemRequest(this.props.userInfo.uid,this.props.userInfo.token)
    .then(this.props.GetGalleryDetailRequest(this.props.id));
  }

  componentWillUpdate(nextProps){
    if(this.props.open!==nextProps.open){
      this.setState({open:nextProps.open})
    }
  }
  async handleShowModal(value){

    this.setState({open:value});
    this.props.handleShowModal(value);
  }

  render() {
    return(
      <React.Fragment>
        {
          window.innerWidth>500?
          <GalleryModal open={this.props.open}>
          <GalleryModal.Content>
          <div className="titleBox">
              <div className="title">갤러리 수정</div>
              </div>
              <div className="hrline"/>
            <ModifyGroup  handleShowModal={this.handleShowModal} handlerIsGalleryModify={this.props.handlerIsGalleryModify}   {...this.props}  />
            </GalleryModal.Content>
        </GalleryModal>
        :
        <GalleryModal open={this.props.open}>
        <GalleryModal.Content>
        <div className="titleBox">
            <div className="title">갤러리 수정</div>
            </div>
            <div className="hrline"/>
          <ModifyGroup_mobile  handleShowModal={this.handleShowModal} handlerIsGalleryModify={this.props.handlerIsGalleryModify}   {...this.props}  />
          </GalleryModal.Content>
      </GalleryModal>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    dataList: state.ItemDetail.status.AllHaveInItem,
    galleryDetail: state.GalleryDetail.status.galleryDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      UpdateGroupRequest: (id, data, token) => {
        return dispatch(UpdateGroupRequest(id, data, token))
      },
      DeleteGroupRequest: (id, token) => {
        return dispatch(DeleteGroupRequest(id, token))
      },
      GetAllHaveInItemRequest: (id, token) => {
        return dispatch(GetAllHaveInItemRequest(id,token))
      },
      GetGalleryDetailRequest: (id) => {
        return dispatch(GetGalleryDetailRequest(id))
      },
      GetHaveInGalleryRequest: (id, page) => {
        return dispatch(GetHaveInGalleryRequest(id,page))
      },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModifyGroupInfoContainer));
