import React, { Component } from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
// import noimg from "source/noimg.png";
import HaveInItemContainer from "containers/Products/HaveInItemContainer/HaveInItemContainer";
import HaveInGalleryContainer from "containers/Gallery/HaveInGalleryContainer/HaveInGalleryContainer";

import DesignerReviewContainer from "containers/Designer/DesignerReviewContainer";
import DesignerRequestBoardContainer from "containers/Designer/DesignerRequestBoardContainer";
import TextFormat from "modules/TextFormat";
import { Modal } from "semantic-ui-react";
import Cross from "components/Commons/Cross";
import { TextControllerClassic } from "components/Commons/InputItem/TextControllerClassic";
import ReviewDetailModal from "components/Commons/ReviewDetailModal";
import ArticleModal from "components/Commons/ArticleModal/ArticleModal";
const LocationList = [
  { value: 0, text: "서울특별시" },
  { value: 1, text: "부산광역시" },
  { value: 2, text: "대구광역시" },
  { value: 3, text: "인천광역시" },
  { value: 4, text: "광주광역시" },
  { value: 5, text: "대전광역시" },
  { value: 6, text: "울산광역시" },
  { value: 7, text: "경기도" },
  { value: 8, text: "강원도" },
  { value: 9, text: "충청북도" },
  { value: 10, text: "충청남도" },
  { value: 11, text: "전라북도" },
  { value: 12, text: "경상북도" },
  { value: 13, text: "경상남도" },
  { value: 14, text: "제주도" },
  { value: 15, text: "제한없음" },
];

// CSS STYLING

const Expert = styled.div`
  margin-right: ${prop => prop.mRight}px;
  border: 1px solid transparent;
  width: 468px;
  height: 491px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
`;
const Profile = styled.div`

  width: 227px;
  height: 228px;
  margin-top: 18px;
  margin-left: 122px;
  background: transparent;
  background-image: url(${props => props.face});
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
`;
const LikeWrapper = styled.div`
  width:100%;
  text-align:center;
  margin-top:20px;
  font-size:30px;
  cursor:pointer;
  .unlike{
    color:#ff0000;
    font-weight:200;
  }
  .like{
    color:#ff0000;
  }
`;
const TextWrapper = styled.div`
  margin-top: 27px;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  font-family: Noto Sans KR;
  text-align: center;
  letter-spacing: 0;
  .nick {
    font-weight: 500;
    font-size: 22px;
    color: #000000;
    line-height: 33px;
  }
  .category {
    margin-top: 12px;
    font-weight: 300;
    font-size: 15px;
    line-height: 22px;
    color: #FF0000;
  }
  .create_time{
    font-size:15px;
    font-weight:200;
    font-family:Noto Sans CJK KR,Light;
    margin-top:4px;
  }
`;
const Counter = styled.div`
  margin-top: 44px;
  display: flex;
  flex-direction: row;
  width: max-content;
  margin-left: auto;
  margin-right: auto;
  font-family: Noto Sans KR;
  letter-spacing: 0;
  color: #000000;

  .items {
    text-align: center;
    font-size: 12px;
    font-weight: 300;
    line-height: 18px;
  }
  .v-line {
    margin-left: 10.5px;
    margin-right: 10.5px;
    width: 0px;
    height: 16px;
    border: 0.5px solid #707070;
  }
  .likes {
    text-align: left;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
  }
`;
const Introduction = styled.div`
  margin-right: ${prop => prop.mRight}px;
  position:relative;
  width: 982px;
  height: 491px;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  padding: 62px 59px 61px 60px;
  font-family: Noto Sans KR;
  .wrapItem{
    width:100%;
    height:100%;
    overflow: auto;
    .title {
      font-size: 19px;
      font-weight: 500;
      line-height: 28px;
      text-align: left;
    }
    .text {
      width: 100%;
      margin-top: 15px;
      margin-bottom:25px;
      font-size: 15px;
      font-weight: 300;
      line-weight: 27px;
      text-align: left;
      overflow: hidden;
    }
    .flex{
      display:flex;
    }
    .gradient_box{
      position:absolute;
      left:0px;
      top:0px;
      width:100%;
      height:100%;
      display:flex;
      justify-content:center;
      align-items:flex-end;
      padding:10px;
      border-radius: 20px;
      background:linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255,01.0));
    }
  }
  

  // &:hover{
  //   .wrapItem {
  //     overflow: auto;
  //   }
  // }


`;
//const RequestBoard = styled.div`
//  margin-right: ${prop => prop.mRight}px;
//  width: ${prop => prop.large ? 1094 : 566}px;
//  height: ${prop => prop.large ? 1168 : 491}px;
//  background: #FFFFFF;
//  box-shadow: 5px 5px 10px #00000029;
//  border-radius: 20px;
//  opacity: 1;
//  padding: 62px 65px 35px 60px;
//  font-family: Noto Sans KR;
//  .line {
//    display: flex;
//    flex-direction: row;
//    .title {
//      font-weight: 500;
//      font-size: 19px;
//      text-align: left;
//      line-height: 27px;
//      letter-spacing: 0;
//      color: #000000;
//      opacity: 1;
//    }
//    .button {
//      margin-left: auto;
//      font-weight: 500;
//      font-size: 19px;
//      text-align: left;
//      line-height: 27px;
//      letter-spacing: 0;
//      color: #FF0000;
//      opacity: 1;
//      cursor: default;
//    }
//  }
//  .board {
//    margin-top: 42px;
//    width: 441px;
//    .lement {
//      font-size: 15px;
//      text-align: left;
//      line-height: 20px;
//      color: #707070;
//      letter-spacing: 0;
//      opacity: 1;
//      margin-top: 12px;
//    }
//  }
//`;
const ItemInfo = styled.div`
  margin-right: ${prop => prop.mRight}px;
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "468px" : props.width + "px"};
  height: ${props => props.height == null ? "491px" : props.height + "px"};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  font-family: Noto Sans KR;
  padding: 30px 60px 30px 60px;

  .title {
    font-size: 19px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
  .text {
    width: 371px;
    height: 86px;
    margin-top: 20px;
    margin-bottom: 34px;
    font-size: 15px;
    font-weight: 300;
    line-weight: 27px;
    text-align: left;
    // overflow: auto;
    overflow:scroll-y;
  }
  .wrapItem{
    max-width:100%;
    max-height:390px;
    margin-top:30px;
    width:100%;
    height:max-content;
    overflow:hidden;
    overflow:auto;
    overflow-y:overlay;
    display:flex;
  }

  .wrapGallery{
    max-width:100%;
    max-height:300px;
    margin-top:30px;
    width:100%;
    height:max-content;
    overflow:auto;
    overflow-y:overlay;
    display:flex;
  }
  &:hover{
    .wrapItem{
      overflow:auto;
      overflow-y:overlay;
    }
  }
`;
const AdditionalInfo = styled.div`
  margin-right: ${prop => prop.mRight}px;
  margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
  width: ${props => props.width == null ? "468px" : props.width + "px"};
  height: ${props => props.height == null ? "491px" : props.height + "px"};
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  // padding: 90px 43px 161px 54px;
  // padding: 62px 59px 61px 60px;
  padding: 30px 60px 30px 60px;

  font-family: Noto Sans KR;
  
  .title {
    font-size: 19px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
  }
  .margin_bottom{
    margin-bottom:10px;
  }
  .text {
    width: 371px;
    height: 86px;
    margin-top: 20px;
    margin-bottom: 34px;
    font-size: 15px;
    font-weight: 300;
    line-weight: 27px;
    text-align: left;
    overflow-y:scroll;
    // overflow: auto;
  }
  .reviewItem{
    margin-top:30px;
    width:100%;
    max-height:200px;
    overflow:hidden;
    overflow-y:auto;
    display:flex;
  }
  .wrapItem{
    max-width:100%;
    max-height:85%;
    margin-top:30px;
    width:100%;
    // height:max-content;
    display:flex;
    overflow:hidden;
    overflow-y:auto;
    }
  // &:hover{
  //   .wrapItem{
  //     verflow:auto;
  //   }
  // }
`;
const DesignerBoard = styled.div`
  width: 1523px;
  height: max-content;
  background: #FFFFFF;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  opacity: 1;
  font-family: Noto Sans KR;
  padding: 90px 60px 30px 60px;
  margin-bottom:100px;
  .alignRight{
    display:flex;
    justify-content:flex-end;
    .link{
      width:max-content;
      cursor:pointer;
    }
  }
  .redText{
    color:red;
    margin:20px;
  }
  .title {
    color: #000000;
    font-size: 19px;
    font-weight: 500;
    line-height: 28px;
    text-align: left;
  };

  .list {
    // margin-top: 72px;
    font-weight: 300;
    font-size: 19px;
    text-align: left;
    line-height: 27px;
    color: #000000;

    display:flex;
    flex-direction:column;
    align-items:center;
    .line {
      width:1300px;
      display: flex;
      flex-direction: row;
      margin-bottom: 37px;
      .title_text{
        width:750px;
        height:29px;
        overflow:hidden;
        margin-right:130px;
      }
      .sub_text{
        margin-left:70px;
      }
    }
    .circle {
      width: 80px;
      height: 29px;
      margin-right: 13px;
      border-radius: 16px;
      font-size:6px;
      display:flex;
      justify-content:center;
      align-items:center;
      padding:5px;
      &.red1 { background: #FF0000; };
      &.red2 { background: #FFC0C0; };
      &.red3 { background: #FF6868; };
      &.red4 { background: #FFD6D6; };
    };
  };
  .page {
    width: max-content;
    margin-top: 87px;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
    font-weight: 500;
    text-aglin: left;
    display: flex;
    flex-direction: row;
    line-height: 27px;
    color: #707070;
    .number{
      margin-right: 10px;
    }
    .this{
      color: red;
    }
    
    .another {}
    .more {}
  };
`;
const Wrapper = styled.div`
// *{
//   border:1px solid black;
// }
  display:flex;
  align-items:center;
  flex-direction:column;
  margin-top: 60px;
  // *{border:1px solid red;};
  .contents_box{
    width:max-content;
    height:max-content;
  }
`;
const ExpTable = styled.div`
    *{
      font-family:Noto Sans KR;
      font-size:16px;
    }
    width: ${props => props.width == null ? "100%" : props.width + "px"};
    height: ${props => props.height == null ? "max-content" : props.height + "px"};
    margin-left: ${props => props.mLeft == null ? "0px" : props.mLeft + "px"}px;
    margin-top: ${props => props.mTop == null ? "0px" : props.mTop + "px"};
    .row{
      width:100%;
      height:29px;
      display:flex;
      margin-bottom:10px;
    }
    .header{
      width:100%;
      height:29px;
      display:flex;
      margin-bottom:5px;
    }
    .th{
      width:33%;
      height:100%;
      font-weight:400;
    }
    .td{
      width:33%;
      height:100%;
      font-weight:200;
    }
`;

// const Thumbnail = styled.div`
// cursor:pointer;
// width:150px;
// height:150px;
// display:flex;
// justify-content:center;
// align-items:center;
// background-image: ${props => `url(${props.imageURL == null ? noimg : props.imageURL})`};
// background-size: cover;
// background-position: center center;
// `;
const TitleForm = styled.input`
  padding: 10px;
  resize: none;
  width: 100%;
  height: 30px;
  border: 1px solid #E6E6E6;
  outline: none;
  border-radius: 10px;
`
const CommentForm = styled.textarea`
  padding:10px;
  resize:none;
  width:100%;
  height:100px;
  border:1px solid #E6E6E6;
  outline:none;
  border-radius:10px;
`
const WriteReview = styled.div`
  margin-bottom:10px;
  .form{
      width:100%;
      padding:10px;
  }
  .contents{
      display:flex;
      justify-content:space-between;
      padding-left:10px;
      padding-right:10px;
      .score{

      }
      .buttonBox{
          .button{
              width:100px;
              padding:10px;
              border-radius:20px;
              background-color:#707070;
              display:flex;
              justify-content:center;
              align-items:center;
              cursor:pointer;
              .text{
                  color:white;
              }
          }

      }
  }
`;
const TagPiece = styled.div`
    width: max-content;
    min-width: 30px;
    background-color: #EFEFEF;
    margin-right: 5px;
    margin-bottom: 5px;
    color: #707070;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
    }
`;
const CreateReview = styled.div`
width:100%;
height:30px;
margin-bottom:10px;
display:flex;
justify-content:flex-end;
.button{
    width:max-content;
    height:max-content;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:red;
    cursor:pointer;
    padding:12px 39px 12px 39px;
}
.font{
    font-size:20px;
    color:white;
}
`;

// const review = {
// average_score: 4,
// review: [{
// thumbnail: noimg,
// nick_name: "닉네임",
// explain: "리뷰입니다",
// score: 5,
// }, {
// thumbnail: noimg,
// nick_name: "닉네임",
// explain: "리뷰입니다",
// score: 5,
// }, {
// thumbnail: noimg,
// nick_name: "닉네임",
// explain: "리뷰입니다",
// score: 5,
// }],
// };


class DesignerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      write: false, title: "", comment: "",
      tab: true,
      isLike: false,
      nick_name: "", user_id: null,
      thumbnail: null, thumbnail_name: null,
      category_level1: 0, category_level2: 0, location: null,
      explain: "", tag: [],
      career: [{ number: 0, task: "", explain: "", during: "" }],
      reviewdetail: false, detail: null,
      create_time:"",
      update_time:"",
      content:"",
    };
    this.onClickRequest = this.onClickRequest.bind(this);
    this.onClickisLike = this.onClickisLike.bind(this);
  }
  componentWillUpdate(nextProps) {
    if (
      this.props.DesignerViewDetail.image !== nextProps.DesignerViewDetail.image ||
      this.props.DesignerViewDetail.nick_name !== nextProps.DesignerViewDetail.nick_name ||
      this.props.DesignerViewDetail.user_id !== nextProps.DesignerViewDetail.user_id ||
      this.props.DesignerViewDetail.description !== nextProps.DesignerViewDetail.description ||
      this.props.DesignerViewDetail.location !== nextProps.DesignerViewDetail.location ||
      this.props.DesignerViewDetail.category_level1 !== nextProps.DesignerViewDetail.category_level1 ||
      this.props.DesignerViewDetail.category_level2 !== nextProps.DesignerViewDetail.category_level2 ||
      this.props.DesignerViewDetail.tag !== nextProps.DesignerViewDetail.tag ||
      this.props.DesignerViewDetail.experience !== nextProps.DesignerViewDetail.experience ||
      this.props.DesignerViewDetail.score !== nextProps.DesignerViewDetail.score ||
      this.props.like !== nextProps.like) {

      const careerRow = nextProps.DesignerViewDetail.experience==""||nextProps.DesignerViewDetail.experience==null?null:nextProps.DesignerViewDetail.experience.split("/");
      careerRow.pop();
      const careerList = careerRow.map((item, index) => {
        const piece = item.split(",");
        // console.log("piece:::",piece[0],piece[1],piece[2],piece[3]);
        return (
          { number: piece[0], task: piece[1], explain: piece[2], during: piece[3] }
        );
      });
      const tag = nextProps.DesignerViewDetail.tag.split(",");
      tag.pop();

      this.setState({
        isLike: nextProps.like,
        thumbnail: nextProps.DesignerViewDetail.image,
        nick_name: nextProps.DesignerViewDetail.nick_name,
        user_id: nextProps.DesignerViewDetail.user_id,
        explain: nextProps.DesignerViewDetail.description,
        location: nextProps.DesignerViewDetail.location,
        category_level1: nextProps.DesignerViewDetail.category_level1,
        category_level2: nextProps.DesignerViewDetail.category_level2,
        tag: tag,
        career: careerList,
        score: nextProps.DesignerViewDetail.score,
        create_time:nextProps.DesignerViewDetail.create_time,
        update_time:nextProps.DesignerViewDetail.update_time,
      })
    };

    return true;
  }
  onClickRequest(event) {
    window.location.href = "/requestToDesigner/" + this.props.id;
  }
  onClickisLike(event) {
    const isLike = !this.state.isLike;

    isLike === false ? this.props.UnlikeDesignerRequest(this.state.user_id, this.props.token)
      : this.props.LikeDesignerRequest(this.state.user_id, this.props.token);

    this.setState({ isLike: isLike });
  }
  createNoneRequest = (title,content) => {
    const data = {
      type: "designer",
      status: "normal",
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      // content: this.state.comment,
      // title: this.state.title,
      title: title,
      content: content,
      expert_id: this.props.id || null,
      personal: this.props.id || null,
    };
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          // alert("글이 등록되었습니다.");
          this.props.GetDesignerRequestListRequest(this.props.id, 0);
        }
        this.setState({ write: false, title: "", comment: "" });
      })
      .catch(err => console.log("에러발생" + err));
  }
  render() {

    // const expert = empty;
    const { likeCount, itemCount } = this.props.DesignerViewDetail;

    const Location = this.state.location == null ? "" : LocationList[this.state.location] && LocationList[this.state.location].text;
    // const user_id = this.state.user_id;
    // const { tab } = this.state;
    // const user_id = this.state.user_id;
    // const { tab } = this.state;
    const { write } = this.state;
    // 카테고리
    // const categoryName = this.props.category1 && this.props.category2 &&
    //   this.state.category_level2 === 0 ? this.props.category1[this.state.category_level1] && this.props.category1[this.state.category_level1].text
    //   : this.props.category2[this.state.category_level1] &&
    //   this.props.category2[this.state.category_level1][this.state.category_level2] && this.props.category2[this.state.category_level1][this.state.category_level2].text;
    let categoryName = this.props.category1 && this.props.category2 &&
      this.state.category_level2 < 1 ?
      this.props.category1[parseInt(this.state.category_level1, 10)]
      && this.props.category1[parseInt(this.state.category_level1, 10)].text
      : null;

    this.props.category2 && this.props.category2.map((item, index) => {
      if (item.parent === this.state.category_level1 && item.value === this.state.category_level2) {
        categoryName = item.text;
      }
      return item;
    })

    console.log(categoryName);
    console.log(this.props);
    return (<Wrapper>
      <div className="contents_box" />
      <div style={{ display: "flex" }}>
        {/* Designer */}
        <Expert mRight={60}>
          {/* Profile */}
          <Profile face={this.state.thumbnail} />
          {/* Text */}
          <TextWrapper>
            <div className="nick"><TextFormat txt={this.state.nick_name} chars={32} /></div>
            <div className="create_time">
                {new Date(this.state.create_time).getFullYear()+"년"
                +(new Date(this.state.create_time).getMonth()+1)+"월"
                +(new Date(this.state.create_time).getDate())+"일 등록"}</div>
            <div className="category"><TextFormat txt={categoryName || "전체"} chars={32} /></div>
          </TextWrapper>
          <LikeWrapper>
            {this.state.isLike === false ?
              <div onClick={this.onClickisLike} className="unlike">♡</div>
              :
              <div onClick={this.onClickisLike} className="like">♥</div>
            }
            {/* ♥ */}
          </LikeWrapper>
          {/* Counter */}
          <Counter>
            <div className="items">
              {itemCount || 0}개의 아이템</div>
            <div className="v-line" />
            <div className="likes">{/**/}
              <Icon className="heart" size="small" color="red" />{likeCount || 0}</div>
          </Counter>
        </Expert>

        {/* Introduction */}
        <Introduction>
          <div className="wrapItem">
            <div className="title">
              <TextFormat txt={this.state.nick_name} chars={32} />
              {/* <span className="text">
                {new Date(this.state.create_time).getFullYear()+"년"
                +(new Date(this.state.create_time).getMonth()+1)+"월"
                +(new Date(this.state.create_time).getDate())+"일 등록"}</span> */}
            </div>
            <div className="text">{this.state.explain || "'디자이너 소개'를 가져오고 있습니다."}</div>
            <div className="title">위치</div>
            <div className="text">{Location}</div>
            <div className="title">카테고리</div>
            <div className="text">{categoryName || "전체"}</div>
            <div className="title">태그</div>
            <div className="text flex">
              {
                this.state.tag.map((item, index) => {
                  return (
                    <TagPiece key={index}>
                      {item}
                    </TagPiece>
                  );
                })
              }
            </div>
            {/* <div className="gradient_box"><div>▾</div></div> */}
          </div>
        </Introduction>
        {/* 상세소개 */}
        {/* <AdditionalInfo>
          <div className="title">거주 지역</div>
          <div className="text">{Location}</div>
        </AdditionalInfo> */}
      </div>

      {/* 리뷰 */}
      {/*  */}
      <AdditionalInfo width={1523} height={290} mTop={60}>
          <div className="title margin_bottom">리뷰({this.props.ReviewCount})</div>
        <div className="wrapItem" style={{ flexDirection: "column" }}>
          <div>
            <DesignerReviewContainer
              id={parseInt(this.props.id, 10)}
              handler={detail => this.setState({ reviewdetail: true, detail: detail })} />
          </div>
        </div>
      </AdditionalInfo>
      {/*리뷰자세히*/}
      {this.state.reviewdetail ? <ReviewDetailModal open={this.state.reviewdetail} close={() => this.setState({ reviewdetail: false })} detail={this.state.detail} /> : null}

      {/* 경험 */}
      <AdditionalInfo width={1523} height={290} mTop={60}>
        <div className="title margin_bottom">디자인 경험</div>
        <div className="wrapItem">
        <ExpTable>
          <div className="header">
            <div className="th">업무</div>
            <div className="th">기간</div>
            <div className="th">내용</div>
          </div>
          {this.state.career.map((item, index) => {
            return (
              <div className="row" key={index}>
                <div className="td">{item.task}</div>
                <div className="td">{item.during}</div>
                <div className="td">{item.explain}</div>
              </div>
            );
          })}
        </ExpTable>
        </div>
       

      </AdditionalInfo>

      {/**보유아이템 */}
      <ItemInfo width={1523} height={490} mTop={60}>
        <div className="title">디자인 아이템</div>
        <div className="wrapItem">
          {<HaveInItemContainer id={this.props.id} />}
        </div>

      </ItemInfo>

      {/**갤러리 아이템 */}
      <ItemInfo width={1523} height={491} mTop={60}>
        <div className="title">갤러리</div>
        <div className="wrapGallery">
          {<HaveInGalleryContainer id={this.props.id} isModify={false} />}
        </div>

      </ItemInfo>

      <div style={{ marginTop: "61px", display: "flex", flexDirection: "row" }}>
        <DesignerBoard>
          <div className="title">디자이너 게시판</div>
          <div className="title"><div className="redText alignRight" ><div className="link" onClick={this.onClickRequest}>디자인 의뢰</div></div></div>
          <div className="list">
            <DesignerRequestBoardContainer id={parseInt(this.props.id, 10)} />
          </div>

          {write ?
            <ArticleModal
              write={this.state.write}
              handlerModal = {(write)=>{this.setState({write:write})}}
              createNoneRequest={(title,content)=>this.createNoneRequest(title,content)}
            />
            // <WriteReview>
            //   <div className="form">
            //     제목:
            //     <TitleForm
            //       value={this.state.title || ""}
            //       onChange={event => this.setState({ [event.target.name]: event.target.value })}
            //       name="title"
            //     />
            //     내용:
            //     <CommentForm
            //       value={this.state.comment || ""}
            //       onChange={event => this.setState({ [event.target.name]: event.target.value })}
            //       name="comment"
            //     />
            //   </div>
            //   <div className="contents">
            //     <div className="buttonBox">
            //       <div className="button" onClick={this.createNoneRequest} >
            //         <div className="text" >작성하기</div>
            //       </div>
            //     </div>
            //   </div>
            // </WriteReview>
            :
            <CreateReview onClick={() => this.setState({ write: true,content:"" })}>
              <div className="button">
                <div className="font">게시글 작성</div>
              </div>
            </CreateReview>
          }
        </DesignerBoard>
      </div>

    </Wrapper>);
  }
};

export default DesignerDetail;
