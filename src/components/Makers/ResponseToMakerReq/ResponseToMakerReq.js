import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
// import { Dropdown } from "semantic-ui-react"
import Loading from "components/Commons/Loading";
import { InputPriceNew } from "components/Commons/InputItem/InputPriceNew";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import { InputCalendar } from "components/Commons/InputItem/InputCalendar";
import { TextControllerClassic } from "components/Commons/InputItem/TextControllerClassic";
import FileIcon from "components/Commons/FileIcon";
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
    padding-top:36px;
    .box_{
      width:50%;
    }
    .box_centering{
      width:50%;
      display:flex;
      justify-content:center;
    }
  }

`;

const FormBox = styled.div`
  width:${props=>props.isHalf==true?"50%":"100%"};
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding:${props=>props.isHalf==true?"72px 50px 72px 50px":"72px 113px 72px 113px"};
  margin-right:${props=>props.isHalf==true?"44px":"10px"};

  .wrapper{
    width:100%;
    margin-bottom:50px;
  }
  .margin_zero{
    margin:0px;
  }
  .add_margin_bottom{
    margin-bottom:100px;
  }
  .flex{
    display:flex;
  }
  .centering{
    // align-items:center;
  }
  .color_red{
    color:red;
  }
  .innerWraper{
    width:100%;
    margin-bottom:26px;
    display:flex;
  }
  .addfilebox{
    height:40px;
    margin-right:8px;
    .addfile{
      width:20px;
      height:20px;
      border-left:1px dashed red;
      border-bottom:1px dashed red;
    }
    .black_addfile{
      width:20px;
      height:20px;
      border-left:1px dashed black;
      border-bottom:1px dashed black;
    }
  }
  .file_label_box{
    height:40px;
    display:flex;
    align-items:center;
  }
 
  .file_label{
    font-size:17px;
    color:red;
  }
  ._black_{
    font-size:17px;
    color:black;
  }
  .label2{
    min-width:157px;
    height:29px;
    font-size:20px;
    font-family:Noto Sans CJK KR, Regular;
    // color:#707070;
    margin-right:60px;
  }
  .label{
    min-width:157px;
    height:max-content;
    font-size:20px;
    font-family:Noto Sans CJK KR, Regular;
    color:#707070;
    margin-right:60px;
    border-right:2px solid #707070;
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
    font-family:Noto Sans CJK KR, Regular;
    font-size:17px;
    line-height:17px;
  }

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
const TagList = styled.div`
  width: 100%;
  display: flex;
  // padding: 10px;
  flex-wrap: wrap;
`;
const InputText = styled.input.attrs({ type: "text" })`
  width:${props => props.width == null ? 100 + "%" : props.width + "px"};
  height:52px;
  border-radius:26px;
  font-family:Noto Sans KR;
  font-size:20px;
  background-color:#E9E9E9;
  margin-right:21px;
  outline:none;
  border:0px;
  padding: 0.67857143em 1em;

`;
const TagPiece = styled.div`
    width:max-content;
    min-width:30px;
    max-height:30px;
    border:1px solid #707070;
    border-radius:15px;
    padding: 8px 10px 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items:center;
    font-size:15px;
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

class ResponseToMakerReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_level1: 0, category_level2: 0,
      title: "", tag: [], price: 0, content: "", location: "", offline: -1, amount: 0, resale: -1,       
      ownership: -1, startDate:null,endDate: null, dayDate: null,
      res_content: "", res_price: "", res_amount: null,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeResponseContent = this.onChangeResponseContent.bind(this);
    this.onChangeResponsePrice = this.onChangeResponsePrice.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.onChangeReponseAmount = this.onChangeReponseAmount.bind(this);
    this.getStartDateValue = this.getStartDateValue.bind(this);
    this.getEndDateValue = this.getEndDateValue.bind(this);
    this.getDayDateValue=this.getDayDateValue.bind(this);
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
      start_date:this.state.startDate,
      end_date:this.state.endDate,
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
      .catch(err => alert("에러가 발생했습니다." + err));
  }
  async getEndDateValue(value) {
    await console.log("endDate", value);
    await this.setState({ endDate: value });
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
          <MainBox>
            <div className="title">제작 의뢰 응답</div>
            <div className="contentsBox">
              <FormBox isHalf={true}>

                <div className="wrapper flex centering" >
                  <div className="label">의뢰자</div>
                  <div>{(this.props.detail && this.props.detail.nick_name) || null}</div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">제목</div>
                  <div className="textBox">{detail.title}</div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">카테고리</div>
                  <div className="textBox">{category_level1 ? category_level1 + " > " : ""}{category_level2}</div>
                </div>

                <div className="wrapper flex centering add_margin_bottom">
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
                <div className="label">의뢰 내용</div>
                <div className="textBox" dangerouslySetInnerHTML={{ __html: `${detail.content || ""}` }} />
              </div>

              <div className="wrapper flex centering add_margin_bottom">
                        <div className="label"/>
                        <div className="addfilebox"><div className="addfile"/></div>
                        
                        <div className="file_label_box">
                        <div className="file_label">
                        {detail && detail.file_url ?
                              <a href={detail.file_url} download={detail.filename} className="iconWrap">
                                <FileIcon type={"application"} extension={"pdf"} />
                                {detail.filename}
                              </a>
                              : "첨부 파일 없음"}
                        </div>
                        </div>
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
                  <div className="label">수량</div>
                  <div className="textBox">{detail.amount}</div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">메이커 위치</div>
                  <div className="textBox">{detail.location && LocationList[parseInt(detail.location, 10)].text}</div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">메이커 재판매</div>
                  <div className="textBox">{detail.resale <= 0 ? "불가능" : "가능"}</div>
                </div>

                {/* <div className="wrapper flex centering">
                  <div className="label">오프라인 상담</div>
                  <div className="textBox">{this.state.offline <= 0 ? "불가능" : "가능"}</div>
                </div> */}

              </FormBox>
              <FormBox isHalf={true}>

                {/* <div className="wrapper flex">
                <div className="label">제목</div>
                <InputText onChange={this.onChangeResponseTitle} value={this.state.res_title} width={483}/>
              </div> */}

                <div className="wrapper flex centering" >
                  <div className="label2">응답자</div>
                  <div>{(this.props.userInfo && this.props.userInfo.nickName) || null}</div>
                </div>

                <div className="wrapper flex">
                  <div className="label2">응답 내용</div>
                  {/* <InputTextarea onChange={this.onChangeResponseContent} value={this.state.res_content} width={483} height={483} /> */}
                  <TextControllerClassic
                  item={{content:this.state.content,height:430}}
                  name={"comment"}
                  getValue={this.onChangeResponseContent}
                  width="480"
                  editheight="430"
                />
                </div>

                <div className="wrapper flex centering">
                  <div className="label2">수량</div>
                  <InputText type="number" onChange={this.onChangeReponseAmount} value={this.state.res_amount} width={100} />
                </div>

                <div className="wrapper flex">
                  <div className="label2">희망비용</div>
                  <InputPriceNew name="price" getValue={this.getPriceValue} />
                </div>


                <div className="wrapper flex centering">
                  <div className="label2 ">기간</div>
                  <InputCalendar startDate={this.state.startDate} endDate={this.state.endDate} name="calendar" 
                 getStartDateValue={this.getStartDateValue} getEndDateValue={this.getEndDateValue}  getDayDateValue={this.getDayDateValue}/>
                </div>

              </FormBox>
            </div>
            <div className="contentsBox">
            <div className="box_"/>
            <div className="box_centering">
              <RedButton value={"등록하기"} onClick={this.onSubmit} isConfirm={true} />
              <GrayButton value={"취소하기"} onClick={() => { window.history.back() }} isConfirm={true} /></div>
            </div>
          </MainBox>
        </Wrapper>
      </React.Fragment>
    );
  };
}

export default ResponseToMakerReq;
