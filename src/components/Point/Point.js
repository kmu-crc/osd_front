import React, { Component } from 'react';
import styled from 'styled-components';
import DateFormat from "modules/DateFormat";
import { Pagination } from 'semantic-ui-react'
import { InputPriceNew } from "components/Commons/InputItem"
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
const Wrapper = styled.div`
  width: 100%;
  .title{
    width:100%;
    font-family:Noto Sans CJK KR, Medium;
    font-size:20px;
    margin-bottom:40px;
  }
  .tabBox{
    width:100%;
    margin-bottom:30px;
    font-size:20px;
    font-family:Noto Sans CJK KR, Medium;
    display:flex;
    .text_grey{color:#d6d6d6;cursor:pointer;}
    .text_black{color:black;cursor:pointer;}
    .text_light_grey{color:#efefef;}
    .margin_left{margin-left:40px;}
    .margin_right{margin-right:20px;}
  }
`;
const PointContainer = styled.div`
  width: 1200px;
  margin-right: auto;
  margin-left: auto;
`;
const Title = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 36px;
  line-height: 36px;
  width: max-content;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 45px;
  &.smaller {
    font-size: 28px;
    margin-bottom: 25px;
  }
`;
const PointWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: 75px;
  margin-top: 40px;
  line-height: 20px;
  width: 500px;
 
  .text {
    margin-right: 10px;
    font-size: 20px;
    font-weight: 300;
  }
  .point {
    margin-left: auto;
    margin-left: 50px;
    margin-right: 15px;
    font-size: 26px;
    font-weight: 500;
  }
  .unit {
    font-weight: 500;
    width: 25px;
    height: 25px;
    padding: 5px;
    text-align: center;
    background-color: #6A0DAD;
    border-radius: 50%;
    color: #FFFFFF;
  }
`;
const Charge = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  .flex{
    display:flex;
  }
  .item { 
    width: max-content;
    margin: 10px;
    .charge {
      cursor: default;
      width: max-content;
      padding: 35px;
      text-align: center;
      border-radius: 25px;
      background-color: orange;
      color: white;
      font-weight: 500;
    }

    .not-yet {
      background-color: gray;
    }
  }
`;
const HistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  .history-element {
    display: flex;
    flex-direction row;
    justify-content: space-between;
    border: 1px solid gray;
  }
`;
const FormStyle = styled.input.attrs({ type: "number" })`
    width: ${props => props.width}px;
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    margin: 0;
    -webkit-appearance: none;
    padding: 0.67857143em 1em;
    height:43px;
    border-radius:20px;
    font-family:Noto Sans KR;
    font-size:20px;
    background-color:#E9E9E9;
    outline:none;
    border:0px;
    margin-right:5px;
    transition: color 0.1s ease, border-color 0.1s ease;

`;
const Button = styled.div`
  height:43px;
  width:max-content;
  padding:10px;
  background-color:#707070;
  display:flex;
  justify-content:center;
  border-radius:20px;
  align-items:center;
  .text{
    color:white;
  }
`
const PaymentBox = styled.div`
  width:100%;
  .continue{
    cursor:pointer;
    width:100%;
    text-align:right;
    font-size:20px;
    font-family:Noto Sans CJK KR, Medium;
    color:red;
  }
  .hrLine{
    width:100%;
    border:1px solid #efefef;
    margin-top:30px;
    margin-bottom:24px;
  }
  .mypoint{
    width:100%;
    text-align:right;
    font-family:Noto Sans CJK KR, Regular;
    font-size:17px;
    color:red;
    margin-bottom:75px;
  }
  .input_title{
    font-family:Noto Sans CJK KR, Medium;
    font-size:20px;
    margin-top:15px;
    margin-right:36px;
  } 
  .input_flag{
    width:1px;
    height:20px;
    margin-right:47px;
    // margin-left:47px;
    margin-top:15px;
    border-right:1px solid #707070;
    font-size:20px;
  }
  .margin_top{
    margin-top:107px;
  }
  .inputprice{
    width:100%;
    display:flex;
    margin-bottom:132px;
  }
  .align_right{
    justify-content:flex-end;
    .button_red{
      width:290px;
      height:70px;
      display:flex;
      justify-content:center;
      align-items:center;
      color:white;
      font-size:25px;
      background-color:red;
      cursor:pointer;
    }
  }
  .addPrice{
    width:100%;
    display:flex;
    margin-bottom:100px;
    .buttonIcon{
      cursor:pointer;
      width:208px;
      height:74px;
      display:flex;
      justify-content:center;
      align-items:center;
      margin-bottom:42px;
    }
    .redbtn{background-color:red;color:white;font-size:20px;}
    .defaultbtn{border:1px solid #707070;color:#707070;font-size:20px;}
  }
`
const PointListBox = styled.div`
  width:100%;
  .content_box{
    width:100%;
    height:525px;
    // box-shadow: 5px 5px 10px #00000029;
    // border-radius: 20px;
    // padding:44px 55px 44px 55px;
    .titleBox{
      display:flex;
      align-items:center;
      justify-content:center;
      height:64px;
      width:100%;
      // margin-bottom:7px;
      ._title{
        width:100%;
        height:max-content;
        font-family:Noto Sans CJK KR, Medium;
        font-size:17px;
        text-align:center;
        font-weight:500;
      }
    }
    .history_box{
      width:100%;
      display:flex;
      align-items:center;
      height:64px;
      .history{
        width:100%;
        font-family:Noto Sans CJK KR, Regular;
        font-size:17px;
        text-align:center;
      }
    }
    .hrLine{
      width:100%;
      height:2px;
      background-color:#afafaf;
    }
    .hrLineBottom{
      width:100%;
      height:2px;
      background-color:#efefef;
    }
  }
  .pagenation{
    width:100%;
    display:flex;
    margin-top:46px;
    justify-content:center;
  }
`

const Won = N => N.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

class Point extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      point: null,
      tab: 0,
      page: 0,
      flag: 5,
      paymentType: 0,
    }
    this.PointUp = this.PointUp.bind(this);
    this.pointChange = this.pointChange.bind(this);
    this.PointToMoney = this.PointToMoney.bind(this);
    this.onChangePoint = this.onChangePoint.bind(this);
    this.onClickedPlusPointToMoney = this.onClickedPlusPointToMoney.bind(this);
    this.onClickedMinusPointToMoney = this.onClickedMinusPointToMoney.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.getLoadData = this.getLoadData.bind(this);
  }

  getLoadData = async () => {
    console.log(this.state.page);
    this.props.GetHistoryRequest(this.props.userInfo.uid, this.state.page, this.props.token);
  }
  goNext = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.getLoadData();
  };
  goPrev = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.getLoadData();
  }
  goPage = async (pagenum) => {
    await this.setState({ page: pagenum });
    this.getLoadData();
  };
  async getPriceValue(value) {
    await this.setState({ point: value });
  }
  pointChange(event) {
    console.log(event.target.value);
    this.setState({ point: event.target.value });
  }
  PointUp = (type) => {
    this.props.PointUpRequest(
      { id: this.props.userInfo.uid, token: this.props.token },
      { point: 1000, type: type }
    ).then(async () => {
      this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
      this.props.GetHistoryRequest(this.props.userInfo.uid, 0, this.props.token);
      // await alert("현금 전환이 완료되었습니다.");
    })
  };
  async PointToMoney(type) {
    console.log(this.props.Point, this.state.point);
    if (this.props.Point < parseInt(this.state.point, 10) * 1000) {
      await alert("금액이 부족합니다.");
      return;
    }
    if (this.state.point === 0) {
      await alert("현금으로 전환하고자 하는 금액이 0원입니다. 전환하고자하는 금액을 지정해주세요.");
      return;
    }
    this.props.PointUpRequest(
      { id: this.props.userInfo.uid, token: this.props.token },
      { point: this.state.point * -1 * 1000, type: type }
    ).then(() => {
      this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
      this.props.GetHistoryRequest(this.props.userInfo.uid, 0, this.props.token);
    }).then(() => {
      // alert("현금 전환이 완료되었습니다!");
      this.setState({ point: 0 });
    })
  }
  async onChangePoint(event) {
    await this.setState({
      point: event.target.value,
    });
  }
  async onClickedPlusPointToMoney() {
    const { Point } = this.props;
    Point >= 1000 * (this.state.point + 1) ? this.setState({ point: this.state.point + 1 }) : await alert("현금화하실 포인트가 없습니다.");
  }
  onClickedMinusPointToMoney() {
    this.state.point > 0 ? this.setState({ point: this.state.point - 1 }) : this.setState({ point: 0 })
  }
  render() {
    const { Point, History, HistoryCount } = this.props;
    const { page } = this.state;
    const lastPage = parseInt(HistoryCount / 5, 10);
    let pagecount = 0;
    return (<Wrapper>
      <PointContainer>
        <div className="title"> 내 포인트 관리</div>
        <div className="tabBox">
          {this.state.tab == 0 ?
            <React.Fragment>
              <div onClick={() => this.setState({ tab: 0 })} className="text_black margin_left margin_right">포인트 충전</div>
              <div className="text_light_grey margin_right" />
              <div onClick={() => this.setState({ tab: 1 })} className="text_grey margin_right">현금 전환</div>
              <div className="text_light_grey margin_right" />
              <div onClick={() => this.setState({ tab: 2 })} className="text_grey">충전 내역</div>
            </React.Fragment>
            :
            this.state.tab == 1 ?
              <React.Fragment>
                <div onClick={() => this.setState({ tab: 0 })} className="text_grey margin_left margin_right">포인트 충전</div>
                <div className="text_light_grey margin_right" />
                <div onClick={() => this.setState({ tab: 1 })} className="text_black margin_right">현금 전환</div>
                <div className="text_light_grey margin_right" />
                <div onClick={() => this.setState({ tab: 2 })} className="text_grey">충전 내역</div>
              </React.Fragment>
              :
              <React.Fragment>
                <div onClick={() => this.setState({ tab: 0 })} className="text_grey margin_left margin_right">포인트 충전</div>
                <div className="text_light_grey margin_right" />
                <div onClick={() => this.setState({ tab: 1 })} className="text_grey margin_right">현금 전환</div>
                <div className="text_light_grey margin_right" />
                <div onClick={() => this.setState({ tab: 2 })} className="text_black">충전 내역</div>
              </React.Fragment>
          }
        </div>
        {
          this.state.tab == 0 ?
            <React.Fragment>
              <PaymentBox>
                <div className="hrLine" />
                <div className="mypoint">보유 포인트 : {Won(Point || 0)}</div>
                <div className="inputprice">
                  <div className="input_title">결제 금액</div><div className="input_flag" />
                  <div><InputPriceNew name="price" getValue={this.getPriceValue} /></div>
                </div>
                <div className="addPrice">
                  <div className="input_title">충전 수단</div><div className="input_flag" />
                  <div>
                    <div onClick={() => this.setState({ paymentType: 0 })} className={`buttonIcon ${this.state.paymentType == 0 ? "redbtn" : "defaultbtn"}`}>현금 결제</div>
                    <div onClick={() => this.setState({ paymentType: 1 })} className={`buttonIcon ${this.state.paymentType == 1 ? "redbtn" : "defaultbtn"}`}>신용카드 결제</div>
                    <div onClick={() => this.setState({ paymentType: 2 })} className={`buttonIcon ${this.state.paymentType == 2 ? "redbtn" : "defaultbtn"}`}>간편 결제</div>
                  </div>
                  <div></div>
                </div>
                <div className="hrLine" />
                <div className="addPrice align_right">
                  <div onClick={() => this.PointUp("CLICK")} className="button_red">결제하기</div>
                </div>
              </PaymentBox>
            </React.Fragment>
            :
            this.state.tab == 1 ?
              <React.Fragment>
                <PaymentBox>
                  <div className="hrLine" />
                  <div className="mypoint">보유 포인트 : {Won(Point || 0)}</div>
                  <div className="inputprice margin_top">
                    <div className="input_title">전환 금액</div><div className="input_flag" />
                    <div><InputPriceNew name="price" getValue={this.getPriceValue} /></div>
                  </div>
                  <div className="hrLine" />
                  <div className="addPrice align_right">
                    <div onClick={() => this.PointToMoney("CLICK")} className="button_red">전환하기</div>
                  </div>
                </PaymentBox>
              </React.Fragment>
              :
              <PointListBox>
                <div className="content_box">
                  <div className="titleBox">
                    <div className="_title">날짜</div>
                    <div className="_title">결제 금액</div>
                    <div className="_title">결제 수단</div>
                  </div>
                  <div className="hrLine" />
                  {HistoryCount ? (
                    History.map(histo => {
                      pagecount++;
                      console.log(HistoryCount);
                      return (
                        // 5*page+1<=pagecount&&pagecount<=5*page+5?
                        <React.Fragment>
                          <div className="history_box" key={histo.uid + "history"}>
                            <div className="history">{
                              new Date(histo.create_time).getFullYear() + "."
                              + ((new Date(histo.create_time).getMonth() + 1) < 10 ? '0' + (new Date(histo.create_time).getMonth() + 1) : (new Date(histo.create_time).getMonth() + 1)) + "."
                              + (new Date(histo.create_time).getDate() < 10 ? '0' + new Date(histo.create_time).getDate() : new Date(histo.create_time).getDate())}</div>
                            <div className="history">{histo.point_variation}</div>
                            <div className="history">{histo.charge_type}</div>
                          </div>
                          <div className="hrLineBottom" />
                        </React.Fragment>
                      )
                    }
                    )) : (<div>포인트 충전 내역 없음</div>)}
                  {5 < HistoryCount ?
                    // <div onClick={this.goNext}>next</div> 
                    <div className="pagenation">
                      <Pagination
                        activePage={page + 1}
                        boundaryRange={0}
                        defaultActivePage={1}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={lastPage + 1}
                        // pointing
                        secondary
                        onPageChange={(event, { activePage }) => {
                          this.goPage(activePage - 1);
                        }}
                      />
                    </div>
                    : null}

                </div>
              </PointListBox>
        }
      </PointContainer>
    </Wrapper>)
  }
}
export default Point;



// <PointWrapper>
// <div className="text">사용가능한 금액:</div>
// <div className="unit">₩</div>
// <div className="point">{Won(Point || 0)}</div>
// </PointWrapper>

// <Title className="smaller">충전수단</Title>
// <Charge>
// <div className="item"><button onClick={() => this.PointUp("CLICK")} className="charge">클릭으로 충전!</button></div>
// <div className="item"><button onClick={() => alert("찬호가 안하고 입해했데요...")} className="charge not-yet">ㅇㅇㅇ으로 충전</button></div>
// <div className="item"><button onClick={() => alert("찬호가 안하고 입해했데요...")} className="charge not-yet">ㅇㅇㅇ으로 충전</button></div>
// </Charge>
// {
// (this.props.userInfo.isDesigner === 1 || this.props.userInfo.isMaker === 1) ?
//   <React.Fragment>
//     <Title className="smaller">현금전환</Title>
//     <Charge>
//       <div className="item flex">
//         {/* <FormStyle value={this.state.point} onChange={this.onChangePoint} type="number" /> */}
//         <FormStyle type="number" value={this.state.point} />
//         <Button onClick={this.onClickedPlusPointToMoney}>
//           <div className="text">+</div>
//         </Button>
//         <Button onClick={this.onClickedMinusPointToMoney}>
//           <div className="text">-</div>
//         </Button>
//         <Button onClick={() => this.PointToMoney("CLICK")}>
//           <div className="text">클릭으로 전환</div>
//         </Button>

//       </div>
//     </Charge>
//   </React.Fragment> : null
// }
// <Title className="smaller">충전내역</Title>
// <HistoryContainer>
// <div className="history-element">
//   <div>변동내역</div>
//   <div>날짜</div>
//   <div>결제수단</div>
// </div>
// {HistoryCount ? (
//   History.map(histo =>
//     <div className="history-element" key={histo.uid + "history"}>
//       <div>{histo.point_variation}</div>
//       <div>{DateFormat(histo.create_time)}</div>
//       <div>{histo.charge_type}</div>
//     </div>
//   )) : (<div>?????</div>)}
// </HistoryContainer>


