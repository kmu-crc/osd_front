import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ContentBox from "components/Commons/ContentBox";
import Loading from "components/Commons/Loading";
// import { Grid, Icon } from "semantic-ui-react";
// import Button from "components/Commons/Button";

const Wrapper = styled(ContentBox)`
    width:100%;
    margin-top:60px;
    margin-bottom: 100px;
    z-index:3;
    // *{border:1px solid red;}
`;
const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
    margin-left:130px;

  }
  .contentsBox{
    position: relative;
    width:100%;
    display:flex;
    padding-left:130px;
    padding-top:36px;
  }

`
const RedButton = styled.div`
  width: 290px;
  height: 70px;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-weight: 500;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.inactive ? "gray" : "red"};

  // position:absolute;
  // left:${props => props.left}px;
  // bottom:${props => props.bottom}px;
  margin-left: 10px;
  margin-top: 15px;

  cursor: pointer;
`
const FormBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width: 939px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:59px;
  padding-top:49px;
  // margin: 50px;
  margin-left: auto;
  margin-right: auto;
  .wrapper{
    width:100%;
    margin-bottom:35px;
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
  .textBox{
    width:70%;
    border:1px solid #E6E6E6;
    border-radius:20px;
    padding: 0.67857143em 1em;
  }
  .label{
    min-width:157px;
    height:29px;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }
`;
const TagList = styled.div`
    width: 100%;
    display: flex;
    padding: 10px;
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

class Detail extends Component {
  render() {
    const { Detail, MyDetail, isPurchased } = this.props;
    if (Detail == null || Detail == []) return (<Loading />);
    const TypeText = Detail.type === "maker" ? "제작" : "디자인";
    console.log("this.props:", this.props, "Detail:", Detail, "MyDetail:", MyDetail);

    const category_level1
      = this.props.category1 && this.props.category1[Detail.category_level1] && this.props.category1[Detail.category_level1].text;
    const category2
      = this.props.category2 && this.props.category2[Detail.category_level1];
    const category_level2
      = category2 && category2[Detail.category_level2] && category2[Detail.category_level2].text;

    return (
      <React.Fragment>
        {Detail.status === "normal" ?
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
                    <div className="textBox">{Detail.content || ""}</div>
                  </div>
                </FormBox>
              </div>
            </MainBox>
            <div style={{ display: "flex" }}>
              <RedButton onClick={() => window.history.back()} inactive={true}><div>뒤로가기</div></RedButton>
            </div>
          </Wrapper> :
          Detail.sort_in_group === 0 ?
            <Wrapper>
              <MainBox>
                <div className="title">의뢰내용</div>
                <div className="contentsBox">
                  <FormBox>

                    <div className="wrapper flex centering">
                      <div className="label">제목</div>
                      <div className="textBox">{Detail.title || ""}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">카테고리</div>
                      <div className="textBox">{category_level1 ? category_level1 + " > " : " _ "}{category_level2}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">태그</div>
                      <TagList>
                        {Detail && Detail.tag && Detail.tag.split(",").map((item, index) =>
                          <TagPiece key={index}>{item}</TagPiece>)}
                      </TagList>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">희망비용</div>
                      <div className="textBox">{Detail.price}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">내용</div>
                      <div className="textBox">{Detail.content}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">{TypeText} 위치</div>
                      <div className="textBox">{Detail.location}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">{TypeText} 소유권</div>
                      <div className="textBox">{Detail.ownership <= 0 ? "불가능" : "가능"}</div>
                    </div>

                    {/* <div className="wrapper flex centering">
                      <div className="label">오프라인 상담</div>
                      <div className="textBox">{Detail.offline <= 0 ? "불가능" : "가능"}</div>
                    </div> */}

                  </FormBox>
                </div>
              </MainBox>
              <div>
                {/* <Link onClick={(event) => this.buyThisItem(event, item)} to={{ pathname: `/payment`, state: { item: item, options: { "test": "test" } } }}>
            <div className="text">아이템구매</div>
          </Link> */}
                <div style={{ display: "flex" }}>
                  <RedButton onClick={() => window.history.back()} inactive={true}><div>뒤로가기</div></RedButton>
                  {!MyDetail ?
                    <Link to={{ pathname: `/responseTo${Detail.type}Req/${Detail.uid}`, state: { detail: Detail, expert: MyDetail } }}>
                      <RedButton><div>의뢰응답</div></RedButton>
                    </Link>
                    : null}
                </div>
              </div>
              {/* {this.props.MyDetail.isDesigner ? <RedButton onClick={this.onAccept} left={1444} bottom={-50}><div>Accept</div></RedButton> : null} */}
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
                          <TagPiece key={index}>{item}</TagPiece>)}
                      </TagList>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">희망비용</div>
                      <div className="textBox">{Detail && Detail.request && Detail.request.price}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">내용</div>
                      <div className="textBox">{Detail && Detail.request && Detail.request.content}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">디자이너 위치</div>
                      <div className="textBox">{Detail && Detail.request && Detail.request.location}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">소유권</div>
                      <div className="textBox">{Detail && Detail.request && Detail.request.ownership <= 0 ? "불가능" : "가능"}</div>
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
                      <div className="label">설명</div>
                      <div className="textBox">{Detail.content}</div>
                    </div>

                    <div className="wrapper flex">
                      <div className="label">희망비용</div>
                      <div className="textBox">{Detail.price}</div>
                    </div>

                  </FormBox>
                </div>
              </MainBox>
              <div style={{ display: "flex" }}>
                <RedButton onClick={() => window.history.back()} inactive={true}>
                  <div>뒤로가기</div>
                </RedButton>
                {/* <Link to={{ pathname: `/payment/${Detail.uid}`, state: { item: { ...Detail, request_title: Detail && Detail.request && Detail.request.title, request_id: Detail && Detail.request && Detail.request.uid }, custom: true } }} > */}{/* <RedButton ><div>구매하기</div></RedButton> */}{/* </Link> */}
                <RedButton onClick={this.props.purchase} >
                  <div>아이템구매</div>
                </RedButton>
                {/* {isPurchased ? <RedButton onClick={this.props.confirm}>
                  <div>구매확인</div>
                </RedButton> : null} */}
              </div>
            </Wrapper>}
      </React.Fragment>
    );
  }
}

export default Detail;
