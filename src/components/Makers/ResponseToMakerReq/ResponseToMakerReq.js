import React, { Component } from "react";
import styled from 'styled-components';
import ContentBox from "components/Commons/ContentBox";
import { Dropdown } from "semantic-ui-react"
import Loading from "components/Commons/Loading";
import { InputPrice } from "components/Commons/InputItem/InputPrice";
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
  padding-top:49px;
  margin:50px;
  .wrapper{
    width:100%;
    margin-bottom:35px;
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
  .textBox{
    width:70%;
    border:1px solid #E6E6E6;
    border-radius:20px;
    padding: 0.67857143em 1em;
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

class ResponseToMakerReq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_level1: 0, category_level2: 0,
      title: "", tag: [], price: 0, content: "", location: "", offline: -1, amount: 0, resale: -1,

      res_content: "", res_price: "",
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeResponseContent = this.onChangeResponseContent.bind(this);
    this.onChangeResponsePrice = this.onChangeResponsePrice.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
  };
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
  //   //   resale: 0,
  //   // });
  // };

  onChangeResponseContent(event) {
    this.setState({
      res_content: event.target.value,
    })
  }
  onChangeResponsePrice(event) {
    this.setState({
      res_price: event.target.value,
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
      content: this.state.res_content,
      price: this.state.res_price,
      expert_id: this.props.userInfo.uid || null,
      personal: this.props.detail.personal || null,
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

  render() {
    const { detail } = this.props;
    if (!detail) return <Loading />;
    const category_level1 = this.props.category1 && this.props.category1[this.state.category_level1].text;
    const category2 = this.props.category2 && this.props.category2[this.state.category_level1];
    const category_level2 = category2 && category2[this.state.category_level2] && category2[this.state.category_level2].text;
    return (
      <React.Fragment>
        <Wrapper>
          <MainBox>
            <div className="title">제작 의뢰 응답</div>
            <div className="contentsBox">
              <FormBox>

                <div className="wrapper flex centering" >
                      <div className="label">의뢰인</div>
                      <div>{this.props.detail&&this.props.detail.nick_name||null}</div>
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
                  <div className="label">의뢰 내용</div>
                  <div className="textBox">{detail.content}</div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">수량</div>
                  <div className="textBox">{detail.amount}</div>
                </div>

                <div className="wrapper flex centering">
                  <div className="label">메이커 위치</div>
                  <div className="textBox">{LocationList[this.state.location]}</div>
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
              <FormBox>

                {/* <div className="wrapper flex">
                <div className="label">제목</div>
                <InputText onChange={this.onChangeResponseTitle} value={this.state.res_title} width={483}/>
              </div> */}

                <div className="wrapper flex centering" >
                      <div className="label">응답자</div>
                      <div>{this.props.userInfo&&this.props.userInfo.nickName||null}</div>
                </div>

                <div className="wrapper flex">
                  <div className="label">응답 내용</div>
                  <InputTextarea onChange={this.onChangeResponseContent} value={this.state.res_content} width={483} height={700} />
                </div>

                <div className="wrapper flex">
                  <div className="label">희망비용</div>
                  <InputPrice name="price" getValue={this.getPriceValue} />
                </div>

              </FormBox>
            </div>
          </MainBox>
          <RedButton onClick={this.onSubmit} left={1444} bottom={-50}><div>등록</div></RedButton>
        </Wrapper>
      </React.Fragment>
    );
  };
}

export default ResponseToMakerReq;
