import React, { Component } from "react";
import styled from 'styled-components';
import noimg from "source/noimg.png";
// import StyleGuide from "StyleGuide";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const Wrapper = styled.div`
    width:100%;
    padding:0px 10px;
    margin-top:20px;
    .row{
        width:100%;
      }
      .padding{padding-left:10px;padding-right:10px;}
      .paddingNormal{padding:5px 10px;}
      .marginTop1{margin-top:5px;}
      .marginTop2{margin-top:10px;}
      .marginTop3{margin-top:20px;}
      .marginTop4{margin-top:30px;}
      .marginTop5{margin-top:40px;}
      .marginTop4half{margin-top:15px;}
      .marginRight1{margin-right:30px;}
      .fontBig{font-size:${market_style.font.size.small1};font-weight:800;}
      .fontNormal{font-size:${market_style.font.size.small1};font-weight:400;}
      .fontSlim{font-size:${market_style.font.size.small1};font-weight:200;}
      .fontSmall{font-size:${market_style.font.size.mini2};font-weight:400;}
      .black{color:black;}
      .flex{display:flex;}
      .flexWrap{flex-wrap:wrap;}
      .justifyCenter{justify-content:center;}
      .spaceBetween{justify-content:space-between;}
      .flexEnd{justify-content:flex-end;}
      .column{flex-direction:column;}
      .textRight{text-align:right;}
      .ellipsis{width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
      .colorGrey{color:#707070;}
      .colorRed{color:#FF3838;}
      .colorBlack{color:black;}
      .thumbnail{
        min-width:152px;
        min-height:140px;
        background-image:url(${props=>props.image==null?noimg:props.image});
        background-size:cover;
        margin-right:10px;
    }
    .greyButton{
        width:100%;
        height:35px;
        border-radius:10px;
        background-color:#707070;
        display:flex;
        justify-content:center;
        align-items:center;
        color:white;
    }
    .hrline{border:1px solid #EFEFEF;}
`
const Button = styled.div`
    width:205px;
    height:35px;
    background-color:${props=>props.select==false?"#E9E9E9":"red"};
    color:${props=>props.select==false?"black":"white"};
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:20px;
    margin-bottom:10px;
`
class Payment_mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Method: [{ type: "Point", text: "현금 충전" }, { type: "Credit", text: "신용카드" }, { type: "Bank", text: "계좌이체" }, { type: "BankDeposit", text: "무통장입금" }],
            selected_method: 0,
            discount: 0,
            unit: "point",
        }
        this.selectMethod = this.selectMethod.bind(this);
        this.gotoChargePoint = this.gotoChargePoint.bind(this);
        this.purchaseThisItem = this.purchaseThisItem.bind(this);
    }
    async selectMethod(index) {
        if (index !== 0)
            await alert("준비중입니다. 현금 충전 후 결제해주세요.");
    }
    async gotoChargePoint() {
        if (await confirm("충전 금액이 부족합니다. 충전하러 이동하시겠습니까?")) {
            window.location.href = `/mypage/10`;
        }
    }
    purchaseThisItem(total) {
        this.props.purchase(this.props.item);
    }
    render() {
        console.log(this.props);
        const { item, options, Point } = this.props;
        const { selected_method, unit, discount, Method } = this.state;
        const total = item.price * 1 - discount;

        return (
        <React.Fragment>
            <Wrapper image={(item.thumbnail && item.thumbnail.l_img) || noimg}>
                <div className="row flex padding">
                    <div className="thumbnail"/>
                    <div>
                        <div className="fontBig">{item.title}</div>
                        <div className="fontNormal marginTop2">{item.price/(item.price>9999?10000:1)|| 0}{item.price>9999?"만":""}{unit}</div>
                    </div>
                </div>
                <div className="hrline row marginTop3"/>
                <div className="row marginTop3">
                    <div className="fontBig">결제 예상 금액</div>
                    <div className="row flex marginTop4">
                        <div className="colorGrey fontNormal marginRight1">상품 금액</div>
                        <div className="colorBlack fontNormal">{item.price/(item.price>9999?10000:1)|| 0}{item.price>9999?"만":""}{unit}</div>
                    </div>
                    {/* <div className="row flex marginTop4half">
                        <div className="colorGrey fontNormal marginRight1">배송비</div>
                        <div className="colorBlack fontNormal">0{unit}</div>
                    </div> */}
                </div>
                <div className="row marginTop5 flex">
                   <div className="fontBig marginRight1">결제 정보&nbsp;&nbsp;&nbsp;|</div>
                   <div>
                   {Method.map((item, index) =>
                            <div key={index} onClick={() => this.selectMethod(index)} className="row_content">
                                <Button width={180} height={50} marginBottom={15} fontSize={18}
                                    select={selected_method === index ? true : false}><div>{item.text}</div></Button>
                            </div>
                        )}
                       {/* <Button select={false}>현금 충전</Button>
                       <Button select={false}>신용카드</Button>
                       <Button select={false}>계좌이체</Button>
                       <Button select={false}>무통장입금</Button> */}
                   </div>
                </div>
                <div 
                            onClick={() => {console.log(total,Point,total>Point)
                                total > Point ? this.gotoChargePoint() : this.purchaseThisItem(total)}
                            }className="greyButton marginTop5">결제하기</div>
            </Wrapper>
        </React.Fragment>
        );
    }
} export default Payment_mobile;

{/* <MainBox>
<div className="contentsBox">
    <HeaderBox>
        <div className="wrapper_">
            <Thumbnail width={162} height={150} URL={(item.thumbnail && item.thumbnail.l_img) || noimg} />
            <div className="title">
                <div className="name">{item.title}</div>
                <div className="price">{item.price/(item.price>9999?10000:1)|| 0}{item.price>9999?"만":""}{unit}</div>
        </div>
        </div>
    </HeaderBox>
    <CustomBox height={3} color={'#E9E9E9'} marginTop={20} />
    <InfoBox marginTop={20}>
        <div className="title_label">결제 예상 금액</div>
        <div className="contents">
            <div className="row_Box">
                <Row>
                    <div className="row_label">상품 금액</div>
                    <div className="row_content font_small">{item.price/(item.price>9999?10000:1)|| 0}{item.price>9999?"만":""}{unit}</div>
                </Row>
                <Row>
                    <div className="row_label">배송비</div>
                    <div className="row_content font_small">0{unit}</div>
                </Row>
            </div>
        </div>
            <div className="sub_Box border_gray_left">
                <div className="font_mini" >total</div>
                <div className="font_big">{item.price/(item.price>9999?10000:1)|| 0}{item.price>9999?"만":""}{unit}</div>
            </div>
    </InfoBox>
    <InfoBox marginTop={50}>
        <div className="title_label">결제 정보</div>
        <div className="contents">
            {Method.map((item, index) =>
                <div key={index} onClick={() => this.selectMethod(index)} className="row_content">
                    <CustomButton width={180} height={50} marginBottom={15} fontSize={18}
                        className={selected_method === index ? 'selected' : ''}><div>{item.text}</div></CustomButton>
                </div>
            )}
        </div>
    </InfoBox>
    <div className="payment_button_Box">
        <CustomButton
            width={150} height={30} fontSize={15} radius={0}
            backgroundColor={'#ff0000'} fontColor={"white"}
            onClick={() => {console.log(total,Point,total>Point)
                total > Point ? this.gotoChargePoint() : this.purchaseThisItem(total)}
            }
        ><div>결제</div></CustomButton>
    </div>
</div>
</MainBox> */}