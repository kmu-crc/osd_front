import React, { Component } from 'react';
import styled from 'styled-components';
import noimg from "source/noimg.png";
import Cross from "components/Commons/Cross"

import addfile from "source/addfile.svg";
import addimage from "source/addimg.svg";
import docu from "source/doc.svg";
import download from "source/down.svg";

import who from "source/thumbnail.png";
import CardSourceDetailContainer from "containers/Items/CardSourceDetailContainer";
import ItemStepContainer from "containers/Items/ItemStepContainer";
// import { Rating } from 'semantic-ui-react'
import { FileUploadRequest } from "actions/Uploads";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
// import FileIcon from "components/Commons/FileIcon";
import market_style from "market_style";

const MessageBox = styled.div`
  padding:10px;

`
const CustomIcon = styled.div`
width:${props => props.width}px;
height:${props => props.height}px;
background-image:url(${props => props.imgURL});
background-repeat: no-repeat;
background-size: contain;
padding:${props => props.padding}px;
margin-right:${props => props.marginRight == null ? "13" : props.marginRight}px;
margin-left:${props => props.marginLeft == null ? "13" : props.marginLeft}px;
display:${props => props.isNon === true ? "none" : "block"}
`
const CustomButton = styled.div`
    min-width:${props => props.width}px;
    height:${props => props.height}px;
    border:1px solid ${props => props.borderColor == null ? "#d6d6d6" : props.borderColor};
    background-color:${props => props.backgroundColor};
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom:${props => props.marginBottom == null ? "0" : props.marginBottom}px;
    .text_{
      font-size:${props => props.fontSize}px;
      font-weight:500;
      color:${props => props.fontColor == null ? "white" : props.fontColor};
    }
    &:hover{
        // background-color:${props => props.onMouseColor};
        cursor:pointer;
    }
`

const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:60px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.normal3};
  background-color:#efefef;
  margin-right:21px;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
`;
const MessageWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:flex-end;
    flex-direction:${props => props.isMy ? "row-reverse" : "row"};
    margin-bottom:16px;
  .msg_bubble{
    max-width:400px;
    background-color:${props => props.isMy ? "#e9e9e9" : "#e9e9e9"};
    padding:4px 20px;
    display:flex;
    justify-content:center;
    align-items:flex-end;
    border-radius:30px;
    font-size:${market_style.font.size.small1};
  }
  .file_bubble{
    max-width:400px;
    background-color:${props => props.isMy ? "#d6d6d6" : "#EFEFEF"};
    padding:13px;
    display:flex;
    justify-content:center;
    align-items:flex-end;
    border-radius:5px;
    font-size:${market_style.font.size.small3};
  }
  .msg_time{
    width:max-content;
    height:max-content;
    font-size:${market_style.font.size.tiny2};
    margin-left:12px;
    margin-right:12px;
  }
  .timeWrapper{
    display:flex;
    flex-direction:column;
    align-items:${props => props.isMy ? "flex-end" : "flex-start"};
  }
`
const Wrapper = styled.div`

  width:100%;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:10px 30px;
  .profileBox{
    width:100%;
    
    display:flex;
    box-shadow: 3px 3px 5px #0000001A;
    border:1px solid #eaeaea;
    border-radius:20px;
    padding:30px 45px;
  }
  .flex-align-column {
    flex-direction: column;
  };
  .row{
    width:100%;
    margin-top:20px;
    margin-bottom:20px;
  }
`;
const ItemImages = styled.div`
  max-width: 396px;
  max-height: 354px;
  min-width: 396px;
  min-height: 354px;
  .main-image {
    overflow-x: auto;
    width: 100%;
    height: 100%; 
    background-image: url(${prop => prop.main});
    background-size: contain;
    background-position: center center;
    background-repeat:no-repeat;
  }
  .sub-images {
    margin-top: 30px;
    .sub {
      width: 102px;
      height: 86px;
      background-image: url(${prop => prop.main});
      background-size: cover;
      background-position: center center;
    }
    .nine-teen { margin-right: 19px; }
    .eight-teen { margin-right: 18px; }
  }
`;
const ItemInfo = styled.div`

  position: relative;
  margin-left: 45px;
  font-family: Noto Sans KR;
  background: #FFFFFF;
  width:100%;
  .flex{display:flex;}
  .spaceBetween{justify-content:space-between;align-items:center;}
  .title {
    font-size:${market_style.font.size.normal1};
    text-align: left;
    color: #000000;
    font-weight:500;
  }
  .marginBottom{
    margin-bottom:10px;
  }
  .expert {
    position:relative;
    display:flex;
    align-items:center;
    .who {
      width: 23px;
      height: 23px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
      background-image: url(${props => props.face});
      margin-right: 5px;
    }
    .nick{
      cursor:pointer;
      font-size:${market_style.font.size.small1};
      font-weight: 300;
      line-height: 29px;
      color: #060000;
    }
   .text {
    background-color: #FAFAFA;
    margin-top: 29px;
    height: 200px;
    width: 100%;
    padding: 10px;
    overflow: auto;
    text-align: left;
    font-weight: 300;
    font-size:${market_style.font.size.small1};
    line-height: 27px;
    letter-spacing: 0;
    color: #000000;
    opacity: 1;
    }
  }
  .price-and-score {
    font-weight: 500;
    font-size:${market_style.font.size.small1};
    display:flex;
    justify-content:flex-end;
    align-items:center;
    .price{
      margin-right:10px;
    }
  }

  .bottom {
    width:100%;
    display:flex;
    justify-content:flex-end;
    margin-top:20px;
  };
  .buttons {
    cursor: pointer;
    .button { 
      width: 150px;
      height: 30px;
      display:flex;
      justify-content:center;
      align-items:center;
      margin-left:20px;
      .text{
        font-size:${market_style.font.size.small1};
        font-weight: 500;
      }
      &.first { 
        color: #FFFFFF; 
        background: #FF0000; 
      }
      &.second {
        border: 1px solid red;
        color: #707070;
        background: #FFFFFF; 
        &.active{
          color: #FFFFFF;
          background: #FF0000;
          border: 1px solid #FFFFFF;
        }
      }
    }
  }
`;
const Introduction = styled.div`
  position: relative;
  height: 237px;
  opacity: 1;
  font-family: Noto Sans KR;
  margin-top:20px;
  .wrapItem{
    width:100%;
    height:100%;
    overflow:hidden;
    .flex{
      display:flex;
    }
    .title {
      font-size:${market_style.font.size.small1};
      font-weight: 500;
      text-align: left;
    }
    .text {
      width: 100%;
      margin-top: 10px;
      margin-bottom:25px;
      font-size:${market_style.font.size.small1};
      font-weight: 300;
      line-weight: 27px;
      text-align: left;
      overflow: hidden;
    }
    .gradient_box{
      display:${props => props.isLong ? "none" : "block"};
      position:absolute;
      left:0px;
      top:0px;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:flex-end;
      padding:10px;
      background:linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255,01.0));
    }
  }
  
  &:hover{
    .gradient_box{
      display:none;
    }
    .wrapItem {
      overflow: auto;
      overflow-y:overlay;
    }
  }
`;
const TagPiece = styled.div`
    width: max-content;
    min-width: max-content;
    background-color:#E9E9E96A;
    margin-right: 8px;
    margin-top: 5px;
    color: #707070;
    padding:5px 12px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    font-size:${market_style.font.size.small1};
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
    }
`;
const ItemContents = styled.div`
  // *{ border: 1px solid blue; }
  width: 100%;
  height:max-content;
  max-height: 585px;
  background: #FFFFFF;
  box-shadow: 3px 3px 5px #0000001A;
  border: 0.25px solid #eaeaea;
  border-radius: 20px;
  opacity: 1;
  padding: 10px 25px 20px 25px;

  .header {
    padding-bottom: 10px;
    border-bottom: 2px solid #EFEFEF; 
    .title {
      margin: auto;
      // margin-top: 10px;
      width: max-content;
      line-height: 27px;
      font-size: 18px;
      color: #000000;
      font-family: Noto Sans KR;
      font-weight: Medium;
      letter-spacing: 0px;
    }
  }
  .editor-wrapper {
    :hover {
      opacity: 0.95;
    }
    width: 99%;
    height: 510px;
    padding-top: 15px;
    word-wrap: break-word;
    overflow: hidden;
  }
  .message-wrapper {
    width: 100%;
    height: 300px;
    padding-top: 15px;
    word-wrap: break-word;
    overflow: hidden;
    margin-bottom:10px;
    &:hover {
      opacity: 0.95;
    }
    .message-detail{
      height:100%;
      overflow-y:auto;
      overflow-x:hidden;
    }
  }
  .iconWrapper{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-right:10px;
    cursor:pointer;
  }
  .font_small{
    height:20px;
    font-size:7px;
    color:#707070;
  }
  .who {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    background-image: url(${props => props.face});
    margin-right: 12px;
  }
  .flex{
    display:flex;
  }
  .nick{
    cursor:pointer;
    font-size:${market_style.font.size.small3};
    font-weight: 300;
    line-height: 29px;
    color: #060000;
  }
  .title {
    font-weight: 500;
    margin-bottom: 25px;
  }
  .margin_bottom_s{
    margin-bottom:10px;
  }
  .element {
    margin-top: 22px;
  }
  .element-reply {
    margin-top: 14px;
  }
  .first {
    margin-top: 50px; 
  }
  .input-wrapper {
     width: 735px;
     height: 88px;
     border-radius: 21px;
     background: #E9E9E9;
     padding: 15px;
     textarea {
      width: 705px;
      height: 58px;
      border: none;
      background: none;
      resize: none;
    }
  }
  .button {
    width: 205px;
    height: 88px;
    margin-left: 39px;
    border: 3px solid #E9E9E9;
    cursor: default;
    .text {
      margin-left: auto;
      margin-right: auto;
      margin-top: 32px;
      width: max-content;
      font-weight: 500;
      font-size:${market_style.font.size.small3};
      line-height: 25px;
      text-align: left;
    }
  }
  .detail_board{
    height:max-content;
    // border:1px solid black;
    // overflow:scroll;
    // scroll-y:hidden;
  }
`;

const Content = styled.div`
  width: ${props => props.width || 1094}px;
  height: ${props => props.height};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 30px 50px 20px 50px;
  font-family: Noto Sans KR;
  color: #000000;
  font-weight: 300;
  font-size:${market_style.font.size.normal1};
  line-height: 28px;
  text-align: left;
  position:relative;
  .iconWrapper{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-right:30px;
  }
  .font_small{
    height:20px;
    font-size:7px;
    color:#707070;
  }
  .who {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    background-image: url(${props => props.face});
    margin-right: 12px;
  }
  .flex{
    display:flex;
  }
  .nick{
    cursor:pointer;
    font-size:${market_style.font.size.small3};
    font-weight: 300;
    line-height: 29px;
    color: #060000;
  }
  .title {
    font-weight: 500;
    margin-bottom: 25px;
  }
  .margin_bottom_s{
    margin-bottom:15px;
  }
  .element {
    margin-top: 22px;
  }
  .element-reply {
    margin-top: 14px;
  }
  .first {
    margin-top: 50px; 
  }
  .input-wrapper {
     width: 735px;
     height: 88px;
     border-radius: 21px;
     background: #E9E9E9;
     padding: 15px;
     textarea {
      width: 705px;
      height: 58px;
      border: none;
      background: none;
      resize: none;
    }
  }
  .button {
    width: 205px;
    height: 88px;
    margin-left: 39px;
    border: 3px solid #E9E9E9;
    cursor: default;
    .text {
      margin-left: auto;
      margin-right: auto;
      margin-top: 32px;
      width: max-content;
      font-weight: 500;
      font-size:${market_style.font.size.small3};
      line-height: 25px;
      text-align: left;
    }
  }
  .detail_board{
    height:max-content;
    // border:1px solid black;
    // overflow:scroll;
    // scroll-y:hidden;
  }
  .hrLine{
    width:100%;
    border-top:2px solid #d6d6d6;
    margin-top:12px;
    margin-bottom:12px;
  }
`;

const MemberBox = styled.div`
    width:300px;
    height:200px;
    position:absolute;
    background-color:white;
    border:1px solid #EFEFEF;
    left:70px;
    top:40px;
    border-radius:15px;
    box-shadow: 5px 5px 10px #00000029;
    z-index:990;
    padding:10px;
    .close{
      width:100%;
      display:flex;
      justify-content:flex-end;
      cursor:pointer;
    }
    .member_list{
      width:100%;
      oveflow-y:auto;
    }
`
const PeerBox = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  margin-bottom:5px;
  .thumbnail{
    width:20px;
    height:20px;
    background-image: url(${prop => prop.imgURL});
    border-radius:20px;
    margin:5px;
  }
`

class ItemPurchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      file_url: null,
      isShowmember: false,
      isLike: this.props.like == null ? false : this.props.like,
      expandingContent: false, expandingReview: false, expandingBoard: false,
      isexpandingContent: false, isexpandingReview: false, isexpandingBoard: false,
      //for review detail
      reviewdetail: false, detail: null,
      message: "",
    }
    this.onClickLike = this.onClickLike.bind(this);
    this.buyThisItem = this.buyThisItem.bind(this);
    this.modifyThisItem = this.modifyThisItem.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.gotoChargePoint = this.gotoChargePoint.bind(this);
    this.purchaseThisItem = this.purchaseThisItem.bind(this);
    this.writeMessage = this.writeMessage.bind(this);
    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onCancelFile = this.onCancelFile.bind(this);
    this.onSendFile = this.onSendFile.bind(this);
  };
  componentWillUpdate(nextProps) {
    if (this.props.like !== nextProps.like) {
      this.setState({
        isLike: nextProps.like,
      })
    }
  };
  onCancelFile(event) {
    this.setState({ message: "", file: null, filename: null, file_url: null });
    document.getElementById("advicebox").disabled = false;
  }

  onSendFile = async event => {
    const s3path = await FileUploadRequest(this.state.file);
    const data = {
      payment_id: this.props.payment,
      from_id: this.props.userInfo.uid,
      message: "",
      filename: this.state.filename,
      file_url: s3path.path
    }
    await this.props.CreatePaymentMessageRequest(data, this.props.id, this.props.token);
    await this.props.GetPaymentMessageRequest(this.props.payment, 0);
    this.setState({ message: "", file: null, filename: null, file_url: null });
    document.getElementById("advicebox").disabled = false;
  }
  onFileChange = async event => {
    this.setState({ file: event.currentTarget.files });
    // console.log(event.currentTarget.files);
    // return;

    this.setState({
      // file_url: s3path.path,
      message: event.currentTarget.files[0].name,
      filename: event.currentTarget.files[0].name
    });
    document.getElementById("advicebox").disabled = true;
  }
  onClickLike(event) {
    const isLike = !this.state.isLike;
    this.setState({
      isLike: isLike,
    });
    isLike === false ?
      this.props.UnlikeProductRequest(this.props.id, this.props.token)
      :
      this.props.LikeProductRequest(this.props.id, this.props.token)
  };
  async buyThisItem(event) {
    if (!await confirm(`${this.props.item.price / (this.props.item.price > 9999 ? 10000 : 1)}${this.props.item.price > 9999 ? "만" : ""} point가 결제됩니다.`)) {
      event.preventDefault();
    } else {
      this.props.item.price > this.props.Point ? this.gotoChargePoint() : this.purchaseThisItem()
    }


  }
  async modifyThisItem() {
    // if (await confirm("아이템을 수정하시겠습니까?")) {
    window.location.href = `/productModify/${this.props.ItemDetail["item-id"]}`;
    // }
  }

  async selectMethod(index) {
    if (index !== 0)
      await alert("준비중입니다. 충전 후 결제해주세요.");
  }
  async gotoChargePoint() {
    if (await confirm("충전 금액이 부족합니다. 충전하러 이동하시겠습니까?")) {
      window.location.href = `/point`;
    }
  }
  purchaseThisItem() {
    this.props.purchase(this.props.item);
  }
  onChangeMessage(event) {
    this.setState({ message: event.target.value });
    document.getElementById("advicebox").focus();
  }
  async writeMessage() {
    console.log(this.props.id, this.props.token);
    const data = {
      payment_id: this.props.payment,
      from_id: this.props.userInfo.uid,
      message: this.state.message,
      filename: null,
      file_url: null
    }
    await this.props.CreatePaymentMessageRequest(data, this.props.id, this.props.token);
    await this.props.GetPaymentMessageRequest(this.props.payment, 0);
    await this.setState({ message: "" });
  }

  render() {
    console.log("ItemPurchase:", this.props);
    const { item, ContentHeader } = this.props;
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    // const { expandingContent, expandingReview, expandingBoard } = this.state;
    // const { score } = this.props.item;
    // let tag = this.props.ItemDetail.tag + "";

    // const RenderStar = () => {
    //   return <Rating size="massive" name="score" icon='star' defaultRating={parseInt(score, 10)} maxRating={5} disabled />
    // }
    const MemberListBox = () => {
      return (
        <MemberBox>
          <div onClick={() => { this.setState({ isShowmember: !this.state.isShowmember }) }} className="close">
            <Cross angle={45} color={"#000000"} weight={2} width={15} height={15} />
          </div>

          <div className="member_list">
            {
              item.members.map((item, index) => {
                return (
                  <PeerBox imgURL={item.s_img} key={index}>
                    <div className="thumbnail" />
                    <div className="name_label">{item.nick_name}</div>
                  </PeerBox>
                );
              })
            }
          </div>
        </MemberBox>
      );
    }

    console.log(item, ContentHeader);
    return item ?
      <React.Fragment>
        <Wrapper>
          {/* thumbnail and item-info */}
          <div className="profileBox">
            <ItemImages main={item.thumbnail ? item.thumbnail.l_img : noimg}>
              <div className="main-image" />
            </ItemImages>

            <ItemInfo face={item.who || who}>
              <div className="flex-align-column line">
                <div className="flex spaceBetween">
                  <div className="title">{this.props.ProductDetail == null ? item.title : this.props.ProductDetail.title}</div>
                  <div className="expert">
                    {/* {(this.props.userInfo && item.members && item.members.length > 0 && this.state.isShowmember)
                    ? <MemberListBox />
                    : null} */}
                    <div className="who" />
                    <div className="nick" onClick={() => this.setState({ isShowmember: !this.state.isShowmember })}>{item.userName}
                      {this.props.userInfo && item.members && item.members.length > 0
                        ?
                        `외 ${item.members.length}명` : null}
                    </div>
                  </div>
                </div>


                <Introduction id="Introduction">
                  <div className="wrapItem">
                    <div className="title">설명</div>
                    <div id="itemDescription" className="text"
                      dangerouslySetInnerHTML={{ __html: `${item.description || ""}` }}
                    />
                    <div className="title">유형</div>
                    <div className="text flex">
                      {item.type === 0 ? "디자인" : null}
                      {item.type === 1 ? "프로젝트" : null}
                      {item.type === 8 ? "강의" : null}
                      {item.type === 2 ? "기술자문/상담" : null}
                      {item.type === 3 ? "경험" : null}
                      {item.type === 4 ? "정보/데이터" : null}
                      {item.type === 5 ? "아이디어/노하우" : null}
                      {item.type === 6 ? "지적재산권" : null}
                      {item.type === 7 ? "제작품" : null}
                    </div>
                    {/* <div className="gradient_box" ></div> */}
                  </div>
                </Introduction>
              </div>
            </ItemInfo>

          </div>


          {/** -------------------- PROJECT ----------------------- */}
          {/* item-contents */}
          {ContentHeader &&
            ContentHeader.length > 0 &&
            ContentHeader.map(
              (head, index) =>
                <div key={index} className="row">
                  <ItemContents>
                    <div className="header">
                      <div className="title">
                        {head.name || "아이템 상세내용"}
                      </div>
                    </div>
                    <div className="editor-wrapper">
                      {head.editor_type === "project"
                        ? <ItemStepContainer editor={head.type === "copied" ? true : false} index={index} header={head} item={item} id={head.content_id} bought={item.bought} />
                        : null}
                      {head.editor_type === "blog"
                        ? <CardSourceDetailContainer bought={item.bought} isCancel cardId={item.cardId} />
                        : null}
                    </div>
                  </ItemContents>
                </div>)}

          {/** -------------------- ADVICE ----------------------- */}
          {
            item && (item.type === 2 || item.type === 7) ?
              <React.Fragment>
                <div className="header">
                  <div className="title margin_bottom_s">{item.type == 2 ? '자문/상담' : item.type == 7 ? '제작품 문의' : null}</div>
                </div>
                <div className="hrLine" />
                <div className="message-wrapper">
                  <div className="message-detail">
                    <MessageBox>
                      {
                        this.props.paymentMessageList &&
                        this.props.paymentMessageList.map((item, index) => {
                          const createtime = new Date(item.create_time);
                          const msgTime = createtime.getFullYear() + "."
                            + (createtime.getMonth() + 1) + "."
                            + createtime.getDate()
                            + "(" + week[createtime.getDay()] + ")"
                            + (createtime.getHours() <= 12 && createtime.getHours() >= 6 ? "오전" : "오후")
                            + (createtime.getHours() <= 9 ? '0' + createtime.getHours() : createtime.getHours())
                            + ":" + (createtime.getMinutes() <= 9 ? '0' + createtime.getMinutes() : createtime.getMinutes())
                          console.log(item.from_id, this.props.userInfo);
                          return (
                            <MessageWrapper isMy={item.from_id == this.props.userInfo.uid}>
                              {
                                console.log(
                                  String(item.filename).substring(String(item.filename).lastIndexOf('.'), String(item.filename).length))
                              }
                              {
                                item.filename == null ?
                                  <React.Fragment>
                                    <div className="msg_bubble">{item.message}</div>
                                    <div className="msg_time">{msgTime}</div>
                                  </React.Fragment>
                                  :
                                  item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".jpg" ||
                                    item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".JPG" ||
                                    item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".png" ||
                                    item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".PNG" ?
                                    <React.Fragment>
                                      <div className="file_bubble">
                                        {/* <FileImage imgURL={item.file_url}/> */}
                                        <img width={334} src={item.file_url} />
                                      </div>
                                      <div className="timeWrapper">
                                        <a href={item.file_url} download={item.filename} className="iconWrap">
                                          <CustomIcon width={21} height={21} imgURL={download} />
                                        </a>
                                        <div className="msg_time">{msgTime}</div>
                                      </div>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                      <a href={item.file_url} download={item.filename} className="iconWrap">
                                        {/* <FileIcon type={"application"} extension={item.filename.substring(item.filename.lastIndexOf('.'),item.filename.length)}/> */}
                                        <div className="file_bubble">
                                          <CustomIcon width={19} height={19} imgURL={docu} />{item.filename}
                                          <CustomIcon isNon={item.from_id === this.props.userInfo.uid} width={19} height={19} imgURL={download} />
                                        </div>
                                      </a>
                                      <div className="msg_time">{msgTime}</div>
                                    </React.Fragment>
                              }

                            </MessageWrapper>
                          )
                        })
                      }
                    </MessageBox>
                  </div>
                </div>
                <div className="hrLine" />
                <div className="flex margin_bottom_s">

                  <label htmlFor="addimg">
                    <input
                      hidden
                      type="file"
                      id="addimg"
                      name="source"
                      ref={ref => (this.input = ref)}
                      onChange={this.onFileChange}
                      accept="image/*"
                    />
                    <div className="iconWrapper">
                      <CustomIcon width={24} height={30} imgURL={addimage} />
                      <div className="font_small">이미지</div>
                    </div>
                  </label>
                  <label htmlFor="addfile">
                    <input
                      hidden
                      type="file"
                      id="addfile"
                      name="source"
                      ref={ref => (this.input = ref)}
                      onChange={this.onFileChange}
                    // accept=".pdf" 
                    />
                    <div className="iconWrapper">
                      <CustomIcon width={24} height={30} imgURL={addfile} />
                      <div className="font_small">파일</div>
                    </div>
                  </label>
                </div>
                <div style={{ display: "flex" }}>

                  {/* <Label htmlFor="file">
                  +</Label> */}

                  <InputText id="advicebox" value={this.state.message} onChange={this.onChangeMessage} />
                  {
                    this.state.file == null ?
                      <CustomButton id="sendmessage" width="100" height="100" backgroundColor="white" fontColor="#707070" fontSize="12" onClick={this.writeMessage}><div className="text_">보내기</div></CustomButton>
                      :
                      <React.Fragment>
                        <div>
                          <CustomButton id="sendfile" width="100" height="45" backgroundColor="white" fontColor="#707070" marginBottom="10" fontSize="12" onClick={this.onSendFile}>전송하기</CustomButton>
                          <CustomButton id="cancelbtn" width="100" height="45" backgroundColor="white" fontColor="#707070" fontSize="12" onClick={this.onCancelFile}>취소하기</CustomButton>
                        </div>
                      </React.Fragment>
                  }
                </div>
              </React.Fragment>
              : null
          }
          {/** -------------------- PRODUCT CONTENT ----------------------- */}
          {
            item && (item.type === 7) ?
              <React.Fragment>
                <div className="title">제작품 문의</div>
              </React.Fragment>
              : null
          }





          {/* <div className="line">
            <ItemImages main={item.thumbnail ? item.thumbnail.l_img : noimg}>
              <div className="main-image" />
            </ItemImages>

            <ItemInfo face={item.who || who}>
              <div className="flex-align-column line">

                <div className="title">{this.props.ProductDetail == null ? item.title : this.props.ProductDetail.title}</div>
                <div className="expert line">
                  {(this.props.userInfo && item.members && item.members.length > 0 && this.state.isShowmember)
                    ? <MemberListBox />
                    : null}
                  <div className="who" />
                  <div className="nick" onClick={() => this.setState({ isShowmember: !this.state.isShowmember })}>{item.userName}
                    {this.props.userInfo && item.members && item.members.length > 0
                      ?
                      `외 ${item.members.length}명` : null}
                  </div>
                </div>


                <Introduction id="Introduction">
                  <div className="wrapItem">
                    <div className="title">설명</div>
                    <div id="itemDescription" className="text"
                      dangerouslySetInnerHTML={{ __html: `${item.description || ""}` }}
                    />
                    <div className="gradient_box" ></div>
                  </div>
                </Introduction>
              </div>
            </ItemInfo>

          </div> */}
        </Wrapper>
      </React.Fragment>
      :
      <div>아이템정보를 가져오고 있습니다.</div>
  }
}

export default ItemPurchase;


