import { Dropdown } from "semantic-ui-react"
import category_icon from "source/category_icon.svg";
import { CustomIcon } from "components/Commons/ArrowIcon";
import { TextControllerClassic } from "components/Commons/InputItem/TextControllerClassic";
import { InputTagNew, InputFile, InputPriceNew, InputCalendar } from "components/Commons/InputItem"

import React, { Component } from "react";
import styled from 'styled-components';
import { alert } from "components/Commons/Alert/Alert";

// import { RedButton, GrayButton } from "components/Commons/CustomButton"
// import market_style from "market_style";
// import { FileUploadRequest } from "actions/Uploads";
// import ContentBox from "components/Commons/ContentBox";
// import { confirm } from "components/Commons/Confirm/Confirm";

const Wrapper = styled.div`
  padding-top: 15px;
  padding-left:30px; 
  padding-right:30px;

  .header {
    width: 100%;

    .title {
      width: max-content;
      margin: auto;

      .text {
        text-align: center;
        font: normal normal bold 20px/29px Noto Sans KR;
        letter-spacing: 0px;
        color: #000000;
        opacity: 1;
      }
    }
  }

  .form {
    margin: auto;
    margin-top: 15px;
    width: 100%;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 5px #0000001A;
    border: 1px solid #EAEAEA;
    border-radius: 20px;
    padding: 50px 150px;
    padding-bottom: 50px;

    .row {
      display: flex;
      flex-direction: row;
      flex-wrap:wrap;
      :last-child {
        margin-bottom: 0px;
      }
      .label { 
        height: 22px;
        min-width: 140px;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        border-right: 1px solid #707070;

        text-align: left;
        font: normal normal bold 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;

        margin-right: 94px;
        margin-bottom:5px;
      }
      .max-width{
        max-width: max-content;
      }
      .content { 
        width: 100%;
        margin-bottom: 31px;
        
        text-align: left;
        font: normal normal normal 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #000000;

        .title-input {
          width:100%;
          height: 31px;
          background: #E9E9E9 0% 0% no-repeat padding-box;
          border-radius: 10px;
          border: none;

          text-align: left;
          font: normal normal 300 13px/19px Noto Sans KR;
          letter-spacing: 0px;
          color: #000; //#707070;
          padding: 2px 0px 3px 11px;
        }
      }
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
    button {
      width: 150px;
      height: 30px;
      border: none;

      .text {
        margin: auto;
        width: max-content;
        text-align: center;
        font: normal normal bold 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #FFFFFF;
        opacity: 1;
      }
      &.ok {
        background: #FF0000 0% 0% no-repeat padding-box;
        &.disabled {
          background: #707070 0% 0% no-repeat padding-box;
        }
      }
      &.cancel {
        background: #707070 0% 0% no-repeat padding-box;
      }
      opacity: 1;
      :first-child {
        margin-right: 20px;
      }
    }
  }

  .flexing-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap:wrap;
  }

  .hr {
    margin-top: 30px;
    margin-bottom: 29px;
    width: 100%;
    height: 2px;
    border: 1px solid #EFEFEF;
  }
  @media only screen and (min-width: 500px) and (max-width:1000px){

    .form{
      padding:40px 10%;
      .row{
        .label{
          margin-right: 30px;
        }
      }
    }
  }
`;
const DropBox = styled(Dropdown)`
  width: 180px !important;
  height: 31px !important;
  border-radius: 10px !important;
  background-color:#E9E9E9 !important;
  border: none;
  margin-bottom:5px;
  margin-right:10px;
  .text {
    margin: 4px 0px 0px 22px;
    font: normal normal normal 15px/22px Noto Sans KR;
    letter-spacing: 0px !important;
    color: #000000 !important;
  }

  .icon {
    padding: 5px !important;
  }

  &.ui, &.selection, &.dropdown {
    min-height: 31px !important;
    height: 31px !important;
    padding: 0px !important;
    // background-color: blue !important;
  }
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


class RequestToDesigner extends Component {
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
    const Mandatory = () => <span style={{ color: "red" }} title="필수사항입니다.">*</span>

    console.log(this.props);
    const { userInfo } = this.props;

    return (<Wrapper>
      {/* header */}
      <div className="header">
        <div className="title">
          <div className="text">디자인 의뢰</div>
        </div>
      </div>

      {/* form */}
      <div className="form">
        <div className="row">
          <div className="label">의뢰자</div>
          <div className="content max-width">{userInfo.nickName}</div>
        </div>

        <div className="row">
          <div className="label">제목<Mandatory /></div>
          <div className="content" style={{maxWidth:"768px"}}><input onChange={this.onChangeTitle} className="title-input" placeholder="제목을 입력하세요." /></div>
        </div>

        <div className="row">
          <div className="label">카테고리</div>
          <div className="content max-width flexing-row">
            <DropBox id="category_level1" value={this.state.category_level1} selection options={category1} placeholder="대분류" onChange={this.onClickCategorylevel1} />
            <CustomIcon width="5" height="10" marginRight="20" marginLeft="20" imgURL={category_icon} />
            <DropBox id="category_level2" value={this.state.category_level2} selection options={category2} placeholder="소분류" onChange={this.onClickCategorylevel2} />
          </div>
        </div>

        <div className="row">
          <div className="label">태그</div>
          <div className="content" style={{maxWidth:"768px"}}>
            <InputTagNew getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" width={768}/>
          </div>
        </div>

        <div className="row">
          <div className="label">의뢰 내용<Mandatory /></div>
          <div className="content" style={{maxWidth:"768px"}}>
            <TextControllerClassic
              item={{ content: this.state.content, /*height: 388*/ }}
              name={"comment"}
              getValue={this.onChangeContent}
              editheight="388"
              marginBottom="0"
              border="1px solid #707070"
            />
          </div>
        </div>

        <div className="row">
          <div className="label">파일 등록</div>
          <div className="content max-width">
            <InputFile width={533} getValue={this.onFileChange} accept="pdf" />
          </div>
        </div>

        <div className="row">
          <div className="label">희망 비용</div>
          <div className="content max-width">
            <InputPriceNew name="price" getValue={this.getPriceValue} />
          </div>
        </div>

        <div className="row">
          <div className="label ">기간</div>
          <div className="content max-width">
            <InputCalendar
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              name="calendar"
              getStartDateValue={this.getStartDateValue}
              getEndDateValue={this.getEndDateValue}
              getDayDateValue={this.getDayDateValue} />
          </div>
        </div>

        <div className="hr"></div>

        <div className="row">
          <div className="label">디자이너 위치</div>
          <div className="content max-width">
            <DropBox id="location" value={isNaN(parseInt(this.state.location, 10)) === true ? null : parseInt(this.state.location, 10)}
              selection options={LocationList} placeholder="시/도"
              onChange={this.onChangeLocation} />
          </div>
        </div>

        <div className="row">
          <div className="label">디자인 소유권</div>
          <div className="content max-width">
            <DropBox id="designerOwnership" selection options={[{ text: "구매자", value: 0 }, { text: "디자이너", value: 1 }]}
              onChange={this.onChangeOwnership} value={this.state.ownership} placeholder="선택" />
          </div>
        </div>
      </div>


      {/* bottom */}
      <div className="bottom">
        <div className="buttons">
          <button onClick={this.onSubmit} className="ok">
            <div className="text">등록하기</div>
          </button>
          <button onClick={() => { window.history.back() }} className="cancel">
            <div className="text">취소하기</div>
          </button>
        </div>
      </div>

    </Wrapper >);
  };
}
export default RequestToDesigner;
