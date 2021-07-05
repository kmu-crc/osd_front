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
import { FileUploadRequest } from "actions/Uploads";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";
import PointFormat from "modules/PointFormat";
import { Rating } from 'semantic-ui-react'
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
const MessageWrapper = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:flex-end;
    flex-direction:${props => props.isMy ? "row-reverse" : "row"};
    margin-bottom:16px;
  .array{
    display:flex;
    flex-direction:column;
    align-items:${props => props.isMy ? "flex-end" : "flex-start"};
  }
  .msg_bubble{
    max-width:270px;
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
    font-size:${market_style.font.size.mini2};
  }
  .timeWrapper{
    display:flex;
    flex-direction:column;
    align-items:${props => props.isMy ? "flex-end" : "flex-start"};
  }
`
const Wrapper = styled.div`
  width:100%;
`
const ReviewButton = styled.div`
  width:100px;
  height:26px;
  padding:4px 20px 5px 20px;
  border:1px solid #FF3838;
  color:#FF3838;
  font-weight:400;
  font-size:${market_style.font.size.small1};

`
const ShadowBox = styled.div`
  width:100%;
  height:max-content;
  border:1px solid #eaeaea;
  border-radius:10px;
  box-shadow: 2px 2px 5px #00000029;
  padding:15px 10px;
  margin-bottom:15px;
  .paddingNormal{padding:10px;}
  .marginTop1{margin-top:5px;}
  .marginTop2{margin-top:10px;}
  .marginTop3{margin-top:20px;}
  .marginRight{margin-right:10px;}
  .marginLeft{margin-left:15px;}
  .fontBig{font-size:${market_style.font.size.small1};font-weight:800;}
  .font{font-size:${market_style.font.size.small1};font-weight:500;}
  .fontNormal{font-size:${market_style.font.size.small1};font-weight:400;}
  .fontSmall{font-size:${market_style.font.size.mini2};font-weight:400;}
  .black{color:black;}
  .flex{display:flex;}
  .flexWrap{flex-wrap:wrap;}
  .justifyCenter{justify-content:center;}
  .alignCenter{align-items:center;}
  .spaceBetween{justify-content:space-between;}
  .flexEnd{justify-content:flex-end;}
  .column{flex-direction:column;}
  .textRight{text-align:right;}
  .ellipsis{width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .fontNormal{font-size:${market_style.font.size.small1};}
  .bold{font-weight:500;}
  .minHeight{min-height:500px;}
  .minHeight2{min-height:100px;}
  .iconWrapper{
    display:flex;
    flex-direction:column;
    align-items:center;
  }
  .face{
    min-width:25px;
    min-height:25px;
    background-image:url(${props=>props.face==null?noimg:props.face});
    background-size:cover;
    border-radius:50%;
    margin-right:5px;
  }
  .profile{
    .margin-left:10px;
    width:100%;
    height:140px;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
  }

  .thumbnail{
    min-width:152px;
    min-height:140px;
    background-size:cover;
    background-color:#e9e9e9;
    background-image:url(${props =>props.img==null?noimg:props.img});
  }
`
const Header = styled.div`
  width:100%;
  margin-top:15px;
  margin-bottom:10px;
  font-size:${market_style.font.size.normal3};
  color:#c1c1c1;
  font-weight:800;
  display:flex;
  justify-content:space-between;
  align-items:center;
`
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

const RedButton = styled.div`
  width:${props=>props.width==null?"100%":props.width+"%"};
  height:35px;
  display:flex;
  border-radius:10px;
  border:${props=>props.isLike==true?null:"2px solid red"};
  box-shadow: 2px 2px 3px #00000019;
  justify-content:center;
  align-items:center;
  background-color:${props=>props.isLike==true?"red":"white"};
  color:${props=>props.isLike==true?"white":"red"};
  font-size:${market_style.font.size.small1};
  font-weight:800;
  margin-top:10px;
  margin-right:${props=>props.marginRight==null?"0px":props.marginRight+"%"};
`
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:31px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.small1};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
  margin-right:10px;
`;
const CustomButton = styled.div`
    width:80px;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    background-color:#FF3838; 
    font-weight:500;
    border-radius:20px;
`
class ItemPurchase_mobile extends Component {
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
    window.location.href = `/productModify/${this.props.ItemDetail.item_id}`;
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
    const { score } = this.props.item;
    const RenderStar = () => {
      return <Rating size="small" name="score" icon='star' defaultRating={parseInt(score, 10)} maxRating={5} disabled />
    }
    let tag = this.props.ItemDetail.tag + "";

    return (
      <React.Fragment>
        {
          item?
          <Wrapper>
          <ShadowBox img={item.thumbnail ? item.thumbnail.l_img : noimg} face={item.who||who}>
            <div className="wrap flex">
              <div className="thumbnail"/>
              <div className="profile">
                <div className="marginLeft" style={{width:"85%"}}>
                  <div className="fontBig ellipsis">{this.props.ProductDetail == null ? item.title : this.props.ProductDetail.title}</div>
                  <div className="flex vCenter marginTop2">
                    <div className="face"/>
                    <div className="fontNormal">
                        {item.userName}
                        {this.props.userInfo && item.members && item.members.length > 0
                        ?
                        `외 ${item.members.length}명` : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <div className="row padding">
              <div className="fontBig marginTop2">설명</div>
                <div className="fontNormal"
                     dangerouslySetInnerHTML={{ __html: `${item.description || ""}` }}
                />
                <div className="fontBig marginTop2 marginBottom">유형</div>
                <div className="fontNormal">
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
                <div className="fontBig marginTop2 marginBottom">태그</div>
                <div className="row flex flexWrap">
                      {
                        tag.indexOf(",") == -1 ? null : tag.split(",").map((item, index) => {
                          return (
                            <TagPiece key={index}>
                              {item}
                            </TagPiece>
                          );
                        })
                      }
                </div>
              </div>
          </ShadowBox>
          <ShadowBox>
            {ContentHeader &&
              ContentHeader.length > 0 &&
              ContentHeader.map(
                (head, index) =>{
                  console.log(head);
                  return(
                    <React.Fragment>
                    <div className="row flex justifyCenter fontBig">{head.name||"아이템 상세내용"}</div>
                    <div className="row minHeight marginTop3">
                       {head.editor_type === "project"
                         ? <ItemStepContainer editor={head.type === "copied" ? true : false} index={index} header={head} item={item} id={head.content_id} bought={item.bought} />
                         : null}
                       {item.cardId&&head.editor_type === "blog"
                         ? <CardSourceDetailContainer bought={item.bought} isCancel cardId={item.cardId} />
                         : null}
                    </div> 
                    </React.Fragment>
                  )                
                }
              )}
            </ShadowBox>
            {
              item && (item.type === 2 || item.type === 7) ?
              <ShadowBox>
                    <div className="row flex justifyCenter fontBig minHeight2">
                      {item.type===2?"자문/상담":item.type==7?"제작 상담":"상댐"}
                    </div>
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
                                    <div className="array">
                                    <div className="msg_bubble">{item.message}</div>
                                    <div className="msg_time">{msgTime}</div>
                                    </div>
                                  </React.Fragment>
                                  :
                                  item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".jpg" ||
                                    item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".JPG" ||
                                    item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".png" ||
                                    item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".PNG" ?
                                    <React.Fragment>
                                      <div className="array">
                                      <div className="file_bubble">
                                        <img width={270} src={item.file_url} />
                                      </div>
                                      <div className="timeWrapper">
                                        <a href={item.file_url} download={item.filename} className="iconWrap">
                                          <CustomIcon width={21} height={21} imgURL={download} />
                                        </a>
                                        <div className="msg_time">{msgTime}</div>
                                      </div>
                                      </div>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                      <div className="array">
                                      <a href={item.file_url} download={item.filename} className="iconWrap">
                                        <div className="file_bubble">
                                          <CustomIcon width={19} height={19} imgURL={docu} />{item.filename}
                                          <CustomIcon isNon={item.from_id === this.props.userInfo.uid} width={19} height={19} imgURL={download} />
                                        </div>
                                      </a>
                                      <div className="msg_time">{msgTime}</div>
                                      </div>
                                    </React.Fragment>
                              }

                            </MessageWrapper>
                          )
                        })
                      }
                    <div className="flex marginTop2">
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
                        />
                        <div className="iconWrapper">
                          <CustomIcon width={24} height={30} imgURL={addfile} />
                          <div className="font_small">파일</div>
                        </div>
                      </label>
                      </div>
                      <div style={{ display: "flex" }}>
                      <InputText id="advicebox" value={this.state.message} onChange={this.onChangeMessage} />
                      {
                        this.state.file == null ?
                          <CustomButton id="sendmessage" width="100" height="60" backgroundColor="white" fontColor="#707070" fontSize="12" onClick={this.writeMessage}><div className="text_">보내기</div></CustomButton>
                          :
                          <React.Fragment>
                            <div>
                              <CustomButton id="sendfile" width="100" height="45" backgroundColor="white" fontColor="#707070" marginBottom="10" fontSize="12" onClick={this.onSendFile}>전송하기</CustomButton>
                              <CustomButton id="cancelbtn" width="100" height="45" backgroundColor="white" fontColor="#707070" fontSize="12" onClick={this.onCancelFile}>취소하기</CustomButton>
                            </div>
                          </React.Fragment>
                      }
                    </div>
               </ShadowBox>
              :
              null
            }
          </Wrapper>
          :
          <div>아이템정보를 가져오고 있습니다.</div>
        }
      </React.Fragment>
    )
  }
}

export default ItemPurchase_mobile;


// item ?
//       <React.Fragment>
//         <Wrapper>
//           <div className="profileBox">
//             <ItemImages main={item.thumbnail ? item.thumbnail.l_img : noimg}/>
//             <ItemInfo face={item.who || who}>
//               <div className="flex-align-column line">
//                 <div className="flex spaceBetween">
//                   <div className="title">{this.props.ProductDetail == null ? item.title : this.props.ProductDetail.title}</div>
//                   <div className="expert">
//                     <div className="who" />
//                     <div className="nick" onClick={() => this.setState({ isShowmember: !this.state.isShowmember })}>{item.userName}
//                       {this.props.userInfo && item.members && item.members.length > 0
//                         ?
//                         `외 ${item.members.length}명` : null}
//                     </div>
//                   </div>
//                 </div>


//                 <Introduction id="Introduction" >
//                   <div className="wrapItem" >
//                     <div className="title">설명</div>
//                     <div id="itemDescription" className="text"
//                       dangerouslySetInnerHTML={{ __html: `${item.description || ""}` }}
//                     />
//                     <div className="title">유형</div>
//                     <div className="text flex">
//                       {item.type === 0 ? "디자인" : null}
//                       {item.type === 1 ? "프로젝트" : null}
//                       {item.type === 8 ? "강의" : null}
//                       {item.type === 2 ? "기술자문/상담" : null}
//                       {item.type === 3 ? "경험" : null}
//                       {item.type === 4 ? "정보/데이터" : null}
//                       {item.type === 5 ? "아이디어/노하우" : null}
//                       {item.type === 6 ? "지적재산권" : null}
//                       {item.type === 7 ? "제작품" : null}
//                     </div>
//                   </div>
//                 </Introduction>
//               </div>
//             </ItemInfo>

//           </div>

//           {ContentHeader &&
//             ContentHeader.length > 0 &&
//             ContentHeader.map(
//               (head, index) =>{
//                 console.log(head);
//                 return(
//                   <div key={index} className="row">
//                   <ItemContents>
//                     <div className="header">
//                       <div className="title">
//                         {head.name || "아이템 상세내용"}
//                       </div>
//                     </div>
//                     <div className="editor-wrapper">
//                       {head.editor_type === "project"
//                         ? <ItemStepContainer editor={head.type === "copied" ? true : false} index={index} header={head} item={item} id={head.content_id} bought={item.bought} />
//                         : null}
//                       {item.cardId&&head.editor_type === "blog"
//                         ? <CardSourceDetailContainer bought={item.bought} isCancel cardId={item.cardId} />
//                         : null}
//                     </div>
//                   </ItemContents>
//                 </div>
//                 )                
//               }
//             )}

//           {
//             item && (item.type === 2 || item.type === 7) ?
//               <ItemContents>
//                 <div className="header">
//                   <div className="title margin_bottom_s">{item.type == 2 ? '자문/상담' : item.type == 7 ? '제작품 문의' : null}</div>
//                 </div>
//                 <div className="hrLine" />
//                 <div className="message-wrapper">
//                   <div className="message-detail">
//                     <MessageBox>
//                       {
//                         this.props.paymentMessageList &&
//                         this.props.paymentMessageList.map((item, index) => {
//                           const createtime = new Date(item.create_time);
//                           const msgTime = createtime.getFullYear() + "."
//                             + (createtime.getMonth() + 1) + "."
//                             + createtime.getDate()
//                             + "(" + week[createtime.getDay()] + ")"
//                             + (createtime.getHours() <= 12 && createtime.getHours() >= 6 ? "오전" : "오후")
//                             + (createtime.getHours() <= 9 ? '0' + createtime.getHours() : createtime.getHours())
//                             + ":" + (createtime.getMinutes() <= 9 ? '0' + createtime.getMinutes() : createtime.getMinutes())
//                           console.log(item.from_id, this.props.userInfo);
//                           return (
//                             <MessageWrapper isMy={item.from_id == this.props.userInfo.uid}>
//                               {
//                                 console.log(
//                                   String(item.filename).substring(String(item.filename).lastIndexOf('.'), String(item.filename).length))
//                               }
//                               {
//                                 item.filename == null ?
//                                   <React.Fragment>
//                                     <div className="msg_bubble">{item.message}</div>
//                                     <div className="msg_time">{msgTime}</div>
//                                   </React.Fragment>
//                                   :
//                                   item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".jpg" ||
//                                     item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".JPG" ||
//                                     item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".png" ||
//                                     item.filename.substring(item.filename.lastIndexOf('.'), item.filename.length) === ".PNG" ?
//                                     <React.Fragment>
//                                       <div className="file_bubble">
//                                         <img width={334} src={item.file_url} />
//                                       </div>
//                                       <div className="timeWrapper">
//                                         <a href={item.file_url} download={item.filename} className="iconWrap">
//                                           <CustomIcon width={21} height={21} imgURL={download} />
//                                         </a>
//                                         <div className="msg_time">{msgTime}</div>
//                                       </div>
//                                     </React.Fragment>
//                                     :
//                                     <React.Fragment>
//                                       <a href={item.file_url} download={item.filename} className="iconWrap">
//                                         <div className="file_bubble">
//                                           <CustomIcon width={19} height={19} imgURL={docu} />{item.filename}
//                                           <CustomIcon isNon={item.from_id === this.props.userInfo.uid} width={19} height={19} imgURL={download} />
//                                         </div>
//                                       </a>
//                                       <div className="msg_time">{msgTime}</div>
//                                     </React.Fragment>
//                               }

//                             </MessageWrapper>
//                           )
//                         })
//                       }
//                     </MessageBox>
//                   </div>
//                 </div>
//                 <div className="hrLine" />
//                 <div className="flex margin_bottom_s">

//                   <label htmlFor="addimg">
//                     <input
//                       hidden
//                       type="file"
//                       id="addimg"
//                       name="source"
//                       ref={ref => (this.input = ref)}
//                       onChange={this.onFileChange}
//                       accept="image/*"
//                     />
//                     <div className="iconWrapper">
//                       <CustomIcon width={24} height={30} imgURL={addimage} />
//                       <div className="font_small">이미지</div>
//                     </div>
//                   </label>
//                   <label htmlFor="addfile">
//                     <input
//                       hidden
//                       type="file"
//                       id="addfile"
//                       name="source"
//                       ref={ref => (this.input = ref)}
//                       onChange={this.onFileChange}
//                     />
//                     <div className="iconWrapper">
//                       <CustomIcon width={24} height={30} imgURL={addfile} />
//                       <div className="font_small">파일</div>
//                     </div>
//                   </label>
//                 </div>
//                 <div style={{ display: "flex" }}>
//                   <InputText id="advicebox" value={this.state.message} onChange={this.onChangeMessage} />
//                   {
//                     this.state.file == null ?
//                       <CustomButton id="sendmessage" width="100" height="60" backgroundColor="white" fontColor="#707070" fontSize="12" onClick={this.writeMessage}><div className="text_">보내기</div></CustomButton>
//                       :
//                       <React.Fragment>
//                         <div>
//                           <CustomButton id="sendfile" width="100" height="45" backgroundColor="white" fontColor="#707070" marginBottom="10" fontSize="12" onClick={this.onSendFile}>전송하기</CustomButton>
//                           <CustomButton id="cancelbtn" width="100" height="45" backgroundColor="white" fontColor="#707070" fontSize="12" onClick={this.onCancelFile}>취소하기</CustomButton>
//                         </div>
//                       </React.Fragment>
//                   }
//                 </div>
//               </ItemContents>
//               : null
//           }
//         </Wrapper>
//       </React.Fragment>
//       :
//       <div>아이템정보를 가져오고 있습니다.</div>