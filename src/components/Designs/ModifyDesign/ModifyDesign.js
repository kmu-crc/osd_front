import React, { Component } from "react";
// import GridEditor from "components/Designs/GridEditor";
import DesignDetailStepContainer from "containers/Designs/DesignDetailStepContainer"
import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer";

import styled from "styled-components";
import { geturl } from "config";
import noimg from "source/noimg.png"
import forked from "source/forked.svg";
import noface from "source/thumbnail.png";
// import iDelete from "source/deleteItem.png"
import Cross from "components/Commons/Cross";
import Loading from "components/Commons/Loading";
import { Dropdown, Modal } from "semantic-ui-react";
import Logo from "source/logo.png"
import CheckBox2 from "components/Commons/CheckBox";
import DesignDetailViewContainer from "containers/Designs/DesignDetailViewContainer";
import ReactCrop from 'react-image-crop';
// import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";

import new_logo_view from "source/new_logo_view.svg";
import new_logo_favorite from "source/new_logo_favorite.svg";
import new_logo_share from "source/new_logo_share.svg";
import new_logo_plus from "source/new_logo_plus.png"
import osdcss from "opendesign_style";

const Section = styled.div`
  display:${props => props.isNone == true ? props.isLast == null ? "flex" : "flex" : "none"};
  @media only screen and (min-width : 500px) and (max-width:1700px) {
    display:${props => props.isNone == true ? props.isLast == null ? "block" : "block" : "none"};;
  }
`
const LoadingBox = styled.div`
  padding-top: 200px;
  .IconBox {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
  .loadingText{
    margin-top: 20px;
    width: 100%;
    font-family: Noto Sans KR;
    font-size: 20px;
    text-align: center;
  }
`;
const LoadingIconBox = styled.div`
  width:100px;
  height:100px;
  margin:0 auto;
  background: ${props => `url(${props.imageURL})`};
  background-position:center center;
  background-repeat:no-repeat;
  -webkit-animation: jello-horizontal 0.9s infinite both;
            animation: jello-horizontal 0.9s infinite both;
  
  @-webkit-keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
              transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
              transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
              transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
              transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
              transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
  }
  @keyframes jello-horizontal {
    0% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
              transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
              transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
              transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
              transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
              transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      -webkit-transform: scale3d(1, 1, 1);
              transform: scale3d(1, 1, 1);
    }
  }
`;
const CropperDialog = styled(Modal)`
  max-width: ${props => props.ratio < 1.0 ? 450 : 650}px;
  // height: ${props => props.ratio < 1.0 ? 650 : 450}px;
  height: max-content;
  padding:20px;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0px 3px 6px #FF0000;
  .imagebox{

  }
  .edit-step-name-button-container {
    display: flex;
    width: 576px;
    margin-left: auto;
    margin-right: 75px;
    margin-top: 38px;
  }
`;
const CustomButton = styled.div`
  cursor: pointer;
  width: 86px;
  min-width: 86px;
  height: 49px;
  background-color: ${props => props.isComplete ? "#FF0000" : "#8D8D8D"}; 
  display:flex;
  justify-content:center;
  align-items:center;
  margin-left:34px;
  cursor:pointer;
  `;
const BtnText = styled.p`
  font-family:Spoqa Han Sans Neo;
  font-weight:Medium;
  font-size:28px;
  color:white;
`;
const PeerBox = styled.div`
  display: flex;
  margin-right: 25px;
  margin-bottom: 10px;
  .nameLabel{
    width: max-content;
    height: 29px;
    margin-top: 1px;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 500;
    font-family: Noto Sans KR;
    color: #707070;
    text-align: left;
    line-height: 29px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .closeButton{
    margin-top: 7px;
    margin-left: 14px;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    margin-right: 15px;
  }
`;
const PeerIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => `url(${props.imageURL})`};
  background-size: cover;
  background-position: center center;
`;
const InviteMemberListBox = styled.div`
  width:645px;
  height:200px;
  margin-left:191px;
  padding-top:50px;
  overflow-y:auto;
  .memberList{
  display:flex;
  flex-wrap:wrap;
  flex-direction:row;
  }
`;
const IsProblemBox = styled.div`
  margin-top:50px;
  display:flex;
  justify-content:flex-start;
  align-items:flex-start;
  font-size: 22px;
  font-family: Spoqa Han Sans;
  height:45px;

  .textLabel {
    vertical-align: top;
    padding-top:5px;
    padding-left:10px;
   }
`
const Wrapper = styled.div`
  width:100%;
  display:flex;
  margin-bottom:150px;
  // flex-wrap:wrap;
  .maxFlex{
    display:flex;
    width:100%;
    align-items:center;
  }
  .category_wrapper{
    display:flex;
    flex-wrap:wrap;
    max-width:1200px;
    width:100%;
  }
  .flex{
    max-width:800px;
    display:flex;
    flex-wrap:wrap;
  }
  .flex2{
    max-width:1200px;
    width:100%;
  }
  .navi_menu{
    
    width:264px;
    height:100%;
    padding:36px 38px;
    display:flex;
    flex-direction:column;
    align-items:center;

    .navi_header{
      min-width:max-content;
      width:187px;
      height:40px;
      margin-bottom:32px;
      font-family:Spoqa Han Sans Neo;
      font-weight:500;
      font-size:28px;
      text-align:center;
    }
    .navi_label{
      min-width:max-content;
      width:187px;
      min-height:84px;
      display:flex;
      justify-content:center;
      align-items:center;
      font-family:Spoqa Han Sans Neo;
      font-size:28px;
      cursor:pointer;
    }
    .red{color:red;}
    .black{color:black;}
    .select{color:#1262AB;}
    .delete{margin-top:531px;}
    .borderBottom{border-bottom:2px solid #707070;}
  }
  .vLine{
    border:1px solid #CCCCCC;
    margin:53px 0px;
    height:871px;
  }
  .summary{
    padding:45px 77px;
  }
  .completeButton{
    width:100%;
    height:94px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:black;
    font-family:Spoqa Han Sans Neo;
    font-size:28px;
    border:1px solid #eaeaea;
    box-shadow: 8px 8px 8px #0000002B;
    margin-top:61px;
    cursor:pointer;
  }
  .marginRight1{margin-right:51px;}
  .marginRight2{margin-right:0px;}
  .flex_board{
    display:flex;
  }
  .board{
    max-width:1248px;
    min-width:1000px;
    width:100%;
    height:max-content;
    padding:56px 72px 0px 72px;
    .board_label{
      width:max-content;
      min-width:195px;
      display:flex;
      align-items:center;
      height:40px;
      font-family:Spoqa Han Sans Neo;
      font-weight:Medium;
      font-size:28px;
    }
    .guide{
      font-size:20px;
      font-family:Spoqa Han Sans Neo;
      line-height:28px;
      color:#707070;
    }
    .board_box{
      width:100%;
      padding-left:40px;
      display:flex;
    }
    .column{flex-direction:column;}
    .paddingLeft1{padding-left:200px;}
    .buttonBox{
      display:flex;
      justify-content:flex-end;
      align-items:center;
      margin-top:26px;
    }
  }
  .grid_wrapper{
    min-width:1000px;
    width:100%;
    max-width:1566px;
    padding-left:50px;
    display:flex;
    flex-direction:column;
    .grid_buttonWrap{
      display:flex;
      justify-content:flex-end;
      width:100%;
      .button{cursor:pointer;width:86px;height:49px;display:flex;justify-content:center;align-items:center;color:white;font-size:28px;font-family:Spoqa Han Sans Neo;}
      .grey{background-color:#8D8D8D;}
      .red{background-color:red;}
    }
  }
  .board_Grid{
    max-width:1566px;
    width:96%;
    height:max-content;
  }
  .addImg{
    width:290px;
    height:290px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#E9E9E9;
    margin-bottom:20px;
    margin-top:10px;
    object-fit:cover;
    .plus{
      width:100px;
      height:100px;
      object-fit:fit;
    }
  }
  .sub{
    height:40px;
    color:red;
  }
  .licenseItem {
    margin-bottom: 46px;
    color: #707070;
    font-size: 22px;
    font-weight: 300;
    font-family: Spoqa Han Sans;
   .textLabel {
    margin-left: 35px;
    vertical-align: top;
   }
  }
  .row{
    width:100%;
    display:flex;
  }
  .imageBox{
    width:290px;
    height:290px;
    background-color:#E9E9E9;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .imageLabel{
    margin-left:38px;
    padding-top:10px;
    .findThumbnailText{
      cursor:pointer;
      font-size:30px;
      font-family:Spoqa Han Sans Neo;
      font-weight:Regular;
      color:red;
    }
    .thumbnailExplainText{
      font-size:22px;
      font-family:Spoqa Han Sans;
      font-weight:Regular;
      color:#707070;
      margin-top:15px;
      line-height:33px;
    }
  }
  .dropdown{
    width:228px;
    min-height:41px !important;
    max-height:41px !important;
    padding:0px 20px !important;
    display:flex !important;
    align-items:center !important;
    justify-content:space-between !important;
    border-radius:0px !important;
  }
  .messageBubble{
    width:100%;
    display:none;
    .quest{
      min-width:20px;
      min-height:20px;
      max-width:20px;
      max-height:20px;
      font-size:15px;
      font-family:Noto Sans KR;
      font-weight:400;
      border-radius:50%;
      background-color:red;
      color:white;
      display:flex;
      justify-content:center;
      align-items:center;
    }
  }
  @media only screen and (min-width : 500px) and (max-width:1700px) {
    display:flex;
    flex-direction:column;
    align-items:center;
    .board{
      padding-left:auto;
      padding-right:auto;
    }
    .grid_wrapper{
      padding-left:0px;
      padding-left:auto;
      padding-right:auto;
    }
    .vLine{
      width:96%;
      min-width:1000px;
      margin:0;
      margin-left:auto;
      margin-right:auto;
      height:0px;
      border-bottom:1px solid #CCCCCC;
      margin-top:60px;

    }
    .navi_menu{
      min-width:1000px;
      width:100%;
      height:100px;
      display:flex;
      flex-direction:row;
      align-items:center;
      flex-wrap:wrap;
      justify-content:center;
      .navi_header{
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
      }
      .navi_label{
        min-height:40px;
      }
      .borderBottom{border:none;}
      .delete{margin:0;margin-left:50px;}
    }
    .messageBubble{
      display:flex;
    }
  }

`

const ContentWrapper = styled.div`
  max-width:1566px;
  width:100%;
  
  // display:flex;
  padding-bottom:100px;
  .formWrap{
    max-width:1248px;
    width:100%;
  }
  .buttonWrap{
    min-height:920px;
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
    width:250px;
    .button{cursor:pointer;width:86px;height:49px;display:flex;justify-content:center;align-items:center;color:white;font-size:28px;font-family:Spoqa Han Sans Neo;}
    .grey{background-color:#8D8D8D;}
    .red{background-color:red;}
  }
  @media only screen and (min-width : 500px) and (max-width:1700px) {
    .buttonWrap{
      padding-right:30px;
      width:100%;
      min-width:1000px;
      height:max-content;
      min-height:max-content;
      margin-top:30px;
    }
  }
`
const QuestionGuide = styled.div`
  width:35px;
  height:35px;
  background-color:red;
  border-radius:50%;
  color:white;
  font-size: 30px;
  font-weight: 800;
  font-family: Spoqa Han Sans;
  display:flex;
  justify-content:center;
  align-items:center;
  padding-top:4px;
  margin-left:10px;
  position:relative;
  cursor:default;
  .messageBubble{
    width:${props => props.bubbleSize}px;
    font: normal normal normal 20px/27px Noto Sans KR;
    letter-spacing: 0px;
    line-height:25px;
    color:#707070;
    font-weight:400;
    padding:10px;
    position:absolute;
    left:${props => props.left}px;
    top:${props => props.top}px;

    z-index:888;

    display:block;
  }
  @media only screen and (min-width : 500px) and (max-width:1700px) {
    display:none;
    .messageBubble{
      display:none;
    }
  }
`
const DesignCard = styled.div`
  *{
    font-family:Spoqa Han Sans Neo;
    color:black;
  }
  width:360px;
  height:525px;
  box-shadow: 8px 8px 8px #4141411A;
  border: 0.5px solid #eaeaea;

  .thumbnail{
    width:100%;
    height:333px;
    border: 0.5px solid #eaeaea;
  }
  .info{
    width:100%;
    padding:21px 23px 31px 23px;
  }
  .spaceBetween{
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:7px;
  }
  .title{
    font-size:37px;
    font-weight:600;
    height:49px;
    display:flex;
    align-items:center;
  }
  .date{
    color:#707070;
    font-size:17px;
  }
  .designer{
    font-size:16px;
  }

  .asset_wrapper{
    width:100%;
    height:30px;
    display:flex;
    align-items:center;
    margin-top:31px;
    .asset_icon{
      width:27px;
      height27px;
      object-fit:cover;
    }
    .asset_text{
      min-width:70px;
      font-size:18px;
      padding-left:10px;
    }
  }
`
const InputText = styled.input`
  width:880px;
  height:51px;
  background-color:#E9E9E9;
  padding:5px 20px;
  outline:none;
  border:none;
  resize:none;
  // margin-left:30px;
  margin-top:12px;
  font-size:22px;
`
const InputTextArea = styled.textarea`
  width:880px;
  height:323px;
  background-color:#E9E9E9;
  padding:20px;
  outline:none;
  border:none;
  resize:none;
  // margin-left:30px;
  margin-top:24px;
  font-size:22px;
`
const CategoryDropDown = styled(Dropdown)`
  max-width:309px;
  height:41px !important;     
  font-family:Spoqa Han Sans,Regular;
  font-size:22px;
  background-color:#8E8E8E !important;
  margin-right:68px;
  margin-top:10px;
  margin-bottom:10px;
  .text{
    color:white !important;
  }
  .item{
    background-color:#8e8e8e !important;
  }

`;
const ResetButtonWrapper = styled.div`
  width: max-content;
  margin-left: auto;
  margin-right: 25px;
  color: #707070;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
`;
const DelBtn = styled.button`
  display: none;
  position: absolute;
  top: 0;
  left: 95%;
  transform: translate(-50%, -50%);
  border: 0;
  padding: 0;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  line-height: 25px;
  box-sizing: border-box;
  font-size: 12px;
  background-color: ${osdcss.color.main.basic};
  color: white;
  text-align: center;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  outline: 0;
  i.icon {
    margin: 0;
  }
  &:focus .subMenu {
    display: block;
  }
`;
const DesignTemplateSelector = styled.div`
  max-width:100%;
  width:100%;
  .title {
    width: max-content;
    margin: auto;
    color: #707070;
    padding: 10px 5px;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 2rem;
  }
  .template-wrapper {
    display: flex;
    justify-content:center;
    overflow: auto;
  }
  .element {
    min-width: 200px;
    margin: 5px;
    border: 2px solid #EFEFEF;
    padding: 5px;
    :hover{
      border: 2px solid #777777;
    }
  }
`;
const DesignElement = styled.div`
  *{
    cursor:pointer;
  }
  position: relative;
  cursor: pointer;
  color: white;
  font-size: 20px;
  font-family: "Noto Sans KR";
  z-index: 700;
  border-radius: 15px;
  // background-size: cover;
  img{
    max-width: 100%;
    max-height: 100%;
    // background-repeat: no-repeat;
    background-position: center center;
    background-image: url(${props => props.img});
  }
  
  .cover {
    // cursor: default;
    z-index: 701;
    position: absolute;
    border-radius: 15px;
    background-image: linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(32,32,32, 0.7)100%); 
    width: 330px;
    height: 330px;
  }

  .innerbox {
    z-index: 703;
    position: absolute;
    width: 274.08px;
    color: #FFFFFF;
    line-height: 40px;
    height: 35px;
    font-family: Noto Sans KR;
    margin-left: 25px;
    margin-top: 201px;
    .design-title {
      font-size: 20px;
      font-weight: 700;
      text-shadow:2px 2px 6px gray;
      display: flex;
      justify-content: space-between;
    }
    .update-time { 
      margin-top: 5px;
      font-weight: 300;
      border: 1px solid red;
      width: max-content;
      height: 25px;
      font-size: 17px;
      font-family: Noto Sans KR;
      text-shadow:2px 2px 6px gray;
      line-height: 25px;
      text-align: right;
      // cursor: default;
    }
    .user-name {
      font-size: 20px;
      font-weight: 300;
      text-shadow:2px 2px 6px gray;
      // cursor: default;
    }  
    .user-update-wrapper {
      width: 285px;
      display: flex;
      justify-content: space-between;
    }
  }

  .counter {
    z-index: 703;
    position: absolute;
    left: 24.92px;
    top: 286px;
    display: flex;
    justify-content: space-start;
    width: 291px;
    height: 22px;
    text-align: left;
    line-height: 40px;
    font-size: 15px;
    font-weight: 500;
    align-items: center;
  }
  .view {
    z-index: 703;
    margin-right: 4.25px;
  }
  .view-count {
    z-index: 703;
    margin-right: 6px;
    // cursor: default;
  }
  .like {
    z-index: 703;
    margin-right: 4px;
    img{
      width: 13px;
      height: 13px;
    }
  } 
  .like-count {
    z-index: 703;
    margin-right: 6px;
    // cursor: default;
  }
  .fork {
    z-index: 703;
    margin-right: 4px;
    img {
      width: 22px;
      height: 11px;
    }
  }
  .fork-count {
    z-index: 703;
    margin-right: 0px;
    // cursor: default;
  }
`;
const EditorWrapper = styled.div`
  max-width:853px;
  width:100%;
  .title {
    width: 100%;
    text-align:center;
    margin: auto;
    color: #707070;
    padding: 10px 5px;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 2rem;
  }
  .editor{
    opacity: .75;
    overflow: auto;
  }
`;
const designImageText =
  "디자인 이미지";
const emptyCategory = [
  { value: 0, text: "" }];
const scrollmenu = [
  { step: 0, txt: "기본 정보" },
  { step: 1, txt: "부가 정보" },
  { step: 2, txt: "컨텐츠 정보" }];


function Peer(props) {
  return (<div style={{ cursor: "pointer", display: "flex", marginRight: "50px", marginTop: "10px" }}>
    <div style={{ backgroundSize: "cover", backgroundPosition: "center", backgroundImage: `url(${props.s_img || noface})`, backgroundColor: "#D6D6D6", width: "30px", height: "30px", borderRadius: "50%" }} />
    <div style={{ marginTop: "1px", marginLeft: "10px", fontSize: "20px", lineHeight: "29px", textAlign: "left", fontWeight: "500", fontFamily: "Noto Sans KR", color: "#707070", width: "max-content", height: "29px" }}>{props.nick_name}</div>
    <div style={{ marginTop: "7.34px", marginLeft: "13.86px" }}><Cross angle={45} color={"#707070"} weight={3} width={16} height={16} /></div>
  </div>)
};

class ModifyDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      loading: false, designId: null, isMyDesign: false, editor: false, is_problem: false,
      basic: false, additional: false, content: false, step: 0, title: "", explanation: "",
      showSearch: false, thumbnail: noimg, thumbnail_name: "", grid: false,
      categoryLevel1: null, categoryLevel2: null, alone: false, members: [], addmem: [], delmem: [], license1: true, license2: false, license3: false,
    }
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.onCheckIsProblem = this.onCheckIsProblem.bind(this);
    this.onCheckedLicense01 = this.onCheckedLicense01.bind(this);
    this.onCheckedLicense02 = this.onCheckedLicense02.bind(this);
    this.onCheckedLicense03 = this.onCheckedLicense03.bind(this);
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.onChangeCategory3 = this.onChangeCategory3.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.onKeyDownEnter = this.onKeyDownEnter.bind(this);
    this.cancelDeleteDesign = this.cancelDeleteDesign.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.DesignDetail !== nextProps.DesignDetail) {
      //console.log("img", nextProps.DesignDetail.img);
      this.setState({
        thumbnail: nextProps.DesignDetail.img == null ? noimg : nextProps.DesignDetail.img.m_img,
        title: nextProps.DesignDetail.title,
        explanation: nextProps.DesignDetail.explanation,
        categoryLevel1: nextProps.DesignDetail.category_level1,
        categoryLevel2: nextProps.DesignDetail.category_level2,
        categoryLevel3: nextProps.DesignDetail.category_level3,
        members: nextProps.DesignDetail.member && nextProps.DesignDetail.member.filter((mem) => { return mem.user_id !== this.props.userInfo.uid }),
        license1: nextProps.DesignDetail.is_commercial,
        license2: nextProps.DesignDetail.is_display_creater,
        license3: nextProps.DesignDetail.is_modify,
        is_problem: nextProps.DesignDetail.is_problem,
      })
    }
    return true;
  }
  componentDidMount() {
    this.props.GetDesignDetailRequest(this.props.id, this.props.token)
      .then(() => {
        this.props.GetDesignBoardRequest(this.props.id)
      })
    this.setState({ content: true, designId: this.props.id, grid: true, loading: false });
  }
  handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name })
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
  }
  onChangeValueThumbnail = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
      await this.setState(obj);
    }
    this.checkFinishBasic();
  };
  onChangeValueTitle = async event => {
    if (event.target) {
      await this.setState({ title: event.target.value });
    }
    this.checkFinishBasic();
  };
  onChangeValueExplanation = async event => {
    if (event.target) {
      await this.setState({ explanation: event.target.value });
    }
    this.checkFinishBasic();
  };
  onKeyDownEnter(event) {
    if (event.key === "Enter") {
      document.getElementById("explainBox").focus();
    }

  }
  onKeyPress = () => {
    this.checkFinishBasic();
  }
  gotoPrevStep = () => {
    this.setState({ step: this.state.step - 1 });
  }
  gotoNextStep = () => {
    this.setState({ step: this.state.step + 1 });
  }
  gotoStep = (menu) => {
    if (this.state.basic) { };
    this.setState({ step: menu.step });
  }
  checkFinishBasic = async () => {
    const { title, thumbnail, } = this.state;
    if (title && title.length > 0 && thumbnail && thumbnail.img) {
      await this.setState({ basic: true });
    } else {
      await this.setState({ basic: false });
    }
  }
  checkFinishAdditional = async () => {
    const { categoryLevel1, alone, members, license1, license2, license3 } = this.state;
    if (categoryLevel1 != null && ((alone && members.length === 0) || (!alone && members.length > 0))) {
      await this.setState({ additional: true });
    } else {
      await this.setState({ additional: false });
    }
  }
  submit = () => {
    const data = {
      user_id: this.props.DesignDetail.user_id,
      category_level1: this.state.categoryLevel1, category_level2: this.state.categoryLevel2, category_level3: this.state.categoryLevel3,
      title: this.state.title, explanation: this.state.explanation,
      files: [{ value: this.state.thumbnail, name: this.state.thumbnail_name, key: "thumbnail[]" }],
      members: { add: this.state.addmem, del: this.state.delmem },
      is_commercial: this.state.license1 ? 1 : 0, is_display_creater: this.state.license2 ? 1 : 0, is_modify: this.state.license3 ? 1 : 0, is_problem: this.state.is_problem ? 1 : 0
    };
    if (data.files.length <= 0 || data.files[0].value === this.props.DesignDetail.img.m_img) {
      delete data.files;
    }
    this.setState({ loading: true });
    this.props.UpdateDesignInfoRequest(data, this.props.DesignDetail.uid, this.props.token)
      .then(async (data) => {
        console.log(data, data.res && data.res.success);
        if (data.res && data.res.success) {
          await alert("디자인 정보 수정이 완료되었습니다. 디자인보기 화면으로 이동합니다.", "확인");
          window.location.href = geturl() + '/designDetail/' + this.props.DesignDetail.uid;
        } else {
          await alert("디자인 정보 수정에 실패하였습니다.", "확인");
        }
      })
    this.setState({ loading: false });
  }
  onChangeCategory1(event, { value }) {
    this.setState({ categoryLevel1: { value }.value, categoryLevel2: null, categoryLevel3: null });
    this.checkFinishAdditional();
  }
  onChangeCategory2(event, { value }) {
    this.setState({ categoryLevel2: { value }.value, categoryLevel3: null })
    this.checkFinishAdditional();
  }
  onChangeCategory3(event, { value }) {
    this.setState({ categoryLevel3: { value }.value })
    this.checkFinishAdditional();
  }
  onCheckIsProblem = async () => {
    await this.setState({ is_problem: !this.state.is_problem });
    this.checkFinishAdditional();
  }
  onCheckedLicense01 = async () => {
    await this.setState({ license1: !this.state.license1 });
    this.checkFinishAdditional();
  }
  onCheckedLicense02 = async () => {
    await this.setState({ license2: !this.state.license2 });
    this.checkFinishAdditional();
  }
  onCheckedLicense03 = async () => {
    await this.setState({ license3: !this.state.license3 });
    this.checkFinishAdditional();
  }
  LeaveMeAlone = async () => {
    await this.setState({ alone: !this.state.alone, members: [] });
    this.checkFinishAdditional();
  }
  addMember = async (email, s_img, nick_name, uid) => {
    let member = { email: email, s_img: s_img, nick_name: nick_name, user_id: uid, uid: uid };
    await this.setState({
      members: this.state.members.concat(member),
      addmem: this.state.addmem.concat(member)
    });
    this.checkFinishAdditional();
    this.setState({ alone: false });
  }
  removeMember = async (user_id) => {
    if (this.state.addmem.find(mem => { return mem.user_id === user_id })) {
      await this.setState({ addmem: this.state.addmem.filter(member => { return member.user_id !== user_id }) });
    } else { // remove if not in addmem
      await this.setState({ delmem: this.state.delmem.concat(this.state.members.filter((member) => { return user_id === member.user_id })) });
    }
    await this.setState({ members: this.state.members.filter((member) => { return user_id !== member.user_id }) });

    if (this.state.members.length === 0) {
      this.setState({ alone: true })
    }
  }
  deleteDesign = async () => {
    const answer = await confirm("디자인을 삭제하시겠습니까?", "확인", "취소");
    answer && this.props.DeleteDesignRequest(this.props.id, this.props.token)
      .then(async () => {
        window.location.href = geturl() + `/design`;
      })
      .catch(async () => {
        await alert("삭제에 실패하였습니다.", "확인");
      });
  }
  cancelDeleteDesign = () => {
    this.setState({ deleteModal: !this.state.deleteModal })
  }
  deleteDialog = () => {
    this.setState({ deleteModal: !this.state.deleteModal })
  }

  render() {
    let arrSummaryList = [];
    if (this.state.members != null && this.state.members.length > 0) {
      arrSummaryList = this.state.members.map((item, index) => {
        return (<div onClick={() => this.removeMember(item.user_id)} key={index}>
          <Peer s_img={item.s_img == null ? noface : item.s_img} nick_name={item.nick_name} />
        </div>)
      });
    }
    let category3Index = -1;
    let nCount = 0;
    for (let i in this.props.category2) {
      this.props.category2 && this.props.category2[i] && this.props.category2[i].map((item, index) => {
        if (item.value == this.state.categoryLevel2) {
          category3Index = nCount;
        }
        nCount++;
      })
    }
    const DeleteDesignModal = () => {
      return (<Modal open={this.state.deleteModal} closeOnDimmerClick={true} onClose={this.deleteDialog}
        style={{ boxShadow: "0px 3px 6px #000000", position: "relative", width: "576px", height: "200px", textAlign: "center", bottom: "318px" }}>
        <div style={{ position: "absolute", left: "100%", marginTop: "0px", marginLeft: "10px" }} onClick={this.deleteDialog} >
          <Cross angle={45} color={"#EFEFEF"} weight={3} width={25} height={25} />
        </div>
        <div style={{ width: "100%", height: "69px", fontFamily: "Noto Sans KR", fontSize: "20px", color: "#707070", lineHeight: "40px", marginTop: "35px", marginBottom: "31px" }}>{this.state.title}(을)를<br />삭제하시겠습니까?</div>
        <div style={{ fontWeight: "500", width: "100%", height: "25px", fontFamily: "Noto Sans KR", fontSize: "20px" }}>
          <div style={{ marginLeft: "auto", marginRight: "auto", width: "max-content", cursor: "pointer", }} >
            <span style={{ color: "#707070" }} onClick={this.cancelDeleteDesign}>취소</span>
            <span style={{ marginRight: "10px", color: "#FF0000" }} onClick={this.deleteDesign}>확인</span>
          </div>
        </div>
      </Modal>
      )
    }
    const { step, loading, deleteModal } = this.state; // const { DesignDetail } = this.props;
    const thumbnailURL = this.state.thumbnail; //DesignDetail && DesignDetail.img == null ? noimg : DesignDetail.img.m_img;//this.state.thumbnail;
    let boardWidth = 125;
    if (step === 3) boardWidth = 0;
    return (
      <React.Fragment>
        {this.state.cropper ?
          <CropperDialog ratio={this.state.ratio} onKeyDown={null} open={this.state.cropper} onClose={null}>
            <div onClick={this.closeCropper} style={{ position: "absolute", width: "max-content", top: "10px", right: "15px" }}>
              <Cross angle={45} color={"#000000"} weight={2} width={32} height={32} />
            </div>
            <div style={{ width: "max-content", height: "20px", lineHeight: "20px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left", marginTop: "45px", marginLeft: "75px" }}>{designImageText} 등록</div>
            <div style={{ width: "max-content", height: "15px", lineHeight: "15px", color: "#FF0000", fontFamily: "Noto Sans KR", fontSize: "15px", fontWeight: "300", textAlign: "left", marginTop: "5px", marginLeft: "75px" }}>[!]등록하신 {designImageText}가 정사각형이 아닙니다.</div>
            <div style={{ width: "max-content", height: "30px", lineHeight: "15px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "15px", fontWeight: "300", textAlign: "left", marginTop: "5px", marginLeft: "75px" }}>아래의 이미지에서 {designImageText}로 등록하고자하는 영역을 <br /> 조절하여 등록하기를 클릭하시면 {designImageText}가 등록됩니다.</div>
            <div className="imagebox">
              <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "20px", marginBottom: "20px", width: this.state.ratio > 1.0 ? "370px" : "240px", height: "max-content" }}>
                <ReactCrop
                  src={this.state.thumbnail} crop={this.state.crop}
                  onImageLoaded={this.onImageLoaded} onComplete={this.onCropComplete} onChange={this.onCropChange} />
              </div>
              <div style={{ marginTop: "20px", display: "flex" }} >
                <div style={{
                  marginLeft: "25px", marginRight: "25px", width: "max-content", border: "none", background: "none", height: "40px", lineHeight: "40px", color: "#707070", paddingBottom: "1.5px", borderBottom: "1.5px solid #707070", fontSize: "20px", fontWeight: "500",
                  fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer"
                }} onClick={() => this.closeCropper()} >취소</div>
                <div style={{ marginLeft: "auto", textAlign: "middle", color: "#FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", lineHeight: "40px", borderBottom: "1.5px solid #FF0000", border: "1px splid black", cursor: "pointer" }} onClick={() => this.crop()} >등록하기</div>
              </div>
            </div>
          </CropperDialog> : null}
        <Wrapper>
          <div className="navi_menu">
            <div className="navi_header">디자인 수정하기</div>
            <div className={`navi_label borderBottom ${this.state.step == 0 ? "select" : "black"}`} onClick={() => this.gotoStep(scrollmenu[0])}>{scrollmenu[0].txt}</div>
            <div className={`navi_label borderBottom ${this.state.step == 1 ? "select" : "black"}`}
              onClick={() => this.gotoStep(scrollmenu[1])}>{scrollmenu[1].txt}</div>
            <div className={`navi_label ${this.state.step == 2 ? "select" : "black"}`}
              onClick={() => this.gotoStep(scrollmenu[2])}>{scrollmenu[2].txt}</div>
            <div onClick={this.deleteDesign} className="navi_label red delete" >디자인 삭제하기</div>
          </div>
          <div className="vLine" />
          <ContentWrapper>
            <Section isNone={step === 0} >
              <React.Fragment>
                <div className="board">
                  <div className="board_label">1. 대표 이미지 등록하기<sub className="sub marginRight2">*</sub>
                    <QuestionGuide left={15} top={-50} bubbleSize={584}>?</QuestionGuide>
                  </div>
                  <div className="board_box">
                    <div className="row" style={{ marginTop: "10px" }}>
                      {
                        this.state.thumbnail == null || this.state.thumbnail == noimg ?
                          <div className="imageBox"><img src={new_logo_plus} className="plus" /></div>
                          :
                          <img className="imageBox" src={this.state.thumbnail} />
                      }
                      <div className="imageLabel">
                        <label className="findThumbnailText" htmlFor="file">찾아보기</label>
                        <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
                        <div className="thumbnailExplainText"> 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
                      </div>
                    </div>
                  </div>
                  <div className="board_label" style={{ marginTop: "12px" }}>2. 디자인 이름<sub className="sub marginRight1">*</sub></div>
                  <div className="board_box">
                    <InputText onChange={this.onChangeValueTitle} onKeyDown={this.onKeyDownEnter}
                      name="title" maxLength="100" value={this.state.title} placeholder="디자인의 제목을 입력해주세요. (100자 이내)" onBlur={this.checkFinishBasic} />
                  </div>
                  <div className="board_label" style={{ marginTop: "22px" }}>3. 디자인 설명<sub className="sub marginRight2">*</sub>
                  </div>
                  <div className="board_box">
                    <InputTextArea id="explainBox" onChange={this.onChangeValueExplanation}
                      name="explanation" maxLength="350" placeholder="디자인 설명을 입력해주세요. (350자 이내)"
                      value={this.state.explanation} onBlur={this.checkFinishBasic} />
                  </div>

                </div>
                {step === 0 &&
                  <div className="buttonWrap" >
                    <CustomButton
                      onClick={async () => {
                        if (await confirm("수정 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", "예", "아니오")) {
                          window.history.go(-1)
                        }
                      }}
                      isComplete={false}>
                      <BtnText>취소</BtnText>
                    </CustomButton>
                    <CustomButton
                      onClick={this.gotoNextStep}
                      isComplete={true}>
                      <BtnText>다음</BtnText>
                    </CustomButton>
                  </div>}
              </React.Fragment>
            </Section>
            <Section isNone={step === 1} >
              <div className="board" >
                <div className="maxFlex">
                  <div className="board_label">1. 카테고리<sub className="sub marginRight1" >*</sub></div>

                  <div className="category_wrapper">
                    <CategoryDropDown
                      selection
                      ref="dropdown1"
                      onChange={this.onChangeCategory1}
                      options={this.props.category1}
                      value={this.state.categoryLevel1}
                      placeholder="카테고리를 선택해주세요"
                    />
                    <CategoryDropDown
                      selection
                      id="category2"
                      ref="dropdown2"
                      onChange={this.onChangeCategory2}
                      options={this.props.category2[this.state.categoryLevel1 - 1] || emptyCategory}
                      value={this.state.categoryLevel2}
                      placeholder="카테고리를 선택해주세요"
                    />
                    {this.state.categoryLevel2 == 28 ?
                      <CategoryDropDown
                        selection
                        id="category3"
                        ref="dropdown3"
                        onChange={this.onChangeCategory3}
                        options={this.props.category3 && this.props.category3[category3Index] || emptyCategory}
                        value={this.state.categoryLevel3}
                        placeholder="카테고리를 선택해주세요"
                      /> : null}

                  </div>
                </div>
                <div className="board_box paddingLeft1" style={{ marginTop: "70px" }}>
                  {
                    this.state.categoryLevel3 != null ?
                      <IsProblemBox>
                        <CheckBox2 onChange={this.onCheckIsProblem} checked={this.state.is_problem ? true : false} type="checkbox" />
                        <span className="textLabel">문제 등록 기능을 사용합니다.</span>
                      </IsProblemBox>
                      : null
                  }
                </div>
                <div className="maxFlex">
                  <div className="board_label " style={{ marginRight: "5px" }}>2. 멤버 초대하기</div>
                  <div style={{ width: "400px", marginRight: "10px" }}><SearchDesignMemverContainer className="searchRect" addMember={this.addMember} /></div>
                  <QuestionGuide left={64} top={-10} bubbleSize={600}>?
                    <div className="messageBubble">
                      함께 디자인을 만들어 갈 멤버를 초대해 주세요. <br />
                      초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
                      디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.
                    </div>
                  </QuestionGuide>
                </div>
                <div className="messageBubble">
                  <div className="board_label" />
                  <div className="quest">?</div>
                  <div className="board_box">
                    함께 디자인을 만들어 갈 멤버를 초대해 주세요. <br />
                    초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
                    디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.
                  </div>
                </div>
                <InviteMemberListBox>
                  <div className="memberList">
                    {this.state.members && this.state.members.length > 0 ?
                      this.state.members.map((item, index) => {
                        console.log("=====", item)

                        return (
                          <div onClick={() => this.removeMember(item.user_id)} key={index}>
                            <Peer s_img={item && item.s_img == null ? noface : item.s_img} nick_name={item.nick_name} />
                          </div>
                        )
                      }) : null}</div>
                </InviteMemberListBox>
                <div className="board_label">3. 라이센스</div>
                <div className="board_box paddingLeft1 column">
                  <div className="licenseItem"><CheckBox2 checked={this.state.license1} onChange={this.onCheckedLicense01} /><span className="textLabel">상업적으로 이용이 가능합니다.</span></div>
                  <div className="licenseItem"><CheckBox2 checked={this.state.license2} onChange={this.onCheckedLicense02} /><span className="textLabel disabled">원작자를 표시합니다.</span></div>
                  <div className="licenseItem"><CheckBox2 checked={this.state.license3} onChange={this.onCheckedLicense03} /><span className="textLabel">수정이 가능합니다.</span></div>
                </div>
              </div>

              {step === 1 &&
                <div className="buttonWrap">
                  <CustomButton
                    onClick={async () => {
                      if (await confirm("수정 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", "예", "아니오")) {
                        window.history.go(-1)
                      }
                    }}
                    isComplete={false}>
                    <BtnText>취소</BtnText>
                  </CustomButton>
                  <CustomButton isComplete={false} onClick={this.gotoPrevStep}>
                    <BtnText>뒤로</BtnText>
                  </CustomButton>
                  <CustomButton
                    onClick={this.gotoNextStep}
                    isComplete={true}>
                    <BtnText>다음</BtnText>
                  </CustomButton>
                </div>}

            </Section>
            <Section isNone={step === 2} isLast={true}>
              <div className="grid_wrapper">
                <div className="board_grid">
                  {this.state.grid ?
                    this.props.DesignDetail &&
                      this.props.DesignDetail.is_project
                      ? <DesignDetailStepContainer design={this.props.DesignDetail} isMyDesign={true} editor={true} />
                      // <GridEditor editor={true} isMyDesign={true} design={this.props.DesignDetail} {...this.props} />
                      : <DesignDetailViewContainer history={this.props.history} id={this.props.DesignDetail.uid} isMyDesign={true} editor={false} />
                    :
                    <LoadingBox>
                      <LoadingIconBox imageURL={Logo} />
                      <div className="loadingText">컨텐츠 에디터를 가져오고 있습니다...</div>
                    </LoadingBox>}
                </div>

                {step === 2 &&
                  <div className="grid_buttonWrap">
                    <CustomButton isComplete={false} onClick={this.gotoPrevStep}>
                      <BtnText>뒤로</BtnText>
                    </CustomButton>
                    <CustomButton
                      isComplete={this.state.type === "grid" && this.state.template == null ? false : true}
                      onClick={this.submit}
                    >
                      <BtnText>완료</BtnText>
                    </CustomButton>
                  </div>}
              </div>
            </Section>
          </ContentWrapper>
        </Wrapper>
      </React.Fragment>)
  }
}

export default ModifyDesign;


const ControllerWrap = styled.div`
  position: relative;
  text-align: center;
  border: 1px solid #707070;
  padding:25px;
  margin-bottom:30px;
  .innerBox {
    display:flex;
    justify-content:space-between;
  }
  & .initWrap {
    & > ul {
      display: flex;
      // box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    & > span {
      color: ${osdcss.color.grayScale.scale6};
    }
  }
  &:hover {
    background-color: #FAFAFA;
    & .initWrap {
      & > ul { display: flex; }
      & > span { color: ${osdcss.color.grayScale.scale6}; }
    }
  }

`;
const NewController = styled.div`
  font-family:Spoqa Han Sans Neo;
  font-weight:500;
  font-size:28px;
  color:black;
  height:40px;
  display:flex;
  align-items:center;
  cursor:pointer;
`;




// {loading ? <Loading /> : null}
// {deleteModal ? <DeleteDesignModal /> : null}
// <div onClick={this.handleCloseMember}>
//   <MainBanner>
//     <div className="title">디자인 수정하기</div>
//   </MainBanner>
//   <MainSection>
//     {/* SCROLL - MENU */}
//     <NavMenu>
//       <div className="menuBox">
//         {scrollmenu.map((menu, index) => {
//           return (
//             <MenuItem onClick={() => this.gotoStep(menu)}
//               // className="menuItem"
//               borderBottom={index + 1 === scrollmenu.length}
//               key={menu.txt}>
//               <MenuText selected={this.state.step === index}>{menu.txt}</MenuText>
//             </MenuItem>)
//         })}
//         <MenuItem className="white" onClick={this.deleteDesign}>
//           <div className="deleteText">디자인 삭제하기</div>
//         </MenuItem>
//         {/* <MenuItem className="white" onClick={this.deleteDialog}> */}
//         {/* <div className="deleteText">디자인 삭제하기</div> */}
//         {/* </MenuItem> */}
//       </div>
//     </NavMenu>
//     {/* <ModifyMenuDelete onClick={this.deleteDialog} >디자인 삭제하기</ModifyMenuDelete> */}

//     {/* FORM */}
//     <InputBoard boardWidth={boardWidth}>
//       {/* <form ref={(ref) => this.form = ref}> */}
//       <section style={{ display: step === 0 ? "block" : "none" }} >
//         {/* THUMBNAIL */}
//         <ContentsBox>
//           <ThumbnailBox>
//             <div className="title">{designImageText}<sup style={{ color: "red" }}>*</sup></div>
//             <ImageBox imageURL={thumbnailURL == null ? noimg : thumbnailURL}>
//               {this.props.DesignDetail && this.props.DesignDetail.parent_design &&
//                 <div className="forkedImg" />}
//             </ImageBox>
//             <div className="findThumbnailBox">
//               <div className="findThumbnailBtn">
//                 <label className="findThumbnailText" htmlFor="file">찾아보기</label>
//                 <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
//               </div>
//               <div className="thumbnailExplainText">{designImageText}는 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
//             </div>
//           </ThumbnailBox>

//           {/* TITLE */}
//           <TitleBox>
//             <div className="title">제목<sup style={{ color: "red" }}>*</sup></div>
//             <input onChange={this.onChangeValueTitle} onKeyDown={this.onKeyDownEnter}
//               className="inputText" name="title" maxLength="100" value={this.state.title} placeholder="디자인의 제목을 입력해주세요. (100자 이내)"
//               onBlur={this.checkFinishBasic} />
//           </TitleBox>
//           {/* EXPLANATION */}
//           <ExplainBox>
//             <div className="title">디자인 설명</div>
//             <textarea id="explainBox" className="inputTextareaBox" onChange={this.onChangeValueExplanation}
//               name="explanation" maxLength="350" placeholder="디자인 설명을 입력해주세요. (350자 이내)"
//               value={this.state.explanation} onBlur={this.checkFinishBasic} />
//           </ExplainBox>
//         </ContentsBox>
//       </section>

//       <section style={{ display: step === 1 ? "block" : "none" }} >
//         <ContentsBox>
//           {this.props.category1.length > 0 ?
//             <CategoryBox>
//               {/* category */}
//               <div className="additionalTitle">카테고리</div>
//               <CategoryDropDown onChange={this.onChangeCategory1}
//                 options={this.props.category1} selection name="category1" ref="dropdown1" value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
//               {this.props.category2[this.state.categoryLevel1 - 1] && this.state.categoryLevel1 !== 0
//                 ? <CategoryDropDown options={this.props.category2[this.state.categoryLevel1 - 1]} selection id="category2" name="cate2" ref="dropdown2" onChange={this.onChangeCategory2} value={this.state.categoryLevel2} />
//                 : <CategoryDropDown options={emptyCategory} selection id="category2" name="cate2" ref="dropdown2" onChange={this.onChangeCategory2} value={this.state.categoryLevel2} />}
//               {this.state.categoryLevel2==28&&this.state.categoryLevel1 !== 0 &&this.state.categoryLevel2 !== 0 && this.props.category3[this.state.categoryLevel2 - 1]
//                   ? <CategoryDropDown value={this.state.categoryLevel3} ref="dropdown2" selection onChange={this.onChangeCategory3} options={this.props.category3[category3Index]} />
//                   : null
//               }
//             </CategoryBox>
//             : <p>카테고리를 가져오고 있습니다.</p>}

//             <section style={{ display: step === 1 ? "block" : "none" }} >
//             {
//               this.state.categoryLevel3!=null?
//                 <IsProblemBox>
//                   <div className="additionalTitle"/>
//                   <CheckBox2 className="check" onChange={this.onCheckIsProblem} checked={this.state.is_problem ? true : false} type="checkbox" />
//                   <div className="check_label">문제 등록 기능을 사용합니다.</div>
//                 </IsProblemBox>
//               :null
//             }
//             </section>
//           {/* invite member*/}
//           <InviteMemberBox>
//             <div className="additionalTitle ">멤버 초대하기
//             {/* <sup style={{ color: "red" }}>*</sup> */}
//             </div>
//             <div className="searchBox" >
//               <SearchDesignMemverContainer className="searchRect" addMember={this.addMember} />
//             </div>
//             <div className="tipTitle">TIP</div>
//             <div className="tipDescription">
//               함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />
//               초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
//               디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.</div>
//           </InviteMemberBox>
//           <div>
//             {/* INVITED MEMBER */}
//             <InviteMemberListBox>
//               <div className="memberList">
//                 {arrSummaryList}
//               </div>
//             </InviteMemberListBox>
//             {/* LEAVE ME ALONE */}
//             {/* <NoInviteMemberBox>
//               <div><CheckBox2 onChange={this.LeaveMeAlone} type="checkbox" checked={this.state.alone} /></div>

//               <div className="textLabel">멤버를 초대하지 않습니다.</div>
//             </NoInviteMemberBox> */}
//           </div>
//           <HRline />

//           {/* LICENSE */}
//           <LicenseBox>
//             <div className="additionalTitle">라이센스</div>
//             <div className="licenseList">
//               <div className="licenseItem">
//                 <div><CheckBox2 onChange={this.onCheckedLicense01} checked={this.state.license1 ? true : false} type="checkbox" /></div>
//                 <div className="textLabel">상업적으로 이용이 가능합니다.</div>
//               </div>
//               <div className="licenseItem">
//                 <div><CheckBox2 onChange={this.onCheckedLicense02} checked={this.state.license2 ? true : false} type="checkbox" /></div>
//                 <div className="textLabel">원작자를 표시합니다.</div></div>
//               <div className="licenseItem">
//                 <div><CheckBox2 onChange={this.onCheckedLicense03} checked={this.state.license3 ? true : false} type="checkbox" /></div>
//                 <div className="textLabel">수정이 가능합니다.</div></div>
//             </div>
//           </LicenseBox>
//           {/* hr line */}
//           {/* <div style={{ marginTop: "150.5px", marginLeft: "auto", marginRight: "52px", width: "545px", height: "69px", textAlign: "right", fontWeight: "300", fontSize: "20px", lineHeight: "40px", fontFamily: "Noto Sans KR", letterSpacing: "0", color: "#FF0000", opacity: "1" }} >마지막 단계만이 남아있습니다!<br />단계 / 컨텐츠 정보 탭에서 기본적인 디자인의 뼈대를 구성해 주세요</div> */}
//         </ContentsBox>
//       </section>

//       <section style={{ display: step === 2 ? "block" : "none", paddingLeft: "51px", marginBottom: "204px" }} >
//         <div>
//           {this.state.grid ?
//             this.props.DesignDetail &&
//               this.props.DesignDetail.is_project ?
//               <GridEditor editor={true} isMyDesign={true} design={this.props.DesignDetail} {...this.props} />
//               : <DesignDetailViewContainer history={this.props.history} id={this.props.DesignDetail.uid} isMyDesign={true} editor={false} />
//             :
//             <LoadingBox>
//               <LoadingIconBox imageURL={Logo} />
//               <div className="loadingText">컨텐츠 에디터를 가져오고 있습니다...</div>
//             </LoadingBox>}
//         </div>
//       </section>

//       {/* BUTTONS */}
//       <div className="buttonBox">
//       <BackButton
//           onClick={async() => 
//             {    
//               if (await confirm("수정 중인 내용이 저장되지 않습니다. 취소하시겠습니까?", "예", "아니오")) {
//               window.history.go(-1)
//             }
//           }}
//           isComplete={false}>
//           <BtnText>취소</BtnText>
//         </BackButton>
//         {step === 0 && <React.Fragment>
//           <CompleteButton onClick={this.gotoNextStep} isComplete={true}><BtnText>다음</BtnText></CompleteButton>
//         </React.Fragment>}
//         {step === 1 && <React.Fragment>
//           <BackButton onClick={this.gotoPrevStep} isComplete={false}><BtnText>뒤로</BtnText></BackButton>
//           <CompleteButton onClick={this.gotoNextStep} isComplete={true}><BtnText>다음</BtnText></CompleteButton>
//         </React.Fragment>}
//         {step === 2 && <React.Fragment>
//           <BackButton onClick={this.gotoPrevStep} isComplete={false}><BtnText>뒤로</BtnText></BackButton>
//           <CompleteButton onClick={this.submit} isComplete={true}><BtnText>완료</BtnText></CompleteButton>
//         </React.Fragment>}
//       </div>
//       {/* </form> */}
//     </InputBoard>
//   </MainSection>
// </div>





// const MainBanner = styled.div`
//   width: 100%;
//   height:140px;
//   display: flex;
//   justify-content: center;
//   .title{
//     width: 196px;
//     height: 37px;
//     margin-top: 45px;
//     font-size: 25px;
//     font-family: Noto Sans KR;
//     color: #707070;
//     line-height: 37px;
//     font-weight: 700;
//   }

//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     align-items:flex-end;
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     align-items:flex-end;
//   }
// `
// const MainSection = styled.div`
//   width:${window.innerWidth > 1920 ? 1920 + 'px' : 100 + '%'};
//   // border:2px solid blue;
//   display: flex;
//   flex-direction:row;
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//       flex-direction:column;
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//       flex-direction:column;
//   }
// `

// const NavMenu = styled.div`
// min-width:433px;
// height:300px;
// position:relative;
// .menuBox{
//   width:325px;
//   position: fixed;
//   top:197px;
//   margin-left:64px;    
//   background-color:#F5F4F4;
//   border-radius:5px;
// }
// .menuItem{
//   height:62px;
//   padding-left:36px;
//   padding-top:18px;
//   lineHeight:29px;
//   border-bottom:${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
//   cursor:pointer;
// }
// .deleteText{
//   font-family:Noto Sans KR;
//   font-size:20px;
//   font-family:Noto Sans KR;
//   font-weight:500;
//   text-align:left;
//   color:#FF0000;
//   border-bottom:${props => props.borderBottom};
// }

// @media only screen and (min-width : 780px) and (max-width:1440px) {
//   display:flex;
//   justify-content:center;
//   align-items:center;
//   .menuBox{
//     margin-left:0px;   
//     position: static; 
//   }
// }
// @media only screen and (min-width : 360px) and (max-width:780px) {
//   display:flex;
//   justify-content:center;
//   align-items:center;
//   .menuBox{
//     margin-left:0px;  
//     position:static;  

//   }
// }
// `
// const MenuItem = styled.div`
//   height:62px;
//   padding-left:36px;
//   padding-top:18px;
//   lineHeight:29px;
//   border-bottom: ${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
//   cursor:pointer;
//   &.white{
//     background-color: white;
//   }
// }`
// const MenuText = styled.div`
//   font-size:20px;
//   font-family:Noto Sans KR;
//   font-weight:300;
//   text-align:left;
//   color: ${props => props.selected ? "#FF0000" : "#707070"};
//   border-bottom:${props => props.borderBottom};
// `
// //const Arrow = styled.span`
// //    margin-left:70px;
// //    font-size:15px;
// //`
// const InputBoard = styled.div`
//   // width: ${window.innerWidth > 1920 ? 1422 : window.innerWidth - 500}px;
//   width:77%;
//   padding-bottom:100px;
//   margin-bottom:100px;
//   position:relative;
//   padding-top:45px;
//   border-radius:5px;
//   border:8px solid #F5F4F4;
//   .buttonBox{
//     width: max-content;
//     display: flex;
//     justify-content:flex-end;
//     margin-top: 21px;
//     margin-left: auto;
//     padding:10px 0px 10px 10px;
//     position:absolute;
//     right:0px;
//     bottom:0px;
//   }

//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     width:100%;
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     width:100%;
//   }
// `
// // const ButtonBox = styled.div`
// //       // height:100px;
// //       // display: flex;
// //       // margin-top: 30.54px;
// //       // justify-content: flex-end;
// //       width: max-content;
// //       display: flex;
// //       margin-top: 21px;
// //       margin-left: auto;
// // `
// const BackButton = styled.div`
//       cursor: pointer;
//       width: 104.5px;
//       height: 44px;
//       border-radius: 5px;
//       background-color: ${props => props.isComplete ? "#FF0000" : "#707070"};
//       padding-top: 6px;
//       padding-left: 15px;
//       margin-right: 25px;
// `
// const CompleteButton = styled.div`
//         cursor: pointer;
//         width: 104.5px;
//         height: 44px;
//         border-radius: 5px;
//         background-color: ${props => props.isComplete ? "#FF0000" : "#707070"};
//         padding-top: 6px;
//         padding-left: 15px;
//         margin-right: 25px;
//   `
// const HRline = styled.div`
//   width:95%;
//   margin-top:60px;
//   margin-bottom:67px;
//   border-bottom:5px solid #F5F4F4;
// `
// const BtnText = styled.p`
//   width: 74px;
//   padding: 0px;
//   font-familty: Noto Sans KR;
//   font-weight: 500;
//   line-height: 29px;
//   text-align: center;
//   font-size: 20px;
//   color: #FFFFFF;
// `;

// //---sectionbasic---//
// const ContentsBox = styled.div`
//   padding-left: 47px;
//   display:flex;
//   flex-direction:column;
//   height:max-content;
//   .title{

//         min-width:100px;
//         height:29px;
//         text-align:left;
//         font-size:20px;
//         font-weight:500;
//         line-height:29px;
//         color:#707070;
//   }
//   .additionalTitle{
//         min-width:167px;
//         height:29px;
//         text-align:left;
//         font-size:20px;
//         font-weight:500;
//         line-height:29px;
//         color:#707070;
//   }
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     justify-content:center;
//     .title{
//       margin-bottom:10px;
//     }
//     .additionalTitle{
//       margin-bottom:10px;
//     }
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     .title{
//       margin-bottom:10px;
//     }
//     .additionalTitle{
//       margin-bottom:10px;
//     }
//   }
// `
// const IsProblemBox = styled.div`
//   margin-top:10px;
//   display:flex;
//   justify-content:flex-start;
//   align-items:flex-start;
//   .check{
//   }
//   .check_label{
//     padding-top:5px;
//   }
// `
// const ImageBox = styled.div`

//   margin-left: 67px;
//     min-width: 210px;
//     min-height: 210px;
//     max-width: 210px;
//     max-height: 210px;
//   border-radius:5px;
//   background: ${props => `url(${props.imageURL})`};
//   background-size:cover;
//   background-position:center center;
//   position:relative;
//     .forkedImg{
//       z-index:500;
//       width:32px;
//       height:70px;
//       position:absolute;
//       right:21px;
//       background-image:url(${forked});
//       background-size:cover;
//     }
// `
// const ThumbnailBox = styled.div`
// display:flex;
// justify-content:flex-start;
// flex-direction:row;
// .explainBox{
//   margin-left:54px;
//   margin-top:100px;
// }
// .findThumbnailBtn{
//   width:63px;
//   height:25px;
//   cursor:pointer;
// }
// .findThumbnailText{
//   font-family:Noto Sans KR;
//   font-size:17px;
//   font-weight:500;
//   text-align:left;
//   line-height:25px;
//   color:#FF0000;
//   border-bottom:1.5px solid #FF000;
//   cursor:pointer;
// }
// .findThumbnailBox{
//   margin-left:54px;
//   margin-top:100px; 
//   .thumbnailExplainText{
//     width:341px;
//     height:45px;
//     margin-top:11px;
//     font-weight:300;
//     font-size:14px;
//     color:#707070;
//     line-height:20px;
//     text-align:left;
//   }
// }

// @media only screen and (min-width : 780px) and (max-width:1440px) {
//   flex-direction:column;
// }
// @media only screen and (min-width : 360px) and (max-width:780px) {
//   flex-direction:column;
// }
// `
// const TitleBox = styled.div`
//       display:flex;
//       margin-top:96px;
//       justify-content:flex-start;
//       flex-direction:row;
//       .inputText{
//         width:505px;
//         height:56px;
//         margin-left:67px;
//         padding-left:22px;
//         padding-right:22px;
//         font-size:20px;
//         font-weight:300;
//         font-family:Noto Sans KR;
//         line-height:29px;
//         color:#707070;
//         border:none;
//         border-radius:5px;
//         outline:none;
//         background-color:#EFEFEF;
//       }
//       @media only screen and (min-width : 780px) and (max-width:1440px) {
//         flex-direction:column;
//         .inputText{
//           margin-left:0px;
//         }
//       }
//       @media only screen and (min-width : 360px) and (max-width:780px) {
//         flex-direction:column;
//         .inputText{
//           margin-left:0px;
//           width:80%;
//        }
//       }
// `
// const ExplainBox = styled.div`
// margin-top: 103px;
//   display: flex;
//   justify-content:flex-start;
//   flex-direction:row;
//   .inputTextareaBox {
//     width: 717px;
//     height: 244px;
//     margin-left: 70px;
//     padding: 22px 26px 34px 32px;
//     font-family: Noto Sans KR;
//     font-size: 20px;
//     font-weight: 300;
//     color: #707070;
//     line-height: 35px;
//     text-align: left;
//     outline: none;
//     border: none;
//     border-radius: 5px;
//     resize: none;
//     background-color: #EFEFEF;
//   }
//   @media only screen and (min-width : 780px) and (max-width:1440px) {
//     flex-direction:column;
//     .inputTextareaBox {
//       margin-left: 0px;
//     }
//   }
//   @media only screen and (min-width : 360px) and (max-width:780px) {
//     flex-direction:column;

//     .inputTextareaBox {
//       width:90%;
//       margin-left: 0px;
//     }
//   }
// `
// //---additional--//
// const CategoryBox = styled.div`
// width:100%;
// display:flex;
// justify-contant:flex-start;
// flex-direction:row;
// @media only screen and (min-width : 780px) and (max-width:1440px) {
//   // flex-direction:column;
// }
// @media only screen and (min-width : 360px) and (max-width:780px) {
//   flex-direction:column;
// }
// `
// const CategoryDropDown = styled(Dropdown)`
// width:410px;
// height:56px;     
// border-radius:5px;
// font-size:20px;
// background-color:#EFEFEF !important;
// margin-right:30px;
// @media only screen and (min-width : 780px) and (max-width:1440px) {

// }
// @media only screen and (min-width : 360px) and (max-width:780px) {
//   margin-top:10px;
//   width:90%;
// }
// `
// const InviteMemberBox = styled.div`
// display:flex;
// justify-content:flex-start;
// flex-direction:row;
// margin-top:120px;
// .searchBox{
//   width:645px;
//   height:56px;
//   font-size:20px;
//   font-weight:500;
//   line-height:29px;
//   color:#707070;
//   border-radius:5px;
//   background-color:#EFEFEF;
// }
// .tipTitle{
//   width:27px;
//   height:25px;
//   margin-left:20px;
//   font-size:17px;
//   font-weight:500;
//   line-height:25px;
//   text-align:left;
//   color:#FF0000;
// }
// .tipDescription{  
//   margin-left:17px;
//   font-size:16px;
//   font-weight:100;
//   font-family:Noto Sans KR;
//   text-align:left;
//   line-height:25px;
//   color:#707070;
// }      
// @media only screen and (min-width : 780px) and (max-width:1440px) {
//   flex-direction:column;
//   .searchBox{
//   }
// }
// @media only screen and (min-width : 360px) and (max-width:780px) {
//   flex-direction:column;
//   .searchBox{
//     width:92%;
//   }
// }   
// `
// const InviteMemberListBox = styled.div`
// margin-top:20px;
// margin-left:167px;
// width:645px;
// .memberList{
//   display:flex;
//   flex-wrap:wrap;
//   flex-direction:row;
// }
// @media only screen and (min-width : 780px) and (max-width:1440px) {
//   margin-left:0px;
//   width:645px;
// }
// @media only screen and (min-width : 360px) and (max-width:780px) {
//   margin-left:0px;
//   width:92%;
// }
// `