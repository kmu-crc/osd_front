import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import ModifyGorup from "components/Groups/ModifyGroup/ModifyGroup";
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
  width:940px !important;
  padding:0px 0px 0px 25px !important; 
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
    width:max-content !important;
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
      <GalleryModal open={this.props.open}>
        <GalleryModal.Content>
        <div className="titleBox">
            <div className="title">갤러리 등록</div>
            {/* <div className="title pointer" onClick={()=>{this.handleShowModal(false)}}>x</div> */}
            </div>
            <div className="hrline"/>
          <ModifyGorup  handleShowModal={this.handleShowModal} handlerIsGalleryModify={this.props.handlerIsGalleryModify}   {...this.props}  />
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

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { GetGroupDetailRequest, UpdateGroupRequest } from "actions/Group";
// import ModifyGroupInfo from "components/Groups/ModifyGroupInfo";

// class ModifyGroupInfoContainer extends Component {
//   state = {
//     isAuthor: false
//   }
//   componentDidMount() {
//     this.props.GetGroupDetailRequest(this.props.id, this.props.token)
//       .then(() => {
//         if (this.props.userInfo.uid !== this.props.GroupDetail.user_id) {
//           alert("이 그룹에 대한 수정권한이 없습니다. 이전페이지로 돌아갑니다.")
//           this.props.history.go(-1)
//         } else { this.setState({ isAuthor: true }) }
//       })
//   }

//   render() {
//     return (
//       <div>
//         {this.state.isAuthor ? (
//           <ModifyGroupInfo {...this.props} />
//         ) : (
//             <p style={{ color: "#FFF" }}>수정권한을 확인 중 입니다.</p>
//           )}
//       </div>
//     )
//   }
// }


// const mapStateToProps = (state) => {
//   return {
//     token: state.Authentication.status.token,
//     GroupDetail: state.GroupDetail.status.GroupDetail,
//     userInfo: state.Authentication.status.userInfo
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     GetGroupDetailRequest: (id) => {
//       return dispatch(GetGroupDetailRequest(id))
//     },
//     UpdateGroupRequest: (id, data, token) => {
//       return dispatch(UpdateGroupRequest(id, data, token))
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ModifyGroupInfoContainer);
