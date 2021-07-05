import React, { Component } from "react";
import styled from 'styled-components';
import Loading from "components/Commons/Loading";
import { TextController as TextControllerClassic } from "components/Commons/InputItem";
import category_icon from "source/category_icon.svg";
import { alert } from "components/Commons/Alert/Alert";
import market_style from "market_style";
import { InputPriceNew_mobile } from "components/Commons/InputItem";
import { InputCalendar_mini } from "components/Commons/InputItem";

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
    background-color:#FF3838;
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
  .red{color:#FF3838;}
}
`
const RedButton = styled.div`
  width:${props=>props.width==null?"100%":props.width+"%"};
  height:35px;
  display:flex;
  border-radius:10px;
  border:${props=>props.isLike==true?null:"2px solid #FF3838"};
  box-shadow: 2px 2px 3px #00000019;
  justify-content:center;
  align-items:center;
  background-color:${props=>props.isLike==true?"#FF3838":"white"};
  color:${props=>props.isLike==true?"white":"#FF3838"};
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
  background-color:${props=>props.background==null?"#FF3838":props.background};
  color:${props=>props.color==null?"white":props.color};
  box-shadow: 2px 2px 3px #00000019;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:${market_style.font.size.small1};
  font-weight:500;
  margin-top:10px;
`

class ModifyResponseToDesignerReq_mobile extends Component {
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
  async componentDidUpdate(prevProps) {
    if (prevProps.detail != this.props.detail) {
      this.setState({
        res_content: this.props.detail.content,
        content: this.props.detail.content,
        res_price: this.props.detail.price,
        price: this.props.detail.price,
        startDate: this.props.detail.start_date,
        endDate: this.props.detail.end_date,
      })
    }
    return;
  }
  async onChangeResponseContent(data) {
    await this.setState({ content: data.content });
    // this.setState({
    //   res_content: event.target.value,
    // })
  }
  onChangeResponsePrice(event) {
    this.setState({
      price: event.target.value,
    })
  }
  async getPriceValue(value) {
    await this.setState({ price: value });
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
      price: this.state.price,
      expert_id: this.props.userInfo.uid || null,
      personal: this.props.detail.personal || null,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
    }
    // // 페이지이동
    this.props.UpdateRequestRequest(this.props.id, data, this.props.token)
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
    const { request } = this.props.detail;
    console.log(detail);
    if (!request) return (<Loading />);
    const category_level1 = this.props.category1 && this.props.category1[request.category_level1] &&
      this.props.category1[request.category_level1].text;
    let category_level2 = "";
    this.props.category2 && this.props.category2.map((item, index) => {
      if (item.parent === request.category_level1 && item.value === request.category_level2) {
        category_level2 = item.text;
      }
      return item;
    })
    return (
      <React.Fragment>
      <Wrapper>
        <div className="header">
          디자인 의뢰 응답 수정
        </div>
        <ShadowBox>
           <div className="fontBig flex justifyCenter">의뢰 내용</div>

           <div className="row flex marginTop3">
              <div className="label">의뢰자</div>
              <div className="fontNomal">{detail.client_name || null}</div>
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
                {request && request.tag && request.tag.split(",").map((item, index) =><TagPiece key={item + index} >{item}</TagPiece>)}
              </div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">의뢰 내용</div>
              <div>
                 <div dangerouslySetInnerHTML={{ __html: `${request.content || ""}` }} />
                 <div className="attach-file">
                    <div className="attach-arrow" />
                    <div className="attach-link">
                    첨부파일: {request.filename ? <a href={request.file_url}>{request.filename}</a> : "없음"}
                    </div>
                 </div>
              </div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">희망 비용</div>
              <div className="fontNomal">{request.price} point</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">기간</div>
              <div className="fontNomal">{request.start_date}~{request.end_date}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">
                디자이너 위치
              </div>
              <div className="fontNomal">{LocationList[parseInt(request.location, 10) || 15].text}</div>
           </div>
           <div className="row flex marginTop3">
              <div className="label">
                디자인 소유권
              </div>
              <div className="fontNomal">{request.ownership <= 0 ? "의뢰자" : "디자이너"}</div>
           </div>
        </ShadowBox>
        <ShadowBox>
          <div className="fontBig flex justifyCenter">응답 내용</div>
          <div className="row flex marginTop3">
              <div className="label">응답자</div>
              <div className="fontNomal">{(this.props.userInfo && this.props.userInfo.nickName) || null}</div>
           </div>
           <div className="row marginTop3">
              <div className="fontLarge">의뢰 내용<sup className="red">*</sup></div>
              <div className="row marginTop2">
                <TextControllerClassic
                  item={{ content: this.state.content,  }}
                  name={"comment"}
                  getValue={this.onChangeResponseContent}
                  editheight="311"
                  marginBottom="0"
                  border="1px solid #707070"
                />
              </div>
          </div>
          <div className="row flex marginTop3">
                <div className="label2">희망 비용</div>
                <div className="row">
                  <InputPriceNew_mobile price={this.state.price} name="price" getValue={this.getPriceValue} option={{ tag: { marginRight: 9, width: 60 } }} />
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
          <Button onClick={this.onSubmit} background={"#FF3838"} color="white">수정하기</Button>
          <Button onClick={() => { window.history.back() }} background="#707070" color="white">취소하기</Button>
        </Wrapper>
      </React.Fragment>
    );
  };
}

export default ModifyResponseToDesignerReq_mobile;




{/* <Wrapper>
      <div className="header">
        <div className="title">
          <div className="text">디자인 의뢰 응답 수정</div>
        </div>
      </div>
      <div className="form-list">
        <div className="form">
          <div className="row" >
            <div className="label">의뢰자</div>
            <div className="content">{detail.client_name || null}</div>
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
                {request && request.tag && request.tag.split(",").map((item, index) =>
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
              <div dangerouslySetInnerHTML={{ __html: `${request.content || ""}` }} />
              <div className="attach-file">
                <div className="attach-arrow" />
                <div className="attach-link">
                  첨부파일: {request.filename ? <a href={request.file_url}>{request.filename}</a> : "없음"}</div> 
              </div>
            </div>
          </div>

          <div className="row">
            <div className="label">희망비용</div>
            <div className="content">{request.price}</div>
          </div>

          <div className="row">
            <div className="label">기간</div>
            <div className="content">{request.start_date}~{request.end_date}</div>
          </div>

          <div className="row">
            <div className="label">디자인 위치</div>
            <div className="content">{LocationList[parseInt(request.location, 10) || 15].text}</div>
          </div>
          <div className="row">
            <div className="label">디자인 소유권</div>
            <div className="content">{request.ownership <= 0 ? "의뢰자" : "디자이너"}</div>
          </div>
        </div>
        <div className="form">
          <div className="row">
            <div className="label no-border">응답자</div>
            <div className="content no-margin">{(this.props.userInfo && this.props.userInfo.nickName) || null}</div>
          </div>
          <div className="row">
            <div className="label no-border">설명</div>
            <div className="content no-margin">
              <TextControllerClassic
                item={{ content: this.state.content,  }}
                name={"comment"}
                getValue={this.onChangeResponseContent}
                editheight="311"
                marginBottom="0"
                border="1px solid #707070"
              />
            </div>
          </div>
          <div className="row">
            <div className="label no-border">희망비용</div>
            <div className="content no-margin">
              <InputPriceNew price={this.state.price} name="price" getValue={this.getPriceValue} option={{ tag: { marginRight: 9, width: 60 } }} /></div>
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
      <div className="bottom">
        <div className="buttons">
          <RedButton width={150} height={30} text={"수정된 내용을 저장합니다."} okText="확인" cancelText="취소" value={"수정하기"} onClick={this.onSubmit} isConfirm={true} />
          <GrayButton width={150} height={30} text={"수정된 내용이 저장되지 않습니다."} value={"취소하기"} onClick={() => { window.history.back() }} isConfirm={true} />
        </div>
      </div>
    </Wrapper> */}
