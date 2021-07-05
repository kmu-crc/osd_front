import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import Loading from "components/Commons/Loading";
import { InputPriceNew } from "components/Commons/InputItem/InputPriceNew";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import { InputCalendar } from "components/Commons/InputItem/InputCalendar";
// import { TextControllerClassic } from "components/Commons/InputItem/TextControllerClassic";
import { TextController as TextControllerClassic } from "components/Commons/InputItem";

import FileIcon from "components/Commons/FileIcon";
import category_icon from "source/category_icon.svg";
import { alert } from "components/Commons/Alert/Alert";
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
const CustomIcon = styled.div`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-image: url(${props => props.imgURL});
  background-repeat: no-repeat;
  background-size: contain;
  padding: ${props => props.padding}px;
  margin-right: ${props => props.marginRight == null ? "13" : props.marginRight}px;
  margin-left: ${props => props.marginLeft == null ? "13" : props.marginLeft}px;
  display: ${props => props.isNon == true ? "none" : "block"}
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 0px 30px;
  margin-bottom:30px;
  .title {
    margin-top: 20px;
    margin-bottom: 15px;
    .text {
      width: max-content;
      margin: auto;
      font: normal normal bold 20px/29px Noto Sans KR;
      letter-spacing: 0px;
      color: #000000;
      text-align: center;
    }
  }
  
  .form-list {
    width:102%;
    display: flex;
    flex-direction: row;
    justify-content:center;
    flex-wrap:wrap;
  }

  .form {
    width: 643px;
    max-width:100%;
    min-height: 582px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 5px #0000001A;
    border: 0.25px solid #eaeaea;
    border-radius: 20px;
    padding: 30px 50px;
    margin-right:20px;
    margin-bottom:20px;

    .row {
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;

      .label {
        height: 22px;
        min-width: 140px;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        border-right: 1px solid #707070;

        text-align: left;
        font: normal normal medium 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;

        margin-right: 94px;
        margin-bottom:5px;
      }

      .content {
        width: 100%;
        max-width: max-content;
        margin-bottom: 31px;
        
        text-align: left;
        font: normal normal normal 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #000000;
      }
    }
  }
  .flex-and-middle {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .taglist {
    display: flex;
    flex-direction: row;
    .tag {
      height: 31px;
      background: #E9E9E96A 0% 0% no-repeat padding-box;
      border-radius: 10px;
      padding: 5px 12px 4px 13px; 
      /* top | right | bottom | left */
      text-align: left;
      font: normal normal normal 15px/22px Noto Sans KR;
      letter-spacing: 0px;
      color: #707070;
      margin-right: 10px;
    }
  
  }
  .attach-file {
    display: flex;
    align-items: center;
    height: 19px;
    text-align: left;
    font: normal normal normal 13px/19px Noto Sans KR;
    letter-spacing: 0px;
    color: #FF0000;
    width:150px;
    .attach-link {
        width:80%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
     }  
    .attach-arrow {
      width: 10px;
      height: 10px;
      margin-right: 16px;
      margin-left: 4px;
      
      border-left: 1px solid #FF3838;
      border-bottom: 1px solid #FF3838;
    }
  }
  
  .bottom {
    margin-top: 20px;
    margin-bottom: 40px;
    width: 100%;

    .buttons {
      display:flex;
      justify-content:center;
    }
    .reply {
      margin: auto;
      width: 150px;
      height: 30px;
      background: #FF0000 0% 0% no-repeat padding-box; /* Green - #4CAF50; */
      border: none;
      text-align: center;
      text-decoration: none;
      text-align: center;
      font: normal normal bold 15px/22px Noto Sans KR;
      letter-spacing: 0px;
      color: #FFFFFF;
    }
  
    .back {
      position: absolute;
      width: max-content;
      right: 20px;
      height: 19px;
      background: #FFFFFF;
      border: none;
      display: flex;
      flex-direction: row;

      text-align: left;
      font: normal normal medium 13px/19px Noto Sans KR;
      letter-spacing: 0px;
      color: #707070;
    }
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){

    .form{
      padding: 30px 10%;
      .row{
        .label{
          margin-right: 30px;
        }
      }
    }
  }
`;

const TagList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const TagPiece = styled.div`
    width:max-content;
    min-width:30px;
    max-height:30px;
    border:1px solid #707070;
    border-radius:15px;
    padding: 5px 10px 6px 10px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    font-size:${market_style.font.size.small1};
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
// const LocationList = [
//   { value: 0, text: "서울특별시" },
//   { value: 1, text: "부산광역시" },
//   { value: 2, text: "대구광역시" },
//   { value: 3, text: "인천광역시" },
//   { value: 4, text: "광주광역시" },
//   { value: 5, text: "대전광역시" },
//   { value: 6, text: "울산광역시" },
//   { value: 7, text: "경기도" },
//   { value: 8, text: "강원도" },
//   { value: 9, text: "충청북도" },
//   { value: 10, text: "충청남도" },
//   { value: 11, text: "전라북도" },
//   { value: 12, text: "경상북도" },
//   { value: 13, text: "경상남도" },
//   { value: 14, text: "제주도" },
//   { value: 15, text: "제한없음" },
// ];

// const CustomIcon = styled.div`
//   width:${props => props.width}px;
//   height:${props => props.height}px;
//   background-image:url(${props => props.imgURL});
//   background-repeat: no-repeat;
//   background-size: contain;
//   padding:${props => props.padding}px;
//   margin-right:${props => props.marginRight == null ? "13" : props.marginRight}px;
//   margin-left:${props => props.marginLeft == null ? "13" : props.marginLeft}px;
//   display:${props => props.isNon === true ? "none" : "block"}
// `
// const Wrapper = styled.div`
// width: 100%;
// padding: 0px 30px;

// // *{border:1px dashed blue;}

// .title {
//   margin-top: 20px;
//   margin-bottom: 15px;
//   .text {
//     width: max-content;
//     margin: auto;
//     font: normal normal bold 20px/29px Noto Sans KR;
//     letter-spacing: 0px;
//     color: #000000;
//     text-align: center;
//   }
// }

// .form-list {
//   display: flex;
//   flex-direction: row;
// }
// .form {
//   width: 643px;
//   // min-height: 582px;
//   background: #FFFFFF 0% 0% no-repeat padding-box;
//   box-shadow: 3px 3px 5px #0000001A;
//   border: 0.25px solid #B7B7B7;
//   border-radius: 20px;
//   padding: 30px 50px;
//   :first-child {
//     margin-right: 20px;
//   }

//   .row {
//     display: flex;
//     flex-direction: row;

//     .label {
//       height: 22px;
//       width: 106px;
//       text-align: left;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//       overflow: hidden;
//       border-right: 1px solid #707070;
//       &.no-border {
//         border: none;
//       }
//       text-align: left;
//       font: normal normal medium 15px/22px Noto Sans KR;
//       letter-spacing: 0px;
//       color: #707070;
//     }

//     .content {
//       // width: max-content;
//       width: 100%;
//       height: 100%;
//       margin-bottom: 31px;
//       margin-left: 55px;

//       &.no-margin {
//         margin-left: 0px;
//       }
//       text-align: left;
//       font: normal normal normal 15px/22px Noto Sans KR;
//       letter-spacing: 0px;
//       color: #000000;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//       overflow: hidden;
//     }
//   }
// }
// .flex-and-middle {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// }
// .taglist {
//   display: flex;
//   flex-direction: row;
//   .tag {
//     height: 31px;
//     background: #E9E9E96A 0% 0% no-repeat padding-box;
//     border-radius: 10px;
//     padding: 5px 12px 4px 13px; 
//     /* top | right | bottom | left */
//     text-align: left;
//     font: normal normal normal 15px/22px Noto Sans KR;
//     letter-spacing: 0px;
//     color: #707070;
//     margin-right: 10px;
//   }

// }
// .attach-file {
//   display: flex;
//   align-items: center;

//   height: 19px;
//   text-align: left;
//   font: normal normal normal 13px/19px Noto Sans KR;
//   letter-spacing: 0px;
//   color: #FF0000;
//    .attach-link {
//     overflow:hidden;
//     text-overflow:ellipsis;
//     white-space:nowrap;
//     width: 100%;
//    } 
//   .attach-arrow {
//     width: 10px;
//     height: 10px;
//     // background-color: #FF0000;
//     margin-right: 16px;
//     margin-left: 4px;
    
//     border-left: 1px solid red;
//     border-bottom: 1px solid red;

//     // .addfilebox{
//     //   .addfile{
//     //     width:10px;
//     //     height:10px;
//     //     border-left: 1px solid red;
//     //     border-bottom: 1px solid red;
//     //   }
//     //   .black_addfile{
//     //     width: 10px;
//     //     height: 10px;
//     //     border-left: 1px solid black;
//     //     border-bottom: 1px solid black;
//     //   }
//     // }
//   }
// }

//   .bottom {
//     margin-top: 20px;
//     margin-bottom: 40px;
//     width: 100%;

//     .buttons {
//       margin: auto;
//       width: max-content;
//       display: flex;
//     }
//     button {
//       width: 150px;
//       height: 30px;
//       border: none;

//       .text {
//         margin: auto;
//         width: max-content;
//         text-align: center;
//         font: normal normal bold 15px/22px Noto Sans KR;
//         letter-spacing: 0px;
//         color: #FFFFFF;
//         opacity: 1;
//       }
//       &.ok {
//         background: #FF0000 0% 0% no-repeat padding-box;
//         &.disabled {
//           background: #707070 0% 0% no-repeat padding-box;
//         }
//       }
//       &.cancel {
//         background: #707070 0% 0% no-repeat padding-box;
//       }
//       opacity: 1;
//       :first-child {
//         margin-right: 20px;
//       }
//     }
//   }

//   .flexing-row {
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//   }

//   .hr {
//     margin-top: 30px;
//     margin-bottom: 29px;
//     width: 1006px;
//     height: 2px;
//     border: 1px solid #EFEFEF;
//   }
// `;
// const MainBox = styled.div`
//   width:100%;
//   .title{
//     width:170px;
//     height:29px;
//     font-family:Noto Sans KR, Medium;
//     font-size:${market_style.font.size.normal3};
//     font-weight:500;
//     // margin-left:130px;

//   }
//   .contentsBox{
//     position: relative;
//     width:100%;
//     display:flex;
//     padding-top:36px;
//     .box_{
//       width:50%;
//     }
//     .box_centering{
//       width:50%;
//       display:flex;
//       justify-content:center;
//     }
//   }

// `;

// const FormBox = styled.div`
//   width:${props => props.isHalf === true ? "50%" : "100%"};
//   box-shadow: 5px 5px 10px #00000029;
//   border-radius: 20px;
//   padding:${props => props.isHalf === true ? "72px 50px 72px 50px" : "72px 113px 72px 113px"};
//   margin-right:${props => props.isHalf === true ? "44px" : "10px"};

//   .wrapper{
//     width:100%;
//     margin-bottom:50px;
//   }
//   .margin_zero{
//     margin:0px;
//   }
//   .add_margin_bottom{
//     margin-bottom:100px;
//   }
//   .flex{
//     display:flex;
//   }
//   .centering{
//     // align-items:center;
//   }
//   .color_red{
//     color:red;
//   }
//   .innerWraper{
//     width:100%;
//     margin-bottom:26px;
//     display:flex;
//   }
//   .addfilebox{
//     height:40px;
//     margin-right:8px;
//     .addfile{
//       width:20px;
//       height:20px;
//       border-left:1px dashed red;
//       border-bottom:1px dashed red;
//     }
//     .black_addfile{
//       width:20px;
//       height:20px;
//       border-left:1px dashed black;
//       border-bottom:1px dashed black;
//     }
//   }
//   .file_label_box{
//     height:40px;
//     display:flex;
//     align-items:center;
//   }
 
//   .file_label{
//     font-size:${market_style.font.size.small3};
//     color:red;
//   }
//   ._black_{
//     font-size:${market_style.font.size.small3};
//     color:black;
//   }
//   .label2{
//     min-width:157px;
//     height:29px;
//     font-size:${market_style.font.size.normal3};
//     font-family:Noto Sans CJK KR, Regular;
//     // color:#707070;
//     margin-right:60px;
//   }
//   .label{
//     min-width:157px;
//     height:max-content;
//     font-size:${market_style.font.size.normal3};
//     font-family:Noto Sans CJK KR, Regular;
//     color:#707070;
//     margin-right:60px;
//     border-right:2px solid #707070;
//   }
//   .label_centering{
//     text-align:center;
//   }
//   .index{
//     width:30px;
//     height:30px;
//     color:#707070;
//   }
//   .textBox{
//     font-family:Noto Sans CJK KR, Regular;
//     font-size:${market_style.font.size.small3};
//     line-height:17px;
//     display:flex;
//   }

// `;

// const TagList = styled.div`
//   width: 100%;
//   display: flex;
//   // padding: 10px;
//   flex-wrap: wrap;
// `;
// const TagPiece = styled.div`
//     width:max-content;
//     min-width:30px;
//     max-height:30px;
//     border:1px solid #707070;
//     border-radius:15px;
//     padding: 8px 10px 5px 10px;
//     display: flex;
//     justify-content: space-between;
//     align-items:center;
//     font-size:${market_style.font.size.small1};
//     font-family:Noto Sans CJK KR, Regular;
//     margin-right:8px;
//     .close {
//         color:#707070;
//         margin-left: 10px;
//         width: max-content;
//         height: max-content;
//         padding: 0px 2px;
//         cursor:pointer;
//     }
// `;

class ResponseToDesignerReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_level1: 0, category_level2: 0,
      title: "", tag: [], price: 0, content: "", location: "", offline: -1, amount: 0,
      ownership: -1, startDate: null, endDate: null, dayDate: null,
      res_content: "", res_price: "",
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeResponseContent = this.onChangeResponseContent.bind(this);
    this.onChangeResponsePrice = this.onChangeResponsePrice.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.getStartDateValue = this.getStartDateValue.bind(this);
    this.getEndDateValue = this.getEndDateValue.bind(this);
    this.getDayDateValue = this.getDayDateValue.bind(this);
  }

  async onChangeResponseContent(data) {
    await this.setState({ content: data.content });
    // this.setState({
    //   res_content: event.target.value,
    // })
  }
  onChangeResponsePrice(event) {
    this.setState({
      res_price: event.target.value,
    })
  }
  async getPriceValue(value) {
    await this.setState({ res_price: value });
  }
  async getStartDateValue(value) {
    await this.setState({ startDate: value });
  }
  async getEndDateValue(value) {
    await this.setState({ endDate: value });
  }
  async getDayDateValue(value) {
    await this.setState({ dayDate: value })
  }
  onSubmit() {
    const data = {
      type: "designer", // "designer_req" "designer_res" "maker_req" "maker_res"
      status: "response",
      group_id: this.props.detail.group_id,
      sort_in_group: this.props.detail.sort_in_group,
      title: this.props.detail.title,
      content: this.state.content,
      price: this.state.res_price,
      expert_id: this.props.userInfo.uid || null,
      personal: this.props.detail.personal || null,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      client_id: this.props.detail.client_id,
    }
    // // 페이지이동
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          // alert("성공");
          if (this.props.detail.personal)
            window.location.href = `/designerDetail/${this.props.detail.personal}`;
          else
            window.location.href = "/request/designer";
        }
      })
      .catch(async err => await alert("에러가 발생했습니다." + err));
  }

  render() {
    const { detail } = this.props;
    console.log(detail);
    if (!detail) return (<Loading />);
    const category_level1 = this.props.category1 && this.props.category1[detail.category_level1] &&
      this.props.category1[detail.category_level1].text;
    let category_level2 = "";
    this.props.category2 && this.props.category2.map((item, index) => {
      console.log(item.parent, detail.category_level1, item.value, detail.category_level2);
      if (item.parent === detail.category_level1 && item.value === detail.category_level2) {
        category_level2 = item.text;
      }
      return item;
    })
    return (<Wrapper>
      {/*  */}
        <div className="title">
          <p className="text">디자인 의뢰 응답</p>
        </div>

      {/*  */}
      <div className="form-list">
        {/* request */}
        <div className="form">
          <div className="row" >
            <div className="label">의뢰자</div>
            <div className="content">{detail.nick_name || null}</div>
          </div>
          <div className="row">
            <div className="label">제목</div>
            <div className="content">{detail.title}</div>
          </div>
          <div className="row">
            <div className="label">카테고리</div>
            <div className="content flexing-row">
              {category_level1}
              {category_level2 ? <CustomIcon width="15" height="15" marginRight="31" marginLeft="31" imgURL={category_icon} /> : null}
              {category_level2 ? category_level2 : null}
            </div>
          </div>
          <div className="row">
            <div className="label">태그</div>
            <div className="content">
              <TagList>
                {detail && detail.tag && detail.tag.split(",").map((item, index) =>
                  <TagPiece key={index}>
                    {item}
                  </TagPiece>
                )}
              </TagList>
            </div>
          </div>
          <div className="row">
          <div className="label">의뢰 내용</div>
          <div className="content">
            <div dangerouslySetInnerHTML={{ __html: `${detail.content || ""}` }} />
            <div className="attach-file">
              <div className="attach-arrow" />
              <div className="attach-link">
                첨부파일: {detail.filename ? <a href={detail.file_url}>{detail.filename}</a> : "없음"}</div> {/* &#10145; */}
            </div>
          </div>
        </div>

          <div className="row">
            <div className="label">희망비용</div>
            <div className="content">{detail.price}</div>
          </div>

          <div className="row">
            <div className="label">기간</div>
            <div className="content">{detail.start_date}~{detail.end_date}</div>
          </div>

          <div className="row">
            <div className="label">디자인 위치</div>
            <div className="content">{LocationList[parseInt(detail.location, 10) || 15].text}</div>
          </div>
          <div className="row">
            <div className="label">디자인 소유권</div>
            <div className="content">{detail.ownership <= 0 ? "의뢰자" : "디자이너"}</div>
          </div>

        </div>

        {/* reponse */}
        <div className="form">
          <div className="row">
            <div className="label no-border">응답자</div>
            <div className="content no-margin">{(this.props.userInfo && this.props.userInfo.nickName) || null}</div>
          </div>

          <div className="row">
            <div className="label no-border">응답 내용</div>
            <div className="content" style={{maxWidth:"768px"}}>
            <TextControllerClassic
              item={{ content: this.state.content, /*height: 388*/ }}
              name={"comment"}
              getValue={this.onChangeResponseContent}
              editheight="388"
              marginBottom="0"
              border="1px solid #707070"
            />
            </div>
          </div>

          <div className="row">
            <div className="label no-border">희망비용</div>
            <div className="content no-margin">
              <InputPriceNew name="price" getValue={this.getPriceValue} option={{ tag: { marginRight: 9, width: 60 } }} /></div>
          </div>

          <div className="row">
            <div className="label no-border">기간</div>
            <div className="content no-margin">
              <InputCalendar startDate={this.state.startDate} endDate={this.state.endDate} name="calendar"
                getStartDateValue={this.getStartDateValue} getEndDateValue={this.getEndDateValue} getDayDateValue={this.getDayDateValue} />
            </div>
          </div>
        </div>

      </div>

      {/*  */}
      <div className="bottom">
        <div className="buttons">
          <RedButton width={150} height={30} text="의뢰 응답을 등록합니다." okText="확인" cancelText="취소" value={"등록하기"} onClick={this.onSubmit} isConfirm={true} />
          <GrayButton width={150} height={30} text={"취소하시겠습니까?"} value={"취소하기"} onClick={() => { window.history.back() }} isConfirm={true} />
        </div>
      </div>
    </Wrapper>);
  };
}

export default ResponseToDesignerReq;
