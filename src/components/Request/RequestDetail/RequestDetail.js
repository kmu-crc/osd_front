import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ContentBox from "components/Commons/ContentBox";
import Loading from "components/Commons/Loading";
// import { Grid, Icon } from "semantic-ui-react";
// import Button from "components/Commons/Button";
import { RedButton, /*GrayButton*/ } from "components/Commons/CustomButton"
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

const Wrapper = styled(ContentBox)`
  width: 100%;
  margin-top: 60px;
  margin-bottom: 100px;
  z-index: 3;
  // width:100%;
  // background-color: white;
  // z-index: 3;
  // border: 1px solid white;
  // border-radius: 50px;
  // box-shadow: 5px 5px 10px #00000029;
  // transform: translate(0px, -100px);
`;
const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
    // margin-left:ㅇpx;

  }
  .contentsBox{
    position: relative;
    width:100%;
    display:flex;
    // padding-left:130px;
    padding-top:36px;
  }

`;
// const MainBox = styled.div`
//   width: 100%;
//   margin-left: auto;
//   margin-right: auto;
//   margin-top: 30px;

//   .title{
//     width: max-content;
//     height: 29px;
//     margin-left: 60px;
//     margin-top: 50px;
//     font-family: Noto Sans KR, Medium;
//     font-size: 29px;
//     font-weight: 500;
//   }
//   .contentsBox{
//     position: relative;
//     width:100%;
//     display:flex;
//     // padding-left:130px;
//     padding-top:36px;
//   }

// `
const FormBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
    // border:1px solid black;
  }
  width:939px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:59px;
  padding-right:59px;
  padding-top:49px;
  margin-right:10px;

  .wrapper{
    width:100%;
    margin-bottom:70px;
  }
  .margin_zero{
    margin:0px;
  }
  .flex{
    display:flex;
  }
  .centering{
    align-items:center;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .label{
    min-width:157px;
    height:max-content;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }
  .textBox{
    font-weight:200;
  }

`;
const TagList = styled.div`
    width: 100%;
    display: flex;
    // padding: 10px;
    flex-wrap: wrap;
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
    padding-right: 10px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    .close {
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
    }
`;
const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  // margin-left: 50px;
  margin-bottom: 40px;
`;

class Detail extends Component {
  constructor(props) {
    super(props);
    this.onClickResponse = this.onClickResponse.bind(this);
  }
  onClickResponse() {
    console.log(this.props);
    if (this.props.Detail.status === "request") {
      // console.log(this.props.Detail.type == "designer_req");
      if (this.props.Detail.type === "designer_req" || this.props.Detail.type === "designer") {
        window.location.href = "/ModifyrequestToDesigner/" + this.props.id;
      }
      else if (this.props.Detail.type === "maker" || this.props.Detail.type === "maker_req") {
        window.location.href = "/ModifyrequestToMaker/" + this.props.id;
      }
    }
    else if (this.props.Detail.status === "response") {

    }
  }
  render() {
    const { Detail, MyDetail, } = this.props;
    if (Detail == null || Detail === []) return (<Loading />);
    const TypeText = Detail.type === "maker" ? "제작" : "디자인";
    console.log("this.props:", this.props, "Detail:", Detail, "MyDetail:", MyDetail);
    console.log("===========", Detail.tag);
    const category_level1
      = this.props.category1 && this.props.category1[Detail.category_level1] && this.props.category1[Detail.category_level1].text;
    // const category2
    //   = this.props.category2 && this.props.category2[Detail.category_level1];
    let category_level2 = "";
    this.props.category2 && this.props.category2.map((item, index) => {
      // console.log(item.parent,Detail.category_level1,item.value,Detail.category_level2);
      if (item.parent === Detail.category_level1 && item.value === Detail.category_level2) {
        category_level2 = item.text;
      }
      return item;
    })

    return (
      <React.Fragment>
        {Detail.status === "normal" ? // 게시글
          <Wrapper>
            <MainBox>
              <div className="title">내용</div>
              <div className="contentsBox">
                <FormBox>
                  <div className="wrapper flex centering">
                    <div className="label">제목</div>
                    <div className="textBox">{Detail.title || ""}</div>
                  </div>

                  <div className="wrapper flex centering">
                    <div className="label">내용</div>
                    <div className="textBox" dangerouslySetInnerHTML={{ __html: `${Detail.content || ""}` }}></div>
                  </div>
                </FormBox>
              </div>
            </MainBox>
            <div style={{ display: "flex" }}>
            </div>
          </Wrapper> :
          Detail.sort_in_group === 0 ?
            <Wrapper>
              <MainBox>
                <div className="title">{TypeText} 의뢰</div>
                <div className="contentsBox">
                  <FormBox>

                    <div className="wrapper flex centering">
                      <div className="label">의뢰자</div>
                      <div className="textBox">{Detail.nick_name || ""}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">제목</div>
                      <div className="textBox">{Detail.title || ""}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">카테고리</div>
                      <div className="textBox">{category_level1 ? category_level1 + (category_level2 ? " > " : "") : null}{category_level2}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">태그</div>
                      <TagList>
                        {Detail && Detail.tag && Detail.tag.split(",").map((item, index) =>
                          <TagPiece key={index}><div>{item}</div></TagPiece>)}
                      </TagList>
                    </div>


                    <div className="wrapper flex centering">
                      <div className="label">의뢰 내용</div>
                      <div className="textBox" dangerouslySetInnerHTML={{ __html: `${Detail.content || ""}` }}/>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">희망 비용</div>
                      <div className="textBox">{parseInt(Detail.price, 10) / 1000 + "천원"}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">기간</div>
                      <div className="textBox">{Detail.start_date}~{Detail.end_date}</div>
                    </div>

                    {
                      Detail.type === "maker" &&
                      <div className="wrapper flex centering">
                        <div className="label">수량</div>
                        <div className="textBox">{Detail.amount}</div>
                      </div>
                    }

                    <div className="wrapper flex centering">
                      <div className="label">{TypeText} 위치</div>
                      <div className="textBox">{LocationList[Detail.location].text}</div>
                    </div>



                    {Detail.type === "designer" ?
                      <div className="wrapper flex centering">
                        <div className="label">{TypeText} 소유권</div>
                        <div className="textBox">{Detail.ownership <= 0 ? "의뢰자" : "디자이너"}</div>
                      </div>
                      :
                      <div className="wrapper flex centering">
                        <div className="label">{TypeText} 재판매</div>
                        <div className="textBox">{Detail.resale <= 0 ? "가능" : "불가능"}</div>
                      </div>
                    }


                    {/* <div className="wrapper flex centering">
                      <div className="label">오프라인 상담</div>
                      <div className="textBox">{Detail.offline <= 0 ? "불가능" : "가능"}</div>
                    </div> */}

                  </FormBox>
                </div>
              </MainBox>
              {!MyDetail ?
                <ButtonWrapper>
                  <Link to={{ pathname: `/responseTo${Detail.type}Req/${Detail.uid}`, state: { detail: Detail, expert: MyDetail } }}>
                    <RedButton value={"의뢰응답"} isConfirm={false} onClickButton={null}></RedButton>
                  </Link>
                  {(this.props.userInfo && Detail && Detail.client_id === this.props.userInfo.uid) ? <RedButton onClick={this.onClickResponse} value={"의뢰수정"} isConfirm={false}></RedButton> : null}
                </ButtonWrapper>
                : null}
            </Wrapper>
            :
            <Wrapper>
              <MainBox>
                <div className="title">의뢰 응답</div>

                <div className="contentsBox">
                  <FormBox>
                    <div className="wrapper flex centering">
                      <div className="label">제목</div>
                      <div className="textBox">{Detail.title}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">카테고리</div>
                      <div className="textBox">{category_level1 ? category_level1 + " > " : "-"}{category_level2}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">태그</div>
                      <TagList>
                        {Detail && Detail.request && Detail.request.tag && Detail.request.tag.split(",").map((item, index) =>
                          <TagPiece key={index}><div>{item}</div></TagPiece>)}
                      </TagList>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">희망비용</div>
                      <div className="textBox">{Detail && Detail.request && parseInt(Detail.request.price, 10) / 1000 + "천원"}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">기간</div>
                      <div className="textBox">~{Detail && Detail.request && Detail.request.term}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">의뢰 내용</div>
                      <div className="textBox" dangerouslySetInnerHTML={{ __html: `${Detail && Detail.request && Detail.request.content}` }}/>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">디자이너 위치</div>
                      <div className="textBox">{Detail && Detail.request && LocationList[Detail.request.location].text}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">소유권</div>
                      <div className="textBox">{Detail && Detail.request && Detail.request.ownership <= 0 ? "의뢰자" : "디자이너"}</div>
                    </div>

                    {/* <div className="wrapper flex centering">
                      <div className="label">오프라인 상담</div>
                      <div className="textBox">{Detail && Detail.request && Detail.request.offline <= 0 ? "불가능" : "가능"}</div>
                    </div> */}

                  </FormBox>

                  <FormBox>
                    {/* <div className="wrapper flex">
                  <div className="label">제목</div>
                  <div className="textBox">{Detail.title}</div>
                </div> */}

                    <div className="wrapper flex">
                      <div className="label">응답자</div>
                      <div className="textBox">{Detail.nick_name}</div>
                    </div>

                    <div className="wrapper flex">
                      <div className="label">설명</div>
                      <div className="textBox"  dangerouslySetInnerHTML={{ __html: `${Detail.content || ""}` }}></div>
                    </div>
                    {
                      Detail.type === "maker" &&
                      <div className="wrapper flex">
                        <div className="label">수량</div>
                        <div className="textBox">{Detail.amount}</div>
                      </div>
                    }

                    <div className="wrapper flex">
                      <div className="label">희망비용</div>
                      <div className="textBox">{parseInt(Detail.price, 10) / 1000 + "천원"}</div>
                    </div>
                    <div className="wrapper flex centering">
                      <div className="label">기간</div>
                      <div className="textBox">~{Detail.term}</div>
                    </div>
                  </FormBox>
                </div>
              </MainBox>
              <ButtonWrapper>
                {/* <RedButton onClick={() => window.history.back()} inactive={true}> */}
                {/* <div>뒤로가기</div> */}
                {/* </RedButton> */}
                {/* <Link to={{ pathname: `/payment/${Detail.uid}`, state: { item: { ...Detail, request_title: Detail && Detail.request && Detail.request.title, request_id: Detail && Detail.request && Detail.request.uid }, custom: true } }} > */}{/* <RedButton ><div>구매하기</div></RedButton> */}{/* </Link> */}
                <RedButton value={"아이템 구입"} onClick={this.props.purchase} isConfirm={true} />
                {/* {isPurchased ? <RedButton onClick={this.props.confirm}>
                  <div>구매확인</div>
                </RedButton> : null} */}
              </ButtonWrapper>
            </Wrapper>}
      </React.Fragment>
    );
  }
}

export default Detail;
