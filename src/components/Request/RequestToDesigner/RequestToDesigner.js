import React, { Component } from "react";
import styled from 'styled-components';
import { Icon } from "semantic-ui-react";
import ContentBox from "components/Commons/ContentBox";
import { Dropdown } from "semantic-ui-react"
import { InputTag } from "components/Commons/InputItem/InputTag"

const LocationList = [
  {value:0,text:"서울특별시"},
  {value:1,text:"부산광역시"},
  {value:2,text:"대구광역시"},
  {value:3,text:"인천광역시"},
  {value:4,text:"광주광역시"},
  {value:5,text:"대전광역시"},
  {value:6,text:"울산광역시"},
  {value:7,text:"경기도"},
  {value:8,text:"강원도"},
  {value:9,text:"충청북도"},
  {value:10,text:"충청남도"},
  {value:11,text:"전라북도"},
  {value:12,text:"경상북도"},
  {value:13,text:"경상남도"},
  {value:14,text:"제주도"},
  {value:15,text:"제한없음"},
];

const FirstCategory = [{ text: "패션", value: 0 },
{ text: "제품", value: 1 },
{ text: "커뮤니케이션", value: 2 },
{ text: "공간", value: 3 },
{ text: "엔터테인먼트", value: 4 },
{ text: "소프트웨어", value: 5 },
{ text: "새분야", value: 6 }];

const EmptyCategory = [{ text: "", value: -1 }]

const SecondCategory = [[{ text: "스마트패션", value: 0 }, { text: "의상", value: 1 }, { text: "엑세서리", value: 2 }, { text: "패션모듈", value: 3 }],
[{ text: "스마트카", value: 0 }, { text: "로봇", value: 1 }, { text: "기계/기기/기구", value: 2 }, { text: "센서모듈", value: 3 }, { text: "공예", value: 4 }],
[{ text: "UI/UX", value: 0 }, { text: "광고", value: 1 }, { text: "웹", value: 2 }, { text: "영상", value: 3 }, { text: "타이포그래피", value: 4 }],
[{ text: "스마트시티", value: 0 }, { text: "건축", value: 1 }, { text: "인테리어", value: 2 }, { text: "환경", value: 3 }],
[{ text: "스마트미디어", value: 0 }, { text: "게임", value: 1 }, { text: "디지털컨텐츠", value: 2 }, { text: "서비스", value: 3 }],
[{ text: "인공지능", value: 0 }, { text: "빅데이터", value: 1 }, { text: "시스템SW", value: 2 }, { text: "응용SW", value: 3 }],
[{ text: "새분야", value: 0 }]];
const ItemType = [{ text: "디자인", value: 0 },
{ text: "프로젝트", value: 1 },
{ text: "특허권", value: 2 },
{ text: "기술자문/상담", value: 3 },
{ text: "경험", value: 4 },
{ text: "정보/데이터", value: 5 },
{ text: "아이디어/노하우", value: 6 },
{ text: "제품", value: 7 }];
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
  left:${props => props.left}px;
  bottom:${props => props.bottom}px;

  cursor:pointer;
`

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

`
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

`
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

`
const Margin = styled.div`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:${props => props.height == null ? 100 + "%" : props.height + "px"}
`

const DropBox = styled(Dropdown)`
    min-width:200px !important;
    background-color:#E9E9E9 !important;
    margin-right:10px;

    border-radius:20px !important;
`
const HRLine = styled.div`
    width:93%;
    height:3px;
    background-color:#E9E9E9;
    margin-top:35px;
    margin-bottom:35px;
`
class RequestToDesigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_level1: null, category_level2: null,
      title: "", tag: [], price: 0, content: "", location: 15, ownership: 1, offline: 0,
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
  }

  onClickCategorylevel1(event, { value }) {
    this.setState({ category_level1: { value }.value });
  }
  onClickCategorylevel2(event, { value }) {
    this.setState({ category_level2: { value }.value });
  }
  onClickItemType(event, { value }) {
    this.setState({ itemType: { value }.value });
  }
  onChangeTitle(event) {
    this.setState({
      title: event.target.value,
    })
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
  onChangeLocation(event,{value}){
    this.setState({location:{value}.value});
  }
  onChangeContent(event) {
    this.setState({
      content: event.target.value,
    })
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

  onSubmit() {
    const data = {
      type: "designer", // "designer_req" "designer_res" "maker_req" "maker_res"
      // user_id: this.props.userInfo.uid // 
      title: this.state.title,
      category_level1: this.state.category_level1,
      category_level2: this.state.category_level2,
      tag: this.state.tag.join(","),
      price: this.state.price,
      content: this.state.content,
      location: this.state.location,
      ownership: this.state.ownership,
      offline_consultation: this.state.offline,
    }
    this.props.CreateRequestRequest(data, this.props.token)
      .then(res => {
        if (res.data.success) {
          window.location.href = "/request";
        }
      })
      .catch(err => alert("의뢰 중 에러가 발생했습니다." + err));
  }

  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <MainBox>
            <div className="title">디자인 의뢰</div>
            <div className="contentsBox">
              <FormBox>

                <div className="wrapper flex centering">
                  <div className="label">제목</div>
                  <InputText onChange={this.onChangeTitle} value={this.state.title} width={483} />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">카테고리</div>
                  <DropBox id="firstCategory" value={this.state.category_level1} selection options={FirstCategory}
                    placeholder="대분류" onChange={this.onClickCategorylevel1} />
                  <DropBox id="secondCategory" value={this.state.category_level2} selection placeholder="소분류" onChange={this.onClickCategorylevel2}
                    options={this.state.category_level1 > -1 ? SecondCategory[this.state.category_level1] : EmptyCategory} />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">태그</div>
                  <div>
                    <InputTag getValue={this.handleAddTag} placeholder="태그를 입력하고 [enter]키를 누르세요" width={483} />
                  </div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label ">희망 비용</div>
                  <InputText onChange={this.onChangePrice} value={this.state.price} width={483} />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">의뢰 내용</div>
                  <InputTextarea onChange={this.onChangeContent} value={this.state.content} width={551} height={344} />
                </div>
                <HRLine />
                <div className="wrapper flex centering">
                  <div className="label">디자이너 위치</div>
                  {/* <InputText onChange={this.onChangeLocation} value={this.state.location} width={483} /> */}
                  <DropBox id="country" disabled selection options={[{value:0,text:"대한민국"}]} value={0}/>
                  <DropBox id="location" value={isNaN(parseInt(this.state.location,10))==true?null:parseInt(this.state.location,10)}
                  selection options={LocationList} placeholder="시/도" 
                  onChange={this.onChangeLocation}/>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">디자인 소유권</div>
                  <DropBox id="designerOwnership" selection options={[{ text: "의뢰자", value: 0 }, { text: "디자이너", value: 1 }]}
                    onChange={this.onChangeOwnership} value={this.state.ownership} placeholder="선택" />
                </div>

                <div className="wrapper flex centering">
                  <div className="label">오프라인 상담</div>
                  <DropBox id="offline" selection options={[{ text: "가능", value: 0 }, { text: "불가능", value: 1 }]}
                    onChange={this.onChangeOffline} value={this.state.offline} placeholder="선택" />
                </div>

              </FormBox>
              <RedButton onClick={this.onSubmit} left={1164} bottom={0}><div>등록하기</div></RedButton>
            </div>
          </MainBox>
        </Wrapper>
      </React.Fragment>
    );
  };
} export default RequestToDesigner;

