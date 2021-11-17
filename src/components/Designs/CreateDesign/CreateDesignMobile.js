import React, { Component } from "react";
import update from "react-addons-update";
import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer";
import noimg from "source/noimg.png";
import noface from "source/thumbnail.png";
import Cross from "components/Commons/Cross";
import CheckBox2 from "components/Commons/CheckBox";
import { Dropdown, Modal } from "semantic-ui-react";
import styled from "styled-components";
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import FileController from "../CardSourceDetail/FileController";
import LinkController from "../CardSourceDetail/LinkController";
import TextController from "../CardSourceDetail/TextControllerPlus";
import TemplateGridEditor from "components/Designs/CreateDesign/TemplateGridEditor";
import { geturl } from "config";
import Loading from "components/Commons/Loading";
import { confirm } from "components/Commons/Confirm/Confirm";
import { alert } from "components/Commons/Alert/Alert";
import templateImgDesign from "source/template-image-design.png";
import templateImgSofware from "source/template-image-software.png";
import templateImgEngineering from "source/template-image-engineering.png";
import templateImgEmpty from "source/template-image-empty.png";
import opendesign_style from "opendesign_style";

const MainBanner = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  align-items: flex-end;
  margin-bottom: 25px;
  
  .title{
    width: max-content;
    height: 37px;
    margin-top: 45px;
    margin-left: auto;
    margin-right: auto;
    font-size: 25px;
    font-family: Noto Sans KR;
    color: #707070;
    line-height: 37px;
    font-weight: 700;
  }
`;
const MainSection = styled.div`
  // *{border:1px solid black;}

  @media only screen and (min-width : 780px) and (max-width:1440px) {
    flex-direction: column;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction: column;
  }
`;
const InputBoard = styled.div`
  // width: ${window.innerWidth > 1920 ? 1422 : window.innerWidth - 500}px;
  width:77%;
  padding-bottom:100px;
  margin-bottom:100px;
  position:relative;
  padding-top:45px;
  border-radius:5px;
  border:8px solid #F5F4F4;
  .buttonBox{
    width: max-content;
    display: flex;
    justify-content:flex-end;
    margin-top: 21px;
    margin-left: auto;
    padding:10px 0px 10px 10px;
    position:absolute;
    right:0px;
    bottom:0px;
  }

  @media only screen and (min-width : 780px) and (max-width:1440px) {
    width:100%;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    width:100%;
  }
`;
const CustomButton = styled.div`
  cursor: pointer;
  width: 104.5px;
  height: 44px;
  border-radius: 5px;
  background-color: ${props => props.isComplete ? "#FF0000" : "#707070"};
  padding-top: 6px;
  padding-left: 15px;
  margin-right: 25px;
`;
const BtnText = styled.p`
  width: 74px;
  padding: 0px;
  font-familty: Noto Sans KR;
  font-weight: 500;
  line-height: 29px;
  text-align: center;
  font-size: 20px;
  color: #FFFFFF;
  cursor: pointer;
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
//---sectionbasic---//
const ContentsBox = styled.div`
  padding-left: 47px;
  display:flex;
  flex-direction:column;
  .title{
    min-width: 100px;
    height: 29px;
    text-align: left;
    font-size: 20px;
    font-weight: 500;
    line-height: 29px;
    color: #707070;
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
  and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
  padding:15px;
    .title{
      margin-bottom:10px;
    }
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
      padding:15px;
      display:flex;
      flex-direction:column;
      align-items:center;
  }
`;
const ImageBox = styled.div`
  margin-left: 67px;
  min-width: 210px;
  min-height: 210px;
  max-width: 210px;
  max-height: 210px;
  border-radius: 5%;
  background: ${props => `url(${props.imageURL})`};
  background-size: cover;
  background-position: center center;
`
const ThumbnailBox = styled.div`
  display:flex;
  justify-content:flex-start;
  flex-direction:row;
  .explainBox{
    margin-left:54px;
    margin-top:100px;
  }
  .findThumbnailBtn{
    width:63px;
    height:25px;
    cursor:pointer;
  }
  .findThumbnailText{
    font-family:Noto Sans KR;
    font-size:17px;
    font-weight:500;
    text-align:left;
    line-height:25px;
    color:#FF0000;
    border-bottom:1.5px solid #FF000;
    cursor:pointer;
  }
  .findThumbnailBox{
    margin-left:54px;
    margin-top:100px;
    .thumbnailExplainText{
      width:341px;
      height:45px;
      margin-top:11px;
      font-weight:300;
      font-size:14px;
      color:#707070;
      line-height:20px;
      text-align:left;
    }
  }

  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
  and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
      flex-direction:column;
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
      flex-direction:column;
      width:100%;
          .findThumbnailBox{
          margin-left:0px;
          margin-top: 5px;
          
          display:flex;
          flex-direction:column;
          justify-content:center;
              .thumbnailExplainText{
                  width:100%;
              }
      }
  }
`;
const TitleBox = styled.div`
  display:flex;
  margin-top: 9px;
  justify-content:flex-start;
  flex-direction:row;
  .inputText{
    width:505px;
    height:56px;
    margin-left:67px;
    padding-left:22px;
    padding-right:22px;
    font-size:20px;
    font-weight:300;
    font-family:Noto Sans KR;
    line-height:29px;
    color:#707070;
    border:none;
    border-radius:5px;
    outline:none;
    background-color:#EFEFEF;
  }
  @media only screen and (min-width : 780px) and (max-width:1440px) {
    flex-direction:column;
    .inputText{
      margin-left:0px;
    }

  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction:column;
    .inputText{
      margin-left:0px;
      width:80%;
    }
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMaxWidth}px) 
  and (max-width:${opendesign_style.resolutions.MediumMaxWidth}px) {
    flex-direction:column;
    .inputText{
      margin-left:0px;
    }
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
    flex-direction:column;
    width:100%;
    .inputText{
      margin-left:0px;
      width:100%;
    }
  }
`
const ExplainBox = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content:flex-start;
  flex-direction:row;
  .inputTextareaBox {
    width: 717px;
    height: 244px;
    margin-left: 70px;
    padding: 22px 26px 34px 32px;
    font-family: Noto Sans KR;
    font-size: 20px;
    font-weight: 300;
    color: #707070;
    line-height: 35px;
    text-align: left;
    outline: none;
    border: none;
    border-radius: 5px;
    resize: none;
    background-color: #EFEFEF;
  }
  @media only screen and (min-width : 780px) and (max-width:1440px) {
    flex-direction:column;
    .inputTextareaBox {
      margin-left: 0px;
    }
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction:column;
  
    .inputTextareaBox {
      width:100%;
      margin-left: 0px;
    }
  }
  @media only screen and (min-width : ${opendesign_style.resolutions.SmallMinWidth}px) 
  and (max-width:${opendesign_style.resolutions.SmallMaxWidth}px) {
    width:100%;
  }
`
//---additional--//
const CategoryBox = styled.div`
  width:100%;
  display:flex;
  justify-contant:flex-start;
  flex-direction:row;
  @media only screen and (min-width : 780px) and (max-width:1440px) {
    // flex-direction:column;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction:column;
  }
`;
const CategoryDropDown = styled(Dropdown)`
  width:410px;
  height:56px;     
  border-radius:5px;
  font-size:20px;
  background-color:#EFEFEF !important;
  margin-right:30px;
  @media only screen and (min-width : 780px) and (max-width:1440px) {
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    margin-top:10px;
    width:90%;
  }
`;
const InviteMemberBox = styled.div`
  display:flex;
  justify-content:flex-start;
  flex-direction:row;
  .searchBox{
  width:645px;
  height:56px;
  font-size:20px;
  font-weight:500;
  line-height:29px;
  color:#707070;
  border-radius:5px;
  background-color:#EFEFEF;
  }
  .tipTitle{
  width:27px;
  height:25px;
  margin-left:20px;
  font-size:17px;
  font-weight:500;
  line-height:25px;
  text-align:left;
  color:#FF0000;
  }
  .tipDescription{  
  margin-left:17px;
  font-size:16px;
  font-weight:100;
  font-family:Noto Sans KR;
  text-align:left;
  line-height:25px;
  color:#707070;
  }      
  @media only screen and (min-width : 780px) and (max-width:1440px) {
  flex-direction:column;
  .searchBox{
  }
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
  flex-direction:column;
  .searchBox{
  width:92%;
  }
  }
`;
const InviteMemberListBox = styled.div`
  margin-top:20px;
  margin-left:167px;
  width:645px;
  .memberList{
  display:flex;
  flex-wrap:wrap;
  flex-direction:row;
  }
  @media only screen and (min-width : 780px) and (max-width:1440px) {
  margin-left:0px;
  width:645px;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
  margin-left:0px;
  width:92%;
  }
`;
const LicenseBox = styled.div`
  margin-top: 22px;
  width: 100%;
  .licenseList {
    .licenseItem {
      margin-bottom: 15px;
      color: #707070;
      font-size: 16px;
      font-weight: 500;
      font-family: Noto Sans KR;
      .textLabel {
        margin-left: 25px;
        vertical-align: top;
      }
    }
  }
`;
const DelBtn = styled.button`
  position: absolute;
  top: 80%;
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
  background-color: ${opendesign_style.color.main.basic};
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
// content form, templete selector
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
  width: 300px;
  height: 150px;
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
const DesignTemplateSelector = styled.div`
  .title {
    width: max-content;
    color: #707070;
    padding: 10px 5px;
    font-size: 1rem;
    font-weight: 300;
    line-height: 1rem;
  }
  .template-wrapper {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
  .element {
    min-width: 150px;
    margin: 5px;
    border: 2px solid #EFEFEF;
    padding: 5px;
    :hover {
      border: 2px solid #777777;
    }
  }
`;
const EditorWrapper = styled.div`
  color: #707070;
  .preview-text {
    margin: 10px;
    font-size: 1.2rem;
    line-height: 1rem;
    font-weight: 500;
  }
  .title {
    font-size: 1rem;
    font-weight: 300;
    line-height: 1rem;
    margin: 10px;
  }
  .editor{
    opacity: .75;
    width: ${window.innerWidth - 30}px;
    overflow: auto;
  }
`;
const designImageText = "디자인 이미지";
const emptyCategory = [{ value: 0, text: "" }];

function Peer(props) {
  return (
    <PeerBox>
      <PeerIcon imageURL={props.s_img} />
      <div className="nameLabel">{props.nick_name}</div>
      <div className="closeButton"><Cross angle={45} color={"#707070"} weight={3} width={16} height={16} /></div>
    </PeerBox>
  );
};

const template = [
  { type: "empty", text: "빈 템플릿", img: templateImgEmpty },
  { type: "fashion", text: "일반디자인 템플릿", img: templateImgDesign },
  { type: "engineering", text: "공학디자인 템플릿", img: templateImgEngineering },
  { type: "software", text: "소프트웨어디자인 템플릿", img: templateImgSofware },
];
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

const ControllerWrap = styled.div`
  width: 100%;
  position: relative;
  text-align: center;

  border: 1px dashed ${opendesign_style.color.grayScale.scale6};
  & .initWrap {
    & > ul {
      display: flex;
      // box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    }
    & > span {
      color: ${opendesign_style.color.grayScale.scale6};
    }
  }
  & :hover {
    background-color: #FAFAFA;
    & .initWrap {
      & > ul { display: flex; }
      & > span { color: ${opendesign_style.color.grayScale.scale6}; }
    }
  }
  .innerBox {
    display: flex;
    height: 45px;
    align-items: center;
    justify-content: center;
    list-style: none;
  }
`;
const NewController = styled.li`
  width: max-content;
  height: 29px;
  color: #FF0000;
  margin-left: 15px;
  &.first {
    margin-left: 0px;
  }
  &.complecated {
    display: flex;
    flex-direction: row;
    .txt{
      // border-bottom: 1.5px solid #FF0000;
    }
  }
  &.txt{
    border-bottom: 1.5px solid #FF0000;
  }
  line-height: 29px;
  padding-bottom: 1.5px;
  font-size: 15px;
  font-weight: 500;
  font-family: Noto Sans KR;
  text-align: center;
  cursor: pointer;
`;
class AddContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null, content: "", order: null
    };
  }
  addContent = async (type) => {
    if (type === "FILE") {
      await this.setState({ type, order: this.props.order, content: "", initClick: true });
      setTimeout(() => {
        this.setState({ initClick: false });
      }, 100);
    } else {
      await this.setState({ type, order: this.props.order, content: "" });
      this.returnData();
    }
  }
  changeType = () => {
    this.props.change && this.props.change();
  }
  returnData = async (data) => {
    if (data) {
      await this.setState({ type: null, order: this.props.order, content: "", initClick: false })
      this.props.getValue(data);
    } else {
      if (this.props.getValue) this.props.getValue(this.state);
    }
  }
  render() {
    return (
      <ControllerWrap>
        <div className="innerBox">
          <NewController
            className="first txt"
            onClick={() => this.addContent("FILE")}
            width="max-content"
            minWidth="116px"
            height="29px">

            파일 등록하기</NewController>

          <NewController
            className="txt"
            onClick={() => this.addContent("TEXT")}
            width="max-content"
            minWidth="134px"
            height="29px">

            텍스트 입력하기</NewController>

          <NewController
            onClick={() => this.addContent("LINK")}
            width="max-content" minWidth="134px" height="29px">
            하이퍼링크 등록하기</NewController>

          {this.props.order === 0 ?
            <NewController
              className="txt complecated"
              width="max-content"
              height="29px">
              <div
                onClick={this.changeType}
                className="txt">
                템플릿 선택하기</div>

            </NewController> : null}
        </div>
        {this.state.type === "FILE" &&
          <FileController
            item={this.state}
            getValue={this.returnData} />}
      </ControllerWrap>
    );
  }
};

class CreateDesignMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_project: 0, info_dialog: false, contents: [],
      crop: { unit: "%", width: 50, aspect: 1 },
      loading: false, designId: null, isMyDesign: false, editor: false,
      basic: false, additional: false, content: false, step: 0,
      showSearch: false,
      title: "",
      thumbnail: noimg, thumbnail_name: "", cropper: false, is_rectangle: false,
      categoryLevel1: this.props.userInfo.category1 || null,
      categoryLevel2: null,
      alone: true, members: [], addmem: [], delmem: [],
      license1: true, license2: true, license3: true,
      type: null, template: null,
    };
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.onCheckedLicense01 = this.onCheckedLicense01.bind(this);
    this.onCheckedLicense02 = this.onCheckedLicense02.bind(this);
    this.onCheckedLicense03 = this.onCheckedLicense03.bind(this);
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.checkInputForm = this.checkInputForm.bind(this);
    this.onKeyDownEnter = this.onKeyDownEnter.bind(this);
  }
  handleOnChangeThumbnail = async (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
    const regExp = /.(jpe?g|png|bmp)$/i;
    if (!regExp.test(file.name)) {
      await alert('파일의 확장자가 올바른지 확인해주세요.', "확인");
      return;
    }
    reader.onload = () => {
      var image = new Image();
      image.src = reader.result;
      image.onload = () => {
        this.setState({ is_rectangle: false, ratio: image.width / image.height, cropper: image.width / image.height !== 1.0 });
      }
    }
    reader.onloadend = () => {
      this.setState({ thumbnail: reader.result, thumbnail_name: file.name });
    }
    if (event.target.files[0]) {
      reader.readAsDataURL(file);
    }
  };
  checkInputForm = async () => {
    const warning = "필수 입력항목을 모두 입력하지 않아 다음 단계를 진행할 수 없습니다.\n";
    if (this.state.step === 0) {

      if (this.state.thumbnail === noimg) {
        await alert(warning + designImageText + "를 등록해주세요", "확인");
        return;
      }
      else if (this.state.title === "") {
        await alert(warning + "제목을 입력해주세요.", "확인");
        return;
      }
    }
    else if (this.state.step === 1) {
      if (this.state.categoryLevel1 === false) {
        await alert(warning + "카테고리를 선택해주세요.", "확인");
        return;
      }
      // else if ((this.state.alone === false && this.state.members.length === 0)) {
      //   await alert(warning + "멤버를 초대하지 않으면 '멤버를 초대하지 않습니다'를 체크해주세요.","확인");
      //   return;
      // }
      else if (this.state.license1 === false || this.state.license2 === false || this.state.license3 === false) {
        await alert(warning + "라이센스 사용에 동의해주세요.", "확인");
        return;
      }
    }
  };
  onChangeValueThumbnail = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
      await this.setState(obj);
      //console.log("thumbnail:", this.state);
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
    //this.checkFinishBasic();
  };
  onKeyDownEnter(event) {
    if (event.key === "Enter") {
      document.getElementById("explainBox").focus();
    }

  }
  onKeyPress = () => {
    this.checkFinishBasic();
  };
  checkFinishBasic = async () => {
    const { title, thumbnail, } = this.state;
    if (title && thumbnail !== noimg) {
      await this.setState({ basic: true });
    } else {
      await this.setState({ basic: false });
    }
  };
  checkFinishAdditional = async () => {
    const { categoryLevel1, alone, members, license1, license2, license3 } = this.state;
    if (categoryLevel1 != null && ((alone && members.length === 0) || (!alone && members.length > 0))) {
      await this.setState({ additional: true, content: true });
    } else {
      await this.setState({ additional: false });
    }
  };
  submit = () => {
    this.setState({ loading: true });
    const {
      contents, categoryLevel1, categoryLevel2, title, explanation,
      license1, license2, license3,
      thumbnail, thumbnail_name } = this.state;
    contents && contents.map(content => {
      delete content.initClick;
      return content;
    });
    let data = {
      uid: this.props.userInfo.uid,
      is_project: this.state.is_project,
      contents: contents, // [*]
      category_level1: categoryLevel1, category_level2: categoryLevel2, explanation: explanation,
      files: [{ key: "thumbnail[]", value: thumbnail, name: thumbnail_name }],
      is_commercial: license1 ? 1 : 0, is_display_creater: license2 ? 1 : 0, is_modify: license3 ? 1 : 0,
      members: {
        add: this.state.addmem, del: this.state.delmem
      },
      title: title,

      // added
      type: this.state.type, steps: this.state.steps,

    };

    let designId = null;
    this.props.CreateDesignRequest(data, this.props.token)
      .then(async (res) => {
        if (res.success) {
          designId = res.design_id;
          window.location.href = geturl() + `/designDetail/` + designId;
        }
      })
      .catch(err => alert(err + "와 같은 이유로 다음 단계로 진행할 수 없습니다."));
    this.setState({ loading: false });
  };
  onChangeCategory1 = async (event, { value }) => {
    await this.setState({ categoryLevel1: { value }.value });
    this.checkFinishAdditional();
  };
  onChangeCategory2 = async (event, { value }) => {
    await this.setState({ categoryLevel2: { value }.value })
    this.checkFinishAdditional();
  };
  onCheckedLicense01 = async () => {
    await this.setState({ license1: !this.state.license1 });
    this.checkFinishAdditional();
  };
  onCheckedLicense02 = async () => {
    await this.setState({ license2: !this.state.license2 });
    this.checkFinishAdditional();
  };
  onCheckedLicense03 = async () => {
    await this.setState({ license3: !this.state.license3 });
    this.checkFinishAdditional();
  };
  LeaveMeAlone = async () => {
    await this.setState({ alone: !this.state.alone, members: [] });
    this.checkFinishAdditional();
  };
  addMember = async (email, s_img, nick_name, uid) => {
    let member = { email: email, s_img: s_img, nick_name: nick_name, user_id: uid, uid: uid };
    await this.setState({
      members: this.state.members.concat(member),
      addmem: this.state.addmem.concat(member)
    });
    // console.log("members[]====", this.state.members);
    this.checkFinishAdditional();
    this.setState({ alone: false });
  };
  removeMember = async (user_id) => {
    // remove from addmem
    if (this.state.addmem.find(mem => { return mem.user_id === user_id })) {
      await this.setState({ addmem: this.state.addmem.filter(member => { return member.user_id !== user_id }) });
    } else { // remove if not in addmem
      await this.setState({ delmem: this.state.delmem.concat(this.state.members.filter((member) => { return user_id === member.user_id })) });
    }
    // display member list
    await this.setState({ members: this.state.members.filter((member) => { return user_id !== member.user_id }) });
    this.checkFinishAdditional();

    if (this.state.members.length === 0) {
      this.setState({ alone: true })
    }

  };
  closeCropper = () => {
    if (this.state.is_rectangle === false) {
      this.setState({ thumbnail_name: "", thumbnail: noimg });
    }
    this.setState({ cropper: false, crop: { unit: "%", width: 50, aspect: 1 } });
  };
  toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }));
  crop = async () => {
    // apply
    await this.toDataURL(this.state.croppedImageUrl)
      .then(async (dataUrl) => {
        this.setState({ thumbnail: dataUrl });
      })
    this.setState({ cropper: false });
  };
  onImageLoaded = image => {
    this.imageRef = image;
  };
  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };
  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };
  makeClientCrop = async (crop) => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, this.state.thumbnail_name/*"newFile.jpeg"*/);
      this.setState({ croppedImageUrl });
    }
  };
  getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  };
  openInfoToProject = () => {
    this.setState({ loading: true });
    // this.setState({ info_dialog: true });
    this.toProject();
  };
  onChangeFile = async (data) => {
    let copyContent = [...this.state.contents];
    delete data.initClick;
    delete data.target;
    await copyContent.splice(data.order, 1, data);
    copyContent = await Promise.all(
      copyContent.map(async (item, index) => {
        delete item.initClick;
        return item;
      })
    );
    await this.setState({ contents: copyContent });
  };
  onChangeValue = async (data, order) => {
    this.setState({ contents: update(this.state.contents, { [order]: { contents: { $set: data.content } } }) });
  };
  onDelete = async (order) => {
    if (await confirm("선택하신 컨텐츠를 삭제하시겠습니까?", "예", "아니오") === false) {
      return;
    }
    let copyContent = [...this.state.contents];
    for (var i = 0; i < copyContent.length; i++) {
      if (copyContent[i].order === order) {
        copyContent.splice(i, 1);
      }
    }
    for (i = 0; i < copyContent.length; i++) {
      copyContent[i].order = i;
    }
    await this.setState({ contents: copyContent });
  };
  onAddValue = async (data) => {
    let copyContent = [...this.state.contents];
    let copyData = { ...data };
    copyData.initClick = true;
    for (let item of copyContent) {
      if ((item.type === "FILE" && item.fileUrl == null) && (item.type === "FILE" && item.content === "")) {
        await copyContent.splice(item.order, 1, null);
      }
    }
    await copyContent.splice(copyData.order, 0, copyData);
    let newContent = copyContent.filter((item) => { return item !== null })
    newContent = await Promise.all(
      newContent.map(async (item, index) => {
        item.order = await index;
        delete item.target;
        if (item.type === "FILE") delete item.initClick;
        if (item.order !== copyData.order) delete item.initClick;
        return item;
      })
    );
    await this.setState({ contents: newContent });
  };
  onChangeGridData = async (data) => {
    ;
  }

  render() {

    // const { cropper, ratio, loading, members, is_project, contents, categoryLevel1, categoryLevel2 } = this.state;
    // const thumbnailURL = this.state.thumbnail;
    // console.log(this.props, this.state);


    const { loading } = this.state;

    return (<React.Fragment>

      {loading ? <Loading /> : null}



    </React.Fragment>);
  };
};

export default CreateDesignMobile;
