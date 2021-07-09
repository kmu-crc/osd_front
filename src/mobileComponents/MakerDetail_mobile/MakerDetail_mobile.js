import React, { Component } from "react";
import styled from "styled-components";
import TextFormat from "modules/TextFormat";
import HaveInItemContainer_mobile from "mobileComponents/HaveInItemContainer_mobile";
import HaveInGalleryContainer_mobile from "mobileComponents/HaveInGalleryContainer_mobile";
import MakerRequestBoardContainer_mobile from "mobileComponents/MakerRequestBoardContainer_mobile";
import MakerReviewContainer_mobile from "mobileComponents/MakerReviewContainer_mobile";
import ReviewDetailModal from "components/Commons/ReviewDetailModal";
import { Icon } from "semantic-ui-react";
import ArticleModal from "components/Commons/ArticleModal/ArticleModal";
import market_style from "market_style";


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
const ShadowBox = styled.div`
  width:100%;
  height:max-content;
  border-radius:10px;
  box-shadow: 2px 2px 5px #00000029;
  border:1px solid #eaeaea;
  padding:10px;
  .row{
    width:100%;
  }
  .padding{padding-left:10px;padding-right:10px;}
  .paddingNormal{padding:5px 10px;}
  .marginTop1{margin-top:5px;}
  .marginTop2{margin-top:10px;}
  .marginTop3{margin-top:20px;}
  .fontBig{font-size:${market_style.font.size.small1};font-weight:800;}
  .fontNormal{font-size:${market_style.font.size.small1};font-weight:400;}
  .fontSmall{font-size:${market_style.font.size.mini2};font-weight:400;}
  .black{color:black;}
  .flex{display:flex;}
  .flexWrap{flex-wrap:wrap;}
  .justifyCenter{justify-content:center;}
  .spaceBetween{justify-content:space-between;}
  .flexEnd{justify-content:flex-end;}
  .column{flex-direction:column;}
  .textRight{text-align:right;}
  // .hrline{width:100%;border-bottom:1px solid #eaeaea;}
  .ellipsis{width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .thumbnail{
    min-width:100px;
    min-height:100px;
    border-radius:50%;
    background-image:url(${props=>props.face});
    background-size:cover;
    margin-right:10px;
  }
`
const Header = styled.div`
  width:100%;
  margin-top:15px;
  margin-bottom:10px;
  font-size:${market_style.font.size.normal3};
  color:#c1c1c1;
  font-weight:800;
`
const RedButton = styled.div`
  width:${props=>props.width==null?"100%":props.width+"%"};
  height:35px;
  display:flex;
  border-radius:10px;
  border:${props=>props.isLike==true?null:"2px solid #FF3838"};
  box-shadow: 2px 2px 3px #00000019;
  justify-content:center;
  align-items:center;
  background-color:${props=>props.isLike==true?"#FF3838":"white"};
  color:${props=>props.isLike==true?"white":"#FF3838"};
  font-size:${market_style.font.size.small1};
  font-weight:800;
  margin-top:10px;
  margin-right:${props=>props.marginRight==null?"0px":props.marginRight+"%"};
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

class MakerDetail_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wirte: false, comment: "", title: "",
      tab: true,
      isLike: false,
      nick_name: "",
      thumbnail: null, thumbnail_name: null,
      category_level1: -1, category_level2: -1, location: null,
      explain: "", tag: [], equipment: [], technique: [],
      // career: [{ number: 0, task: "", explain: "", during: "" }],
      career:[],
      //for review detail
      reviewdetail: false, detail: null,
      create_time:"",
      update_time:"",
      haveGallery:true,
    };
    this.onClickRequest = this.onClickRequest.bind(this);
    this.onClickisLike = this.onClickisLike.bind(this);
  }
  componentWillUpdate(nextProps) {
    if (this.props.MakerViewDetail !== nextProps.MakerViewDetail) {
      this.setState(nextProps.MakerViewDetail);
      const technique =nextProps.MakerViewDetail.maker_technique? nextProps.MakerViewDetail.maker_technique.split(","):[];
      nextProps.MakerViewDetail.maker_technique&&technique.pop();
      const equipment =nextProps.MakerViewDetail.maker_equipment?nextProps.MakerViewDetail.maker_equipment.split(","):[];
      nextProps.MakerViewDetail.maker_equipment&&equipment.pop();
      this.setState({technique:technique,equipment:equipment,});
    }
    if (this.props.like !== nextProps.like) {
      this.setState({ isLike: nextProps.like });
    }
    if (
      this.props.MakerViewDetail.image !== nextProps.MakerViewDetail.image ||
      this.props.MakerViewDetail.nick_name !== nextProps.MakerViewDetail.nick_name ||
      this.props.MakerViewDetail.user_id !== nextProps.MakerViewDetail.user_id ||
      this.props.MakerViewDetail.description !== nextProps.MakerViewDetail.description ||
      this.props.MakerViewDetail.location !== nextProps.MakerViewDetail.location ||
      this.props.MakerViewDetail.category_level1 !== nextProps.MakerViewDetail.category_level1 ||
      this.props.MakerViewDetail.category_level2 !== nextProps.MakerViewDetail.category_level2 ||
      this.props.MakerViewDetail.tag !== nextProps.MakerViewDetail.tag ||
      this.props.MakerViewDetail.experience !== nextProps.MakerViewDetail.experience ||
      this.props.MakerViewDetail.score !== nextProps.MakerViewDetail.score ||
      this.props.like !== nextProps.like) {

      const careerRow = nextProps.MakerViewDetail.experience==""||nextProps.MakerViewDetail.experience==null?null:nextProps.MakerViewDetail.experience.split("/");
      careerRow.pop();
      const careerList = careerRow.map((item, index) => {
        const piece = item.split(",");
        // console.log("piece:::",piece[0],piece[1],piece[2],piece[3]);
        return (
          { number: piece[0], task: piece[1], explain: piece[2], during: piece[3] }
        );
      });
      const tag = nextProps.MakerViewDetail.tag.split(",");
      tag.pop();

      this.setState({
        isLike: nextProps.like,
        thumbnail: nextProps.MakerViewDetail.image,
        nick_name: nextProps.MakerViewDetail.nick_name,
        user_id: nextProps.MakerViewDetail.user_id,
        explain: nextProps.MakerViewDetail.description,
        location: nextProps.MakerViewDetail.location,
        category_level1: nextProps.MakerViewDetail.category_level1,
        category_level2: nextProps.MakerViewDetail.category_level2,
        tag: tag,
        career: careerList,
        score: nextProps.MakerViewDetail.score,
        create_time:nextProps.MakerViewDetail.create_time,
        update_time:nextProps.MakerViewDetail.update_time,
      })
    };
  }

  onClickRequest(event) {
    window.location.href = "/requestToMaker/" + this.props.id;
  }
  onClickisLike(event) {
    const isLike = !this.state.isLike;

    isLike === false ? this.props.UnlikeMakerRequest(this.state.user_id, this.props.token)
      : this.props.LikeMakerRequest(this.state.user_id, this.props.token);

    this.setState({ isLike: isLike });
  }
  createNoneRequest = (title,content) => {
    const data = {
      type: "maker",
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
          this.props.GetMakerRequestListRequest(this.props.id, 0);
        }
        this.setState({ write: false, title: "", comment: "" });
      })
      .catch(err => console.log("에러발생" + err));
  }
  render() {
    console.log(this.props,this.state);

    const { likeCount, itemCount } = this.props.MakerViewDetail;
    console.log("detail:", this.props);
    const { write } = this.state;
    // 카테고리
    let categoryName = this.props.category1 && this.props.category2 &&
      this.state.category_level2 < 1 ?
      this.props.category1[parseInt(this.state.category_level1-1, 10)]
      && this.props.category1[parseInt(this.state.category_level1-1, 10)].text
      : null;

    this.props.category2 && this.props.category2.map((item, index) => {
      if (item.parent === this.state.category_level1 && item.value === this.state.category_level2) {
        categoryName = item.text;
      }
      return item;
    })
    const Location = this.state.location == null ? "" : LocationList[this.state.location] && LocationList[this.state.location].text;

    return (
      <React.Fragment>
        <ShadowBox face={this.state.image}>
          <div className="row flex">
            <div className="thumbnail"/>
            <div className="row flex column justifyCenter">
                 <div className="fontBig black">{this.state.nick_name}</div>
                 <div className="fontNormal marginTop1">{categoryName}&nbsp;|&nbsp;<span style={{color:"#FF3838"}}>♥</span>{likeCount || 0}</div>
                 <div className="fontSmall marginTop1">
                    {new Date(this.state.create_time).getFullYear()+"년"
                    +(new Date(this.state.create_time).getMonth()+1)+"월"
                    +(new Date(this.state.create_time).getDate())+"일 등록"}
                 </div>
            </div>
          </div>
          <div className="row padding marginTop3">
                 <div className="fontNormal ">{this.state.explain || "'디자이너 소개'를 가져오고 있습니다."}</div>
          </div>
          <div className="row padding marginTop3">
                <div className="fontBig black">위치</div>
                <div className="fontNormal marginTop1">{Location}</div>
          </div>
          <div className="row padding marginTop3">
                <div className="fontBig black">태그</div>
                <div className="row flex flexWrap fontNormal marginTop1">
                  {
                    this.state.tag == null ?
                    "태그 없음"
                    :
                    null
                  }
                  {
                    typeof this.state.tag === "string"
                      ? this.state.tag.split(",").map((item, index) =>
                        item ? <TagPiece key={index}>{item}</TagPiece> : null)
                      : this.state.tag.map((item, index) =>
                        item ? <TagPiece key={index}>{item}</TagPiece> : null)
                  }
                </div>
          </div>
          <div className="row padding marginTop3">
                <div className="fontBig black">보유기술</div>
                <div className="row flex flexWrap fontNormal marginTop1">
                  {
                    this.state.technique&&this.state.technique.length==0?
                    "보유기술 없음"
                    :
                    this.state.technique.map((item, index) => {
                      return (
                        <TagPiece key={index}>
                          {item}
                        </TagPiece>
                      );
                    })
                  }
                </div>
          </div>
          <div className="row padding marginTop3">
                <div className="fontBig black">보유장비</div>
                <div className="row flex flexWrap fontNormal marginTop1">
                  {
                    this.state.equipment&&this.state.equipment.length==0?
                    "보유장비 없음"
                    :
                    this.state.equipment.map((item, index) => {
                      return (
                        <TagPiece key={index}>
                          {item}
                        </TagPiece>
                      );
                    })
                  }
                </div>
          </div>
          <div className="marginTop2"/>
        </ShadowBox>
        <RedButton isLike={this.state.isLike} onClick={this.onClickisLike}>관심 디자이너 등록</RedButton>
        {
          this.state.experience&&
          this.state.experience.split("/")&&
          ((this.state.experience.split("/").length>0&&this.state.experience.split("/")[0]=="0,,,")||
          this.state.experience.split("/").length<=0)
          ?
          null
          :
          <React.Fragment>
          <Header>제작 경험</Header>
          <ShadowBox>
            <div className="row paddingNormal">
            {this.state.career.map((item, index) => {
              console.log(item);
              return (
                <div className="row marginTop2">
                  <div className="flex spaceBetween">
                    <div className="fontBig ellipsis">{item.task}</div>
                    <div className="fontNormal ellipsis textRight">{item.explain}</div>
                  </div>
                  <div className="row flex flexEnd fontSmall">기간&nbsp;&nbsp;{item.during}</div>
                  <div className="row hrline"/>
                </div>
              );
            })}
            </div>
          </ShadowBox>
        </React.Fragment>
        }
        <Header>제작 아이템</Header>
        <div>
          <HaveInItemContainer_mobile id={parseInt(this.props.id, 10)} />
        </div>
        <Header>갤러리</Header>
        <div>
          <HaveInGalleryContainer_mobile handleHaveGallery={(result)=>{this.setState({haveGallery:result})}} id={this.props.id} isModify={false}/>
        </div>
        <Header>리뷰</Header>
        <ShadowBox>
          <MakerReviewContainer_mobile 
              count={this.props.ReviewCount}
              id={parseInt(this.props.id, 10)}
              handler={detail => this.setState({ reviewdetail: true, detail: detail })}/>
        </ShadowBox>
        <Header>메이커 게시판</Header>
        <ShadowBox>
          <MakerRequestBoardContainer_mobile id={parseInt(this.props.id, 10)} />
          <div className="row flex">
            {write?
                 <ArticleModal
                 write={this.state.write}
                 handlerModal = {(write)=>{this.setState({write:write})}}
                 createNoneRequest={(title,content)=>this.createNoneRequest(title,content)}
               />
               :this.props.userInfo==null?null:
               <React.Fragment>
                    <RedButton onClick={this.onClickRequest} isLike={false} width={49} marginRight={2}>디자인 의뢰</RedButton>
                    <RedButton onClick={() => this.setState({ write: true,content:"" })} isLike={true} width={49}>게시글 작성</RedButton>
               </React.Fragment>
          }
          </div>
        </ShadowBox>
      </React.Fragment>
    )
  }
}

export default MakerDetail_mobile;
