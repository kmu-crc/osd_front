import { Dropdown } from "semantic-ui-react"
import category_icon from "source/category_icon.svg";
import { CustomIcon } from "components/Commons/ArrowIcon";
import { TextController as TextControllerClassic } from "components/Commons/InputItem";
import { InputTagNew, InputFile_mini, InputPriceNew_mobile, InputCalendar_mini } from "components/Commons/InputItem"
import market_style from "market_style";
import React, { Component } from "react";
import styled from 'styled-components';
import { alert } from "components/Commons/Alert/Alert";

const Wrapper = styled.div`
  width:100%;
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
  .buttonBox{
    width:100%;
    margin-top:15px;
  }
`
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
const ShadowBox = styled.div`
  width:100%;
  height:max-content;
  border-radius:10px;
  box-shadow: ${props=>props.ShadowOpacity==null?"2px 2px 5px #00000029":"none"};
  border:${props=>props.ShadowOpacity==null?"1px solid #eaeaea":"none"};
  padding:20px 10px;
  .row{
    width:100%;
  }
  .label{
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
  .marginTop4{margin-top:24px;}
  .fontBig{font-size:${market_style.font.size.small1};font-weight:800;}
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
  .red{color:#FF3838;}
  .ellipsis{width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
}
`
const DropBox = styled(Dropdown)`
    min-width:110px !important;
    max-height:31px !important;   
    display:flex !important;
    align-items:center !important; 
    background-color:#E9E9E9 !important;
    margin-right:${props=>props.marginZero==null?"20px":"0px"};
    font-size:${market_style.font.size.mini2};
    border-radius:10px !important;
    position:relative !important;
`;
const InputText = styled.input.attrs({ type: "text" })`
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
`;
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


class RequestToDesigner_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_level1: null,
      category_level2: null,
      title: "",
      tag: [],
      price: 0,
      content: "",
      location: 15,
      ownership: 1,
      offline: 0,
      startDate: null,
      endDate: null,
      dayDate: null,

      file_url: null,
    }
    this.onClickCategorylevel1 = this.onClickCategorylevel1.bind(this);
    this.onClickCategorylevel2 = this.onClickCategorylevel2.bind(this);
    this.onClickItemType = this.onClickItemType.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.getTagValue = this.getTagValue.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeOwnership = this.onChangeOwnership.bind(this);
    this.onChangeOffline = this.onChangeOffline.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.getStartDateValue = this.getStartDateValue.bind(this);
    this.getEndDateValue = this.getEndDateValue.bind(this);
    this.getDayDateValue = this.getDayDateValue.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }
  async onClickCategorylevel1(event, { value }) { await this.setState({ category_level1: { value }.value }); }
  async onClickCategorylevel2(event, { value }) { await this.setState({ category_level2: { value }.value }); }
  onClickItemType(event, { value }) { this.setState({ itemType: { value }.value }); }
  onChangeTitle(event) { this.setState({ title: event.target.value, }) }
  async getPriceValue(value) { await this.setState({ price: value }); }
  async getStartDateValue(value) { await this.setState({ startDate: value }); }
  async getEndDateValue(value) { await this.setState({ endDate: value }); }
  async getDayDateValue(value) { await this.setState({ dayDate: value }) }
  getTagValue(data) { this.setState({ tag: data.slice(), }) }
  onChangePrice(event) { this.setState({ price: event.target.value, }) }
  onChangeLocation(event, { value }) { this.setState({ location: { value }.value }); }
  async onChangeContent(data) { await this.setState({ content: data.content }); }
  onChangeOwnership(event, { value }) { this.setState({ ownership: { value }.value, }) }
  onChangeOffline(event, { value }) { this.setState({ offline: { value }.value, }) }
  handleAddTag(tag) { this.setState({ tag: tag.slice(), }); }
  async onFileChange(file) { this.setState({ file_url: file.file_url, filename: file.filename, }); }
  async onSubmit() {
    const data = {
      type: "designer",
      status: "request",
      expert_id: this.props.id || null,
      personal: this.props.id || null,
      title: this.state.title,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      tag: this.state.tag.join(","),
      price: this.state.price,
      content: this.state.content,
      location: this.state.location,
      ownership: this.state.ownership,
      offline_consultation: this.state.offline,
      start_date: this.state.startDate,
      end_date: this.state.endDate,

      file_url: this.state.file_url,
      filename: this.state.filename,
    }
    /////예외처리/////
    if (this.state.title == "") { await alert("의뢰 제목을 입력해주세요"); return; }
    else if (this.state.content == "") { await alert("의뢰 내용을 입력해주세요"); return; }
    ///////////////
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          if (res.id)
            window.location.href = `/designerDetail/${res.id}`;
          else
            window.location.href = "/request/designer";
        }
      })
      .catch(async err => await alert("의뢰 중 에러가 발생했습니다.\n" + err));
  }

  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];
    const Mandatory = () => <span style={{ color: "#FF3838" }} title="필수사항입니다.">*</span>

    console.log(this.props);
    const { userInfo } = this.props;

    return (
      <React.Fragment>
        <Wrapper>
          <div className="header">디자인 의뢰</div>
          <ShadowBox>
            <div className="row flex">
              <div className="label">의뢰자</div>
              <div className="fontNomal">{userInfo.nickName || "이름없음"}</div>
           </div>
           <div className="row flex marginTop3 alignCenter">
              <div className="label">제목<sup className="red">*</sup></div>
              <div className="fontNomal row">
                <InputText onChange={this.onChangeTitle} className="title-input" placeholder="제목을 입력하세요." />
              </div>
           </div>
           <div className="row flex marginTop3 alignCenter">
              <div className="label">카테고리</div>
                <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
                <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
           </div>
           <div className="row flex marginTop3 alignCenter">
              <div className="label">태그</div>
              <div className="row">
               <InputTagNew getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" width={768}/>
              </div>
          </div>
          </ShadowBox>
          <ShadowBox ShadowOpacity={false}>
            <div className="row">
              <div className="label">의뢰 내용<sup className="red">*</sup></div>
              <div className="row marginTop2">
               <TextControllerClassic
                  item={{ content: this.state.content}}
                  name={"comment"}
                  getValue={this.onChangeContent}
                  editheight="500"
                  marginBottom="0"
                  border="1px solid #707070"
                />
              </div>
            </div>
          </ShadowBox>
          <ShadowBox>
            <div className="row flex">
                <div className="label">파일 등록</div>
                <div className="row">
                  <InputFile_mini getValue={this.onFileChange} accept="pdf" />
                </div>
            </div>
            <div className="row flex marginTop3">
                <div className="label">희망 비용</div>
                <div className="row">
                  <InputPriceNew_mobile name="price" getValue={this.getPriceValue} />
                </div>
            </div>
            <div className="row flex marginTop3">
                <div className="label">기간</div>
                <div className="row flex flexEnd">
                  <InputCalendar_mini
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  name="calendar"
                  getStartDateValue={this.getStartDateValue}
                  getEndDateValue={this.getEndDateValue}
                  getDayDateValue={this.getDayDateValue} />
                </div>
            </div>
            <div className="row flex marginTop3 alignCenter">
                <div className="label">디자이너 위치</div>
                <div className="row">
                <DropBox marginZero={true} id="location" value={isNaN(parseInt(this.state.location, 10)) === true ? null : parseInt(this.state.location, 10)}
                selection options={LocationList} placeholder="시/도"
                onChange={this.onChangeLocation} />
                </div>
            </div>
            <div className="row flex marginTop3 alignCenter">
                <div className="label">디자인 소유권</div>
                <div className="row">
                <DropBox marginZero={true} id="designerOwnership" selection options={[{ text: "구매자", value: 0 }, { text: "디자이너", value: 1 }]}
                onChange={this.onChangeOwnership} value={this.state.ownership} placeholder="선택" />
                </div>
            </div>
          </ShadowBox>
          <div className="buttonBox">
          <Button onClick={this.onSubmit} background={"#FF3838"} color="white">등록하기</Button>
          <Button onClick={() => { window.history.back() }} background="#707070" color="white">취소하기</Button>
          </div>
        </Wrapper>
      </React.Fragment>
    );
  };
}
export default RequestToDesigner_mobile;



// <Wrapper>
//       <div className="header">
//         <div className="title">
//           <div className="text">디자인 의뢰</div>
//         </div>
//       </div>

//       <div className="form">
//         <div className="row">
//           <div className="label">의뢰자</div>
//           <div className="content max-width">{userInfo.nickName}</div>
//         </div>

//         <div className="row">
//           <div className="label">제목<Mandatory /></div>
//           <div className="content" style={{maxWidth:"768px"}}><input onChange={this.onChangeTitle} className="title-input" placeholder="제목을 입력하세요." /></div>
//         </div>

//         <div className="row">
//           <div className="label">카테고리</div>
//           <div className="content max-width flexing-row">
//             <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
//             <CustomIcon width="5" height="10" marginRight="20" marginLeft="20" imgURL={category_icon} />
//             <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
//           </div>
//         </div>

//         <div className="row">
//           <div className="label">태그</div>
//           <div className="content" style={{maxWidth:"768px"}}>
//             <InputTagNew getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" width={768}/>
//           </div>
//         </div>

//         <div className="row">
//           <div className="label">의뢰 내용<Mandatory /></div>
//           <div className="content" style={{maxWidth:"768px"}}>
//             <TextControllerClassic
//               item={{ content: this.state.content}}
//               name={"comment"}
//               getValue={this.onChangeContent}
//               editheight="388"
//               marginBottom="0"
//               border="1px solid #707070"
//             />
//           </div>
//         </div>

//         <div className="row">
//           <div className="label">파일 등록</div>
//           <div className="content max-width">
//             <InputFile width={533} getValue={this.onFileChange} accept="pdf" />
//           </div>
//         </div>

//         <div className="row">
//           <div className="label">희망 비용</div>
//           <div className="content max-width">
//             <InputPriceNew name="price" getValue={this.getPriceValue} />
//           </div>
//         </div>

//         <div className="row">
//           <div className="label ">기간</div>
//           <div className="content max-width">
//             <InputCalendar
//               startDate={this.state.startDate}
//               endDate={this.state.endDate}
//               name="calendar"
//               getStartDateValue={this.getStartDateValue}
//               getEndDateValue={this.getEndDateValue}
//               getDayDateValue={this.getDayDateValue} />
//           </div>
//         </div>

//         <div className="hr"></div>

//         <div className="row">
//           <div className="label">디자이너 위치</div>
//           <div className="content max-width">
//             <DropBox id="location" value={isNaN(parseInt(this.state.location, 10)) === true ? null : parseInt(this.state.location, 10)}
//               selection options={LocationList} placeholder="시/도"
//               onChange={this.onChangeLocation} />
//           </div>
//         </div>

//         <div className="row">
//           <div className="label">디자인 소유권</div>
//           <div className="content max-width">
//             <DropBox id="designerOwnership" selection options={[{ text: "구매자", value: 0 }, { text: "디자이너", value: 1 }]}
//               onChange={this.onChangeOwnership} value={this.state.ownership} placeholder="선택" />
//           </div>
//         </div>
//       </div>

//       <div className="bottom">
//         <div className="buttons">
//           <button onClick={this.onSubmit} className="ok">
//             <div className="text">등록하기</div>
//           </button>
//           <button onClick={() => { window.history.back() }} className="cancel">
//             <div className="text">취소하기</div>
//           </button>
//         </div>
//       </div>

//     </Wrapper >