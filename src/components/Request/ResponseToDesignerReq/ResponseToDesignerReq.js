import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
// import { Dropdown } from "semantic-ui-react"
import Loading from "components/Commons/Loading";
import { InputPrice } from "components/Commons/InputItem/InputPrice";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import { InputCalendar } from "components/Commons/InputItem/InputCalendar";
import { TextControllerClassic } from "components/Commons/InputItem/TextControllerClassic";

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
    // margin-left:130px;

  }
  .contentsBox{
    position: relative;
    width:100%;
    display:flex;
    // padding-left:130px;
    padding-top:36px;
  }

`;

const FormBox = styled.div`
  *{
    font-family:Noto Sans KR;
    font-weight:500;
    font-size:20px;
    // border:1px solid black;
  }
  width:939px;
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding-left:59px;
  padding-right:59px;
  padding-top:49px;
  margin-right:10px;
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
    height:max-content;
  }
  .label_centering{
    text-align:center;
  }
  .index{
    width:30px;
    height:30px;
    color:#707070;
  }
  .textBox{
    font-weight:200;
  }

`;
//const InputText = styled.input.attrs({ type: "text" })`
//  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
//  height:43px;
//  border-radius:20px;
//  font-family:Noto Sans KR;
//  font-size:20px;
//  background-color:#E9E9E9;
//  margin-right:21px;
//  outline:none;
//  border:0px;
//  padding: 0.67857143em 1em;
//
//`;
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

class ResponseToDesignerReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_level1: 0, category_level2: 0,
      title: "", tag: [], price: 0, content: "", location: "", offline: -1, amount: 0, 
      ownership: -1, startDate:null,endDate: null, dayDate: null,
      res_content: "", res_price: "",
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeResponseContent = this.onChangeResponseContent.bind(this);
    this.onChangeResponsePrice = this.onChangeResponsePrice.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.getStartDateValue = this.getStartDateValue.bind(this);
    this.getEndDateValue = this.getEndDateValue.bind(this);
    this.getDayDateValue=this.getDayDateValue.bind(this);
  }
  // componentDidMount() {
  //   // //test 데이터 초기화
  //   // this.setState({
  //   //   category_level1: 1,
  //   //   category_level2: 0,
  //   //   title: "제작의뢰합니다.",
  //   //   tag: ["테스트1", "테스트2", "테스트3"],
  //   //   price: 12300,
  //   //   content: "제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰제작의뢰",
  //   //   location: "대한민국 서울특별시",
  //   //   offline: 0,
  //   //   amount: 1,
  //   //   ownership: 0,
  //   // });
  // };

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
  async getStartDateValue(value){
    await this.setState({ startDate: value });
  }
  async getEndDateValue(value) {
    await this.setState({ endDate: value });
  }
  async getDayDateValue(value){
    await this.setState({dayDate:value})
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
      start_date:this.state.startDate,
      end_date:this.state.endDate,
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
      .catch(err => alert("에러가 발생했습니다." + err));
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
    return (
      <Wrapper>
        <MainBox>
          <div className="title">디자인 의뢰 응답</div>

          <div className="contentsBox">
            <FormBox>

              <div className="wrapper flex centering" >
                <div className="label">의뢰자</div>
                <div>{detail.nick_name || null}</div>
              </div>


              <div className="wrapper flex centering">
                <div className="label">제목</div>
                <div className="textBox">{detail.title}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">카테고리</div>
                <div className="textBox">{category_level1 ? category_level1 + " > " : ""}{category_level2}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">태그</div>
                <TagList>
                  {detail && detail.tag && detail.tag.split(",").map((item, index) =>
                    <TagPiece key={index}>
                      {item}
                    </TagPiece>
                  )}
                </TagList>
              </div>

              <div className="wrapper flex centering">
                <div className="label">희망비용</div>
                <div className="textBox">{detail.price}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">기간</div>
                <div className="textBox">~{detail.term}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">의뢰 내용</div>
                <div className="textBox">{detail.content}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">디자이너 위치</div>
                <div className="textBox">{LocationList[detail.location || 0].text}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">디자인 소유권</div>
                <div className="textBox">{detail.ownership <= 0 ? "불가능" : "가능"}</div>
              </div>

              {/* <div className="wrapper flex centering">
                <div className="label">오프라인 상담</div>
                <div className="textBox">{detail.offline <= 0 ? "불가능" : "가능"}</div>
              </div> */}

            </FormBox>

            <FormBox>
              {/* <div className="wrapper flex">
                <div className="label">제목</div>
                <InputText onChange={this.onChangeResponseTitle} value={this.state.res_title} width={483} />
              </div> */}


              <div className="wrapper flex centering" >
                <div className="label">응답자</div>
                <div>{(this.props.userInfo && this.props.userInfo.nickName) || null}</div>
              </div>

              <div className="wrapper flex">
                <div className="label">응답 내용</div>
                {/* <InputTextarea onChange={this.onChangeResponseContent} value={this.state.res_content} width={483} height={700} /> */}
                <TextControllerClassic
                  item={{content:this.state.content,height:700}}
                  name={"comment"}
                  getValue={this.onChangeResponseContent}
                  // initClick={this.state.click}
                  // deleteItem={this.deleteItem}
                />
              </div>

              <div className="wrapper flex">
                <div className="label">희망비용</div>
                <InputPrice name="price" getValue={this.getPriceValue} />
              </div>

              <div className="wrapper flex centering">
                <div className="label ">기간</div>
                {/* <InputCalendar name="calendar" getDayDateValue={this.getDayDateValue} getEndDateValue={this.getEndDateValue} /> */}
                <InputCalendar startDate={this.state.startDate} endDate={this.state.endDate} name="calendar" 
                 getStartDateValue={this.getStartDateValue} getEndDateValue={this.getEndDateValue}  getDayDateValue={this.getDayDateValue}/>
              </div>

            </FormBox>
          </div>
          <div className="contentsBox">
            <RedButton value={"등록"} onClick={this.onSubmit} isConfirm={true} />
            <GrayButton value={"취소"} onClick={() => { window.history.back() }} isConfirm={true} />
          </div>
        </MainBox>
        {/* <Lihk to={{}}> */}
        {/* </Lihk> */}
      </Wrapper>
    );
  };
}

export default ResponseToDesignerReq;
