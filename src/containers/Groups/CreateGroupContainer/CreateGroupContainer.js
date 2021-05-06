import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CreateGroup from "components/Groups/CreateGroup";
import { CreateNewGroupRequest } from "actions/Group";
import { GetAllHaveInItemRequest } from "actions/Product";
import { GetHaveInGalleryRequest } from "actions/Gallery";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
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
class CreateGroupContainer extends Component {
  constructor(props){
    super(props);
    this.state = {open:false}
    this.handleShowModal = this.handleShowModal.bind(this);
}
  componentDidMount(){
    this.props.GetAllHaveInItemRequest(this.props.userInfo.uid,this.props.userInfo.token)
  }
  componentWillUpdate(nextProps){
    if(this.props.open!==nextProps.open){
      this.setState({open:nextProps.open})
    }
  }
  handleShowModal(value){
    this.setState({open:value});
    this.props.handleShowModal(value);
  }
  render() {
    return(
      <GalleryModal open={this.props.open}>
        <GalleryModal.Content>
        <div className="titleBox">
            <div className="title">갤러리 등록</div>
            {/* <div className="title pointer" onClick={()=>{this.handleShowModal(false)}}>x</div> */}
          </div>
        <div className="hrline"/>
          <CreateGroup handleShowModal={this.handleShowModal}   {...this.props} />
        </GalleryModal.Content>
      </GalleryModal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.Authentication.status.token,
    userInfo: state.Authentication.status.userInfo,
    dataList: state.ItemDetail.status.AllHaveInItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateNewGroupRequest: (data, token) => {
        return dispatch(CreateNewGroupRequest(data, token))
      },
      GetAllHaveInItemRequest: (id, token) => {
        return dispatch(GetAllHaveInItemRequest(id,token))
      },
      GetHaveInGalleryRequest: (id, page) => {
        return dispatch(GetHaveInGalleryRequest(id,page))
      },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGroupContainer));
