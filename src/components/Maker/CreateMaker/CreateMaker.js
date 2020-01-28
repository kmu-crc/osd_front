import React,{Component} from "react";
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";


const MainBox = styled.div`
  width:100%;
  .title{
    width:170px;
    height:29px;
    font-family:Noto Sans KR, Medium;
    font-size:20px;
    font-weight:500;
  }
  .contentsBox{
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
  left:${props=>props.left};
  bottom:${props=>props.bottom};
`
const ThumbnailBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width:562px;
  height:540px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:42px;
  padding-top:54px;
  margin-right:63px;
  .label{
    width:100%;
    height:29px;
  }
  .thumbnail{
    width:256px;
    height:256px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:#E9E9E9;
    border-radius:50%;
  }
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
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .label{
    width:157px;
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
const Button = styled.div`
    width:${props=>props.width==null?100+"%":props.width+"px"};
    height:${props=>props.height==null?100+"%":props.height+"px"};
    background-color:white;
    font-family:Noto Sans KR;
    font-size:20px;
    display:flex;
    align-items:center;
    margin-left:${props=>props.margin==null?0+"px":props.margin+"px"};
    .label{
      margin-left:60px;
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
`
const Margin = styled.div`
  width:${props=>props.width==null?100+"%":props.width+"px"};
  height:${props=>props.height==null?100+"%":props.height+"px"}
`

class CreateMaker extends Component{
  render(){
    return(
      <React.Fragment>
        <MainBox>
          <div className="title">메이커 등록하기</div>
          <div className="contentsBox">
            <ThumbnailBox>
              <div className="label">썸네일 등록</div>
              <Margin height={70}/>
              <div className="thumbnail"><div>첨부하기</div></div>
            </ThumbnailBox>
            <RedButton left={223} bottom={0}><div>등록하기</div></RedButton>
            <FormBox>

              <div className="wrapper flex">
                <div className="label">카테고리</div>
                <InputText width={370}/>
              </div>

              <div className="wrapper flex">
                <div className="label">설명</div>
                <InputTextarea width={483} height={99}/>
              </div>

              <div className="wrapper flex">
                <div className="label">태그</div>
                <InputText width={370}/>
              </div>

              <div className="wrapper flex">
                <div className="label">위치</div>
                <InputText width={215}/>
                <InputText width={215}/>
              </div>

              <div className="wrapper ">
                <div className="wrapper flex margin_zero">
                <div className="label">경력</div>
                <div className="index">01</div>
                <div>
                    <div className="innerWraper">
                      <div className="label label_centering">업무</div>
                      <InputText width={370}/>
                    </div>
                    <div className="innerWraper">
                      <div className="label label_centering">내용</div>
                      <InputTextarea width={370} height={84}/>
                    </div>
                    <div className="innerWraper">
                      <div className="label label_centering">기간</div>
                      <InputText width={370}/>
                    </div>
                </div>
                </div>    
                <Button width ={250} height={30} margin={157}><Icon name="plus"/><div className="label">경력 추가하기</div></Button>      
              </div>

              <div className="wrapper flex">
                <div className="label">보유장비</div>
                <InputText width={370}/>
              </div>

              <div className="wrapper flex">
                <div className="label">보유기술</div>
                <InputText width={370}/>
              </div>

            </FormBox>
          </div>
        </MainBox>
      </React.Fragment>
    );
  };
}export default CreateMaker;
// import React, { Component } from "react";
// import styled from 'styled-components';
// import { FormInput, FormAddress, FormExp, FormTag, FormThumbnail, FormDropBox, FormCheckBoxnew } from "components/Commons/FormItems";
// import Button from "components/Commons/Button";
// import { Header, Grid } from "semantic-ui-react"
// import StyleGuide from "StyleGuide";


// const category = [
//   { text: "특허권", value: 0 },
//   { text: "디자인권", value: 1 },
//   { text: "기술자문", value: 2 },
//   { text: "기술상담", value: 3 },
//   { text: "경험", value: 4 },
//   { text: "정보/데이터", value: 5 },
//   { text: "아이디어/노하우", value: 6 },
//   { text: "제품", value: 7 },
// ];

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

//   .miniLabel{
//     width:100px;
//     margin-top:10px;
//     margin-bottom:10px;
//   }
// `;

// const FormHeader = styled(Header)`
//   position: relative;
//   padding-right: 2.5rem !important;
//   @media only screen and (max-width: 991px) {
//     padding-bottom: 2rem !important;
//   }
//   &::after {
//     position: absolute;
//     display: inline-block;
//     content: "";
//     height: 20px;
//     width: 100%;
//     border-bottom: 3px solid ${StyleGuide.color.geyScale.scale5};
//     bottom: 10px;
//     left: 0;

//     @media only screen and (min-width: 992px) {
//       width: 1px;
//       display: block;
//       position: absolute;
//       right: 2rem;
//       top: 50%;
//       left: initial;
//       bottom: initial;
//       transform: translateY(-50%);
//       border-bottom: 0;
//       border-right: 3px solid #191919;
//     }
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

// class CreateMaker extends Component {
//   render() {
//     return (
//       <React.Fragment>
//         <div>
//           <form onSubmit={this.onSubmit}>
//             <FromFieldCard>
//               <Grid>
//                 <Grid.Column mobile={16} computer={4}>
//                   <FormHeader as="h2">메이커 정보</FormHeader>
//                 </Grid.Column>
//                 <Grid.Column mobile={16} computer={12}>
//                   <Label>썸네일 등록</Label>
//                   <FormThumbnail
//                     name="thumbnail"
//                     placeholder="썸네일 등록"
//                     getValue={this.onChangeValue}
//                     onChange={() => { this.liveCheck("thumbnail") }}
//                     validates={["Required", "OnlyImages", "MaxFileSize(10000000)"]}
//                   />
//                   <Label>카테고리</Label>
//                   <FormDropBox
//                     name="explanation"
//                     placeholder="메이커 설명을 입력해주세요."
//                     options={category}
//                   />
//                   <Label>설명</Label>
//                   <FormInput
//                     name="explanation"
//                     placeholder="메이커 설명을 입력해주세요."
//                     getValue={this.onChangeValue}
//                   />
//                   <Label>위치</Label>
//                   <FormAddress />
//                   <Label>경력</Label>
//                   <FormExp />
//                   <Label>태그</Label>
//                   <FormTag
//                     placeholder="태그를 입력해주세요(한글10자 영문20자 이내)" />
//                   <Label>보유장비</Label>
//                   <FormCheckBoxnew
//                     items="장비1장비1,장비2장비2,장비3장비3,장비4장비4,장비5장비5,장비6장비6,장비7장비7,장비8장비8,장비9장비9,장비10장비10" />
//                   <div className="miniLabel">추가입력</div><FormTag />

//                   <Label>보유기술</Label>
//                   <FormCheckBoxnew
//                     items="기술1기술1,기술2기술2,기술3기술3,기술4기술4,기술5기술5,기술6기술6,기술7기술7,기술8기술8,기술9기술9,기술10기술10" />
//                   <div className="miniLabel">추가입력</div><FormTag />
//                 </Grid.Column>
//               </Grid>
//             </FromFieldCard>
//           </form>
//           <div style={{ width: "max-content", marginLeft: "auto" }}>
//             <Button color="Primary">등록하기</Button>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default CreateMaker;
