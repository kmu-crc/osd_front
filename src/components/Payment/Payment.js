import React, { Component } from "react";
import styled from 'styled-components';
import DeliverySection from 'components/Payment/Common/Delivery/DeliverySection'
// import AddInfoSection from 'components/Payment/Common/AddInformation/AddInfoSection'
import OrderSection from 'components/Payment/Common/Order/OrderSection'
import PaySection from 'components/Payment/Pay/PaySection'
import Button from "components/Commons/Button";

const MainBox = styled.div`
    *{
        font-family:Noto Sans KR;
    }
    width: 100%;
    background-color: white;
    box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    padding-left: 90px;
    padding-top:90px;
    margin-bottom: 30px;
    border-radius: 3px;
    
    .title_box{
        width:100%;
        display:flex;
        justify-content:center;
        .title_label{
            font-size:30pt;
            font-weight:1000;
            padding:20px;

        }
    }
    .contents_box{
        width:100%;
        display:flex;
        .payment_box{
            width:70%;
            min-width:480px;
            .payment_content_box{
                width:100%;
                padding:15px;
                padding-left:20px;
                display:flex;
                justify-content:flex-end;
            }         
        }
    }
`
const FormCheckbox = styled.input.attrs({type:'checkbox'})`
  width:20px !important;
  height:20px !important;
  margin-top:2px;
`
//const GrayButton = styled.div`
//    width:200px;
//    height:40px;
//    padding:10px;
//    border-radius:5px;
//    font-weight:500;
//    background-color:#707070;
//    color:white;
//    text-align:center;
//    cursor:pointer;
//`

class Payment extends Component {

  constructor(props){
        super(props);
        this.state = {
            name:"",phone_first:"010",phone_second:"",address_essential:"",address_detail:"",comment:"",
        }
        this.onClickPayment = this.onClickPayment.bind(this);
        this.onChangeNameValue=this.onChangeNameValue.bind(this);
        this.onChangePhoneFirst=this.onChangePhoneFirst.bind(this);
        this.onChangePhoneSecond=this.onChangePhoneSecond.bind(this); 
        this.onChangeAddressEssential=this.onChangeAddressEssential.bind(this);
        this.onChangeAddressDetail=this.onChangeAddressDetail.bind(this);
        this.onChangeComment=this.onChangeComment.bind(this);
  }

  onClickPayment(){
      const {id,title,amount,option,thumbnail} = this.props.match.params;
      console.log("결제하기요청",this.props);
      const Result = {user_id:this.props.userInfo.uid,
                    product_id:id,amount:amount,name:title,
                    phone:this.state.phone_first+this.state.phone_second,post_number:"",
                    address_essential:this.state.address_essential,address_detail:this.state.address_detail,
                    comment:this.state.comment
                };
      this.props.addOrderRequest(Result,this.props.token);
  }
  onChangeNameValue(value){
      this.setState({name:value});
  }
  onChangePhoneFirst(value){
      this.setState({phone_first:value});
  }
  onChangePhoneSecond(value){
      this.setState({phone_second:value});
  }
  onChangeAddressEssential(value){
       this.setState({address_essential:value});
  }
  onChangeAddressDetail(value){
       this.setState({address_detail:value});
  }
  onChangeComment(value){
      this.setState({comment:value});
  }
  render() {
    
    return(
        <React.Fragment>
             <MainBox>
                    <div className="contents_box">
                        <div className="payment_box">
                            <DeliverySection
                            onChangeNameValue={this.onChangeNameValue}
                            onChangePhoneFirst={this.onChangePhoneFirst}
                            onChangePhoneSecond={this.onChangePhoneSecond}
                            onChangeAddressEssential={this.onChangeAddressEssential}
                            onChangeAddressDetail={this.onChangeAddressDetail}
                            onChangeComment={this.onChangeComment}
                            />
                            {/* <AddInfoSection/> */}
                            <OrderSection
                                product_id={this.props.match.params.id}
                                product_title={this.props.match.params.title}
                                product_amount={this.props.match.params.amount}
                                product_option={this.props.match.params.option}
                                product_img={decodeURIComponent(this.props.match.params.thumbnail)}
                            />
                            <PaySection/>
                            <div className="payment_content_box">
                                
                            </div>
                            <div className="payment_content_box">
                            </div>
                        </div>
                    </div>

                </MainBox>
                <div className="payment_content_box">
                <Button onClick={this.onClickPayment}>결제하기</Button>
                <FormCheckbox/><span style={{paddingLeft:"10px"}}>구매 대행 서비스에 동의합니다.</span>
                </div>
        </React.Fragment>
    );
  }
}

export default Payment;
