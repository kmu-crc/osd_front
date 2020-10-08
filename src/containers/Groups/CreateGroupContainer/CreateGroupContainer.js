import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CreateGroup from "components/Groups/CreateGroup";
import { CreateNewGroupRequest } from "actions/Group";
import { GetAllHaveInItemRequest } from "actions/Product";
import { GetHaveInGalleryRequest } from "actions/Gallery";
import styled from 'styled-components';
// import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
// import mainSlide from "source/mainSlide.jpg";
import {Modal} from 'semantic-ui-react';


//const ImgWrapper = styled.div`
//  background-image: url(${mainSlide});
//  background-position: center;
//  background-size: cover;
//  width: 100%;
//  height: 200px;
//  position: relative;
//  &::after {
//    position: absolute;
//    top: 0;
//    left: 0;
//    display: block;
//    content: "";
//    width: 100%;
//    height: 100%;
//    background-color: rgba(0, 0, 0, 0.6);
//    z-index: 1;
//  }
//`;
//
//const Title = styled.div`
//  width: 100%;
//  color: white;
//  position: absolute;
//  text-align: center;
//  top: 40%;
//  left: 0;
//  z-index: 2;
//  transform: translateY(-50%);
//  h1 {
//    color: ${StyleGuide.color.geyScale.scale0};
//    font-size: ${StyleGuide.font.size.heading2};
//    font-weight: bold;
//  }
//`;

const Wrapper = styled(ContentBox)`
  width:100%;
  position: relative;
  z-index:3;
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
      // <Modal style={{width:"max-content"}} onLoad open={this.props.open} effect="fadeInLeft">
      <Modal style={{width:"max-content"}} open={this.props.open}>

        <Wrapper>
          <CreateGroup handleShowModal={this.handleShowModal}   {...this.props} />
        </Wrapper>
      </Modal>
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
