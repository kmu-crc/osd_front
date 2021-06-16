import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import Loading from "components/Commons/Loading";
import { InputTagNew, InputPriceNew_mobile, InputCalendar_mini, InputFile_mini} from "components/Commons/InputItem"
import { TextController as TextControllerClassic } from "components/Commons/InputItem";
import FileIcon from "components/Commons/FileIcon";
import category_icon from "source/category_icon.svg";
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
const Wrapper =styled.div`
  width:100%;
  min-height:700px;
  overflow-x:hidden;
  padding:0px 10px;
  .header{
    width:100%;
    text-align:center;
    font-size:${market_style.font.size.normal2};
    font-weight:800;
    color:#c1c1c1;
    margin-top:3px;
    margin-bottom:10px;
  }
  .redButton{
    width:100%;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:500;
    color:white;
    box-shadow: 2px 2px 3px #00000019;
    margin-top:15px;
    background-color:red;
    border-radius:10px;
    font-size:${market_style.font.size.small1};
  }
  .greyButton{
    width:100%;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-weight:500;
    color:white;
    box-shadow: 2px 2px 3px #00000019;
    margin-top:10px;
    background-color:#707070;
    border-radius:10px;
    font-size:${market_style.font.size.small1};
  }
`

const ShadowBox = styled.div`
  width:100%;
  height:max-content;
  border-radius:10px;
  box-shadow: 2px 2px 5px #00000029;
  border:1px solid #eaeaea;
  padding:20px;
  margin-bottom:15px;
  .row{
    width:100%;
  }
  .label{
    min-width:106px;
    height:22px;
    border-right:1px solid #707070;
    margin-right:20px;
    font-family:${market_style.font.size.small1};
    font-weight:700;
    color:#707070;
  }
  .label2{
    min-width:85px;
    height:22px;
    margin-right:10px;
    font-family:${market_style.font.size.small1};
    font-weight:700;
    color:#707070;
  }
  .padding{padding-left:10px;padding-right:10px;}
  .paddingNormal{padding:5px 10px;}
  .marginTop1{margin-top:5px;}
  .marginTop2{margin-top:10px;}
  .marginTop3{margin-top:20px;}
  .fontBig{font-size:${market_style.font.size.small1};font-weight:800;}
  .fontLarge{font-size:${market_style.font.size.small1};font-weight:700;}
  .fontNormal{font-size:${market_style.font.size.small1};font-weight:400;}
  .fontSmall{font-size:${market_style.font.size.mini2};font-weight:400;}
  .black{color:black;}
  .flex{display:flex;}
  .flexWrap{flex-wrap:wrap;}
  .justifyCenter{justify-content:center;}
  .alignCenter{align-items:center;}
  .spaceBetween{justify-content:space-between;}
  .flexEnd{justify-content:flex-end;}
  .column{flex-direction:column;}
  .textRight{text-align:right;}
  .ellipsis{width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .red{color:red;}
}
`
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
const TagPiece = styled.div`
    width: max-content;
    min-width: max-content;
    background-color:#E9E9E96A;
    margin-right: 8px;
    margin-bottom: 5px;
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
  const Button = styled.div`
  width:100%;
  height:35px;
  border-radius:10px;
  background-color:${props=>props.background==null?"red":props.background};
  color:${props=>props.color==null?"white":props.color};
  box-shadow: 2px 2px 3px #00000019;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:${market_style.font.size.small1};
  font-weight:500;
  margin-top:10px;
`
const InputNumber = styled.input.attrs({ type: "number" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:31px;
  border-radius:10px;
  font-family:Noto Sans KR;
  font-size:${market_style.font.size.small1};
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;
  font-weight:300;
  text-align:center;
`;
class ResponseToMakerReq_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_level1: 0, category_level2: 0,
      title: "", tag: [], price: 0, content: "", location: "", offline: -1, amount: 0, resale: -1,
      ownership: -1, startDate: null, endDate: null, dayDate: null,
      res_content: "", res_price: "", res_amount: null,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeResponseContent = this.onChangeResponseContent.bind(this);
    this.onChangeResponsePrice = this.onChangeResponsePrice.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.onChangeReponseAmount = this.onChangeReponseAmount.bind(this);
    this.getStartDateValue = this.getStartDateValue.bind(this);
    this.getEndDateValue = this.getEndDateValue.bind(this);
    this.getDayDateValue = this.getDayDateValue.bind(this);
  };

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
  onChangeReponseAmount(event) {
    this.setState({
      res_amount: event.target.value,
    })
  }
  async getPriceValue(value) {
    await this.setState({ res_price: value });
  }
  onSubmit() {
    const data = {
      type: "maker", // "designer_req" "designer_res" "maker_req" "maker_res"
      status: "response",
      group_id: this.props.detail.group_id,
      sort_in_group: this.props.detail.sort_in_group,
      title: this.props.detail.title,
      content: this.state.content,
      price: this.state.res_price,
      expert_id: this.props.userInfo.uid || null,
      personal: this.props.detail.personal || null,
      amount: this.state.res_amount || null,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
      client_id: this.props.detail.client_id,
    }
    // 페이지이동
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          if (this.props.detail.personal)
            window.location.href = `/designerDetail/${this.props.detail.personal}`;
          else
            window.location.href = "/request/maker";
        }
      })
      .catch(err => console.log("에러가 발생했습니다." + err));
  }
  async getEndDateValue(value) {
    await console.log("endDate", value);
    await this.setState({ endDate: value });
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
  render() {
    const { detail } = this.props;
    if (!detail) return <Loading />;
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
    return (
      <React.Fragment>
              <Wrapper>
        <div className="header">
          {detail.type === "maker" ?    "제작 의뢰 응답" : null}
        </div>
        <ShadowBox>
           <div className="fontBig flex justifyCenter">의뢰 내용</div>

           <div className="row flex marginTop3">
              <div className="label">의뢰자</div>
              <div className="fontNomal">{(this.props.detail && this.props.detail.nick_name) || null}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">제목</div>
              <div className="fontNomal">{detail.title}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">카테고리</div>
               <div className="fontNomal flex alignCenter">
                 {category_level1}
                 {category_level2 ? <CustomIcon width="15" height="15" marginRight="31" marginLeft="31" imgURL={category_icon} /> : null}
                 {category_level2 ? category_level2 : null}
              </div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">태그</div>
              <div className="flex flexWrap">
                {detail && detail.tag && detail.tag.split(",").map((item, index) =><TagPiece key={item + index} >{item}</TagPiece>)}
              </div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">의뢰 내용</div>
              <div>
                 <div dangerouslySetInnerHTML={{ __html: `${detail.content || ""}` }} />
                 <div className="attach-file">
                    <div className="attach-arrow" />
                    <div className="attach-link">
                    첨부파일: {detail.filename ? <a href={detail.file_url}>{detail.filename}</a> : "없음"}
                    </div>
                 </div>
              </div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">희망 비용</div>
              <div className="fontNomal">{detail.price} point</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">기간</div>
              <div className="fontNomal">{detail.start_date}~{detail.end_date}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">수량</div>
              <div className="fontNomal">{detail.amount}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">
                {detail.type === "maker" ? "메이커 위치" : null}
              </div>
              <div className="fontNomal">{detail.location && LocationList[parseInt(detail.location, 10)].text}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">메이커 재판매</div>
              <div className="fontNomal">{detail.resale <= 0 ? "불가능" : "가능"}</div>
           </div>
        </ShadowBox>
        <ShadowBox>
          <div className="fontBig flex justifyCenter">응답 내용</div>
          <div className="row flex marginTop3">
              <div className="label">응답자</div>
              <div className="fontNomal">{(this.props.userInfo && this.props.userInfo.nickName) || null}</div>
           </div>
           <div className="row marginTop3">
              <div className="fontLarge">응답 내용<sup className="red">*</sup></div>
              <div className="row marginTop2">
                <TextControllerClassic
                    item={{ content: this.state.content, }}
                    name={"comment"}
                    getValue={this.onChangeResponseContent}
                    editheight="311"
                    marginBottom="0"
                    border="1px solid #707070"
                  />
              </div>
          </div>
          <div className="row flex marginTop3 spaceBetween">
                <div className="label2">수량</div>
                <div className="row flex flexEnd">
                  <InputNumber width={160}  onChange={this.onChangeReponseAmount} value={this.state.res_amount || '0'} />
                </div>
            </div>
          <div className="row flex marginTop3">
                <div className="label2">희망 비용</div>
                <div className="row">
                  <InputPriceNew_mobile name="price" getValue={this.getPriceValue}/>
                </div>
          </div>
          <div className="row flex marginTop3">
                <div className="label2">기간</div>
                <div className="row flex flexEnd">
                  <InputCalendar_mini startDate={this.state.startDate} endDate={this.state.endDate} name="calendar"
                    getStartDateValue={this.getStartDateValue} getEndDateValue={this.getEndDateValue} getDayDateValue={this.getDayDateValue}  />
                </div>
            </div>
        </ShadowBox>
          <Button onClick={this.onSubmit} background={"red"} color="white">등록하기</Button>
          <Button onClick={() => { window.history.back() }} background="#707070" color="white">취소하기</Button>
        </Wrapper>
      </React.Fragment>
    );
  };
}

export default ResponseToMakerReq_mobile;


// <Wrapper>
// <div className="header">
//   <div className="title">
//     <div className="text">제작 의뢰 응답</div>
//   </div>
// </div>

// <div className="form-list">
//   <div className="form">
//     <div className="row" >
//       <div className="label">의뢰자</div>
//       <div className="content">{(this.props.detail && this.props.detail.nick_name) || null}</div>
//     </div>
//     <div className="row">
//       <div className="label">제목</div>
//       <div className="content">{detail.title}</div>
//     </div>
//     <div className="row">
//       <div className="label">카테고리</div>
//       <div className="content flexing-row">
//         {category_level1}
//         {category_level2 ? <CustomIcon width="15" height="15" marginRight="31" marginLeft="31" imgURL={category_icon} /> : null}
//         {category_level2 ? category_level2 : null}
//       </div>
//     </div>
//     <div className="row">
//       <div className="label">태그</div>
//       <div className="content">
//         <TagList>
//           {detail && detail.tag && detail.tag.split(",").map((item, index) =>
//             <TagPiece key={index}>
//               {item}
//             </TagPiece>
//           )}
//         </TagList>
//       </div>
//     </div>
//     <div className="row">
//       <div className="label">의뢰 내용</div>
//       <div className="content">
//         <div dangerouslySetInnerHTML={{ __html: `${detail.content || ""}` }} />
//         <div className="attach-file">
//           <div className="attach-arrow" />
//           <div className="attach-link">
//             첨부파일: {detail.filename ? <a href={detail.file_url}>{detail.filename}</a> : "없음"}
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="row">
//       <div className="label">희망비용</div>
//       <div className="content">{detail.price} point</div>
//     </div>

//     <div className="row">
//       <div className="label">기간</div>
//       <div className="content">{detail.start_date}~{detail.end_date}</div>
//     </div>

//     <div className="row">
//       <div className="label">수량</div>
//       <div className="content">{detail.amount}</div>
//     </div>

//     <div className="row">
//       <div className="label">메이커 위치</div>
//       <div className="content">{detail.location && LocationList[parseInt(detail.location, 10)].text}</div>
//     </div>
//     <div className="row">
//       <div className="label">메이커 재판매</div>
//       <div className="content">{detail.resale <= 0 ? "불가능" : "가능"}</div>
//     </div>

//   </div>
//   <div className="form">
//     <div className="row">
//       <div className="label no-border">응답자</div>
//       <div className="content no-margin">{(this.props.userInfo && this.props.userInfo.nickName) || null}</div>
//     </div>

//     <div className="row">
//       <div className="label no-border">응답 내용</div>
//       <div className="content no-margin">
//         <TextControllerClassic
//           item={{ content: this.state.content, }}
//           name={"comment"}
//           getValue={this.onChangeResponseContent}
//           editheight="311"
//           marginBottom="0"
//           border="1px solid #707070"
//         />
//       </div>
//     </div>
//     <div className="row">
//       <div className="label no-border">수량</div>
//       <div className="content no-margin">
//         <InputText onChange={this.onChangeReponseAmount} value={this.state.res_amount || ''} width={80} />
//       </div>
//     </div>
//     <div className="row">
//       <div className="label no-border">희망비용</div>
//       <div className="content no-margin">
//         <InputPriceNew name="price" getValue={this.getPriceValue} />
//       </div>
//     </div>

//     <div className="row">
//       <div className="label no-border">기간</div>
//       <div className="content no-margin">
//         <InputCalendar startDate={this.state.startDate} endDate={this.state.endDate} name="calendar"
//           getStartDateValue={this.getStartDateValue} getEndDateValue={this.getEndDateValue} getDayDateValue={this.getDayDateValue} />
//       </div>
//     </div>
//   </div>
// </div>
// <div className="bottom">
//   <div className="buttons">
//     <RedButton width={150} height={30} text="의뢰 응답을 등록합니다." okText="확인" cancelText="취소" value={"등록하기"} onClick={this.onSubmit} isConfirm={true} />
//     <GrayButton width={150} height={30} text={"취소하시겠습니까?"} value={"취소하기"} onClick={() => { window.history.back() }} isConfirm={true} />
//   </div>
// </div>
// </Wrapper>