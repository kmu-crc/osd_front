import ContentBox from "components/Commons/ContentBox";
import { Dropdown } from "semantic-ui-react"
import { InputTagNew, InputFile, InputPriceNew, InputCalendar } from "components/Commons/InputItem"
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import { TextControllerClassic } from "components/Commons/InputItem/TextControllerClassic";
import { FileUploadRequest } from "actions/Uploads";
import category_icon from "source/category_icon.svg";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

import React, { Component } from "react";
import styled from 'styled-components';
import { alert } from "components/Commons/Alert/Alert";

const Wrapper = styled.div`
  *{ border: 1px solid #AEAEAE; }
  width: 100%;
  padding: 0px 30px;
  font-family: Noto Sans KR;

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
  .form {
    width: 1306px;
    min-height: 554px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 3px 3px 5px #0000001A;
    border: 0.25px solid #B7B7B7;
    border-radius: 20px;
    padding: 40px 150px;

    .row {
      display: flex;
      flex-direction: row;

      .label {
        height: 22px;
        width: 185px;
        text-align: left;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        text-align: left;
        font: normal normal medium 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #707070;
        span { font-weight: bold;color: #FF0000;}
      }

      .content {
        width: 100%;
        max-width: 820px;
        height: 22px;
        margin-bottom: 31px;
        // margin-left: 94px;

        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

        text-align: left;
        font: normal normal normal 15px/22px Noto Sans KR;
        letter-spacing: 0px;
        color: #000000;
      }
    }
  }

  .bottom {
    width: 100%;
    height: 30px;
    margin-top: 20px;
    position: relative;
    display: flex;

    button {
      width: 150px;
      height: 30px;
      border: none;
      text-align: center;
      text-decoration: none;
      text-align: center;
      letter-spacing: 0px;
      :first-child {
        margin-right: 20px;
      }
      font: normal normal bold 15px/22px Noto Sans KR;
      color: #FFFFFF;
    }

    .apply {
      margin-left: auto;
      background: #FF0000 0% 0% no-repeat padding-box; /* Green - #4CAF50; */
    }

    .cancel {
      margin-right: auto;
      border: none;
      background: #707070 0% 0% no-repeat padding-box;
    }
  }
`;
const InputText = styled.input.attrs({ type: "text" })`
  width: ${props => props.width == null ? 100 + "%" : props.width + "px"};
  height: 52px;
  border-radius: 26px;
  font-family: Noto Sans KR;
  font-size: ${market_style.font.size.normal3};
  background-color: #E9E9E9;
  margin-right: 21px;
  outline: none;
  border: 0px;
  padding: 0.67857143em 1em;
`;
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
  async onClickCategorylevel1(event, { value }) {
    await this.setState({ category_level1: { value }.value });
  }
  async onClickCategorylevel2(event, { value }) {
    await this.setState({ category_level2: { value }.value });
  }
  onClickItemType(event, { value }) {
    this.setState({ itemType: { value }.value });
  }
  onChangeTitle(event) {
    this.setState({
      title: event.target.value,
    })
  }
  async getPriceValue(value) {
    await this.setState({
      price: value
    });
  }
  async getStartDateValue(value) {
    // await console.log("startDate",value);
    await this.setState({ startDate: value });
  }
  async getEndDateValue(value) {
    // await console.log("endDate",value);
    await this.setState({ endDate: value });
  }
  async getDayDateValue(value) {
    await this.setState({ dayDate: value })
  }
  getTagValue(data) {
    this.setState({
      tag: data.slice(),
    })
  }
  onChangePrice(event) {
    this.setState({
      price: event.target.value,
    })
  }
  onChangeLocation(event, { value }) {
    this.setState({
      location: { value }.value
    });
  }
  async onChangeContent(data) {
    await this.setState({
      content: data.content
    });
    // this.setState({
    //   content: event.target.value,
    // })
  }
  onChangeOwnership(event, { value }) {
    this.setState({
      ownership: { value }.value,
    })
  }
  onChangeOffline(event, { value }) {
    this.setState({
      offline: { value }.value,
    })
  }
  handleAddTag(tag) {
    this.setState({
      tag: tag.slice(),
    });
  }
  async onFileChange(file) {
    this.setState({
      file_url: file.file_url,
      filename: file.filename,
    });
  }
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
      <div className="title">
        <p className="text">
          디자인 의뢰
        </p>
      </div>
      <div className="form">
        <div className="row">
          <div className="label">의뢰자</div>
          <div className="content">{userInfo.nickName}{userInfo.nickName}{userInfo.nickName}{userInfo.nickName}{userInfo.nickName}</div>
        </div>
        <div className="row">
          <div className="label">제목<Mandatory /></div>
          <div className="contents"><InputText onChange={this.onChangeTitle} value={this.state.title} width={820} /></div>
        </div>
      </div>
      <div className="bottom">
        <button className="apply">등록하기</button>
        <button className="cancel">취소하기</button>
      </div>
    </Wrapper>);
  };
}
export default RequestToDesigner;
