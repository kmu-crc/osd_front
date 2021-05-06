import React, { Component } from "react";
import styled from 'styled-components';
import noimg from "source/noimg.png";
// import StyleGuide from "StyleGuide";
import ContentBox from "components/Commons/ContentBox";
// import mainSlide from "source/mainSlide.jpg";
import NumberFormat from "modules/NumberFormat";
import { alert } from "components/Commons/Alert/Alert";
import { confirm } from "components/Commons/Confirm/Confirm";
import market_style from "market_style";

const MainBox = styled.div`
    // *{
    //     color:black;
    // }
    width:100%;
    padding:20px 30px;

    .contentsBox{
        width:100%;
        display:flex;
        flex-direction:column;
        position:relative;
        .payment_button_Box{
            margin-top:50px;
            width:100%;
            display:flex;
            justify-content:center;
        }
    }

`;
const HeaderBox = styled.div`
    *{
        font-family:Noto Sans KR;
        font-size:${market_style.font.size.small1};
        font-weight:500;
        color:#000000;
    }
    width:100%;
    height:max-content;
    display:flex;
    justify-content:center;
    .wrapper_{
        display:flex;
    }
    .title{
        margin-left:20px;
        height:100%;
        .name{
            font-family:Noto Sans KR;
            font-size:${market_style.font.size.normal1};
            font-weight:500;
            color:#060000;
            margin-bottom:10px;
        }
        .option{
            font-family:Noto Sans KR;
            font-size:${market_style.font.size.small3};
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
        display:flex;
        align-items:center;
        font-size:${market_style.font.size.small1};
        font-weight:400;
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
    height:100%;
    margin-top:${props => props.marginTop == null ? 0 : props.marginTop}px;
    margin-left:${props => props.marginLeft == null ? 0 : props.marginLeft}px;
    display:flex;

    .title_label{
        min-width:138px;
        height:100%;
        font-family:Noto Sans KR;
        font-size:${market_style.font.size.normal3};
        font-weight:500;
        margin-right:70px;
    }
    .contents{
        width:100%;
        .row_Box{
            width:100%;
            color:black;
        }

    }
    .sub_Box{
        margin-top:7px;
        margin-bottom:7px;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        width:197px;
        min-height:100%;
        padding-left:20px;
        .font_mini{
            font-size:${market_style.font.size.small1};
        }
        .font_big{
            font-size:${market_style.font.size.normal1};
            font-weight:500;
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
    @media only screen and (min-width: 500px) and (max-width:800px){
        flex-wrap:wrap;
        .title_label{
            margin-bottom:20px;
        }
    }
`;
const Row = styled.div`
    *{
        font-family:Noto Sans KR;
        font-size:${market_style.font.size.normal3};
    }
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:15px;

    .row_label{
        width:170px;
        height:29px;
        display:flex;
        align-items:center;
        font-size:${market_style.font.size.normal1};
    }
    .row_content{
        width:100%;
        display:flex;
    }
    .marginBottom{
        margin-bottom:15px;
    }
    .font_small{
        font-size:${market_style.font.size.small1};
        color:#707070;
    }
    @media only screen and (min-width: 500px) and (max-width:800px){
        margin-bottom:10px;
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
const CustomBox = styled.div`
    width:${props => props.width == null ? "100%" : props.width+"px"};
    height:${props => props.height == null ? "100%" : props.height+"px"};
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
    border-radius:${props => props.radius == null ? "20px" : props.radius};
    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;
    &.selected {
        background-color: #FF0000;
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
                <MainBox>
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
                </MainBox>
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
