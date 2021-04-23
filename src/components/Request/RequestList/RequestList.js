import React, { Component } from "react";
import styled from "styled-components";
import Sorting from "components/Commons/Sorting";
import ScrollRequestListContainer from "containers/Request/ScrollRequestListContainer";
import ContentBox from "components/Commons/ContentBox";
import Category from "components/Commons/Category";
import { Modal } from "semantic-ui-react";
import Cross from "components/Commons/Cross";
import { TextControllerClassic } from "components/Commons/InputItem/TextControllerClassic";
import ArticleModal from "components/Commons/ArticleModal/ArticleModal";
import market_style from "market_style";

// CSS STYLING
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  &.left {
    margin-left: auto;
  }
`;
const TitleBox = styled.div`
  padding:0px 15px;
  margin-top: ${props => props.top == null?"0px":props.top}px;
  margin-bottom: ${props => props.bottom==null?"0px":props.bottom}px;
  width: 100%; 
  display:flex;
  justify-content:space-between;
  flex-wrap:wrap;

  ._title{
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    font-family:Noto Sans KR;
    font-weight:600;
    font-size:${market_style.font.size.normal3};
    color:black;
  }
  .sort{
    width:100%;
  }
  @media only screen and (max-width: 800px) and (min-width: 500px){
    margin-top:0px;
    ._title{
      width:100%;
      justify-content:flex-end;
    }
    .sort{
      width:100%;
    }
  }
`
const Content = styled(ContentBox)`
  margin-top: ${props => props.top == null?"0px":props.top}px;
  margin-bottom: ${props => props.bottom==null?"0px":props.bottom}px;
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
  justify-content:center;
  font-size:${market_style.font.size.normal1};
  font-weight: 300;
  font-family: Noto Sans KR;
  color:black;
  .element {
    margin-right: 25px;
  }
  .active {
    font-weight:500;
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
  width: 87%;
  height: 45px;
  border-radius: 20px;
  background-color:#EFEFEF;
  outline: none;
  border:none;
  resize: none;

`;
const CommentForm = styled.textarea`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color:#EFEFEF;
    outline: none;
    border:none;
    resize: none;

`;
const WriteNormalArticleModal = styled(Modal)`
  width:988px;
  height:541px;
  min-width:300px;
  min-height:200px;
  // max-width:790px;
  width:45%;
  height:max-height;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
  margin-bottom:10px;
  border-radius:15px !important;
  padding:25px 25px 50px 60px;
  .close-box{
    width: 100%;
    height:max-content;
    display:flex;
    justify-content:flex-end;
    margin-bottom:10px;
  
  }
  .title_label{
    font-size:${market_style.font.size.normal3};
    font-weight:500;
    min-width:65px;
    height:max-content;
  }
  .form{
      width:100%;
      height:max-content;
      margin-bottom:30px;
      display:flex;
  }
  .align_item_center{
    align-items:center;
  }
  .form_height{
    height:max-content;
  }
  .redButtonBox{
    padding-top:37px;
    width:95%;
    display:flex;
    justify-content:center;
  }
  .redButton{
    background-color:red;
    width:121px;
    height:45px;
    display:flex;
    justify-content:center;
    align-items:center;
    .btnText{
      font-size:${market_style.font.size.normal3};
      color:white;
    }
  }
  .contents{
      display:flex;
      justify-content:flex-end;
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
    margin-bottom:10px;
    display:flex;
    justify-content:flex-end;
    .button{
        width:150px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color:red;
        cursor:pointer;
        padding:4px 39px 4px 39px;
    }
    .font{
      font-size:${market_style.font.size.small1};
      color:white;
    }
`;
const Container = styled.div`
  display: flex;
  justify-content:center;
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
  width:100%;
  height:36px;
  border: 1px solid #eaeaea;
  margin-top:10px;
  padding:6px 54px 6px 54px;
  display:flex;
  .title{
    min-width:83%;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.mini2};
  }
  .writer{
    min-width:14%;
    display:flex;
    align-items:center;
    font-size:${market_style.font.size.mini2};
  }
  .date{
    min-width:max-content;
    width:max-content;
    display:flex; 
    justify-content:center;
    align-items:center;
    font-size:${market_style.font.size.mini2};
    }
    @media only screen and (min-width: 500px) and (max-width:1000px){
      padding:6px 54px 6px 20px;
      .title{
        min-width:70%;
      }
      .writer{
        min-width:16%;
      }
    }
`;
const target = `request`;
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
    this.handleCate1 = this.handleCate1.bind(this);
    this.handleCate2 = this.handleCate2.bind(this);
    this.handleCate3 = this.handleCate3.bind(this);
    this.resetCate = this.resetCate.bind(this);
    this.sortChange = this.sortChange.bind(this);
    this.typeChange = this.typeChange.bind(this);
    this.createNoneRequest = this.createNoneRequest.bind(this);
    // this.onChangeValue = this.onChangeValue.bind(this);
  }
  handleCate1 = (value) => {
    const { type, cate2, cate3, sort, keyword } = this.props;
    this.props.history.push(`/${target}/${type}/${value}/${cate2}/${cate3}/${sort}/${keyword}`);
  }
  handleCate2 = (parent, value) => {
    const { type, cate3, sort, keyword } = this.props;
    this.props.history.push(`/${target}/${type}/${parent}/${value}/${cate3}/${sort}/${keyword}`);
  }
  handleCate3 = (parent, value) => {
    const { type, cate1, sort, keyword } = this.props;
    this.props.history.push(`/${target}/${type}/${cate1}/${parent}/${value}/${sort}/${keyword}`);
  }
  resetCate = () => {
    const { type, sort, keyword } = this.props;
    this.props.history.push(`/${target}/${type}/null/null/null/${sort}/${keyword}`);
  }
  sortChange = (_, { value }) => {
    const { type, cate1, cate2, cate3, keyword } = this.props;
    this.props.history.push(`/${target}/${type}/${cate1}/${cate2}/${cate3}/${value}/${keyword}`);
  }
  typeChange = (type) => {
    const { sort, keyword } = this.props;
    this.props.history.push(`/${target}/${type}/null/null/null/${sort}/${keyword}`);
  }
  createNoneRequest = (title, content) => {
    const data = {
      type: this.props.type,
      status: "normal",
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      // content: this.state.content,
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
          this.props.GetRequestListRequest(this.props.type, 0, this.props.cate1, this.props.cate2, this.props.sort, null);
        }
        this.setState({ write: false, title: "", comment: "" });
      })
      .catch(err => console.log("에러발생" + err));
  }
  // async onChangeValue(data) { //   await this.setState({ content: data.content }); // };

  render() {
    const { category1, category2, category3 } = this.props;
    const { cate1, cate2, cate3 } = this.props;
    const { sort, type } = this.props;

    const { write } = this.state;

    return (
      <React.Fragment>
        <Content top={15}>
          <TabContainer>
            <CategoryItem className={type === "designer" ? "element active" : "element"} onClick={() => this.typeChange("designer")}>디자이너</CategoryItem>
            <CategoryItem className={type === "maker" ? "element active" : "element"} onClick={() => this.typeChange("maker")}>메이커</CategoryItem>
            <CategoryItem className={type === "item" ? "element active" : "element"} onClick={() => this.typeChange("item")}>아이템</CategoryItem>
            <CategoryItem className={type === "normal" ? "element active" : "element"} onClick={() => this.typeChange("normal")}>일반</CategoryItem>
          </TabContainer>
        </Content>


        <Content>
          <Container>
            <div className="category">
              <Category // which="게시판" 
                firstFontSize = {market_style.font.size.small1}
                secondFontSize = {market_style.font.size.mini2}
                handleCate1={this.handleCate1}
                handleCate2={this.handleCate2}
                handleCate3={this.handleCate3}
                resetCate={this.resetCate}
                cate1={cate1}
                cate2={cate2}
                cate3={cate3}
                category1={category1}
                category2={category2}
                category3={category3}
              />
            </div>
            {/* <div className="sort"> <Sorting handleClick={this.sortChange} placeholder={sort} /> </div> */}
            {/* <div className="request" style={{ marginLeft: "auto" }}> */}
            {/* {type !== "normal" && type !== "item" ? type === "designer" ? <RequestButton> <Link to={`/requestToDesigner/null`}>디자인 의뢰</Link> </RequestButton> : type === "maker" ? <RequestButton> <Link to={`/requestToMaker/null`}>제작 의뢰</Link> </RequestButton> : null : null} */}
            {/* </div> */}
          </Container>
        </Content>

        <TitleBox top={0}>
          <div className="sort" />
          <div className="_title">게시판</div>
          <div className="sort">
            <Sorting handleClick={this.sortChange} placeholder={sort} />
          </div>
        </TitleBox>
        <Content top={17}>
          <ListElement>
            {/* no.    <div style={{ marginRight: "15px" }}>번호</div> */}
            {/* title   */}<div className="title">제목</div>
            {/* writer  */}<div className="writer">글쓴이</div>
            {/* date    */}<div className="date">작성일</div>
            {/* {/* view    <div style={{ marginRight: "15px" }}>조회수</div> */}
            {/* {/* like    <div style={{ marginRight: "15px" }}>좋아요</div> */}
          </ListElement>
          <Wrapper className="listWrap">
            <ScrollRequestListContainer type={type} sort={sort} cate1={cate1} cate2={cate2} cate3={cate3} history={this.props.history} />
          </Wrapper>
        </Content>


        <Content top={20} bottom={75}>
          {write ?
            <ArticleModal
              write={this.state.write}
              handlerModal={(write) => { this.setState({ write: write }) }}
              createNoneRequest={(title, content) => this.createNoneRequest(title, content)}
            /> /*<WriteNormalArticleModal open={write} onClose={() => this.setState({ write: false, title: "", comment: "" })}> <div className="close-box" onClick={() => this.setState({ write: false, title: "", comment: "" })}> <Cross style={{cursor:"pointer"}} angle={45} color={"#000000"} weight={3} width={15} height={15} /> </div> <div className="form align_item_center"> <div className="title_label">제목</div> <TitleForm value={this.state.title || ""} onChange={event => this.setState({ [event.target.name]: event.target.value })} name="title" /> </div> <div className="form form_height"> <div className="title_label ">내용</div> <TextControllerClassic item={{content:this.state.content}} name={"comment"} getValue={this.onChangValue} width="750" editheight="240" initClick={this.state.click} deleteItem={this.deleteItem} /> <CommentForm value={this.state.comment || ""} onChange={event => this.setState({ [event.target.name]: event.target.value })} name="comment" /> </div> <div className="form redButtonBox"> <div className="redButton" onClick={this.createNoneRequest} > <div className="btnText" >작성하기</div> </div> </div> </WriteNormalArticleModal>*/
            :
            this.props.userInfo == null ? null :
              <CreateNormalArticleButton onClick={() => {
                this.setState({ write: true, content: "" })
              }}>
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
