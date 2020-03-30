import React, { Component } from "react";
import styled from 'styled-components';
import noimg from "source/noimg.png";
// import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
// import mainSlide from "source/mainSlide.jpg";
import NumberFormat from "modules/NumberFormat";
// import {confirmAlert} from "react-confirm-alert";
// import {options,optionsAlter} from "components/Commons/InputItem/AlertConfirm"

//const ImgWrapper = styled.div`
//  background-image: url(${mainSlide});
//  background-position: center;
//  background-size: cover;
//  width: 100%;
//  height: 200px;
//  position: relative;
//  &::after {
//    position: absolute;
//    top: 0;
//    left: 0;
//    display: block;
//    content: "";
//    width: 100%;
//    height: 100%;
//    background-color: rgba(0, 0, 0, 0.6);
//    z-index: 1;
//  }
//`;
//const Title = styled.div`
//  width: 100%;
//  color: white;
//  position: absolute;
//  text-align: center;
//  top: 40%;
//  left: 0;
//  z-index: 2;
//  transform: translateY(-50%);
//  h1 {
//    color: ${StyleGuide.color.geyScale.scale0};
//    font-size: ${StyleGuide.font.size.heading2};
//    font-weight: bold;
//  }
//`;
const Wrapper = styled(ContentBox)`
  width:100%;
  margin-top:60px;
  margin-bottom: 100px;
  position: relative;
  z-index:3;
`;
const MainBox = styled.div`
    *{
        font-family:Noto Sans KR;
        font-size:20px;
    }
    width:100%;
    display:flex;
    justify-content:center;

    .contentsBox{
        width:1443px;
        position:relative;
        .payment_button_Box{
            width:max-content;
            height:max-content;
            position:absolute;
            right:0px;
            bottom:0px;
        }
    }

`;
const HeaderBox = styled.div`
    *{
        font-family:Noto Sans KR;
        font-size:15px;
        font-weight:500;
        color:#000000;
    }
    width:100%;
    height:93px;
     display:flex;
    .thumbnail{
        width:197px;
        height:100%;
    }
    .title{
        width:794px;
        height:100%;
        padding-left:50px;
        .name{
            font-family:Noto Sans KR;
            font-size:20px;
            font-weight:500;
            color:#060000;
            margin-bottom:24px;
        }
        .option{
            font-family:Noto Sans KR;
            font-size:17px;
            font-weight:300;
            color:#707070;
        }
    }
    .amount{
        width:180px;
        height:100%;
        display:flex;
        align-items:center;
    }
    .price{
        width:183px;
        height:100%;
        display:flex;
        align-items:center;
    }
    .delivery{
        width:174px;
        height:100%;
        display:flex;
        align-items:center;
    }
`;
const InfoBox = styled.div`
    width:100%;
    margin-top:${props => props.marginTop == null ? 0 : props.marginTop}px;
    margin-left:${props => props.marginLeft == null ? 0 : props.marginLeft}px;
    display:flex;

    .title_label{
        min-width:138px;
        height:100%;
        font-family:Noto Sans KR;
        font-size:20px;
        font-weight:500;
    }
    .contents{
        width:100%;
        .row_Box{
            width:1008px;
        }
        .sub_Box{
            width:136px;
            height:78px;
            .font_mini{
                font-size:15px;
                margin-bottom:14px;
            }
            .font_big{
                font-size:25px;
                font-weight:500;
            }
        }
    }
    .flex_center{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .border_gray_left{
        border-left:3px solid #E9E9E9;
    }
    .paddingTop{
        padding-top:37px;
    }
`;
const Row = styled.div`
    *{
        font-family:Noto Sans KR;
        font-size:20px;
    }
    width:100%;
    display:flex;
    margin-bottom:15px;

    .row_label{
        min-width:154px;
        height:29px;
        display:flex;
        align-items:center;
    }
    .row_content{
        width:100%;
        display:flex;
    }
    .marginBottom{
        margin-bottom:15px;
    }
    .font_small{
        font-size:15px;
        color:#707070;
    }
`;
const Thumbnail = styled.div`
    width:${props => props.width == null ? 100 : props.width}px;
    height:${props => props.height == null ? 100 : props.height}px;
    background-image:url(${props => props.URL == null ? noimg : props.URL});
    background-size:cover;
    background-position:center center;
    margin-top:${props => props.marginTop == null ? 0 : props.marginTop}px;
    margin-left:${props => props.marginLeft == null ? 0 : props.marginLeft}px;
`;
//const InputText = styled.input.attrs({ type: "text" })`
//    width:${props => props.width == null ? 100 : props.width}px;
//    height:${props => props.height == null ? 100 : props.height}px;
//    background-color:${props => props.backgroundColor == null ? "#E9E9E9" : props.backgroundColor};
//    margin-top:${props => props.marginTop == null ? 0 : props.marginTop}px;
//    margin-left:${props => props.marginLeft == null ? 0 : props.marginLeft}px;
//    margin-bottom:${props => props.marginBottom == null ? 0 : props.marginBottom}px;
//    margin-right:${props => props.marginRight == null ? 0 : props.marginRight}px;
//    outline:none;
//    border:none;
//`;
//const InputTextarea = styled.textarea`
//    width:${props => props.width == null ? 100 : props.width}px;
//    height:${props => props.height == null ? 100 : props.height}px;
//    background-color:${props => props.backgroundColor == null ? "#E9E9E9" : props.backgroundColor};
//    margin-top:${props => props.marginTop == null ? 0 : props.marginTop}px;
//    margin-left:${props => props.marginLeft == null ? 0 : props.marginLeft}px;
//    margin-bottom:${props => props.marginBottom == null ? 0 : props.marginBottom}px;
//    margin-right:${props => props.marginRight == null ? 0 : props.marginRight}px;
//    outline:none;
//    border:none;
//`;
const CustomBox = styled.div`
    width:${props => props.width == null ? 100 : props.width}px;
    height:${props => props.height == null ? 100 : props.height}px;
    background-color:${props => props.color == null ? "#111111" : props.color};
    margin-top:${props => props.marginTop == null ? 0 : props.marginTop}px;
    margin-left:${props => props.marginLeft == null ? 0 : props.marginLeft}px;
    
`;
const CustomButton = styled.div`
    width:${props => props.width == null ? 100 : props.width}px;
    height:${props => props.height == null ? 100 : props.height}px;
    background-color:${props => props.backgroundColor == null ? "#E9E9E9" : props.backgroundColor};
    margin-top:${props => props.marginTop == null ? 0 : props.marginTop}px;
    margin-left:${props => props.marginLeft == null ? 0 : props.marginLeft}px;
    margin-bottom:${props => props.marginBottom == null ? 0 : props.marginBottom}px;
    margin-right:${props => props.marginRight == null ? 0 : props.marginRight}px;

    font-size:${props => props.fontSize == null ? 0 : props.fontSize}px;
    color:${props => props.fontColor == null ? "black" : props.fontColor};

    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    &.selected {
        background-color: #FFA9A9;
        color: white;
    }
`;

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Method: [{ type: "Point", text: "현금 충전" }, { type: "Credit", text: "신용카드" }, { type: "Bank", text: "계좌이체" }, { type: "BankDeposit", text: "무통장입금" }],
            selected_method: 0,
            discount: 0,
            unit: "포인트",
        }
        this.selectMethod = this.selectMethod.bind(this);
        this.gotoChargePoint = this.gotoChargePoint.bind(this);
        this.purchaseThisItem = this.purchaseThisItem.bind(this);
    }
    selectMethod(index) {
        if (index !== 0)
            alert("준비중입니다. 현금 충전 후 결제해주세요.");
    }
    gotoChargePoint() {
        if (window.confirm("충전 금액이 부족합니다. 충전하러 이동하시겠습니까?")) {
            window.location.href = `/point`;
        }
    }
    purchaseThisItem(total) {
        this.props.purchase(this.props.item, { ...this.props.options, total: total });
    }
    render() {
        console.log(this.props);
        const { item, options, Point } = this.props;
        const { selected_method, unit, discount, Method } = this.state;
        const total = item.price * 1 - discount;

        return (
            <Wrapper>
                {/* {this.state.loading && <Loading/>} */}
                <MainBox>
                    <div className="contentsBox">
                        <HeaderBox>
                            <div className="thumbnail">
                                <Thumbnail width={112} height={93} URL={(item.thumbnail && item.thumbnail.l_img) || noimg} marginLeft={85} />
                            </div>
                            <div className="title">
                                <div className="name">{item.title}</div>
                                <div className="option">{(options && "[옵션]" + options.test) || ""}</div>
                            </div>
                            <div className="amount"><div>{(options && options.amount) || "1"}</div></div>
                            <div className="price"><div>{NumberFormat(item.price) || 0}{unit}</div></div>
                            <div className="delivery"><div>{(options && options.delivery) || ""}</div></div>
                        </HeaderBox>
                        <CustomBox width={1443} height={3} color={'#E9E9E9'} marginTop={65} />
                        <InfoBox width={1433} marginTop={28}>
                            <div className="title_label">결제 예상 금액</div>
                            <div className="contents paddingTop">
                                <div className="row_Box">
                                    <Row>
                                        <div className="row_label">상품 금액</div>
                                        <div className="row_content font_small">{NumberFormat(item.price)}{unit}</div>
                                    </Row>
                                    <Row>
                                        <div className="row_label">배송비</div>
                                        <div className="row_content font_small">0{unit}</div>
                                    </Row>
                                    <Row>
                                        <div className="row_label">할인</div>
                                        <div className="row_content font_small">(-){discount}{unit}</div>
                                    </Row>
                                </div>
                            </div>
                            <div className="contents flex_center border_gray_left">
                                <div className="sub_Box">
                                    <div className="font_mini" >total</div>
                                    <div className="font_big">{NumberFormat(total)}{unit}</div>
                                </div>
                            </div>
                        </InfoBox>

                        {/* <InfoBox width={1433} marginTop={75}>
                                <div className="title_label">배송 정보</div>
                                <div className="contents paddingTop">
                                    <div className="row_Box">
                                        <Row>
                                            <div className="row_label"><div>이름</div></div>
                                            <InputText width={123} height={38} backgroundColor={'#E9E9E9'} />
                                        </Row>
                                        <Row>
                                            <div className="row_label">연락처</div>
                                            <InputText width={82} height={38} marginRight={5} backgroundColor={'#E9E9E9'} />
                                            <InputText width={82} height={38} marginRight={5} backgroundColor={'#E9E9E9'} />
                                            <InputText width={82} height={38} marginRight={5} backgroundColor={'#E9E9E9'} />
                                        </Row>
                                        <Row>
                                            <div className="row_label">배송지</div>
                                            <div>
                                                <div className="row_content marginBottom">
                                                    <InputText width={163} height={38} backgroundColor={'#E9E9E9'} />
                                                    <CustomButton width={100} height={22} marginLeft={14} fontSize={15}>우편번호 찾기</CustomButton>
                                                </div>
                                                <div className="row_content">
                                                    <InputText width={339} height={38} marginRight={5} backgroundColor={'#E9E9E9'} />
                                                    <InputText width={438} height={38} backgroundColor={'#E9E9E9'} />
                                                </div>
                                            </div>
                                        </Row>
                                        <Row>
                                            <div className="row_label">기타 요청사항</div>
                                            <InputTextarea width={455} height={79} backgroundColor={'#E9E9E9'} />
                                        </Row>
                                    </div>
                                </div>
                            </InfoBox> */}

                        <InfoBox width={1433} marginTop={75}>
                            <div className="title_label">결제 정보</div>
                            <div className="contents">
                                {Method.map((item, index) =>
                                    <div key={index} onClick={() => this.selectMethod(index)} className="row_content">
                                        <CustomButton width={276} height={81} marginBottom={32} fontSize={20}
                                            className={selected_method === index ? 'selected' : ''}><div>{item.text}</div></CustomButton>
                                    </div>
                                )}
                            </div>
                        </InfoBox>
                        <div className="payment_button_Box">
                            <CustomButton
                                width={290} height={70} fontSize={20}
                                fontColor={total > Point ? 'black' : 'white'}
                                backgroundColor={total > Point ? '#E9E9E9' : '#ff0000'}
                                onClick={() => total > Point ? this.gotoChargePoint() : this.purchaseThisItem(total)}
                            ><div>결제</div></CustomButton>
                        </div>
                    </div>
                </MainBox>
            </Wrapper>
        );
    }
} export default Payment;

// import React, { Component } from "react";
// import styled from 'styled-components';
// import DeliverySection from 'components/Payment/Common/Delivery/DeliverySection'
// // import AddInfoSection from 'components/Payment/Common/AddInformation/AddInfoSection'
// import OrderSection from 'components/Payment/Common/Order/OrderSection'
// import PaySection from 'components/Payment/Pay/PaySection'
// import Button from "components/Commons/Button";

// const MainBox = styled.div`
//     *{
//         font-family:Noto Sans KR;
//     }
//     width: 100%;
//     background-color: white;
//     box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
//     padding-left: 90px;
//     padding-top:90px;
//     margin-bottom: 30px;
//     border-radius: 3px;

//     .title_box{
//         width:100%;
//         display:flex;
//         justify-content:center;
//         .title_label{
//             font-size:30pt;
//             font-weight:1000;
//             padding:20px;

//         }
//     }
//     .contents_box{
//         width:100%;
//         display:flex;
//         .payment_box{
//             width:70%;
//             min-width:480px;
//             .payment_content_box{
//                 width:100%;
//                 padding:15px;
//                 padding-left:20px;
//                 display:flex;
//                 justify-content:flex-end;
//             }         
//         }
//     }
// `
// const FormCheckbox = styled.input.attrs({type:'checkbox'})`
//   width:20px !important;
//   height:20px !important;
//   margin-top:2px;
// `
// //const GrayButton = styled.div`
// //    width:200px;
// //    height:40px;
// //    padding:10px;
// //    border-radius:5px;
// //    font-weight:500;
// //    background-color:#707070;
// //    color:white;
// //    text-align:center;
// //    cursor:pointer;
// //`

// class Payment extends Component {

//   constructor(props){
//         super(props);
//         this.state = {
//             name:"",phone_first:"010",phone_second:"",address_essential:"",address_detail:"",comment:"",
//         }
//         this.onClickPayment = this.onClickPayment.bind(this);
//         this.onChangeNameValue=this.onChangeNameValue.bind(this);
//         this.onChangePhoneFirst=this.onChangePhoneFirst.bind(this);
//         this.onChangePhoneSecond=this.onChangePhoneSecond.bind(this); 
//         this.onChangeAddressEssential=this.onChangeAddressEssential.bind(this);
//         this.onChangeAddressDetail=this.onChangeAddressDetail.bind(this);
//         this.onChangeComment=this.onChangeComment.bind(this);
//   }

//   onClickPayment(){
//       const {id,title,amount,option,thumbnail} = this.props.match.params;
//       console.log("결제하기요청",this.props);
//       const Result = {user_id:this.props.userInfo.uid,
//                     product_id:id,amount:amount,name:title,
//                     phone:this.state.phone_first+this.state.phone_second,post_number:"",
//                     address_essential:this.state.address_essential,address_detail:this.state.address_detail,
//                     comment:this.state.comment
//                 };
//       this.props.addOrderRequest(Result,this.props.token);
//   }
//   onChangeNameValue(value){
//       this.setState({name:value});
//   }
//   onChangePhoneFirst(value){
//       this.setState({phone_first:value});
//   }
//   onChangePhoneSecond(value){
//       this.setState({phone_second:value});
//   }
//   onChangeAddressEssential(value){
//        this.setState({address_essential:value});
//   }
//   onChangeAddressDetail(value){
//        this.setState({address_detail:value});
//   }
//   onChangeComment(value){
//       this.setState({comment:value});
//   }
//   render() {

//     return(
//         <React.Fragment>
//              <MainBox>
//                     <div className="contents_box">
//                         <div className="payment_box">
//                             <DeliverySection
//                             onChangeNameValue={this.onChangeNameValue}
//                             onChangePhoneFirst={this.onChangePhoneFirst}
//                             onChangePhoneSecond={this.onChangePhoneSecond}
//                             onChangeAddressEssential={this.onChangeAddressEssential}
//                             onChangeAddressDetail={this.onChangeAddressDetail}
//                             onChangeComment={this.onChangeComment}
//                             />
//                             {/* <AddInfoSection/> */}
//                             <OrderSection
//                                 product_id={this.props.match.params.id}
//                                 product_title={this.props.match.params.title}
//                                 product_amount={this.props.match.params.amount}
//                                 product_option={this.props.match.params.option}
//                                 product_img={decodeURIComponent(this.props.match.params.thumbnail)}
//                             />
//                             <PaySection/>
//                             <div className="payment_content_box">

//                             </div>
//                             <div className="payment_content_box">
//                             </div>
//                         </div>
//                     </div>

//                 </MainBox>
//                 <div className="payment_content_box">
//                 <Button onClick={this.onClickPayment}>결제하기</Button>
//                 <FormCheckbox/><span style={{paddingLeft:"10px"}}>구매 대행 서비스에 동의합니다.</span>
//                 </div>
//         </React.Fragment>
//     );
//   }
// }

// export default Payment;
