import React,{Component} from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import {Dropdown} from "semantic-ui-react"
import {InputTag} from "components/Commons/InputItem/InputTag"

const Wrapper = styled(ContentBox)`
    width:100%;
    margin-top:60px;
    margin-bottom: 100px;
    z-index:3;
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
  width:290px;
  height:70px;
  font-family:Noto Sans KR;
  font-size:20px;
  font-weight:500;
  color:white;
  display:flex;
  justify-content:center;
  align-items:center;
  background-color:red;

  position:absolute;
  left:${props=>props.left}px;
  bottom:${props=>props.bottom}px;

  cursor:pointer;
`

const FormBox=styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width:939px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:59px;
  padding-top:49px;
  margin:50px;
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

`
const InputText = styled.input.attrs({type:"text"})`
  width:${props=>props.width==null?100+"%":props.width+"px"};
  height:43px;
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  margin-right:21px;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;

`
const InputTextarea = styled.textarea`
  width:${props=>props.width==null?100+"%":props.width+"px"};
  height:${props=>props.height==null?100+"%":props.height+"px"};
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  readonly;
  padding: 0.67857143em 1em;

`
const Margin = styled.div`
  width:${props=>props.width==null?100+"%":props.width+"px"};
  height:${props=>props.height==null?100+"%":props.height+"px"}
`

const DropBox = styled(Dropdown)`
    min-width:200px !important;
    background-color:#E9E9E9 !important;
    margin-right:10px;

    border-radius:20px !important;
`
const HRLine=styled.div`
    width:93%;
    height:3px;
    background-color:#E9E9E9;
    margin-top:35px;
    margin-bottom:35px;
`
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
class ResponseToMakerReq extends Component{
  constructor(props){
    super(props);
    this.state = {
      category_level1:0,category_level2:0,
      title:"",tag:[],price:0,content:"",location:"",offline:-1,amount:0,resale:-1,

      res_title:"",res_content:"",res_price:"",
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeResponseTitle=this.onChangeResponseTitle.bind(this);
    this.onChangeResponseContent=this.onChangeResponseContent.bind(this);
    this.onChangeResponsePrice=this.onChangeResponsePrice.bind(this);
  }
  componentDidMount(){
    //test 데이터 초기화
    this.setState({
      category_level1:1,
      category_level2:0,
      title:"제작의뢰합니다.",
      tag:["테스트1","테스트2","테스트3"],
      price:12300,
      content:"제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰",
      location:"대한민국 서울특별시",
      offline:0,
      amount:1,
      resale:0,
    });
  }

  onChangeResponseTitle(event){
    this.setState({
      res_title:event.target.value,
    })
  }
  onChangeResponseContent(event){
    this.setState({
      res_content:event.target.value,
    })
  }
  onChangeResponsePrice(event){
    this.setState({
      res_price:event.target.value,
    })
  }

  onSubmit(){

    let tagList="";
    this.state.tag.map((item,index)=>{ // 태그,태그,태그 ...
      return(
        tagList+=item+","
      );
    });

    
    const Data = {
      type:"maker_res", // "designer_req" "designer_res" "maker_req" "maker_res"
      // user_id: this.props.userInfo.uid // 
      title:this.state.res_title,
      content:this.state.res_content,
      price:this.state.res_price,
    }

    // 페이지이동
    window.location.href = "/request";
  }

  render(){

    const category_level1 = this.props.category1&&this.props.category1[this.state.category_level1].text;
    const category2 = this.props.category2&&this.props.category2[this.state.category_level1];
    const category_level2 = category2&&category2[this.state.category_level2].text;
    return(
      <React.Fragment>
      <Wrapper>
        <MainBox>
          <div className="title">제작 의뢰 응답</div>
          <div className="contentsBox">
            <FormBox>

              <div className="wrapper flex centering">
                <div className="label">제목</div>
                <div className="textBox">{this.state.title}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">카테고리</div>
                <div className="textBox">{category_level1}>{category_level2}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">태그</div>
                <TagList>
                  {
                    this.state.tag.map((item, index) => {
                      return (
                      <TagPiece key={index}>
                        {item}
                    </TagPiece>);
                    })
                  }
                  
                </TagList>
              </div>

              <div className="wrapper flex centering">
                <div className="label">희망비용</div>
                <div className="textBox">{this.state.price}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">의뢰 내용</div>
                <div className="textBox">{this.state.content}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">수량</div>
                <div className="textBox">{this.state.amount}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">메이커 위치</div>
                <div className="textBox">{this.state.location}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">메이커 재판매</div>
                <div className="textBox">{this.state.resale<=0?"불가능":"가능"}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">오프라인 상담</div>
                <div className="textBox">{this.state.offline<=0?"불가능":"가능"}</div>
              </div>

            </FormBox>
            <FormBox>

              <div className="wrapper flex">
                <div className="label">제목</div>
                <InputText onChange={this.onChangeResponseTitle} value={this.state.res_title} width={483}/>
              </div>

              <div className="wrapper flex">
                <div className="label">의뢰 응답</div>
                <InputTextarea onChange={this.onChangeResponseContent} value={this.state.res_content} width={483} height={700}/>
              </div>

              <div className="wrapper flex">
                <div className="label">희망비용</div>
                <InputText onChange={this.onChangeResponsePrice} value={this.state.res_price} width={483}/>
              </div>

            </FormBox>
          </div>         
        </MainBox>
        <RedButton onClick={this.onSubmit} left={1444} bottom={-50}><div>등록하기</div></RedButton>
        </Wrapper>
      </React.Fragment>
    );
  };
}export default ResponseToMakerReq;

// import React, { Component } from "react";
// import { Grid } from "semantic-ui-react";
// import styled from 'styled-components';
// import StyleGuide from "StyleGuide";
// import mainSlide from "source/mainSlide.jpg";
// import ContentBox from "components/Commons/ContentBox";
// import { FormDropBox, FormFile, FormInput, FormCheckBox, FormTag, FormTextArea } from "components/Commons/FormItems";
// import Button from "components/Commons/Button";
// import Loading from "components/Commons/Loading";

// const ImgWrapper = styled.div`
//   background-image: url(${mainSlide});
//   background-position: center;
//   background-size: cover;
//   width: 100%;
//   height: 200px;
//   position: relative;
//   &::after {
//     position: absolute;
//     top: 0;
//     left: 0;
//     display: block;
//     content: "";
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.6);
//     z-index: 1;
//   }
// `;
// const Title = styled.div`
//   width: 100%;
//   color: white;
//   position: absolute;
//   text-align: center;
//   top: 40%;
//   left: 0;
//   z-index: 2;
//   transform: translateY(-50%);
//   h1 {
//     color: ${StyleGuide.color.geyScale.scale0};
//     font-size: ${StyleGuide.font.size.heading2};
//     font-weight: bold;
//   }
// `;
// const Wrapper = styled(ContentBox)`
//     width:100%;
//     margin-top:60px;
//     margin-bottom: 100px;
//     position: relative;
//     z-index:3;
// `;
// const FromFieldCard = styled.div`
//   width: 100%;
//   background-color: white;
//   box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
//   padding: 70px;
//   margin-bottom: 30px;
//   border-radius: 3px;
//   @media only screen and (min-width: 1200px) {
//     padding: 70px 100px 70px 100px;
//   }
// `;
// const Label = styled.div`
//   margin: 0 0 0.8rem 0;
//   display: block;
//   color: rgba(0,0,0,.87);
//   font-size: .92857143em;
//   font-weight: 700;
//   text-transform: none;
// `;

// class CreateRequest extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { loading: false, };
//     this.onSubmit = this.onSubmit.bind(this);
//     this.onChangeTag = this.onChangeTag.bind(this);
//     this.onChangeValue = this.onChangeValue.bind(this);
//     this.onChangeCategory1 = this.onChangeCategory1.bind(this);
//     this.onChangeCategory2 = this.onChangeCategory2.bind(this);
//     this.onChangedPrivate = this.onChangedPrivate.bind(this);
//     this.gotoDetailPage = this.gotoDetailPage.bind(this);
//   }
//   onChangeTag = v => { this.setState({ tag: v }); };
//   onChangeValue = e => { this.setState({ [e.target.name]: e.target.value }); };
//   onChangeCategory1 = v => { this.setState({ category_level1: v }); };
//   onChangeCategory2 = v => { this.setState({ category_level2: v }); };
//   onChangedPrivate = checkbox => { this.setState({ private: checkbox.value }); };
//   gotoDetailPage = id => {
//     if (id) {
//       alert("완료되었습니다.");
//       window.location.href = `/designerBoardDetail/${id}`
//     } else {
//       alert("글 작성에 실패하였습니다.");
//     }
//   };
//   onSubmit = e => {
//     e.preventDefault();
//     this.setState({ loading: true });
//     let data = { ...this.state, writer: this.props.userInfo.uid, type: "designer" };
//     delete data.loading;
//     console.log(data);
//     this.props.CreateDesignerBoardArticleRequest &&
//       this.props.CreateDesignerBoardArticleRequest(data, this.props.token)
//         .then(id => this.gotoDetailPage(id))
//         .catch(e => alert(e));
//     this.setState({ loading: false });
//   };

//   render() {
//     return (<React.Fragment>
//       {this.state.loading ? <Loading /> : null}

//       <Wrapper>
//         <FromFieldCard>
//           <Grid>
//             <Grid.Column mobile={16} computer={16}>
//               <Label>제목</Label>
//               <FormInput name="title" placeholder="설명을 입력해주세요." getValue={this.onChangeValue} />
//               <Label>카테고리</Label>
//               <div style={{ display: "flex", flexDirection: "row" }}>
//                 <FormDropBox
//                   selection={true} name="category_level1"
//                   onChangeValue={this.onChangeCategory1}
//                   options={this.props.category1}
//                 />&nbsp;&nbsp;
//                   {this.state.category_level1 ?
//                   <FormDropBox
//                     selection={true} name="category_level2"
//                     onChangeValue={this.onChangeCategory2}
//                     options={this.props.category2[this.state.category_level1]} /> : null}
//               </div>
//               <Label>내용</Label>
//               <FormTextArea name="content" placeholder="내용을 입력해주세요." getValue={this.onChangeValue} />

//               {/* <Label>파일첨부</Label>
//               <FormFile name="file" getValue={this.onChangeValue} /> */}

//               <Label>태그</Label>
//               <FormTag name="tag" getValue={this.onChangeTag} placeholder="태그를 입력해주세요(한글10자 영문20자 이내)" />

//               <Label>비공개여부</Label>
//               <FormCheckBox name="private" value={false} getValue={this.onChangedPrivate} placeholder="비공개" />

//             </Grid.Column>
//           </Grid>
//         </FromFieldCard>
//         <div style={{ width: "max-content", marginLeft: "auto" }}>
//           <Button color="Primary" onClick={this.onSubmit} type="submit">등록하기</Button>
//         </div>
//       </Wrapper>
//     </React.Fragment>);
//   }
// }

// export default CreateRequest;
