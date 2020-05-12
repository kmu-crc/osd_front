import React, { Component } from "react";
import styled from "styled-components";
import Sorting from "components/Commons/Sorting";
import ScrollRequestListContainer from "containers/Request/ScrollRequestListContainer";
import ContentBox from "components/Commons/ContentBox";
import Category from "components/Commons/Category";
import { Modal } from "semantic-ui-react";
import Cross from "components/Commons/Cross";

// CSS STYLING
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  &.left {
    margin-left: auto;
  }
`;
const Content = styled(ContentBox)`
  margin-top: ${props => props.top || 15}px;
  margin-bottom: ${props => props.bottom || 0}px;
  width: 100%; 
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
  background-color: ${props => props.bgcolor || "#FFFFFF"};
  &.line{
    display: flex;
  }
`;
const TabContainer = styled.div`
  cursor: default;
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: 500;
  font-family: Noto Sans KR;
  line-height: 29px;
  .element {
    margin-right: 25px;
  }
  .active {
    color: #FF0000;
  }
`;
const CategoryItem = styled.div`
  cursor:pointer;
  &:hover{
    opacity:0.8;
  }
`
const TitleForm = styled.input`
  padding: 10px;
  resize: none;
  width: 100%;
  height: 30px;
  border: 1px solid #E6E6E6;
  outline: none;
  border-radius: 10px;
`;
const CommentForm = styled.textarea`
  padding:10px;
  resize:none;
  width:100%;
  height:100px;
  border:1px solid #E6E6E6;
  outline:none;
  border-radius:10px;
`;
const WriteNormalArticleModal = styled(Modal)`
  margin-bottom:10px;
  .close-box{
    width: max-content;
    margin-left: auto;
    margin-right: 25px;
  }
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
const CreateNormalArticleButton = styled.div`
    width:100%;
    height:30px;
    margin-bottom:10px;
    display:flex;
    .button{
        width:max-content;
        height:100%;
        display:flex;
        padding:15px;
        justify-content:center;
        align-items:center;
        border-radius:5px;
        background-color:#707070;
        cursor:pointer;
    }
    .font{
        font-size:15px;
        color:white;
    }
`;
const Container = styled.div`
  display: flex;
  justify-content:space-between;
  .categoy {
    width: max-content;
  }
  .sort {
    width: max-content;
    // margin-left: auto;
  }
  .request {
    width: max-content;
  }
`;
const ListElement = styled.div`
  width: 100%;
  margin: 0 auto 0.9rem;
  font-size: 13px;
  border-radius: 3px 3px 3px 3px;
  overflow: hidden;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  text-align: left;
  box-sizing: border-box;
  padding: 10px;
  list-style: none;
  display: flex;
  fiex-direction: row;
  .title{
    min-width:67%;
    display:flex;
    align-items:center;
    padding:5px;
    // padding-left:15px;
  }
  .writer{
    min-width:10%;
    display:flex;
    align-items:center;
    padding:5px;
    overflow:hidden;
    // padding-left:15px;
  }
  .date{
    min-width:20%;
    align-items:center;
    padding:5px;
    // padding-left:15px;
  }
  // .title{
  //   min-width:70%;
  //   padding:5px;
  // }
  // .writer{
  //   min-width:10%;
  //   padding:5px;
  //   display:flex;
  //   // justify-content:center;
  // }
  // .date{
  //   min-width:20%;
  //   padding:5px;
  //   display:flex;
  //   // justify-content:center;
  // }
`;

class RequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rendering: true,
      path: "request",
      write: false,
      title: "",
      comment: "",
    };
  }
  changeState = async () => {
    await this.setState({ rendering: false });
    await this.setState({ rendering: true });
  }
  cate1Change = (value) => {
    const path = `/${this.state.path}/${this.props.type}/0/${value}/null/${this.props.sort}/null`;
    this.props.history.replace(path);
    // type, page, cate1, cate2, sort, keyword
    this.props.GetRequestTotalCountRequest(value, null);
    this.changeState();
  }
  cate2Change = (cate1, value) => {
    if (cate1 && this.props.cate1 !== cate1) {
      const path = `/${this.state.path}/${this.props.type}/0/${cate1}/${value}/${this.props.sort}/null`;
      this.props.history.replace(path);
    } else {
      const path = `/${this.state.path}/${this.props.type}/0/${this.props.cate1}/${value}/${this.props.sort}/null`;
      this.props.history.replace(path);
    }
    this.props.GetRequestTotalCountRequest(this.props.cate1, value);
    this.changeState();
  }
  sortChange = (e, { value }) => {
    const path = `/${this.state.path}/${this.props.type}/0/${this.props.cate1}/${this.props.cate2}/${value}/null`;
    this.props.history.replace(path);
    this.changeState();
  }
  resetCate = () => {
    this.props.history.replace(`/${this.state.path}/${this.props.type}`);
    this.changeState();
  }
  changeType = (type) => {
    window.location.href = `/request/${type}`;
  };
  createNoneRequest = () => {
    const data = {
      type: this.props.type,
      status: "normal",
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      content: this.state.comment,
      title: this.state.title,
      expert_id: this.props.id || null,
      personal: this.props.id || null,
    };
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          alert("글이 등록되었습니다.");
          this.props.GetRequestListRequest(this.props.type, 0, this.props.cate1, this.props.cate2, this.props.sort, null);
        }
        this.setState({ write: false, title: "", comment: "" });
      })
      .catch(err => alert("에러발생" + err));
  }

  render() {
    const { type, sort, category1, category2, cate1, cate2 } = this.props;
    // console.log(category1, category2, cate1, cate2, sort);
    const { write } = this.state;
    return (
      <React.Fragment>
        <Content top={58}>
          <TabContainer>
            <CategoryItem className={type === "designer" ? "element active" : "element"} onClick={() => this.changeType("designer")}>디자이너</CategoryItem>
            <CategoryItem className={type === "maker" ? "element active" : "element"} onClick={() => this.changeType("maker")}>메이커</CategoryItem>
            <CategoryItem className={type === "item" ? "element active" : "element"} onClick={() => this.changeType("item")}>아이템</CategoryItem>
            <CategoryItem className={type === "normal" ? "element active" : "element"} onClick={() => this.changeType("normal")}>일반</CategoryItem>
          </TabContainer>
        </Content>


        <Content top={58}>
          <Container>
            <div className="category">
              <Category
                handleCate2={this.cate2Change}
                handleCate1={this.cate1Change}
                resetCate={this.resetCate}
                cate1={cate1}
                cate2={cate2}
                category1={category1}
                category2={category2}
                which="게시판" /></div>
            <div className="sort">
              <Sorting handleClick={this.sortChange} placeholder={sort} /></div>

            {/* <div className="request" style={{ marginLeft: "auto" }}> */}
            {/* {type !== "normal" && type !== "item" ?
                type === "designer" ?
                  <RequestButton>
                    <Link to={`/requestToDesigner/null`}>디자인 의뢰</Link>
                  </RequestButton>
                  :
                  type === "maker" ?
                    <RequestButton>
                      <Link to={`/requestToMaker/null`}>제작 의뢰</Link>
                    </RequestButton> : null
                : null} */}
            {/* </div> */}
          </Container>
        </Content>


        <Content top={50}>
          <ListElement>
            {/* no.    <div style={{ marginRight: "15px" }}>번호</div> */}
            {/* title   */}<div className="title">제목</div>
            {/* writer  */}<div className="writer">글쓴이</div>
            {/* date    */}<div className="date">작성일</div>
            {/* {/* view    <div style={{ marginRight: "15px" }}>조회수</div> */}
            {/* {/* like    <div style={{ marginRight: "15px" }}>좋아요</div> */}
          </ListElement>
          <Wrapper className="listWrap">
            {this.state.rendering &&
              <ScrollRequestListContainer type={type} sort={sort} cate1={cate1} cate2={cate2} history={this.props.history} />}
          </Wrapper>
        </Content>


        <Content top={25} bottom={75}>
          {write ?
            <WriteNormalArticleModal open={write} onClose={() => this.setState({ write: false, title: "", comment: "" })}>
              <div className="close-box" onClick={() => this.setState({ write: false, title: "", comment: "" })}>
                <Cross angle={45} color={"#000000"} weight={3} width={33} height={33} />
              </div>
              <div className="form">
                제목: <TitleForm
                  value={this.state.title || ""}
                  onChange={event => this.setState({ [event.target.name]: event.target.value })}
                  name="title"
                />
                내용: <CommentForm
                  value={this.state.comment || ""}
                  onChange={event => this.setState({ [event.target.name]: event.target.value })}
                  name="comment"
                />
              </div>
              <div className="contents">
                <div className="buttonBox">
                  <div className="button" onClick={this.createNoneRequest} >
                    <div className="text" >작성</div>
                  </div>
                </div>
              </div>
            </WriteNormalArticleModal>
            :
            <CreateNormalArticleButton onClick={() => this.setState({ write: true })}>
              <div className="button">
                <div className="font">게시글 작성</div>
              </div>
            </CreateNormalArticleButton>
          }
        </Content>


      </React.Fragment >);
  }
}

export default RequestList;
