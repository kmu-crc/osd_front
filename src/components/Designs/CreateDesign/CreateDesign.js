import React, { Component } from "react";

import GridEditor from "components/Designs/GridEditor";
import SearchDesignMemverContainer from "containers/Commons/SearchDesignMemberContainer";
import { geturl } from "config";

import noimg from "source/noimg.png"
import noface from "source/thumbnail.png";
import Cross from "components/Commons/Cross";
import Logo from "source/logo.png"
import { Dropdown } from "semantic-ui-react";

import styled from "styled-components";

const MainBanner = styled.div`
  width: 1920px;
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
    text-align: center;
  }
`
const MainSection = styled.div`
  display: flex;
  margin-top: 60px;
  margin-bottom: 111px;
`

const NavMenu = styled.div`
  width: 433px;
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
`
const MenuText = styled.div`
  font-size:20px;
  font-family:Noto Sans KR;
  font-weight:300;
  text-align:left;
  color: ${props => props.selected ? "#FF0000" : "#707070"};
  border-bottom:${props => props.borderBottom};
`
const Arrow = styled.span`
    margin-left:70px;
    font-size:15px;
`
const InputBoard = styled.div`
      width:1422px;
      height:${props => props.isModifyAnother === true ? "1750px" : "925px"};
      position:relative;
      padding-top:45px;
      border-radius:5px;
      border:8px solid #F5F4F4;

      .buttonBox{
        display: flex;
        margin-top: 20.54px;
        justifyContent: flex-end;
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
`;

const PeerBox = styled.div`
  display:flex;
  margin-right:50px;
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
`
const PeerIcon = styled.div`
  width:30px;
  height:30px;
  border-radius:50%;
  background: ${props => `url(${props.imageURL})`};
  background-size:cover;
  background-position:center center;
  background-color:#D6D6D6;
`
//---sectionbasic---//
const ContentsBox = styled.div`
    padding-left:47px;
    .title{
        width:167px;
        height:29px;
        text-align:left;
        font-size:20px;
        font-weight:500;
        line-height:29px;
        color:#707070;
    }
`
const ImageBox = styled.div`
    width:210px;
    height:210px;
    border-radius:5px;
    background: ${props => `url(${props.imageURL})`};
    background-size:cover;
    background-position:center center;
`
const ThumbnailBox = styled.div`
    display:flex;
    width:1200px;
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
`
const TitleBox = styled.div`
        width:1200px;
        display:flex;
        margin-top:96px;


        .inputText{
            width:505px;
            height:56px;
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
`
const ExplainBox = styled.div`

        width:1200px;
        margin-top:103px;
        display:flex;
        .inputTextareaBox{
            width:717.5px;
            height:244px;
            padding:22px 26px 34px 32px;
            font-family:Noto Sans KR;
            font-size:20px;
            font-weight:300;
            color:#707070;
            line-height:35px;
            text-align:left;
            outline:none;
            border:none;
            border-radius:5px;
            resize:none;
            background-color:#EFEFEF;
        }
`
//---additional--//
const CategoryBox = styled.div`
        display:flex;
        width:1200px;
`
const CategoryDropDown = styled(Dropdown)`
      width:410px;
      height:56px;     
      border-radius:5px;
      font-size:20px;
      background-color:#EFEFEF !important;
      margin-right:30px;
`
const InviteMemberBox = styled.div`
      display:flex;
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
`
const InviteMemberListBox = styled.div`
      margin-top:20px;
      margin-left:207px;
      .memberList{
        display:flex;
        flex-wrap:wrap;
        flex-direction:row;
        margin-bottom:34px;
      }
`
const NoInviteMemberBox = styled.div`
      margin-left:167px;
      margin-top:30px;
      font-size:20px;
      font-weight:500;
      font-family:Noto Sans KR;
      color:#707070;
      .textLabel{
        vertical-align:top;
      }
      
`
const CheckBox = styled.input.attrs({ type: 'checkbox' })`
      width:25px;
      height:25px;
      margin-right:17px;
      background-color:#EFEFEF !important;
      border:1px solid #707070 !important;
      border-radius:5px !important;  
`

const LicenseBox = styled.div`
      display:flex;
      margin-top:22px;
      .licenseList{
        width:645px;
        height:143px;
        .licenseItem{
          margin-bottom:30px;
          color:#707070;
          font-size:20px;
          font-weight:500;
          font-family:Noto Sans KR;
        }
        .textLabel{
          vertical-align:top;
        }
      }
`
const LoadingBox = styled.div`
      padding-top:200px;
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

`
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
const emptyCategory = [{ value: 0, text: "" }]
const scrollmenu = [{ step: 0, txt: "기본 정보", tag: "#basics" }, { step: 1, txt: "부가 정보", tag: "#additional" }, { step: 2, txt: "단계/컨텐츠 정보", tag: "#contenteditor" }]

function Peer(props) {
  return (
    <PeerBox>
      <PeerIcon imageURL={`url(${props.s_img || noface})`} />
      <div className="nameLabel">{props.nick_name}</div>
      <div className="closeButton"><Cross angle={45} color={"#707070"} weight={3} width={16} height={16} /></div>
    </PeerBox>
  );
}
class CreateDesign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false, designId: null, isMyDesign: false, editor: false,
      basic: false, additional: false, content: false, step: 0,
      showSearch: false, thumbnail: noimg, thumbnail_name: "", grid: false,
      categoryLevel1: null, categoryLevel2: null, alone: false, members: [], addmem: [], delmem: [], license1: false, license2: false, license3: false,
    }
    this.addMember = this.addMember.bind(this);
    this.removeMember = this.removeMember.bind(this);
    this.onCheckedLicense01 = this.onCheckedLicense01.bind(this);
    this.onCheckedLicense02 = this.onCheckedLicense02.bind(this);
    this.onCheckedLicense03 = this.onCheckedLicense03.bind(this);
    this.onChangeCategory1 = this.onChangeCategory1.bind(this);
    this.onChangeCategory2 = this.onChangeCategory2.bind(this);
    this.handleOnChangeThumbnail = this.handleOnChangeThumbnail.bind(this);
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
    this.checkFinishBasic();
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
      // create design and next stage, next state will be load new design via grid editor
      const { categoryLevel1, categoryLevel2, title, explanation, license1, license2, license3, members, thumbnail, thumbnail_name } = this.state;
      let data = {
        is_project: 1, uid: this.props.userInfo.uid,
        category_level1: categoryLevel1, category_level2: categoryLevel2, explanation: explanation,
        files: [{ key: "thumbnail[]", value: thumbnail, name: thumbnail_name }],
        is_commercial: license1, is_display_creater: license2, is_modify: license3,
        members: { add: this.state.addmem, del: this.state.delmem },
        title: title
      };
      // console.log(data);
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
      alert("디자인 기본정보를 모두 작성하셔야 이동하실 수 있습니다.");
      return;
    }
    if (!this.state.additional && menu.step > 1) {
      alert("디자인 부가정보를 모두 작성하셔야 이동하실 수 있습니다.");
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
    if (title && thumbnail !== noimg && explanation) {
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
                  <div onClick={() => this.gotoStep(menu)}
                    className="menuItem"
                    borderBottom={index + 1 === scrollmenu.length}
                    key={menu.txt}>
                    <MenuText selected={this.state.step === index}>{menu.txt}</MenuText>
                  </div>)
              })}
            </div>
          </NavMenu>

          {/* form */}
          <InputBoard>
            <SectionContainer display={step === 0 ? "block" : "none"}>
              {/* thumbnail */}
              <ContentsBox>
                <ThumbnailBox>
                  <div className="title">프로필 사진</div>
                  <ImageBox imageURL={thumbnailURL == null ? noimg : thumbnailURL} />
                  <div className="findThumbnailBox">
                    <div className="findThumbnailBtn">
                      <label className="findThumbnailText" htmlFor="file">찾아보기</label>
                      <input hidden onChange={this.handleOnChangeThumbnail} id="file" type="file" />
                    </div>
                    <div className="thumbnailExplainText">프로필 사진은 대표적으로 보이게 되는 사진으로, JPG/<br />JPEG/PNG/BMP 파일을 등록 가능합니다.</div>
                  </div>
                </ThumbnailBox>
                {/* title */}
                <TitleBox>
                  <div className="title">제목</div>
                  <input onChange={this.onChangeValueTitle}
                    className="inputText" name="title" maxLength="100" placeholder="디자인의 제목을 입력해주세요. (100자 이내)" />
                </TitleBox>
                {/* explanation */}
                <ExplainBox>
                  <div className="title">디자인 설명</div>
                  <textarea onChange={this.onChangeValueExplanation} className="inputTextareaBox"
                    maxLength="1000" placeholder="디자인 설명을 입력해주세요. (1000자 이내)" />
                </ExplainBox>
              </ContentsBox>
            </SectionContainer>
            {/* category */}
            <SectionContainer display={step === 1 ? "block" : "none"}>
              <ContentsBox>
                {this.props.category1.length > 0 ?
                  <CategoryBox>
                    <div className="title">카테고리</div>
                    <CategoryDropDown onChange={this.onChangeCategory1}
                      options={this.props.category1} selection ref="dropdown1" value={this.state.categoryLevel1} placeholder="카테고리를 선택해주세요" />
                    <CategoryDropDown id="category2" onChange={this.onChangeCategory2}
                      options={this.state.categoryLevel1 === 0 ? emptyCategory : this.props.category2[this.state.categoryLevel1 - 1]} selection ref="dropdown2" value={this.state.categoryLevel2} />
                  </CategoryBox>
                  : <p>카테고리를 가져오고 있습니다.</p>}
                {/* invite member*/}
                <InviteMemberBox>
                  <div className="title">멤버 초대하기</div>
                  <div className="searchBox">
                    {this.state.alone ? undefined : <SearchDesignMemverContainer className="searchRect" addMember={this.addMember} />}
                  </div>
                  <div className="tipTitle">TIP</div>
                  <div className="tipDescription">
                    함께 디자인을 만들어 갈 멤버를 초대해 주세요.<br />
                    초대된 멤버는 함께 정보에 뜨며, 수정할 권한이 주어집니다.<br />
                    디자인 개설자가 언제든 추후에 멤버 리스트를 수정할 수 있습니다.   </div>
                </InviteMemberBox>
                <div>
                  {/* invited member*/}
                  <InviteMemberListBox>
                    <div className="memberList">
                      {arrSummaryList}
                    </div>
                  </InviteMemberListBox>
                  {/* LEAVE ME ALONE */}
                  <NoInviteMemberBox>
                    <CheckBox onChange={this.LeaveMeAlone} />
                    <span className="textLabel">멤버를 초대하지 않습니다.</span>
                  </NoInviteMemberBox>
                </div>
                <HRline />
                {/* license*/}
                <LicenseBox>
                  <div className="title">라이센스</div>
                  <div className="licenseList">
                    <div className="licenseItem">
                      <CheckBox onChange={this.onCheckedLicense01} /><span className="textLabel">상업적으로 이용이 가능합니다</span></div>
                    <div className="licenseItem">
                      <CheckBox onChange={this.onCheckedLicense02} /><span className="textLabel">원작자를 표시합니다</span></div>
                    <div className="licenseItem">
                      <CheckBox onChange={this.onCheckedLicense03} /><span className="textLabel">추후에 수정이 가능합니다</span></div>
                  </div>
                </LicenseBox>
              </ContentsBox>
            </SectionContainer>

            <SectionContainer display={step === 2 ? "block" : "none"}>
              <div>{this.state.grid ? <GridEditor editor={true} isMyDesign={true} design={this.props.DesignDetail} {...this.props} /> :
                <LoadingBox><LoadingIconBox imageURL={Logo} /><div className="loadingText">단계/컨텐츠 에디터를 가져오고 있습니다...</div></LoadingBox>}</div>
            </SectionContainer>

            {/* buttons*/}
            <div className="buttonBox">
              {step === 0 && <React.Fragment>
                <CompleteButton onClick={this.state.basic ? this.gotoNextStep : undefined} isComplete={this.state.basic}>
                  <BtnText>다음</BtnText>
                </CompleteButton>
              </React.Fragment>}
              {step === 1 && <React.Fragment>
                <BackButton onClick={this.gotoPrevStep}>
                  <BtnText>뒤로</BtnText>
                </BackButton>
                <CompleteButton onClick={this.state.additional ? this.gotoNextStep : undefined} isComplete={this.state.additional}>
                  <BtnText>다음</BtnText>
                </CompleteButton>
              </React.Fragment>}
              {step === 2 && <React.Fragment>
                <BackButton onClick={this.gotoPrevStep}><BtnText>뒤로</BtnText></BackButton>
                <CompleteButton onClick={this.state.content ? this.submit : undefined} isComplete={true}><BtnText>완료</BtnText></CompleteButton>
              </React.Fragment>}
            </div>
          </InputBoard>
        </MainSection>
      </div>
    )
  }
}

export default CreateDesign;
