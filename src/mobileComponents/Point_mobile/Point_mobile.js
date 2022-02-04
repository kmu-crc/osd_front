import React, { Component } from 'react';
import styled from 'styled-components';
import DateFormat from "modules/DateFormat";
import { Pagination } from 'semantic-ui-react'
import { InputPriceNew } from "components/Commons/InputItem"
import { AddPoint } from "components/Commons/InputItem"
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";

import $ from "jquery";
import market_style from "market_style";

const Wrapper = styled.div`
  max-width:375px;
  width:100%;
  padding:0px 10px 10px 10px;
  .header{
    width:100%;
    font-size:${market_style.font.size.normal3};
    font-weight:800;
    color:#c1c1c1;
    text-align:center;
    margin-bottom:10px;
    margin-top:1px;
  }
  .row{width:100%;}
  .flex{display:flex;}
  .justifyCenter{justify-content:center;}
  .marginRight{margin-right:10px;}
  .marginBottom{margin-bottom:10px;}
  .marginBotton2{margin-bottom:20px;}

  .active{
    background-color:#FF3838;
    border:2px solid #FF3838;
    color:white;
  }
  .none{
    background-color:white;
    border:2px solid #c1c1c1;
    color:#c1c1c1;
  }
  .button{
    width:112px;
    height:35px;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:10px;
    box-shadow: 2px 2px 3px #00000019;
      font-size:${market_style.font.size.small1};
      font-weight:800;
  }
`
const NormalBox = styled.div`
  width:100%;
  margin-top:20px;
  .spaceBetween{
    display:flex;
    justify-content:space-between;
    align-items:center;
  }
  .tableRow{
    width:100%;
    height:42px;
    border-bottom:1px solid #E9E9E9;
    display:flex;
    .textLeft{text-align:left;}
    .textRight{text-align:right;}
    .textCenter{text-align:center;}
    .paddingRight1{padding-right:14px;}
    .paddingRight2{padding-right:10px;}
    .head{
      width:33.3%;
      font-size:${market_style.font.size.mini2};
      font-weight:500;
      color:black;
    }
    .piece{
      width:33.3%;
      font-size:${market_style.font.size.small1};
      color:black;
    }
  }
  .pagenation{
    width:100%;
    display:flex;
    margin-top:10px;
    justify-content:center;
  }
`
const ShadowBox = styled.div`
  width:100%;
  max-width:355px;
  border-radius:10px;
  box-shadow: 2px 2px 5px #00000029;
  border:1px solid #eaeaea;
  padding:20px 10px;
  .row{width:100%;}
  .flex{display:flex;}
  .hCenter{justify-content:center;}
  .vCenter{align-items:center;}
  .mypoint{
    font-size:${market_style.font.size.small1};
    color:#FF3838;
  }

  .label{
    width:89px;
    height:25px;
    border-right:2px solid #707070;
    display:flex;
    align-items:center;
    color:black;
    font-weight:500;
    font-size:${market_style.font.size.small1};
    margin-right:30px;
  }
  .addPointBtn{
    width:59px;
    height:35px;
    border-radius:5px;
    border:1px solid #707070;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .payButton{
    width:150px;
    height:35px;
    border-radius:20px;
    background-color:#707070;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .payActive{
    background-color:#FF3838;
    color:white;
  }
`
const InputText = styled.input`
  width:150px;
  height:25px;
  background-color:#e9e9e9;
  border:none;
  outline:none;
  text-align:center;
  border-radius:22px;
  
`
const RedButton = styled.div`
  width:${props=>props.width==null?"100%":props.width+"%"};
  height:35px;
  display:flex;
  border-radius:10px;
  border:${props=>props.isRed==true?null:"2px solid #FF3838"};
  box-shadow: 2px 2px 3px #00000019;
  justify-content:center;
  align-items:center;
  background-color:${props=>props.isRed==true?"#FF3838":"white"};
  color:${props=>props.isRed==true?"white":"#FF3838"};
  font-size:${market_style.font.size.small1};
  font-weight:800;
  margin-top:20px;
  margin-right:${props=>props.marginRight==null?"0px":props.marginRight+"%"};
`
const Won = N => N.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

class Point_mobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add:0,
      price: 0,
      point: null,
      tab: 0,
      page: 0,
      flag: 5,
      paymentType: 0,
    }
    this.PointUp = this.PointUp.bind(this);
    this.callback = this.callback.bind(this);
    this.pointChange = this.pointChange.bind(this);
    this.PointToMoney = this.PointToMoney.bind(this);
    this.onChangePoint = this.onChangePoint.bind(this);
    this.onClickedPlusPointToMoney = this.onClickedPlusPointToMoney.bind(this);
    this.onClickedMinusPointToMoney = this.onClickedMinusPointToMoney.bind(this);
    this.getPriceValue = this.getPriceValue.bind(this);
    this.getLoadData = this.getLoadData.bind(this);
  }


getLoadData=async()=>{
  console.log(this.state.page);
  this.props.GetHistoryRequest(this.props.userInfo.uid,this.state.page, this.props.token);
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
  await this.setState({ page:pagenum });
  this.getLoadData();
};
async getPriceValue(value) {
  await this.setState({ point: value });
}
pointChange(event){
    console.log(event.target.value);
    this.setState({point:event.target.value});
}
callback =(rsp,type)=>{
    if ( rsp.success ) {
      let msg = '결제가 완료되었습니다.';
      msg += '고유ID : ' + rsp.imp_uid;
      msg += '상점 거래ID : ' + rsp.merchant_uid;
      msg += '결제 금액 : ' + rsp.paid_amount;
      msg += '카드 승인번호 : ' + rsp.apply_num;
      this.props.PointUpRequest(
      { id: this.props.userInfo.uid, token: this.props.token },
      { point: 1000, type: type }
    ).then(async () => {
      this.props.GetMyPointRequest(this.props.userInfo.uid, this.props.token);
      this.props.GetHistoryRequest(this.props.userInfo.uid, 0, this.props.token);
      // await alert("현금 전환이 완료되었습니다.");
    })
  } else {
      var msg = '결제에 실패하였습니다.';
      msg += '에러내용 : ' + rsp.error_msg;
      alert(msg);
  }
  // alert(msg);
}
PointUp = async(type) => {
    const {IMP} = window;
    const pointMoney = this.state.add;
    if(window.innerWidth<500){
            await IMP.request_pay({
              pg : 'html5_inicis', // version 1.1.0부터 지원.
              pay_method : 'card',
              merchant_uid : 'merchant_' + new Date().getTime(),
              name : '주문명:결제테스트',
              amount : pointMoney,
              buyer_email : 'iana6528@gmail.com',
              buyer_name : '구매자이름',
              buyer_tel : '010-1234-5678',
              buyer_addr : '서울특별시 강남구 삼성동',
              buyer_postcode : '123-456',
              m_redirect_url : 'http://localhost:3000/mypage'
          }, (rsp)=>this.callback(rsp,type));
    }else{
        await IMP.request_pay({
          pg : 'html5_inicis', // version 1.1.0부터 지원.
          pay_method : 'card',
          merchant_uid : 'merchant_' + new Date().getTime(),
          name : '주문명:결제테스트',
          amount : pointMoney,
          buyer_email : 'iana6528@gmail.com',
          buyer_name : '구매자이름',
          buyer_tel : '010-1234-5678',
          buyer_addr : '서울특별시 강남구 삼성동',
          buyer_postcode : '123-456',
          m_redirect_url : 'http://localhost:3000/mypage'
      }, (rsp)=>this.callback(rsp,type));
    }
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
      { point: this.state.point * -1 , type: type }
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
    const lastPage = parseInt(HistoryCount / 12, 10);
    let pagecount=0;
    
    //---------------------------결제관련-----------------------------------
      const {IMP} = window;
      IMP.init(`imp21280997`);
      console.log(IMP);

    //--------------------------------------------------------------------
    
    return(
      <React.Fragment>
      <Wrapper>
        <div className="header">내 포인트 관리</div>
        <div className="row flex justifyCenter marginBottom">
          <div className={`button marginRight ${this.state.tab==0?'active':'none'}`} onClick={()=>this.setState({tab:0})}>포인트 충전</div>
          <div className={`button marginRight ${this.state.tab==1?'active':'none'}`} onClick={()=>this.setState({tab:1})}>현금 전환</div>
          <div className={`button ${this.state.tab==2?'active':'none'}`} onClick={()=>this.setState({tab:2})}>충전 내역</div>
        </div>
        <div className="row ">
        {
        this.state.tab ==0?
        <React.Fragment>
        <ShadowBox>
          <div className="mypoint flex hCenter marginBotton2">보유 표인트 : {Won(Point || 0)} p</div>
          <div className="row flex hCenter marginBotton2">
               <div className="label">충전 금액</div>
               <InputText value={this.state.add} onChange={(event)=>this.setState({add:event.target.value})}/>
          </div>
          <div className="row flex hCenter marginBotton2">
               <div className="addPointBtn marginRight" onClick={()=>this.setState({add:this.state.add+1000})}>+1천</div>
               <div className="addPointBtn marginRight" onClick={()=>this.setState({add:this.state.add+10000})}>+1만</div>
               <div className="addPointBtn marginRight" onClick={()=>this.setState({add:this.state.add+50000})}>+5만</div>
               <div className="addPointBtn marginRight" onClick={()=>this.setState({add:this.state.add+100000})}>+10만</div>
               <div className="addPointBtn marginRight" onClick={()=>this.setState({add:this.state.add+1000000})}>+100만</div>
          </div>
          <div className="row flex hCenter">
               <div className="label">충전 금액</div>
               <div>
                    <div className={`payButton marginBottom ${this.state.paymentType == 0 ?"payActive":null}`} onClick={()=>this.setState({paymentType:0})}>현금 결제</div>
                    <div className={`payButton marginBottom ${this.state.paymentType == 1 ?"payActive":null}`} onClick={()=>this.setState({paymentType:1})}>신용카드 결제</div>
                    <div className={`payButton ${this.state.paymentType == 2 ?"payActive":null}`} onClick={()=>this.setState({paymentType:2})}>간편 결제</div>
               </div>
          </div>
        </ShadowBox>
        <RedButton isRed={true} onClick={() => this.PointUp("CLICK")}>결제하기</RedButton>
        </React.Fragment>
        :null
        }
                {
        this.state.tab ==1?
        <React.Fragment>
        <ShadowBox>
          <div className="mypoint flex hCenter marginBotton2">보유 표인트 : {Won(Point || 0)} p</div>
          <div className="row flex hCenter marginBotton2">
               <div className="label">전환 금액</div>
               <InputText value={this.state.price} onChange={(event)=>this.setState({price:event.target.value})}/>
          </div>
          <div className="row flex hCenter marginBotton2">
               <div className="addPointBtn marginRight" onClick={()=>this.setState({price:this.state.add+1000})}>+1천</div>
               <div className="addPointBtn marginRight" onClick={()=>this.setState({price:this.state.add+10000})}>+1만</div>
               <div className="addPointBtn marginRight" onClick={()=>this.setState({price:this.state.add+50000})}>+5만</div>
               <div className="addPointBtn marginRight" onClick={()=>this.setState({price:this.state.add+100000})}>+10만</div>
               <div className="addPointBtn marginRight" onClick={()=>this.setState({price:this.state.add+1000000})}>+100만</div>
          </div>
        </ShadowBox>
        <RedButton isRed={true} onClick={() => this.PointToMoney("CLICK")}>전환하기</RedButton>
        </React.Fragment>
        :null
        }
        {
          this.state.tab==2?
          <React.Fragment>
            <NormalBox>
              <div className="tableRow spaceBetween">
                <div className="head textCenter">날짜</div>
                <div className="head textCenter">결제 금액</div>
                <div className="head textRight paddingRight1">결제 수단</div>
              </div>
              {HistoryCount?
               History.map(histo=>{
                 pagecount++;
                 return(
                   <React.Fragment>
                    <div className="tableRow spaceBetween">
                      <div className="piece textCenter">{
                        new Date(histo.create_time).getFullYear() + "."
                        + ((new Date(histo.create_time).getMonth() + 1) < 10 ? '0' + (new Date(histo.create_time).getMonth() + 1) : (new Date(histo.create_time).getMonth() + 1)) + "."
                        + (new Date(histo.create_time).getDate() < 10 ? '0' + new Date(histo.create_time).getDate() : new Date(histo.create_time).getDate())
                      }</div>
                      <div className="piece textCenter">{histo.point_variation}</div>
                      <div className="piece textRight paddingRight1">{histo.charge_type}</div>
                    </div>
                   </React.Fragment>
                 )
               })
               :
               <div>포인트 충전 내역 없음</div>
              }
              {12 < HistoryCount ?
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
            </NormalBox>
          </React.Fragment>
          :
          null
        }
        </div>
      </Wrapper>
      </React.Fragment>
    )
  }
}
export default Point_mobile;


