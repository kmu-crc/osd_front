import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import Loading from "components/Commons/Loading";
import { InputPriceNew } from "components/Commons/InputItem/InputPriceNew";
import { RedButton, GrayButton } from "components/Commons/CustomButton"
import { InputCalendar } from "components/Commons/InputItem/InputCalendar";
import { TextControllerClassic } from "components/Commons/InputItem/TextControllerClassic";
import FileIcon from "components/Commons/FileIcon";
import category_icon from "source/category_icon.svg";
import { alert } from "components/Commons/Alert/Alert";
import market_style from "market_style";

// import { Dropdown } from "semantic-ui-react"
// import { confirm } from "components/Commons/Confirm/Confirm";
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

const CustomIcon=styled.div`
  width:${props => props.width}px;
  height:${props => props.height}px;
  background-image:url(${props=>props.imgURL});
  background-repeat: no-repeat;
  background-size: contain;
  padding:${props => props.padding}px;
  margin-right:${props=>props.marginRight==null?"13":props.marginRight}px;
  margin-left:${props=>props.marginLeft==null?"13":props.marginLeft}px;
  display:${props=>props.isNon===true?"none":"block"}
`
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
    font-size:${market_style.font.size.normal3};
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
  width:${props=>props.isHalf===true?"50%":"100%"};
  box-shadow: 5px 5px 10px #00000029;
  border-radius: 20px;
  padding:${props=>props.isHalf===true?"72px 50px 72px 50px":"72px 113px 72px 113px"};
  margin-right:${props=>props.isHalf===true?"44px":"10px"};

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
    font-size:${market_style.font.size.small3};
    color:red;
  }
  ._black_{
    font-size:${market_style.font.size.small3};
    color:black;
  }
  .label2{
    min-width:157px;
    height:29px;
    font-size:${market_style.font.size.normal3};
    font-family:Noto Sans CJK KR, Regular;
    // color:#707070;
    margin-right:60px;
  }
  .label{
    min-width:157px;
    height:max-content;
    font-size:${market_style.font.size.normal3};
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
    font-size:${market_style.font.size.small3};
    line-height:17px;
    display:flex;
  }

`;

const TagList = styled.div`
  width: 100%;
  display: flex;
  // padding: 10px;
  flex-wrap: wrap;
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

class ModifyResponseToDesignerReq extends Component {
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
  async componentDidUpdate(prevProps){
    if(prevProps.detail!=this.props.detail){
      this.setState({res_content:this.props.detail.content,
      content:this.props.detail.content,
      res_price:this.props.detail.price,
      price:this.props.detail.price,
      startDate:this.props.detail.start_date,
      endDate:this.props.detail.end_date,})
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
      price: this.state.price,
      expert_id: this.props.userInfo.uid || null,
      personal: this.props.detail.personal || null,
      start_date:this.state.startDate,
      end_date:this.state.endDate,
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
    const {request} = this.props.detail;
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
      <Wrapper>
        <MainBox>
          <div className="title">디자인 의뢰 응답</div>

          <div className="contentsBox">
            <FormBox isHalf={true}>

              <div className="wrapper flex centering" >
                <div className="label">의뢰자</div>
                <div className="textBox">{detail.client_name || null}</div>
              </div>


              <div className="wrapper flex centering">
                <div className="label">제목</div>
                <div className="textBox">{detail.title}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">카테고리</div>
                <div className="textBox">
                        {/* {category_level1 ? category_level1 + (category_level2 ? `>` : "") : null}{category_level2} */}
                        {category_level1}
                        {category_level2?<CustomIcon width="15" height="15" marginRight="31" marginLeft="31" imgURL={category_icon}/>:null}
                        {category_level2?category_level2:null}
                      </div>
              </div>

              <div className="wrapper flex centering add_margin_bottom">
                <div className="label">태그</div>
                <TagList>
                  {request && request.tag && request.tag.split(",").map((item, index) =>
                    <TagPiece key={index}>
                      {item}
                    </TagPiece>
                  )}
                </TagList>
              </div>

              <div className="wrapper flex centering add_margin_bottom">
                <div className="label">의뢰 내용</div>
                <div className="textBox" dangerouslySetInnerHTML={{ __html: `${request.content || ""}` }} />
              </div>

              <div className="wrapper flex centering add_margin_bottom">
                        <div className="label"/>
                        <div className="addfilebox"><div className="addfile"/></div>
                        
                        <div className="file_label_box">
                        <div className="file_label">
                        {request && request.file_url ?
                              <a href={request.file_url} download={request.filename} className="iconWrap">
                                <FileIcon type={"application"} extension={"pdf"} />
                                {request.filename}
                              </a>
                              : "첨부 파일 없음"}
                        </div>
                        </div>
              </div>



              <div className="wrapper flex centering">
                <div className="label">희망비용</div>
                <div className="textBox">{request.price}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">기간</div>
                <div className="textBox">{request.start_date}~{request.end_date}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">디자이너 위치</div>
                <div className="textBox">{LocationList[request.location || 0].text}</div>
              </div>

              <div className="wrapper flex centering">
                <div className="label">디자인 소유권</div>
                <div className="textBox">{request.ownership <= 0 ? "구매자" : "디자이너"}</div>
              </div>

              {/* <div className="wrapper flex centering">
                <div className="label">오프라인 상담</div>
                <div className="textBox">{detail.offline <= 0 ? "불가능" : "가능"}</div>
              </div> */}

            </FormBox>

            <FormBox isHalf={true}>
              {/* <div className="wrapper flex">
                <div className="label">제목</div>
                <InputText onChange={this.onChangeResponseTitle} value={this.state.res_title} width={483} />
              </div> */}


              <div className="wrapper flex centering" >
                <div className="label2">응답자</div>
                <div>{(this.props.userInfo && this.props.userInfo.nickName) || null}</div>
              </div>

              <div className="wrapper flex">
                <div className="label2">응답 내용</div>
                {/* <InputTextarea onChange={this.onChangeResponseContent} value={this.state.res_content} width={483} height={700} /> */}
                <TextControllerClassic
                  item={{content:this.state.content,height:430}}
                  name={"comment"}
                  getValue={this.onChangeResponseContent}
                  width="480"
                  editheight="430"
                  // initClick={this.state.click}
                  // deleteItem={this.deleteItem}
                />
              </div>

              <div className="wrapper flex">
                <div className="label2">희망비용</div>
                <InputPriceNew price={this.state.price} name="price" getValue={this.getPriceValue} />
              </div>

              <div className="wrapper flex centering">
                <div className="label2 ">기간</div>
                {/* <InputCalendar name="calendar" getDayDateValue={this.getDayDateValue} getEndDateValue={this.getEndDateValue} /> */}
                <InputCalendar startDate={this.state.startDate} endDate={this.state.endDate} name="calendar" 
                 getStartDateValue={this.getStartDateValue} getEndDateValue={this.getEndDateValue}  getDayDateValue={this.getDayDateValue}/>
              </div>

            </FormBox>
          </div>
          <div className="contentsBox">
            <div className="box_"/>
            <div className="box_centering">
              <RedButton text ={"수정된 내용을 저장합니다."}  okText="확인" cancelText="취소" value={"수정하기"} onClick={this.onSubmit} isConfirm={true} />
              <GrayButton text={"수정된 내용이 저장되지 않습니다."} value={"취소하기"} onClick={() => { window.history.back() }} isConfirm={true} />
            </div>
          </div>
        </MainBox>
        {/* <Lihk to={{}}> */}
        {/* </Lihk> */}
      </Wrapper>
    );
  };
}

export default ModifyResponseToDesignerReq;
