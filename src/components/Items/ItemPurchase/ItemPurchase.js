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
const MessageBox = styled.div`
  padding:10px;
`
const CustomIcon =styled.div`
width:${props => props.width}px;
height:${props => props.height}px;
background-image:url(${props=>props.imgURL});
background-repeat: no-repeat;
background-size: contain;
padding:${props => props.padding}px;
margin-right:${props=>props.marginRight==null?"13":props.marginRight}px;
margin-left:${props=>props.marginLeft==null?"13":props.marginLeft}px;
display:${props=>props.isNon===true?"none":"block"}
`
const CustomButton = styled.div`
    min-width:${props => props.width}px;
    min-height:${props => props.height}px;
    border:1px solid ${props => props.borderColor==null?"#d6d6d6":props.borderColor};
    background-color:${props => props.backgroundColor};
    // background-image:url(${props=>props.imgURL})
    display:flex;
    justify-content:center;
    align-items:center;
    margin-bottom:${props=>props.marginBottom==null?"0":props.marginBottom}px;
    .text_{
      font-size:${props => props.fontSize}pt;
      font-weight:500;
      color:${props => props.fontColor==null?"white":props.fontColor};
    }
    &:hover{
        // background-color:${props => props.onMouseColor};
        cursor:pointer;
    }
`

const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:100px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#efefef;
  margin-right:21px;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
`;
const MessageWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:${props=>props.isMy?"flex-start":"flex-start"};
    align-items:flex-end;
    flex-direction:${props=>props.isMy?"row-reverse":"row"};
    margin-bottom:16px;
  .msg_bubble{
    max-width:400px;
    background-color:${props=>props.isMy?"#d6d6d6":"#EFEFEF"};
    padding:13px;
    display:flex;
    justify-content:center;
    align-items:flex-end;
    border-radius:30px;
    font-size:17px;
  }
  .file_bubble{
    max-width:400px;
    background-color:${props=>props.isMy?"#d6d6d6":"#EFEFEF"};
    padding:13px;
    display:flex;
    justify-content:center;
    align-items:flex-end;
    border-radius:5px;
    font-size:17px;
  }
  .msg_time{
    width:max-content;
    height:25px;
    font-size:10px;
    margin-left:12px;
    margin-right:12px;
  }
  .timeWrapper{
    display:flex;
    flex-direction:column;
    align-items:${props=>props.isMy?"flex-end":"flex-start"};
  }
`
const Wrapper = styled.div`
  // * { border: 1px solid red; };
  margin-top: 50px;
  margin-bottom:50px;
  .line { 
    display: flex; 
  };
  .flex-align-column {
    flex-direction: column;
  };
`;
const ItemImages = styled.div`
  width: 600px;
  height: 600px;
  // margin-left: 25px; 
  .main-image {
    border: 1px solid #EFEFEF;
    overflow-x: auto;
    width: 100%;
    height: 100%; 
    background-image: url(${prop => prop.main});
    background-size: cover;
    background-position: center center;
    border-radius: 20px;
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
  margin-left: 50px;
  width: 948px;
  height: 600px;
  font-family: Noto Sans KR;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px; 
  padding:35px;
  .title {
    font-size: 23px;
    // line-height: 50px;
    text-align: left;
    color: #000000;
  }
  .expert {
    margin-top: 19px;
    position:relative;
    .who {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background-size: cover;
      background-position: center center;
      background-image: url(${props => props.face});
      margin-right: 26px;
    }
    .nick{
      cursor:pointer;
      font-size: 17px;
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
    font-size: 15px;
    line-height: 27px;
    letter-spacing: 0;
    color: #000000;
    opacity: 1;
    }
  }
  .price-and-score {
    margin-left: auto;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 20px;
    line-height: 29px;
    text-align: left;
    color: #060000;
  }
  .options {
    margin-top: 50px;
    .text {
      width: max-content;
      text-align: left;
      font-weight: 500;
      font-size: 20px;
      line-height: 29px;
      letter-spacing: 0;
      color: #000000;
      opacity: 1;
    }
    .combo-wrapper {
      margin-bottom: 28px;
      .box {
        border-radius: 21px;
        background-color: #E9E9E9;
        height: 43px;
        margin-left: 41px;
      }
      .WIDTH360 { width: 360px; }
      .WIDTH178 { width: 178px; }
    }
  }
  .bottom {
    width: max-content;
    position: absolute;
    right: 35px;
    bottom: 15px;
  };
  .buttons {
    cursor: pointer;
    .button { 
      width: 213px;
      height: 70px;
      .text{
        width: max-content;
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;
        line-height: 37px;
        font-size: 25px;
        font-weight: 500;
      }
      &.first { 
        color: #FFFFFF; 
        background: #FF0000; 
        margin-right: 27px; 
      }
      &.second {
        border: 1px solid red;
        color: #FF0000;
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
  height: 460px;
  opacity: 1;
  font-family: Noto Sans KR;
  .wrapItem{
    width:100%;
    height:100%;
    overflow:hidden;
    .flex{
      display:flex;
    }
 
    .title {
      margin-top: 10px;
      font-size: 19px;
      font-weight: 500;
      line-height: 28px;
      text-align: left;
    }
    .itemDescription{
    }
    .text {
      width: 100%;
      margin-top: 15px;
      margin-bottom:29px;
      font-size: 15px;
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
    }
  }
`;
// const TagPiece = styled.div`
//     width: max-content;
//     min-width: 30px;
//     background-color: #EFEFEF;
//     margin-right: 5px;
//     margin-bottom: 5px;
//     color: #707070;
//     padding: 5px;
//     padding-left: 10px;
//     padding-right: 10px
//     border-radius: 15px;
//     display: flex;
//     justify-content: space-between;
//     .close {
//         margin-left: 10px;
//         width: max-content;
//         height: max-content;
//         padding: 0px 2px;
//     }
// `;

// const CoverGrident = styled.div`
//   display:${props => props.isGradient ? "block" : "none"};
//   width:100%;
//   height:100%;
//   position:absolute;
//   z-index:900;
//   left:0;
//   top:0;
//   background:${props => props.isGradient ? "linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255,1.0))" : null};
// `

// const Board = styled.div`
//   // *{border: 1px solid red;}
//   width: 1600px;
//   height: ${props => props.height};
//   background: #FFFFFF;
//   box-shadow: 5px 5px 10px #00000029;
//   border-radius: 20px;
//   opacity: 1;
//   padding: 45px 25px 20px 30px; // 90px 51px 45px 60px;
//   font-family: Noto Sans KR;
//   color: #000000;
//   font-weight: 300;
//   font-size: 19px;
//   line-height: 28px;
//   text-align: left;
//   position:relative;
//   .title {
//     font-weight: 500;
//   }
//   .element {
//     margin-top: 22px;
//   }
//   .element-reply {
//     margin-top: 14px;
//     padding:10px;
  
//   .first {
//     margin-top: 50px; 
//   }
//   .input-wrapper {
//      width: 735px;
//      height: 88px;
//      border-radius: 21px;
//      background: #E9E9E9;
//      padding: 15px;
//      textarea {
//       width: 705px;
//       height: 58px;
//       border: none;
//       background: none;
//       resize: none;
//     }
//   }
//   .button {
//     width: 205px;
//     height: 88px;
//     margin-left: 39px;
//     border: 3px solid #E9E9E9;
//     cursor: default;
//     .text {
//       margin-left: auto;
//       margin-right: auto;
//       margin-top: 32px;
//       width: max-content;
//       font-weight: 500;
//       font-size: 17px;
//       line-height: 25px;
//       text-align: left;
//     }
//   }
// `;
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
  font-size: 19px;
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
    font-size: 17px;
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
      font-size: 17px;
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
// const Label = styled.label`
//     min-width:35px;
//     min-height:35px;
//     border:1px solid #dddddd;
//     font-weight:500;
//     color:#707070;
//     text-align:center;
//     margin:5px;
//     border-radius:20px;
//     &:hover{
//         cursor:pointer;
//     }
// `
// const ExpandingButton = styled.div`
//     width:${props => props.width}px;
//     height:30px;
//     margin-top:10px;
//     // margin-bottom:10px;
//     display:flex;
//     justify-content:center;
//     .button{
//         width:100%;
//         height:100%;
//         // width:80%;
//         // height:100%;
//         display:flex;
//         justify-content:center;
//         align-items:cfius:20px;
//         // background-color:#707070;
//         cursor:pointer;
//     }
//     .font{
//         font-size:15px;
//         color:gray;
//     }
// `;

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
      file:null,
      file_url:null,
      isShowmember: false,
      isLike: this.props.like == null ? false : this.props.like,
      expandingContent: false, expandingReview: false, expandingBoard: false,
      isexpandingContent: false, isexpandingReview: false, isexpandingBoard: false,
      //for review detail
      reviewdetail: false, detail: null,
      message:"",
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
  onCancelFile(event){
    this.setState({message:"",file:null,filename:null,file_url:null});
    document.getElementById("advicebox").disabled=false;
  }
  
  onSendFile = async event => {
    const s3path = await FileUploadRequest(this.state.file);
    const data = {
      payment_id:this.props.payment,
      from_id:this.props.userInfo.uid,
      message:"",
      filename:this.state.filename,
      file_url:s3path.path
    }
    await this.props.CreatePaymentMessageRequest(data,this.props.id,this.props.token);
    await this.props.GetPaymentMessageRequest(this.props.payment,0);
    this.setState({message:"",file:null,filename:null,file_url:null});
    document.getElementById("advicebox").disabled=false;
  }
  onFileChange = async event => {
    this.setState({file:event.currentTarget.files});
    // console.log(event.currentTarget.files);
    // return;
    
    this.setState({
      // file_url: s3path.path,
      message: event.currentTarget.files[0].name,
      filename:event.currentTarget.files[0].name
    });
    document.getElementById("advicebox").disabled=true;
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
    if (!await confirm(`${this.props.item.price / 1000}천원이 결제됩니다.`)) {
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
  onChangeMessage(event){
    this.setState({message:event.target.value});
    document.getElementById("advicebox").focus();
  }
  async writeMessage(){
    console.log(this.props.id,this.props.token);
    const data = {
      payment_id:this.props.payment,
      from_id:this.props.userInfo.uid,
      message:this.state.message,
      filename:null,
      file_url:null
    }
    await this.props.CreatePaymentMessageRequest(data,this.props.id,this.props.token);
    await this.props.GetPaymentMessageRequest(this.props.payment,0);
    await this.setState({message:""});
  }

  render() {
    console.log(this.props);
    const item = this.props.item;
    const week=["일","월","화","수","목","금","토"];
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
    // const Type_productContent=()=>{
    //   return <Content
    //   id="contents_rgn"
    //   style={{ marginTop: "15px", overflow: "hidden" }}
    //   // height={expandingContent ? "100%" : "400px"}
    //   width={1600}>

    // </Content>
    // }
    // const Type_adviceContent=()=>{
    //   return <Content
    //   id="contents_rgn"
    //   style={{ marginTop: "15px", overflow: "hidden" }}
    //   // height={expandingContent ? "100%" : "400px"}
    //   width={1600}>

    // </Content>
    // }

    // const Type_closeContent=()=>{
    //   return <Content
    //   id="contents_rgn"
    //   style={{ marginTop: "15px", overflow: "hidden" }}
    //   // height={expandingContent ? "100%" : "400px"}
    //   width={1600}>

    // </Content>
    // }
    return item ?
      <React.Fragment>
        <Wrapper>
          {/* thumbnail and item-info */}
          <div className="line">
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

          </div>

          {/* item-contents */}
          <div style={{ marginTop: "35px" }}>
          <Content
            face={this.props.userInfo.thumbnail.s_img}
            id="contents_rgn"
            style={{ marginTop: "15px", overflow: "hidden" }}
            width={1600}>
            
{/** -------------------- CLOSE CONTENT ----------------------- */}
            {item&&(item.type===0||item.type===3||item.type===4||item.type===5||item.type===6)?
            <React.Fragment>
                  <div className="title">아이템 상세내용</div>
                  {item && item.upload_type === "blog"? <div className="detail_board" id="detail_board">
                      <CardSourceDetailContainer bought={item.bought} isCancel  cardId={item.cardId} />
                    </div>
                    : null}
                  {item && item.upload_type === "project"?
                    <div className="detail_board" id="detail_board">
                      <ItemStepContainer item={item} id={item["item-id"]} bought={item.bought} />
                    </div>
                    : null}
            </React.Fragment>
            :null}
{/** -------------------- PROJECT ----------------------- */}
            {item&&(item.type===1)? 
            <React.Fragment>
              <div className="title">아이템 상세내용</div>
                {item && item.upload_type === "blog"? 
                  <div className="detail_board" id="detail_board">
                    <CardSourceDetailContainer bought={item.bought} isCancel cardId={item.cardId} />
                  </div>
                  : null}
                {item && item.upload_type === "project"?
                  <div className="detail_board" id="detail_board">
                    <ItemStepContainer item={item} id={item["item-id"]} bought={item.bought} />
                  </div>
                  : null}
            </React.Fragment>
            :null}
{/** -------------------- ADVICE ----------------------- */}
            {item&&(item.type===2)?
            <React.Fragment>

              <div className="title margin_bottom_s">자문/상담</div>
              <div className="flex">
              <div className="who" />
              <div className="nick" onClick={() => this.setState({ isShowmember: !this.state.isShowmember })}>{this.props.userInfo.nickName}</div>
              </div>
              <div className="hrLine"/>
              <MessageBox>
                {
                  this.props.paymentMessageList&&
                  this.props.paymentMessageList.map((item,index)=>{
                    const createtime = new Date(item.create_time);
                    const msgTime = createtime.getFullYear()+"."
                    +(createtime.getMonth()+1)+"."
                    +createtime.getDate()
                    +"("+week[createtime.getDay()]+")"
                    +(createtime.getHours()<=12&&createtime.getHours()>=6?"오전":"오후")
                    +(createtime.getHours()<=9?'0'+createtime.getHours():createtime.getHours())
                    +":"+(createtime.getMinutes()<=9?'0'+createtime.getMinutes():createtime.getMinutes())
                    return( 
                    <MessageWrapper isMy={item.from_id===this.props.userInfo.uid}> 
                    {
                      console.log(
                        String(item.filename).substring(String(item.filename).lastIndexOf('.'),String(item.filename).length))
                    }
                    {
                      item.filename==null?
                      <React.Fragment>
                          <div className="msg_bubble">{item.message}</div>      
                          <div className="msg_time">{msgTime}</div>    
                      </React.Fragment>
                      :
                      item.filename.substring(item.filename.lastIndexOf('.'),item.filename.length)===".jpg"||
                      item.filename.substring(item.filename.lastIndexOf('.'),item.filename.length)===".JPG"||
                      item.filename.substring(item.filename.lastIndexOf('.'),item.filename.length)===".png"||
                      item.filename.substring(item.filename.lastIndexOf('.'),item.filename.length)===".PNG"?
                      <React.Fragment>
                        <div className="file_bubble">
                            {/* <FileImage imgURL={item.file_url}/> */}
                            <img width={334} src={item.file_url}/>
                        </div>
                        <div className="timeWrapper">
                          <a href={item.file_url} download={item.filename} className="iconWrap">
                            <CustomIcon width={21} height={21} imgURL={download}/>
                          </a>
                          <div className="msg_time">{msgTime}</div>
                        </div>    
                      </React.Fragment>
                      :
                      <React.Fragment>
                        <a href={item.file_url} download={item.filename} className="iconWrap">
                          {/* <FileIcon type={"application"} extension={item.filename.substring(item.filename.lastIndexOf('.'),item.filename.length)}/> */}
                          <div className="file_bubble">
                            <CustomIcon width={19} height={19} imgURL={docu}/>{item.filename}
                            <CustomIcon isNon={item.from_id===this.props.userInfo.uid} width={19} height={19} imgURL={download}/>
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
              <div className="hrLine"/>
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
                  <CustomIcon width={24} height={30} imgURL={addimage}/>
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
                  <CustomIcon width={24} height={30} imgURL={addfile}/>
                  <div className="font_small">파일</div>
                </div>
              </label>
              </div>
              <div style={{display:"flex"}}>
                
              {/* <Label htmlFor="file">
                +</Label> */}

              <InputText id="advicebox" value={this.state.message} onChange={this.onChangeMessage}/>
              {
                this.state.file==null?
                <CustomButton id="sendmessage" width="100" height="100" backgroundColor="white" fontColor="#707070" fontSize="12" onClick={this.writeMessage}><div className="text_">보내기</div></CustomButton>
                :
                <React.Fragment>
                  <div>
                  <CustomButton id="sendfile" width="100" height="45" backgroundColor="white" fontColor="#707070" marginBottom="10"  fontSize="12" onClick={this.onSendFile}>전송하기</CustomButton>
                  <CustomButton id="cancelbtn" width="100" height="45" backgroundColor="white" fontColor="#707070" fontSize="12" onClick={this.onCancelFile}>취소하기</CustomButton>
                  </div>
                </React.Fragment>
              }
              </div>
            </React.Fragment>
            :null}
{/** -------------------- PRODUCT CONTENT ----------------------- */}
            {item&&(item.type===7)?
            <React.Fragment>
                    <div className="title">제작품 문의</div>
            </React.Fragment>
            :null}

            </Content>
          </div>
{/** ---------------------------------------------------------- */}

        </Wrapper>
      </React.Fragment>
      :
      <div>아이템정보를 가져오고 있습니다.</div>
  }
}

export default ItemPurchase;