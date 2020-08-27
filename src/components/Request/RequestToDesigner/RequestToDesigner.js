import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import { Dropdown } from "semantic-ui-react"
import { InputTag } from "components/Commons/InputItem/InputTag"
import { InputPrice } from "components/Commons/InputItem/InputPrice";
import { InputCalendar } from "components/Commons/InputItem/InputCalendar";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import { TextControllerClassic } from "components/Commons/InputItem/TextControllerClassic";
import { FileUploadRequest } from "actions/Uploads";

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

`;

const FormBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
  }
  width:939px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:59px;
  padding-right:59px;
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
  .centering{
    align-items:center;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
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
  .faded-text {
    border-radius: 15px;
    background-color: #EAEAEA;
    padding: 15px 15px;
  }
  .information {
    color: red;
    font-size: 16px;
    margin-left: 10px;
  }
`;
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:43px;
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  margin-right:21px;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;

`;
const InputTextarea = styled.textarea`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"};
  border-radius:20px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  outline:none;
  border:0px;
  readonly;
  padding: 0.67857143em 1em;

`;
const DropBox = styled(Dropdown)`
    min-width:200px !important;
    background-color:#E9E9E9 !important;
    margin-right:10px;

    border-radius:20px !important;
`;
const HRLine = styled.div`
    width:93%;
    height:3px;
    background-color:#E9E9E9;
    margin-top:35px;
    margin-bottom:35px;
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
  onFileChange = async event => {
    const file = event.currentTarget.files;
    const s3path = await FileUploadRequest(file);
    this.setState({
      file_url: s3path.path,
      filename: file[0].name
    });
  }

  onSubmit() {
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
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.success) {
          if (res.id)
            window.location.href = `/designerDetail/${res.id}`;
          else
            window.location.href = "/request/designer";
        }
      })
      .catch(err => alert("의뢰 중 에러가 발생했습니다.\n" + err));
  }

  render() {
    const category1 = this.props.category1 || [{ text: "_", value: -1 }];
    const category2 = (this.state.category_level1 && this.props.category2 && this.props.category2.filter(item => item.parent === this.state.category_level1)) || [{ text: "_", value: -1 }];
    // console.log(this.props);
    return (
      <React.Fragment>
        <Wrapper>
          <MainBox>
            <div className="title">디자인 의뢰</div>
            <div className="contentsBox">
              <FormBox>

                <div className="wrapper flex centering" >
                  <div className="label">의뢰자</div>
                  <div>{this.props.userInfo.nickName || null}</div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">제목</div>
                  <InputText onChange={this.onChangeTitle} value={this.state.title} width={483} />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">카테고리</div>
                  <DropBox id="category_level1"
                    value={this.state.category_level1}
                    selection
                    options={category1}
                    placeholder="대분류"
                    onChange={this.onClickCategorylevel1} />
                  <DropBox id="category_level2"
                    value={this.state.category_level2}
                    selection
                    options={category2}
                    placeholder="소분류"
                    onChange={this.onClickCategorylevel2} />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">태그</div>
                  <div>
                    <InputTag getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" width={483} />
                  </div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">의뢰 내용</div>
                  {/* <InputTextarea onChange={this.onChangeContent} value={this.state.content} width={551} height={344} /> */}
                  <TextControllerClassic
                    item={{ content: this.state.content, height: 500 }}
                    name={"comment"}
                    getValue={this.onChangeContent}
                  // initClick={this.state.click}
                  // deleteItem={this.deleteItem}
                  />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">파일 등록</div>
                  <div className="faded-text" >
                    <input
                      type="file"
                      name="source"
                      ref={ref => (this.input = ref)}
                      onChange={this.onFileChange}
                      accept=".pdf" />
                  </div>
                  <div className="information">
                    * pdf파일만 등록이 가능합니다.
                      </div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label ">희망 비용</div>
                  <InputPrice name="price" getValue={this.getPriceValue} />
                </div>

                <div className="wrapper flex centering">
                  <div className="label ">기간</div>
                  <InputCalendar
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    name="calendar"
                    getStartDateValue={this.getStartDateValue}
                    getEndDateValue={this.getEndDateValue}
                    getDayDateValue={this.getDayDateValue} />
                </div>

                <HRLine />
                <div className="wrapper flex centering">
                  <div className="label">디자이너 위치</div>
                  {/* <InputText onChange={this.onChangeLocation} value={this.state.location} width={483} /> */}
                  {/* <DropBox id="country" disabled selection options={[{ value: 0, text: "대한민국" }]} value={0} /> */}
                  <DropBox id="location" value={isNaN(parseInt(this.state.location, 10)) === true ? null : parseInt(this.state.location, 10)}
                    selection options={LocationList} placeholder="시/도"
                    onChange={this.onChangeLocation} />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">디자인 소유권</div>
                  <DropBox id="designerOwnership" selection options={[{ text: "의뢰자", value: 0 }, { text: "디자이너", value: 1 }]}
                    onChange={this.onChangeOwnership} value={this.state.ownership} placeholder="선택" />
                </div>

                {/* <div className="wrapper flex centering">
                  <div className="label">오프라인 상담</div>
                  <DropBox id="offline" selection options={[{ text: "가능", value: 0 }, { text: "불가능", value: 1 }]}
                    onChange={this.onChangeOffline} value={this.state.offline} placeholder="선택" />
                </div> */}

              </FormBox>
            </div>
            <div className="contentsBox">
              <RedButton value={"등록"} onClick={this.onSubmit} isConfirm={true} />
              <GrayButton value={"취소"} onClick={() => { window.history.back() }} isConfirm={true} />
            </div>
          </MainBox>
        </Wrapper>
      </React.Fragment>
    );
  };
}
export default RequestToDesigner;
