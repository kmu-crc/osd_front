import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Button from "components/Commons/Button";
// import MyDesignContainer from "containers/MyPage/MyDesignContainer";
// import MemberDesignContainer from "containers/MyPage/MemberDesignContainer";
// import MyGroupContainer from "containers/MyPage/MyGroupContainer";
// import MyLikeDesignContainer from "containers/MyPage/MyLikeDesignContainer";
// import MyLikeDesignerContainer from "containers/MyPage/MyLikeDesignerContainer";
// import MyInvitedContainer from "containers/MyPage/MyInvitedContainer";
// import MyInvitingContainer from "containers/MyPage/MyInvitingContainer";
import ContentBox from "components/Commons/ContentBox";
import StyleGuide from "StyleGuide";
import profile from "source/thumbnail.png";
// import NumberFormat from "modules/NumberFormat";
import TextFormat from "modules/TextFormat";
import noimg from "source/noimg.png";

// CSS STYLING
const Wrapper = styled(Grid)`
  width: 100%;
  &.ui.grid {
    margin-top: 2rem;
    margin-bottom: 5rem;
    margin-left: 0rem;
    margin-right: 0rem;
  }
  &.ui.grid > .row,
  &.ui.grid > .row > .column {
    padding: 0;
  }
  & .edit {
    margin-bottom: 5px;
  }
  & .contentRow {
    box-shadow: 2px 2px 2px rgba(0,0,0,0.1);
  }
`;
const HeadContainer = styled(Grid.Column)`
  background-color: ${StyleGuide.color.geyScale.scale1};
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
`;
const ProfileSection = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  padding: 1rem;
  & .imgContainer {
    width: 100%;
    height: 140px;
  }
  & .imgContainer > div {
    width: 140px;
    height: 140px;
    margin: auto;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.25);
    overflow: hidden;
    background-position: 50%;
    background-size: cover;
  }
  & .title {
    min-height: 40px;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    padding: 10px 0;
  }
  & .category {
    min-height: 20px;
    text-align: center;
    color: #EB3324;
  }
`;
//const CountSection = styled.div`
//  padding: 1rem 2rem;
//  & .list {
//    height: 24px;
//    width: 100%;
//    font-size: 13px;
//  }
//  & .list span {
//    float: right;
//    font-size: 18px;
//  }
//`;
const InfoSection = styled.div`
  padding: 1rem;
  & .explanation {
    font-size: 13px;
  }
`;
const TabContainer = styled(Grid.Column)`
  background-color: white;
  border-right: 1px solid rgba(0,0,0,0.15);
  box-shadow: 0 0 5px rgba(0,0,0,0.25);
  & .columns {};
  & .ui.default.dropdown:not(.button) > .text,
  & .ui.dropdown:not(.button) > .default.text {
    color: inherit;
  };
`;
const Head = styled(Grid)`
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  &.ui.grid > .row {
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
  }
  & ul.mainOption {
    font-size: 1rem;
    font-weight: bold;
    & li {
      padding-right: 4rem;
    }
  }
  &.ui.grid > .row > ul.column {
    line-height: 38px;
    padding-left: 2rem;
  }
  & li {
    float: left;
    text-align: center;
    cursor: pointer;
    padding-right: 2rem;
  }
  & li:hover {
    font-weight: 500;
  }
  & li.onSelected {
    color: red;
    position: relative;
  }
`;
//const MiniContentBox = styled.div`
//  margin: 0 auto;
//  padding: 20px 0;
//
//  @media only screen and (max-width: 767px) and (min-width: 320px){
//    padding: 0 20px;
//    width: 320px;
//  }
//  @media only screen and (max-width: 991px) and (min-width: 768px){
//    width: 450px;
//  }
//  @media only screen and (min-width: 992px){
//    width: 440px;
//  }
//  @media only screen and (max-width: 1919px) and (min-width: 1200px){
//    width: 760px;
//  }
//  @media only screen and (min-width: 1920px){
//    width: 1100px;
//  }
//  @media only screen and (max-width: 991px) and (min-width: 768px){
//    .ui.grid > .row{
//      margin-left: 6.25% !important;
//    }
//  }
//  @media only screen and (max-width: 1919px) and (min-width: 1200px){
//    .ui.grid > .row{
//      margin-left: 6.25% !important;
//    }
//  }
//`;
//const TEST = styled.div`
//// div{border:1px solid red;};
//`;
class MyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "WriteReview"//"OrderProduct" 
    };
  }
  componentWillMount() {
    this.props.GetMyDetailRequest(this.props.token);
  }
  typeChange = e => {
    const target = e.target;
    let url = `/myPage${target.id}`;
    this.props.history.replace(url);
  };
  type2Change = e => {
    const target = e.target;
    let url = `/myPage/${this.props.type ? this.props.type : "content"}${target.id}`;
    this.props.history.replace(url);
  };
  onChangedSelected = (value) => {
    this.setState({ selected: value });
  }
  render() {
    let MyInfo = this.props.MyDetail;
    // let count = (MyInfo.count != null) ? MyInfo.count : { total_like: 0, total_design: 0, total_group: 0, total_view: 0 };
    //    const ContentPage = () => {
    //      if (this.props.MyDetail.length && this.props.MyDetail.length === 0) {
    //        return <div />;
    //      } else {
    //        return (
    //          <div>
    //            {this.props.type2 === "group"
    //              ? <MyGroupContainer token={this.props.token} />
    //              : this.props.type2 === "teamDesign"
    //                ? <MemberDesignContainer token={this.props.token} uid={MyInfo.uid} />
    //                : <MyDesignContainer token={this.props.token} />
    //            }
    //          </div>
    //        );
    //      }
    //    };
    //
    //    const LikePage = () => {
    //      if (this.props.MyDetail.length && this.props.MyDetail.length === 0) {
    //        return <div />;
    //      } else {
    //        return (
    //          <div>
    //            {this.props.type2 === "designer"
    //              ? <MyLikeDesignerContainer token={this.props.token} />
    //              : <MyLikeDesignContainer token={this.props.token} />
    //            }
    //          </div>
    //        )
    //      }
    //    }
    //
    //    const JoinPage = () => {
    //      if (this.props.MyDetail.length && this.props.MyDetail.length === 0) {
    //        return <div />;
    //      } else {
    //        return (
    //          <MyInvitedContainer token={this.props.token} history={this.props.history} />
    //        );
    //      }
    //    }
    const ConvertUserType = (props) => {
      const button_menu = [
        { img: `url(${noimg})`, description: `다양한 아이디어를 판매하세요!`, text: `디자이너 등록/관리` },
        { img: `url(${noimg})`, description: `제작 기술을 공유하고 장소를 쉐어해보세요!`, text: `메이커 등록/관리` },
        { img: `url(${noimg})`, description: `본인인증을 통해 더욱 다양한 혜택을 누려보세요!`, text: `본인인증하기` },
      ];
      return <div style={{ marginBottom: "25px", border: "1px solid #EFEFEF" }}>
        <div style={{ padding: "15px", borderBottom: "1px solid #EFEFEF", minHeight: "40px", fontWeight: "bold", fontSize: "18px" }}>{MyInfo.nick_name}</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {button_menu.map((item, index) => {
            return <div key={item.text} style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <div><div style={{ margin: "auto", backgroundImage: item.img, width: "75px", height: "75px", backgroundSize: "cover" }} /></div>
                <div>{item.description}</div>
                <div style={{ margin: "auto", width: "max-content", padding: "5px 15px", backgroundColor: "#E0E0E0", borderRadius: "5px", color: "#707070", fontSize: "12px" }}>{item.text}</div>
              </div>
            </div>
          })}
        </div>
      </div>
    }

    // 주문 상품 정보
    const OrderProduct = (props) => {
      return <div>
        {/* <div>주문 상품 정보</div> */}
        {/* filter - date picker */}
        <div style={{ border: "1px solid #E0E0E0", padding: "15px 5px", margin: "0px", display: "flex", flexDirection: "row" }}>
          <div style={{ borderRadius: "5px", border: "1px solid #AAA", width: "max-content", padding: "5px 10px", marginLeft: "10px", backgroundColor: "#EFEFEF", color: "#707070" }}>오늘</div>
          <div style={{ borderRadius: "5px", border: "1px solid #AAA", width: "max-content", padding: "5px 10px", marginLeft: "10px", backgroundColor: "#EFEFEF", color: "#707070" }}>15일</div>
          <div style={{ borderRadius: "5px", border: "1px solid #AAA", width: "max-content", padding: "5px 10px", marginLeft: "10px", backgroundColor: "#EFEFEF", color: "#707070" }}>1개월</div>
          <div style={{ width: "max-content", padding: "5px 10px", marginLeft: "10px" }}><input placeholder="2019/01/01" style={{ width: "105px" }} /></div>
          <div style={{ width: "max-content", padding: "5px 10px", marginLeft: "0px" }}>~</div>
          <div style={{ width: "max-content", padding: "5px 10px", marginLeft: "0px" }}><input placeholder="2019/12/31" style={{ width: "105px" }} /></div>
          <div style={{ borderRadius: "5px", border: "1px solid #AAA", width: "max-content", padding: "5px 10px", marginLeft: "10px", backgroundColor: "#FFF", color: "#707070" }}>조회</div>
        </div>
        {/* list */}
        <div style={{ border: "1px solid #E0E0E0", padding: "", marginTop: "10px" }}>
          {props.items ? props.items.map(item =>
            <div key={item.num}
              style={{ padding: "10px", display: "flex", flexDirection: "row" }}>
              <div>
                <div>{item.purchase.date}(구매번호:{item.purchase.num})</div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "120px" }}><img alt="" src={noimg} style={{ width: "100px", height: "100px" }} /></div>
                  <div>
                    <div>{item.product.title}</div>
                    <div>[옵션]{item.purchase.option}</div>
                    <div>[수량]x{item.purchase.amount}</div>
                    <div>결제금액:{item.purchase.price}x{item.purchase.amount}={item.purchase.price * item.purchase.amount}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "150px", textAlign: "center" }}>배송지 정보</div>
                  <div>
                    <div>이름:{item.product.userName}</div>
                    <div>연락처:{item.product.phone}</div>
                    <div>주소:{item.product.addr}</div>
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: "#EFEFEF", padding: "10px" }}>
                <div style={{ textAlign: "center", backgroundColor: "#5E5E5E", padding: "10px 5px", color: "#FFF", fontSize: "16px", width: "120px", borderRadius: "5px", marginLeft: "5px", marginBottom: "5px", }}>구매취소</div>
                <div style={{ textAlign: "center", backgroundColor: "#5E5E5E", padding: "10px 5px", color: "#FFF", fontSize: "16px", width: "120px", borderRadius: "5px", marginLeft: "5px", marginBottom: "5px", }}>교환/반품 신청</div>
                <div style={{ textAlign: "center", backgroundColor: "#5793D8", padding: "10px 5px", color: "#FFF", fontSize: "16px", width: "120px", borderRadius: "5px", marginLeft: "5px", marginTop: "50px", }}>구매후기</div>
              </div>
            </div>
          ) : "항목이 없습니다."}
        </div>
      </div>
    }
    const RefundProduct = (props) => {
      return <div>
        {/* <div>주문 상품 정보</div> */}
        {/* filter - date picker */}
        <div style={{ border: "1px solid #E0E0E0", padding: "15px 5px", margin: "0px", display: "flex", flexDirection: "row" }}>
          <div style={{ borderRadius: "5px", border: "1px solid #AAA", width: "max-content", padding: "5px 10px", marginLeft: "10px", backgroundColor: "#EFEFEF", color: "#707070" }}>오늘</div>
          <div style={{ borderRadius: "5px", border: "1px solid #AAA", width: "max-content", padding: "5px 10px", marginLeft: "10px", backgroundColor: "#EFEFEF", color: "#707070" }}>15일</div>
          <div style={{ borderRadius: "5px", border: "1px solid #AAA", width: "max-content", padding: "5px 10px", marginLeft: "10px", backgroundColor: "#EFEFEF", color: "#707070" }}>1개월</div>
          <div style={{ width: "max-content", padding: "5px 10px", marginLeft: "10px" }}><input placeholder="2019/01/01" style={{ width: "105px" }} /></div>
          <div style={{ width: "max-content", padding: "5px 10px", marginLeft: "0px" }}>~</div>
          <div style={{ width: "max-content", padding: "5px 10px", marginLeft: "0px" }}><input placeholder="2019/12/31" style={{ width: "105px" }} /></div>
          <div style={{ borderRadius: "5px", border: "1px solid #AAA", width: "max-content", padding: "5px 10px", marginLeft: "10px", backgroundColor: "#FFF", color: "#707070" }}>조회</div>
        </div>
        {/* list */}
        <div style={{ border: "1px solid #E0E0E0", padding: "", marginTop: "10px" }}>
          {props.items ? props.items.map(item =>
            <div key={item.num}
              style={{ padding: "10px", display: "flex", flexDirection: "row" }}>
              <div>
                <div>{item.purchase.date}(구매번호:{item.purchase.num})</div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "120px" }}><img alt="" src={noimg} style={{ width: "100px", height: "100px" }} /></div>
                  <div>
                    <div>{item.product.title}</div>
                    <div>[옵션]{item.purchase.option}</div>
                    <div>[수량]x{item.purchase.amount}</div>
                    <div>결제금액:{item.purchase.price}x{item.purchase.amount}={item.purchase.price * item.purchase.amount}</div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "150px", textAlign: "center" }}>배송지 정보</div>
                  <div>
                    <div>이름:{item.product.userName}</div>
                    <div>연락처:{item.product.phone}</div>
                    <div>주소:{item.product.addr}</div>
                  </div>
                </div>
              </div>
              {/* <div style={{ backgroundColor: "#EFEFEF", padding: "10px" }}> */}
              {/* <div style={{ textAlign: "center", backgroundColor: "#5E5E5E", padding: "10px 5px", color: "#FFF", fontSize: "16px", width: "120px", borderRadius: "5px", marginLeft: "5px", marginBottom: "5px", }}>구매취소</div> */}
              {/* <div style={{ textAlign: "center", backgroundColor: "#5E5E5E", padding: "10px 5px", color: "#FFF", fontSize: "16px", width: "120px", borderRadius: "5px", marginLeft: "5px", marginBottom: "5px", }}>교환/반품 신청</div> */}
              {/* <div style={{ textAlign: "center", backgroundColor: "#5793D8", padding: "10px 5px", color: "#FFF", fontSize: "16px", width: "120px", borderRadius: "5px", marginLeft: "5px", marginTop: "50px", }}>구매후기</div> */}
              {/* </div> */}
            </div>
          ) : "항목이 없습니다."}
        </div>
      </div>
    }
    /* 구매후기 쓰기 */
    const WriteReview = (props) => {
      return <div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>구매후기 작성하기</div>
          <div>내가 쓴 구매후기</div>
        </div>
        {props.items && props.items.length ? props.items.map(item =>
          <div style={{ backgroundColor: "#EAEAEA" }}>
            <div>
              <div><img alt="" src={noimg} style={{ width: "75px", height: "75px" }} /></div>
              <div>
                <div>{item.product.title}</div>
                <div>[옵션] {item.purchase.option}</div>
                <div>[수량]x{item.purchase.amount}</div>
              </div>
            </div>
            <div style={{ margin: "10px", backgroundColor: "#FFFFFF", borderRadius: "1px", textAlign: "center", }}>구매후기 작성하기</div>
          </div>) : "항목이 없습니다."}
      </div>
    }
    const ReviewWritten = () => {
      return <div>내가 쓴 구매후기</div>
    }
    const LikeProduct = () => {
      return <div>관심 상품</div>
    }
    const LikeDesigner = () => {
      return <div>관심 디자이너</div>
    }
    const LikeMaker = () => {
      return <div>관심 메이커</div>
    }

    const PurchaseMenu = [
      { text: "주문 상품 정보", value: "OrderProduct" },
      { text: "반품/교환/취소 내역", value: "RefundProduct" },
    ];
    const ReviewMenu = [
      { text: "구매후기 쓰기", value: "WriteReview" },
      { text: "내가 쓴 구매후기", value: "ReviewWritten" },
    ];
    const LikesMenu = [
      { text: "관심 상품", value: "LikeProduct" },
      { text: "관심 디자이너", value: "LikeDesigner" },
      { text: "관심 메이커", value: "LikeMaker" },
    ];
    const LeftTotalMenu = [
      { text: "구매내역", sub: PurchaseMenu },
      { text: "리뷰", sub: ReviewMenu },
      { text: "관심 항목", sub: LikesMenu },
    ];
    const components = {
      OrderProduct: OrderProduct,
      RefundProduct: RefundProduct,
      WriteReview: WriteReview,
      ReviewWritten: ReviewWritten,
      LikeProduct: LikeProduct,
      LikeDesigner: LikeDesigner,
      LikeMaker: LikeMaker
    };

    // const ContentOption = [
    //   { text: "내 디자인", value: "design", default: null },
    //   { text: "내가 속한 디자인", value: "teamDesign", default: "teamDesign" },
    //   { text: "내 그룹", value: "group", default: "group" }
    // ];
    // const LikeOption = [
    //   { text: "디자인", value: "design", default: null },
    //   { text: "디자이너", value: "designer", default: "designer" },
    // ];

    const { selected } = this.state;
    const RightComponent = components[selected];
    return (
      <div>
        {MyInfo !== null && (
          <ContentBox>
            <Wrapper padded={false} columns={2}>
              <Grid.Row className="edit">
              </Grid.Row>
              {/* ------------------------ 좌측 프로필 섹션 -------------------------- */}
              <Grid.Row className="contentRow">
                <HeadContainer mobile={16} tablet={16} computer={5} largeScreen={4}>
                  <ProfileSection>
                    <div className="imgContainer">
                      <div style={MyInfo.profileImg
                        ? { backgroundImage: `url(${MyInfo.profileImg.m_img})` }
                        : { backgroundImage: `url(${profile})` }}>
                      </div>
                    </div>
                    <div className="title" style={{ margin: "auto", width: "max-content", display: "flex", flexDirection: "row" }}>
                      <h4><i className="circle icon" />디자이너 &nbsp; <i className="square icon" />메이커</h4>
                    </div>
                    <div className="title">
                      <h3><TextFormat txt={MyInfo.nick_name} /></h3>
                    </div>
                    {/* <div className="category">{MyInfo.categoryName ? MyInfo.categoryName : "전체"}</div> */}
                    <div className="category">
                      <Link to="/myModify">
                        <Button>내 정보 수정</Button>
                      </Link>
                    </div>
                    <InfoSection>
                      <h4>소개</h4>
                      <p className="explanation">
                        <TextFormat lines={3} txt={MyInfo.about_me} />
                        {/* {MyInfo.about_me} */}
                      </p>
                    </InfoSection>
                  </ProfileSection>
                  <div style={{ display: "flex", flexDirection: "column", padding: "10px" }}>
                    {LeftTotalMenu.map(main =>
                      <div key={main.value}>
                        <div
                          style={{ backgroundColor: "#E0E0E0", padding: "10px", paddingLeft: "15px", fontSize: "16px", marginTop: "2px" }}>{main.text}</div>
                        {main.sub.map(sub => <div
                          onClick={() => this.onChangedSelected(sub.value)}
                          style={{ cursor: "pointer", color: selected === sub.value ? "red" : "black", marginTop: "2px", padding: "10px", backgroundColor: "white", border: "1px solid #E0E0E0" }}
                          key={sub.value}>{sub.text}</div>)}
                      </div>
                    )}
                  </div>
                </HeadContainer>
                {/* ------------------------ 우측 카드 렌더링 섹션 -------------------------- */}
                <TabContainer mobile={16} tablet={16} computer={11} largeScreen={12}>
                  <Head padded={true}>
                    <Grid.Row>
                      <Grid.Column>
                        <ConvertUserType />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <RightComponent items={
                          [{ purchase: { num: "12345678", date: "11월26일(화)", option: "옵션옵션옵션", amount: "1", price: "10000" }, product: { title: "상품명상품명상품명", userName: "홍길동", phone: "010****7337", addr: "경기도 고양시 일산동구 장항동 신성하이네스트 605호" } },
                          { purchase: { num: "12345678", date: "11월26일(화)", option: "옵션옵션옵션", amount: "1", price: "10000" }, product: { title: "상품명상품명상품명", userName: "홍길동", phone: "010****7337", addr: "경기도 고양시 일산동구 장항동 신성하이네스트 605호" } },
                          { purchase: { num: "12345678", date: "11월26일(화)", option: "옵션옵션옵션", amount: "1", price: "10000" }, product: { title: "상품명상품명상품명", userName: "홍길동", phone: "010****7337", addr: "경기도 고양시 일산동구 장항동 신성하이네스트 605호" } },]} />
                      </Grid.Column>
                    </Grid.Row>
                  </Head>
                </TabContainer>
              </Grid.Row>
            </Wrapper>
          </ContentBox>
        )
        }
      </div>
    );
  }
}

export default MyDetail;

/* <TabContainer
<Head padded={true}>
<Grid.Row>
<Grid.Column as="ul" className="mainOption">
<li id="/content"
className={this.props.type === "content" || this.props.type === null ? "onSelected" : ""}
onClick={this.typeChange}>
내 컨텐츠
</li>
<li id="/join"
className={this.props.type === "join" ? "onSelected" : ""}
onClick={this.typeChange}>
내가 받은 초대
</li>
<li id="/like"
className={this.props.type === "like" ? "onSelected" : ""}
onClick={this.typeChange}>
내 좋아요
</li>
<div className="clear" />
</Grid.Column>
</Grid.Row>
<Grid.Row>
<Grid.Column as="ul">
{this.props.type === "like"
? LikeOption.map((item, i) => (
<li key={i} id={`/${item.value}`} className={this.props.type2 === item.value ? "onSelected" : this.props.type2 === item.default ? "onSelected" : ""} onClick={this.type2Change}>
{item.text}
</li>
))
: this.props.type === "join"
? <div></div>
: ContentOption.map((item, i) => (
<li key={i} id={`/${item.value}`} className={this.props.type2 === item.value ? "onSelected" : this.props.type2 === item.default ? "onSelected" : ""} onClick={this.type2Change}>
{item.text}
</li>
))
}
</Grid.Column>
</Grid.Row>
</Head>
<MiniContentBox>
<Route path="/myPage/:type?/:type2?"
component={this.props.type === "join" ? JoinPage
: this.props.type === "like" ? LikePage
: ContentPage}
/>
</MiniContentBox>
</TabContainer> */