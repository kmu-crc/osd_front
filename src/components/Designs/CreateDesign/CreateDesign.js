import React, { Component } from "react";

import GridEditor from "components/Designs/GridEditor";
import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer";
import { geturl } from "config";

import noimg from "source/noimg.png"
import noface from "source/thumbnail.png";
import Cross from "components/Commons/Cross";
import CheckBox2 from "components/Commons/CheckBox";
import Logo from "source/logo.png"
import { Dropdown, Modal } from "semantic-ui-react";
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";

import styled from "styled-components";

const MainBanner = styled.div`
width: 100%;
  height:140px;
  display: flex;
  justify-content: center;
  .title{
    width: 196px;
    height: 37px;
    margin-top: 45px;
    font-size: 25px;
    font-family: Noto Sans KR;
    color: #707070;
    line-height: 37px;
    font-weight: 700;
  }

  @media only screen and (min-width : 780px) and (max-width:1440px) {
    align-items:flex-end;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    align-items:flex-end;
  }
`
const MainSection = styled.div`
display: flex;
flex-direction:row;
@media only screen and (min-width : 780px) and (max-width:1440px) {
    flex-direction:column;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
    flex-direction:column;
}
`

const NavMenu = styled.div`
min-width:433px;
height:300px;
position:relative;
.menuBox{
  width:325px;
  position: fixed;
  top:197px;
  margin-left:64px;    
  background-color:#F5F4F4;
  border-radius:5px;
}
.menuItem{
  height:62px;
  padding-left:36px;
  padding-top:18px;
  lineHeight:29px;
  border-bottom:${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
  cursor:pointer;
}
.deleteText{
  font-family:Noto Sans KR;
  font-size:20px;
  font-family:Noto Sans KR;
  font-weight:500;
  text-align:left;
  color:#FF0000;
  border-bottom:${props => props.borderBottom};
}

@media only screen and (min-width : 780px) and (max-width:1440px) {
  display:flex;
  justify-content:center;
  align-items:center;
  .menuBox{
    margin-left:0px;   
    position: static; 
  }
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  display:flex;
  justify-content:center;
  align-items:center;
  .menuBox{
    margin-left:0px;  
    position:static;  

  }
}
`
const MenuItem = styled.div`
    height:62px;
    padding-left:36px;
    padding-top:18px;
    lineHeight:29px;
    border-bottom:${props => props.borderBottom ? "none" : "2px solid #FFFFFF"};
    cursor:pointer;
    .MenuText {
      font-size:20px;
      font-family:Noto Sans KR;
      font-weight:300;
      text-align:left;
      color: ${props => props.selected ? "#FF0000" : "#707070"};
      border-bottom:${props => props.borderBottom};
    }
`;
//const Arrow = styled.span`
//    margin-left:70px;
//    font-size:15px;
//`
const InputBoard = styled.div`
// width:${window.innerWidth > 1920 ? 1422 + 'px' : 100 + '%'};
width:77%;
padding-bottom:100px;
margin-bottom:100px;
position:relative;
padding-top:45px;
border-radius:5px;
border:8px solid #F5F4F4;
.buttonBox{
  display: flex;
  margin-top: 20.54px;
  justifyContent: flex-end;
}

@media only screen and (min-width : 780px) and (max-width:1440px) {
  width:100%;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  width:100%;
}
`
const BackButton = styled.div`
      position:absolute;
      right:120px;
      bottom:35px;
      cursor:pointer;
      width:104.5px;
      height:44px;
      border-radius:5px;
      background-color:#FF0000;
      padding-top:6px;
      padding-left:15px;
      margin-right:53px;
`
const CompleteButton = styled.div`
      position:absolute;
      right:9px;
      bottom:35px;
      cursor:pointer;
      width:104.5px;
      height:44px;
      border-radius:5px;
      background-color:${props => props.isComplete ? "#FF0000" : "#707070"};
      padding-top:6px;
      padding-left:15px;
      margin-right:53px;
  `
const HRline = styled.div`

    width:95%;
    margin-top:60px;
    margin-bottom:67px;
    border-bottom:5px solid #F5F4F4;

  `

const BtnText = styled.p`
  width: 74px;
  padding: 0px;
  font-familty: Noto Sans KR;
  font-weight: 500;
  line-height: 29px;
  text-align: center;
  font-size: 20px;
  color: #FFFFFF;
  cursor:pointer;
`;

const PeerBox = styled.div`
  display:flex;
  margin-right:25px;
  margin-bottom:10px;
  .nameLabel{
    width:112px;
    height:29px;
    margin-top:1px;
    margin-left:10px;
    font-size:20px;
    font-weight:500;
    font-family:Noto Sans KR;
    color:#707070;
    text-align:left;
    line-height:29px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .closeButton{
    margin-top:7px;
    margin-left:14px;
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    margin-right:15px;
  }
`
const PeerIcon = styled.div`
  width:30px;
  height:30px;
  border-radius:50%;
  background: ${props => `url(${props.imageURL})`};
  background-size:cover;
  background-position:center center;
`
//---sectionbasic---//
const ContentsBox = styled.div`
  padding-left: 47px;
  display:flex;
  flex-direction:column;
  .title{
        min-width:100px;
        height:29px;
        text-align:left;
        font-size:20px;
        font-weight:500;
        line-height:29px;
        color:#707070;
  }
  .additionalTitle{
        min-width:167px;
        height:29px;
        text-align:left;
        font-size:20px;
        font-weight:500;
        line-height:29px;
        color:#707070;
  }
  @media only screen and (min-width : 780px) and (max-width:1440px) {
    justify-content:center;
    .title{
      margin-bottom:10px;
    }
    .additionalTitle{
      margin-bottom:10px;
    }
  }
  @media only screen and (min-width : 360px) and (max-width:780px) {
    .title{
      margin-bottom:10px;
    }
    .additionalTitle{
      margin-bottom:10px;
    }
  }
`
const ImageBox = styled.div`
    margin-left: 67px;
    min-width: 210px;
    min-height: 210px;
    max-width: 210px;
    max-height: 210px;
    border-radius:5px;
    background: ${props => `url(${props.imageURL})`};
    background-size:cover;
    background-position:center center;
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

@media only screen and (min-width : 780px) and (max-width:1440px) {
  flex-direction:column;
}
@media only screen and (min-width : 360px) and (max-width:780px) {
  flex-direction:column;
}
`
const TitleBox = styled.div`
display:flex;
  margin-top:96px;
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
`
const ExplainBox = styled.div`
margin-top: 103px;
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
      width:90%;
      margin-left: 0px;
    }
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
`
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
`
const InviteMemberBox = styled.div`
      display:flex;
      justify-content:flex-start;
      flex-direction:row;
      margin-top:120px;
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
`
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
`
const NoInviteMemberBox = styled.div`
  margin-left: 167px;
  margin-top: 30px;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  color: #707070;
  .textLabel {
    margin-left: 35px;
    vertical-align: top;
  }
`;
// const CheckBox = styled.input.attrs({ type: 'checkbox' })`
//   width: 25px;
//   height: 25px;
//   margin-right: 17px;
//   background-color: #EFEFEF !important;
//   border: 1px solid #707070 !important;
//   border-radius: 5px !important;  
// `;
const LicenseBox = styled.div`
  display: flex;
  margin-top: 22px;
  .licenseList {
    width: 645px;
    height: 143px;
    .licenseItem {
      margin-bottom: 30px;
      color: #707070;
      font-size: 20px;
      font-weight: 500;
      font-family: Noto Sans KR;
      .textLabel {
        margin-left: 35px;
        vertical-align: top;
      }

      @media only screen and (min-width : 780px) and (max-width:1440px) {
        flex-direction:column;
      }
      @media only screen and (min-width : 360px) and (max-width:780px) {
        flex-direction:column;
      }
`

const LoadingBox = styled.div`
  padding-top: 200px;
  .IconBox{
    width:100px;
    height:100px;
    margin:0 auto;
  }
  .loadingText{
    margin-top:20px;
    width:100%;
    font-family:Noto Sans KR;
    font-size:20px;
    text-align:center;
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
      }
`
const SectionContainer = styled.section`
  display: ${props => props.display};
`;
const CropperDialog = styled(Modal)`
  max-width: ${props => props.ratio < 1.0 ? 450 : 650}px;
  height: ${props => props.ratio < 1.0 ? 650 : 450}px;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0px 3px 6px #FF0000;
  .edit-step-name-button-container {
    display: flex;
    width: 576px;
    margin-left: auto;
    margin-right: 75px;
    margin-top: 38px;
  }
`

const emptyCategory = [{ value: 0, text: "" }]
const scrollmenu = [{ step: 0, txt: "기본 정보", tag: "#basics" }, { step: 1, txt: "부가 정보", tag: "#additional" }, { step: 2, txt: "단계/컨텐츠 정보", tag: "#contenteditor" }]

function Peer(props) {
  return (
    <PeerBox>
      <PeerIcon imageURL={props.s_img} />
      <div className="nameLabel">{props.nick_name}</div>
      <div className="closeButton"><Cross angle={45} color={"#707070"} weight={3} width={16} height={16} /></div>
    </PeerBox>
  );
}
class CreateDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: { unit: "%", width: 50, aspect: 1 },
      loading: false, designId: null, isMyDesign: false, editor: false,
      basic: false, additional: false, content: false, step: 0,
      showSearch: false, title: "", thumbnail: noimg, thumbnail_name: "", cropper: false, is_rectangle: false, grid: false,
      categoryLevel1: null, categoryLevel2: null, alone: false, members: [], addmem: [], delmem: [],
      license1: true, license2: true, license3: true,
    }
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.onCheckedLicense01 = this.onCheckedLicense01.bind(this);
    this.onCheckedLicense02 = this.onCheckedLicense02.bind(this);
    this.onCheckedLicense03 = this.onCheckedLicense03.bind(this);
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
    this.checkInputForm = this.checkInputForm.bind(this);
  }
  handleOnChangeThumbnail(event) {
    event.preventDefault();
    const reader = new FileReader();
    const file = event.target.files[0];
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
  }
  checkInputForm() {
    const warning = "필수 입력항목을 모두 입력하지 않아 다음 단계를 진행할 수 없습니다.\n";
    if (this.state.step === 0) {

      if (this.state.thumbnail == noimg) {
        alert(warning + "섬네일 이미지를 등록해주세요");
        return;
      }
      else if (this.state.title == "") {
        alert(warning + "제목을 입력해주세요.");
        return;
      }
    }
    else if (this.state.step === 1) {
      if (this.state.categoryLevel1 === false) {
        alert(warning + "카테고리를 선택해주세요.");
        return;
      }
      else if ((this.state.alone === false && this.state.members.length === 0)) {
        alert(warning + "멤버를 초대하지 않으면 '멤버를 초대하지 않습니다'를 체크해주세요.");
        return;
      }
      else if (this.state.license1 === false || this.state.license2 === false || this.state.license3 === false) {
        alert(warning + "라이센스 사용에 동의해주세요.");
        return;
      }
    }
  }
  onChangeValueThumbnail = async data => {
    let obj = {};
    if (data.target) {
      obj[data.target.name] = data;
      await this.setState(obj);
      console.log("thumbnail:", this.state);
    }
    this.checkFinishBasic();
  }
  onChangeValueTitle = async event => {
    if (event.target) {
      await this.setState({ title: event.target.value });
    }
    this.checkFinishBasic();
  }
  onChangeValueExplanation = async event => {
    if (event.target) {
      await this.setState({ explanation: event.target.value });
    }
    //this.checkFinishBasic();
  }
  onKeyPress = () => {
    this.checkFinishBasic();
  }
  gotoPrevStep = () => {
    this.setState({ step: this.state.step - 1 });
  }
  gotoNextStep = async () => {
    if (this.state.step === 1 && this.state.designId == null) {
      let designId = null;
      console.log(this.props);
      const { categoryLevel1, categoryLevel2, title, explanation, license1, license2, license3, thumbnail, thumbnail_name } = this.state;
      let data = {
        is_project: 1, uid: this.props.userInfo.uid,
        category_level1: categoryLevel1, category_level2: categoryLevel2, explanation: explanation,
        files: [{ key: "thumbnail[]", value: thumbnail, name: thumbnail_name }],
        is_commercial: license1, is_display_creater: license2, is_modify: license3,
        members: { add: this.state.addmem, del: this.state.delmem },
        title: title
      };

      this.setState({ loading: true });
      this.props.CreateDesignRequest(data, this.props.token)
        .then(async (res) => {
          if (res.success) {
            designId = res.design_id;
            this.props.GetDesignDetailRequest(designId, this.props.token)
              .then(() => {
                this.props.GetDesignBoardRequest(designId)
              })
            await this.setState({ content: true, designId: designId, grid: true, loading: false });
          }
        })
        .catch(err => alert(err + "와 같은 이유로 다음 단계로 진행할 수 없습니다."));
    }
    await this.setState({ step: this.state.step + 1 });
  }
  gotoStep = (menu) => {
    if (!this.state.basic && menu.step > 0) {
      this.checkInputForm();
      return;
      // alert("디자인 기본정보를 모두 작성하셔야 이동하실 수 있습니다.");
      // return;
    }
    if (!this.state.additional && menu.step > 1) {
      // alert("디자인 부가정보를 모두 작성하셔야 이동하실 수 있습니다.");
      this.checkInputForm();
      return;
    }
    if (this.state.basic && this.state.additional && menu.step <= 2) {
      if (this.state.step === 1 && this.state.designId == null) {
        let designId = null;
        console.log(this.props);
        // create design and next stage, next state will be load new design via grid editor
        const { categoryLevel1, categoryLevel2, title, explanation, license1, license2, license3, members, thumbnail, thumbnail_name } = this.state;
        let data = {
          is_project: 1,
          category_level1: categoryLevel1, category_level2: categoryLevel2, explanation: explanation,
          files: [{ key: "thumbnail[]", value: thumbnail, name: thumbnail_name }],
          is_commercial: license1, is_display_creater: license2, is_modify: license3, member: JSON.stringify(members), title: title
        };
        console.log(data);
        this.setState({ loading: true });
        this.props.CreateDesignRequest(data, this.props.token)
          .then(async (res) => {
            if (res.success) {
              designId = res.design_id;
              this.props.GetDesignDetailRequest(designId, this.props.token)
                .then(() => {
                  this.props.GetDesignBoardRequest(designId)
                })
              await this.setState({ content: true, designId: designId, grid: true, loading: false });
            }
          })
          .catch(err => alert(err + "와 같은 이유로 다음 단계로 진행할 수 없습니다."));
      }
    }
    this.setState({ step: menu.step });
  }
  checkFinishBasic = async () => {
    const { title, thumbnail, explanation } = this.state;
    if (title && thumbnail !== noimg) {
      await this.setState({ basic: true });
    } else {
      await this.setState({ basic: false });
    }
  }
  checkFinishAdditional = async () => {
    const { categoryLevel1, alone, members, license1, license2, license3 } = this.state;
    console.log("checkFinishAdditional", categoryLevel1, ((alone && members.length === 0) || (!alone && members.length > 0)), license1, license2, license3);
    if (categoryLevel1 != null && ((alone && members.length === 0) || (!alone && members.length > 0)) && license1 && license2 && license3) {
      await this.setState({ additional: true });
    } else {
      await this.setState({ additional: false });
    }
  }
  submit = () => {
    window.location.href = geturl() + `/designDetail/` + this.state.designId;
  }
  onChangeCategory1(event, { value }) {
    this.setState({ categoryLevel1: { value }.value });
    this.checkFinishAdditional();
  }
  onChangeCategory2(event, { value }) {
    this.setState({ categoryLevel2: { value }.value })
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
    // console.log("members[]====", this.state.members);
    this.checkFinishAdditional();
  }
  async removeMember(user_id) {
    // remove from addmem
    if (this.state.addmem.find(mem => { return mem.user_id === user_id })) {
      await this.setState({ addmem: this.state.addmem.filter(member => { return member.user_id !== user_id }) });
    } else { // remove if not in addmem
      await this.setState({ delmem: this.state.delmem.concat(this.state.members.filter((member) => { return user_id === member.user_id })) });
    }
    // display member list
    await this.setState({ members: this.state.members.filter((member) => { return user_id !== member.user_id }) });
    this.checkFinishAdditional();
  }
  closeCropper = () => {
    if (this.state.is_rectangle === false) {
      this.setState({ thumbnail_name: "", thumbnail: noimg });
    }
    this.setState({ cropper: false, crop: { unit: "%", width: 50, aspect: 1 } });
  }
  toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
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
  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(this.imageRef, crop, this.state.thumbnail_name/*"newFile.jpeg"*/);
      this.setState({ croppedImageUrl });
    }
  }
  getCroppedImg(image, crop, fileName) {
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
  }
  render() {
    let arrSummaryList = [];
    if (this.state.members.length > 0) {
      arrSummaryList = this.state.members.map((item, index) => {
        return (
          <div onClick={() => this.removeMember(item.user_id)} key={index}>
            <Peer s_img={item.s_img == null ? noface : item.s_img} nick_name={item.nick_name} />
          </div>
        )
      });
    }

    const { step } = this.state;
    const thumbnailURL = this.state.thumbnail;
    return (
      <div onClick={this.handleCloseMember}>
        <MainBanner>
          <div className="title">디자인 등록하기</div>
        </MainBanner>

        <MainSection>
          {/* scroll - menu */}
          <NavMenu>
            <div className="menuBox">
              {scrollmenu.map((menu, index) => {
                return (
                  <MenuItem selected={this.state.step === index} onClick={() => this.gotoStep(menu)} borderBottom={index + 1 === scrollmenu.length} key={menu.txt}>
                    <div className="MenuText">{menu.txt}</div>
                  </MenuItem>)
              })}
            </div>
          </NavMenu>

          {this.state.cropper &&
            <CropperDialog ratio={this.state.ratio} onKeyDown={null} open={this.state.cropper} onClose={null}>
              <div onClick={this.closeCropper} style={{ position: "absolute", width: "max-content", top: "10px", right: "15px" }}>
                <Cross angle={45} color={"#000000"} weight={2} width={32} height={32} />
              </div>
              <div style={{ width: "max-content", height: "20px", lineHeight: "20px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "20px", fontWeight: "500", textAlign: "left", marginTop: "45px", marginLeft: "75px" }}>섬네일 등록</div>
              <div style={{ width: "max-content", height: "15px", lineHeight: "15px", color: "#FF0000", fontFamily: "Noto Sans KR", fontSize: "15px", fontWeight: "300", textAlign: "left", marginTop: "5px", marginLeft: "75px" }}>[!]등록하신 섬네일이 정사각형이 아닙니다.</div>
              <div style={{ width: "max-content", height: "30px", lineHeight: "15px", color: "#707070", fontFamily: "Noto Sans KR", fontSize: "15px", fontWeight: "300", textAlign: "left", marginTop: "5px", marginLeft: "75px" }}>아래의 이미지에서 섬네일으로 등록하고자하는 영역을 <br /> 조절하여 등록하기를클릭하시면 섬네일이 등록됩니다.</div>
              <div style={{ marginLeft: "auto", marginRight: "auto", marginTop: "10px", width: this.state.ratio > 1.0 ? "370px" : "240px", height: this.state.ratio > 1.0 ? "240px" : "370px" }}>
                <ReactCrop
                  src={this.state.thumbnail} crop={this.state.crop}
                  onImageLoaded={this.onImageLoaded} onComplete={this.onCropComplete} onChange={this.onCropChange} />
              </div>
              <div style={{ marginTop: "10px", display: "flex" }} >
                <div style={{ marginLeft: "auto", textAlign: "middle", color: "#FF0000", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", lineHeight: "40px", borderBottom: "1.5px solid #FF0000", border: "1px splid black", cursor: "pointer" }} onClick={() => this.crop()} >등록하기</div>
                <div style={{ marginLeft: "25px", marginRight: "25px", width: "max-content", border: "none", background: "none", height: "40px", lineHeight: "40px", color: "#707070", paddingBottom: "1.5px", borderBottom: "1.5px solid #707070", fontSize: "20px", fontWeight: "500", fontFamily: "Noto Sans KR", textAlign: "left", cursor: "pointer" }} onClick={() => this.closeCropper()} >취소</div>
              </div>
            </CropperDialog>}

          {/* FORM */}
          <InputBoard>
            <SectionContainer display={step === 0 ? "block" : "none"}>
              {/* THUMBNAIL */}
              <ContentsBox>
                <ThumbnailBox>
                  <div className="title">섬네일<sup>*</sup></div>
                  <ImageBox imageURL={thumbnailURL == null ? noimg : thumbnailURL} />
                  <div className="findThumbnailBox">
                    <div className="findThumbnailBtn">
                      <label className="findThumbnailText" htmlFor="file">찾아보기</label>
                      <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
                    </div>
                    <div className="thumbnailExplainText">섬네일 사진은 대표적으로 보이게 되는 사진으로, <br />JPG/JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
                  </div>
                </ThumbnailBox>
                {/* TITLE */}
                <TitleBox>
                  <div className="title">제목<sup>*</sup></div>
                  <input onChange={this.onChangeValueTitle}
                    className="inputText" name="title" maxLength="100" placeholder="디자인의 제목을 입력해주세요. (100자 이내)" />
                </TitleBox>
                {/* EXPLANATION */}
                <ExplainBox>
                  <div className="title">설명</div>
                  <textarea onChange={this.onChangeValueExplanation} className="inputTextareaBox"
                    maxLength="350" placeholder="디자인 설명을 입력해주세요. (350자 이내)" />
                </ExplainBox>
              </ContentsBox>
            </SectionContainer>
            {/* CATEGORY */}
            <SectionContainer display={step === 1 ? "block" : "none"}>
              <ContentsBox>
                {this.props.category1.length > 0 ?
                  <CategoryBox>
                    <div className="additionalTitle">카테고리<sup>*</sup></div>
                    <CategoryDropDown onChange={this.onChangeCategory1} options={this.props.category1} selection ref="dropdown1" value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요(필수)" />
                    <CategoryDropDown id="category2" onChange={this.onChangeCategory2} options={this.props.category2[this.state.categoryLevel1 - 1] || emptyCategory} selection ref="dropdown2" value={this.state.categoryLevel2} />
                  </CategoryBox>
                  : <p>카테고리를 가져오고 있습니다.</p>}
                {/* INVITE MEMBER */}
                <InviteMemberBox>
                  <div className="additionalTitle">멤버 초대하기<sup>*</sup></div>
                  <div className="searchBox">
                    {this.state.alone ? undefined : <SearchDesignMemverContainer className="searchRect" addMember={this.addMember} />}
                  </div>
                  <div className="tipTitle">TIP</div>
                  <div className="tipDescription">
                    함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />
                    초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
                    디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.</div>
                </InviteMemberBox>
                <div>
                  {/* INVITED MEMBER */}
                  <InviteMemberListBox>
                    <div className="memberList">{arrSummaryList}</div>
                  </InviteMemberListBox>
                  {/* LEAVE ME ALONE */}
                  <NoInviteMemberBox>
                    <CheckBox2 onChange={this.LeaveMeAlone} />
                    <span className="textLabel">멤버를 초대하지 않습니다.</span>
                  </NoInviteMemberBox>
                </div>
                <HRline />
                {/* LICENSE */}
                <LicenseBox>
                  <div className="additionalTitle">라이센스</div>
                  <div className="licenseList">
                    <div className="licenseItem"><CheckBox2 checked={this.state.license1} onChange={this.onCheckedLicense01} /><span className="textLabel">상업적으로 이용이 가능합니다</span></div>
                    <div className="licenseItem"><CheckBox2 checked={this.state.license2} onChange={this.onCheckedLicense02} /><span className="textLabel">원작자를 표시합니다</span></div>
                    <div className="licenseItem"><CheckBox2 checked={this.state.license3} onChange={this.onCheckedLicense03} /><span className="textLabel">추후에 수정이 가능합니다</span></div>
                  </div>
                </LicenseBox>
              </ContentsBox>
            </SectionContainer>

            <SectionContainer display={step === 2 ? "block" : "none"}>
              <div>
              {this.state.grid && this.state.is_project === 1  
                ? <GridEditor editor={true} isMyDesign={true} design={this.props.DesignDetail} {...this.props} />
                : <LoadingBox><LoadingIconBox imageURL={Logo} /><div className="loadingText">단계/컨텐츠 에디터를 가져오고 있습니다...</div></LoadingBox>}
              </div>
            </SectionContainer>

            {/* buttons*/}
            <div className="buttonBox">
              {step === 0 && <React.Fragment>
                <CompleteButton onClick={this.state.basic ? this.gotoNextStep : this.checkInputForm} isComplete={this.state.basic}>
                  <BtnText>다음</BtnText>
                </CompleteButton>
              </React.Fragment>}
              {step === 1 && <React.Fragment>
                <BackButton onClick={this.gotoPrevStep}>
                  <BtnText>뒤로</BtnText>
                </BackButton>
                <CompleteButton onClick={this.state.additional ? this.gotoNextStep : this.checkInputForm} isComplete={this.state.additional}>
                  <BtnText>다음</BtnText>
                </CompleteButton>
              </React.Fragment>}
              {step === 2 && <React.Fragment>
                <BackButton onClick={this.gotoPrevStep}><BtnText>뒤로</BtnText></BackButton>
                <CompleteButton onClick={this.state.content ? this.submit : this.checkInputForm} isComplete={true}><BtnText>완료</BtnText></CompleteButton>
              </React.Fragment>}
            </div>
          </InputBoard>
        </MainSection>
      </div >
    )
  }
}

export default CreateDesign;
