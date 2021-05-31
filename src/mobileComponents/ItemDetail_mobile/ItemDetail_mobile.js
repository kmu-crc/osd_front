import React, { Component } from 'react';
import styled from 'styled-components';
import Star from "components/Commons/Star";
import noimg from "source/noimg.png";
import Cross from "components/Commons/Cross"

import who from "source/thumbnail.png";
import CardSourceDetailContainer from "containers/Items/CardSourceDetailContainer";
import ItemStepContainer from "containers/Items/ItemStepContainer";
import ItemQuestionContainer_mobile from "mobileComponents/ItemQuestionContainer_mobile";
import ItemReviewContainer_mobile from "mobileComponents/ItemReviewContainer_mobile";
import PointFormat from "modules/PointFormat";
import ConnectedMemberContainer from "containers/Items/ConnectedMemberContainer";
import { Rating } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";
const Wrapper = styled.div`
  width:100%;
`
const ShadowBox = styled.div`
  width:100%;
  height:max-content;
  border:1px solid #eaeaea;
  border-radius:10px;
  box-shadow: 2px 2px 5px #00000029;
  padding:15px 10px;
  .row{width:100%;}
  .marginLeft{margin-left:10px;}
  .marginTop{margin-top:10px;}
  .marginBottom{margin-bottom:5px;}
  .padding{padding:10px;}
  .flex{display:flex;}
  .vCenter{align-items:center;}
  .flexWrap{flex-wrap:wrap;}
  .fontBig{font-size:${market_style.font.size.small1};font-weight:800;}
  .fontNormal{font-size:${market_style.font.size.small1};}
  .bold{font-weight:500;}
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
class ItemDetail_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowmember: false,
      isLike: this.props.like == null ? false : this.props.like,
      expandingContent: false, expandingReview: false, expandingBoard: false,
      isexpandingContent: false, isexpandingReview: false, isexpandingBoard: false,
      //for review detail
      reviewdetail: false, detail: null, reviewWrite: false, writeReviewID: null,
    }
    this.onClickLike = this.onClickLike.bind(this);
    this.buyThisItem = this.buyThisItem.bind(this);
    this.modifyThisItem = this.modifyThisItem.bind(this);
    this.selectMethod = this.selectMethod.bind(this);
    this.gotoChargePoint = this.gotoChargePoint.bind(this);
    this.purchaseThisItem = this.purchaseThisItem.bind(this);
  };
  componentWillUpdate(nextProps) {
    if (this.props.like !== nextProps.like) {
      this.setState({
        isLike: nextProps.like,
      })
    }
  };
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

  render() {
    const item = this.props.item;
    const { expandingContent, expandingReview, expandingBoard } = this.state;
    const { score } = this.props.item;
    let tag = this.props.ItemDetail.tag + "";
    console.log(this.props);

    const RenderStar = () => {
      return <Rating size="small" name="score" icon='star' defaultRating={parseInt(score, 10)} maxRating={5} disabled />
    }
    return(
      <React.Fragment>
        <Wrapper>
          <ShadowBox img={item.thumbnail ? item.thumbnail.l_img : noimg} face={item.who||who}>
            <div className="wrap flex">
              <div className="thumbnail"/>
              <div className="profile">
                <div className="row marginLeft">
                  <div className="fontBig">{this.props.ProductDetail == null ? item.title : this.props.ProductDetail.title}</div>
                  <div className="flex vCenter marginTop">
                    <div className="face"/>
                    <div className="fontNormal">
                        {item.userName}
                        {this.props.userInfo && item.members && item.members.length > 0
                        ?
                        `외 ${item.members.length}명` : null}
                    </div>
                  </div>
                </div>
                <div className="row marginLeft">
                  <RenderStar/>
                  <div className="">
                  <div className="fontBig bold">{PointFormat(item.price / (item.price > 9999 ? 10000 : 1) || 0)}{item.price > 9999 ? "만" : ""} point</div>
                  </div>
                </div>
              </div>
            </div>
              <div className="row padding">
              <div className="fontBig marginBottom">설명</div>
                <div className="fontNormal"
                     dangerouslySetInnerHTML={{ __html: `${item.description || ""}` }}
                />
                <div className="fontBig marginTop marginBottom">유형</div>
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
                <div className="fontBig marginTop marginBottom">태그</div>
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
          <RedButton isLike={this.state.isLike} onClick={this.onClickLike}>
            {this.state.isLike == true? "관심 항목":"관심 항목 등록"}
          </RedButton>
          <Link
            onClick={async (e) => {
              return this.props.isbuy > 0 ?
                await confirm("이미 구매하신 이력이 존재합니다. 계속 진행하겠습니까?") ? null : window.history.go(-1)
                : null
            }}
            to={{
              pathname: `/payment`, state: {
                item: this.props.item,
                custom: null,
                options: null
              }
            }
            }>
          <RedButton isLike={true}>
            아이템 구입
          </RedButton>
          </Link>

          <Header>아이템 상세내용</Header>
          <ShadowBox>
            {item &&
              item.headers &&
              item.headers.length > 0 &&
              item.headers.map(
                (head, index) =>
                      <div className="fontNormal">
                        {head.editor_type === "project"
                          ? <ItemStepContainer index={index} header={head} item={item} id={head.content_id} bought={item.bought} />
                          : null}
                        {head.editor_type === "blog"
                          ? <CardSourceDetailContainer bought={item.bought} isCancel cardId={item.cardId} />
                          : null}
                      </div>
              )}
          </ShadowBox>
          <Header>리뷰</Header>
          <ShadowBox>
                <ItemReviewContainer_mobile
                user_id={item.user_id}
                detail={this.state.detail}
                handler={detail => this.setState({ reviewdetail: true, detail: detail })}
                isExpanding={(result) => { this.setState({ isexpandingReview: result }) }} 
                total={this.props.total}
                />
          </ShadowBox>
          <Header>게시판</Header>
          <ShadowBox>
                <ItemQuestionContainer_mobile user_id={item.user_id} isExpanding={(result) => { this.setState({ isexpandingBoard: result }) }} />
          </ShadowBox>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default ItemDetail_mobile;
