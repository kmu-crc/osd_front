import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ContentBox from "components/Commons/ContentBox";
import Loading from "components/Commons/Loading";
import { RedButton, } from "components/Commons/CustomButton"
import FileIcon from "components/Commons/FileIcon";
import category_icon from "source/category_icon.svg";

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
`;
const CustomIcon=styled.div`
  width:${props => props.width}px;
  height:${props => props.height}px;
  background-image:url(${props=>props.imgURL});
  background-repeat: no-repeat;
  background-size: contain;
  padding:${props => props.padding}px;
  margin-right:${props=>props.marginRight==null?"13":props.marginRight}px;
  margin-left:${props=>props.marginLeft==null?"13":props.marginLeft}px;
  display:${props=>props.isNon==true?"none":"block"}
`
const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
    margin-left:136px;
  }
  .contentsBox{
    position: relative;
    width:100%;
    display:flex;
    padding:36px 130px 36px 136px;
    .box_{
      width:50%;
    }
    .box_centering{
      width:50%;
      display:flex;
      justify-content:center;
    }
  }

`;


const GoList = styled.div`
  width:100%;
  padding:0px 130px 0px 136px;
  display:flex;
  justify-content:flex-end;
  align-items:center;
  .wrapper{
    cursor:pointer;
    display:flex;
    .text{
      font-size:20px;
      color:#707070;
    }
  }
`
const FormBox = styled.div`
  width:${props=>props.isHalf==true?"50%":"100%"};
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding:${props=>props.isHalf==true?"72px 50px 72px 50px":"72px 113px 72px 113px"};
  margin-right:${props=>props.isLeft==true?"44px":"0px"};
  .term{
    height:44px;
  }
  .wrapper{
    width:100%;
    margin-bottom:50px;
  }
  .margin_zero{
    margin:0px;
  }
  .add_margin_bottom{
    margin-bottom:100px;
  }
  .flex{
    display:flex;
  }
  .centering{
    // align-items:center;
  }
  .color_red{
    color:red;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .addfilebox{
    height:40px;
    margin-right:8px;
    .addfile{
      width:20px;
      height:20px;
      border-left:1px dashed red;
      border-bottom:1px dashed red;
    }
    .black_addfile{
      width:20px;
      height:20px;
      border-left:1px dashed black;
      border-bottom:1px dashed black;
    }
  }
  .file_label_box{
    height:40px;
    display:flex;
    align-items:center;
  }
 
  .file_label{
    font-size:17px;
    color:red;
  }
  ._black_{
    font-size:17px;
    color:black;
  }

  .label{
    min-width:157px;
    height:max-content;
    font-size:20px;
    font-family:Noto Sans CJK KR, Regular;
    color:#707070;
    margin-right:60px;
    border-right:2px solid #707070;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }
  .flex_{
    display:flex;
  }
  .textBox{
    font-family:Noto Sans CJK KR, Regular;
    font-size:17px;
    line-height:17px;
    // display:flex;
  }

`;
const TagList = styled.div`
  width: 100%;
  display: flex;
  // padding: 10px;
  flex-wrap: wrap;
`;
const TagPiece = styled.div`
    width:max-content;
    min-width:30px;
    max-height:30px;
    border:1px solid #707070;
    border-radius:15px;
    padding: 8px 10px 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    font-size:15px;
    font-family:Noto Sans CJK KR, Regular;
    margin-right:8px;
    .close {
        color:#707070;
        margin-left: 10px;
        width: max-content;
        height: max-content;
        padding: 0px 2px;
        cursor:pointer;
    }
`;
const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  margin-bottom: 40px;
  justify-content:center;
  .btnbox{
    width:100%;
    display:flex;
    justify-content:flex-end;
    margin-right:113px;
    margin-left:113px;
    ._box{
      width:50%;
      display:flex;
      justify-content:center;
    }
  }

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
    const level1 = Detail.status=="response"?Detail.request.category_level1:Detail.category_level1;
    const level2 = Detail.status=="response"?Detail.request.category_level2:Detail.category_level2;
    const category_level1
      = this.props.category1 && this.props.category1[level1] && this.props.category1[level1].text;
    // const category2
    //   = this.props.category2 && this.props.category2[Detail.category_level1];
    let category_level2 = "";
    this.props.category2 && this.props.category2.map((item, index) => {
      // console.log(item.parent,Detail.category_level1,item.value,Detail.category_level2);
      if (item.parent === level2 && item.value === level2) {
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
            <GoList>
                  <div className="wrapper" onClick={()=>{
                    console.log(window.history.back())
                  }}>
                    <CustomIcon style={{transform:"rotate(180deg)"}} width="15" height="15" imgURL={category_icon}/>
                    <div className="text">목록으로</div>
                  </div>
              </GoList>
            <div style={{ display: "flex" }}>
            </div>
          </Wrapper> :
          Detail.sort_in_group === 0 ?
            <Wrapper>
              <MainBox>
                <div className="title">{TypeText} 의뢰 상세</div>
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
                      <div className="textBox flex_">
                        {/* {category_level1 ? category_level1 + (category_level2 ? `>` : "") : null}{category_level2} */}
                        {category_level1}
                        {category_level2?<CustomIcon width="15" height="15" marginRight="31" marginLeft="31" imgURL={category_icon}/>:null}
                        {category_level2?category_level2:null}
                      </div>
                    </div>

                    <div className="wrapper flex centering add_margin_bottom">
                      <div className="label">태그</div>
                      <TagList>
                        {Detail && Detail.tag && Detail.tag.split(",").map((item, index) =>{
                          if(item=="")return null;
                          return(
                              <TagPiece key={index}><div>{item}</div></TagPiece>
                          );})}
                      </TagList>
                    </div>


                    <div className="wrapper flex centering ">
                      <div className="label">의뢰 내용</div>
                      <div className="textBox" dangerouslySetInnerHTML={{ __html: `${Detail.content || ""}` }} />
                    </div>

                    
                      <div className="wrapper flex centering add_margin_bottom">
                        <div className="label"/>
                        <div className="addfilebox"><div className="addfile"/></div>
                        
                        <div className="file_label_box">
                        <div className="file_label">
                        {Detail && Detail.file_url ?
                              <a href={Detail.file_url} download={Detail.filename} className="iconWrap">
                                {/* <FileIcon type={"application"} extension={"pdf"} /> */}
                                {Detail.filename}
                              </a>
                              : "첨부 파일 없음"}
                        </div>
                        </div>
                      </div>


                    <div className="wrapper flex centering">
                      <div className="label">희망 비용</div>
                      <div className="textBox">{parseInt(Detail.price, 10) / 1000 + "천 point"}</div>
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

                  </FormBox>
                 
                </div>
              </MainBox>
              <GoList>
                  <div className="wrapper" onClick={()=>{
                    console.log(window.history.back())
                  }}>
                    <CustomIcon style={{transform:"rotate(180deg)"}} width="15" height="15" imgURL={category_icon}/>
                    <div className="text">목록으로</div>
                  </div>
              </GoList>
              {!MyDetail ?
                <ButtonWrapper>
                  {(this.props.userInfo && Detail && Detail.client_id == this.props.userInfo.uid) ? 
                  <RedButton reverse={true} onClick={this.onClickResponse} value={"의뢰수정"} isConfirm={false}></RedButton> 
                  :
                  this.props.userInfo&& Detail && (Detail.expert_id == null ||  Detail.expert_id == this.props.userInfo.uid)?
                  <Link to={{ pathname: `/responseTo${Detail.type}Req/${Detail.uid}`, state: { detail: Detail, expert: MyDetail } }}>
                    <RedButton value={"의뢰응답"} isConfirm={false} onClickButton={null}></RedButton>
                  </Link>
                  :
                  null
                   }
                </ButtonWrapper>
                : null}
            </Wrapper>
            :
            <Wrapper>
              <MainBox>
                <div className="title">{TypeText} 의뢰 응답</div>

                <div className="contentsBox">
                  <FormBox isHalf={true} isLeft={true}>
                  <div className="wrapper flex centering">
                      <div className="label">의뢰자</div>
                      <div className="textBox">{Detail.client_name || ""}</div>
                    </div>
                    <div className="wrapper flex centering">
                      <div className="label">제목</div>
                      <div className="textBox">{Detail.title}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">카테고리</div>
                      <div className="textBox flex_">{category_level1 ? category_level1 + " > " : "-"}{category_level2}</div>
                    </div>

                    <div className="wrapper flex centering add_margin_bottom">
                      <div className="label">태그</div>
                      <TagList>
                        {Detail && Detail.request && Detail.request.tag && Detail.request.tag.split(",").map((item, index) =>
                          <TagPiece key={index}><div>{item}</div></TagPiece>)}
                      </TagList>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">의뢰 내용</div>
                      <div className="textBox" dangerouslySetInnerHTML={{ __html: `${Detail && Detail.request && Detail.request.content}` }} />
                    </div>
                    <div className="wrapper flex centering add_margin_bottom">
                        <div className="label"/>
                        <div className="addfilebox"><div className="black_addfile"/></div>
                        
                        <div className="file_label_box">
                        <div className="_black_">
                        {Detail && Detail.file_url ?
                              <a href={Detail.file_url} download={Detail.filename} className="iconWrap">
                                {/* <FileIcon type={"application"} extension={"pdf"} /> */}
                                {Detail.filename}
                              </a>
                              : "첨부 파일 없음"}
                        </div>
                        </div>
                      </div>


                    <div className="wrapper flex centering">
                      <div className="label">희망비용</div>
                      <div className="textBox">{Detail && Detail.request && parseInt(Detail.request.price, 10) / 1000 + "천 point"}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">기간</div>
                      <div className="textBox">{Detail && Detail.request && `${Detail.request.start_date}~${Detail.request.end_date}`}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">디자이너 위치</div>
                      <div className="textBox">{Detail && Detail.request && LocationList[Detail.request.location].text}</div>
                    </div>

                    <div className="wrapper flex centering">
                      <div className="label">소유권</div>
                      <div className="textBox">{Detail && Detail.request && Detail.request.ownership <= 0 ? "의뢰자" : "디자이너"}</div>
                    </div>
                  </FormBox>
                            
                  <FormBox isHalf={true}>
                    <div className="wrapper flex add_margin_bottom">
                      <div className="label">응답자</div>
                      <div className="textBox">{Detail.nick_name}</div>
                    </div>

                    <div className="wrapper flex add_margin_bottom">
                      <div className="label">설명</div>
                      <div className="textBox" dangerouslySetInnerHTML={{ __html: `${Detail.content || ""}` }}></div>
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
                      <div className="textBox">{parseInt(Detail.price, 10) / 1000 + "천 point"}</div>
                    </div>
                    <div className="wrapper flex centering">
                      <div className="label">기간</div>
                      <div className="textBox">{`${Detail.start_date}~${Detail.end_date}`}</div>
                    </div>
                    
                  </FormBox>
                </div>

              </MainBox>
              <GoList>
                  <div className="wrapper" onClick={()=>{
                    console.log(window.history.back())
                  }}>
                    <CustomIcon style={{transform:"rotate(180deg)"}} width="15" height="15" imgURL={category_icon}/>
                    <div className="text">목록으로</div>
                  </div>
              </GoList>
              {
                this.props.userInfo&& this.props.Detail&&
                this.props.userInfo.uid == this.props.Detail.expert_id?
                <ButtonWrapper>
                <div className="btnbox">
                <div className="_box">
                  <RedButton value={"응답 수정"} onClick={()=>window.location.href=`/${Detail.type=="designer"?'modifyResponseToDesignerReq':'modifyResponseToMakerReq'}/${this.props.id}`} isConfirm={false} />
                </div>
                </div>
              </ButtonWrapper>
                :
                null
              }

            </Wrapper>}
      </React.Fragment>
    );
  }
}

export default Detail;
