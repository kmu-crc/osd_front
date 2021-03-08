import React, { Component } from "react";
import styled from 'styled-components';
import Button from "components/Commons/Button";
// import noimg from "source/noimg.png";
import cookie from 'react-cookies';
import market_style from "market_style"

const MainBox = styled.div`
    *{
        font-family:Noto Sans KR;
    }
    width: 100%;
    background-color: white;
    box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1);
    padding:90px;
    margin-bottom: 30px;
    border-radius: 3px;
.content_box{
    width:100%;
    .label_box{
        *{
            text-align:center;
            padding-top:5px;
        }
        width:100%;
        height:30px;
        background-color:#EFEFEF;
        border-top:1px solid #d6d6d6;
        border-bottom:1px solid #d6d6d6;
        display:flex;
        .checkbox_label{
            width:30px;
        }
        .product_info_label{
            width:50%;
        }
        .product_price_label{
            width:25%;
        }
        .product_delivery_label{
            width:25%;
        }

    }
    

    .value_box{
        width:100%;
        height:120px;
        padding:5px;
        border-bottom:1px solid #d6d6d6;
        display:flex;
        .checkbox_value{
            width:30px;
            padding-top:40px;
        }
        .product_info_value{
            width:50%;
            height:100%;
            display:flex;
            border-right:1px solid #d6d6d6;
            .information_text{
                padding:20px;
            }
        }
        .product_price_value{
            width:25%;
            border-right:1px solid #d6d6d6;
            display:flex;
            justify-content:center;
            align-items:center;
        }
        .product_delivery_value{
            width:25%;
            display:flex;
            justify-content:center;
            align-items:center;
        }
    }
}
.product_delete_button_box{
    width:100%;
    height:30px;
    margin-top:10px;
    margin-bottom:10px;
    display:flex;
    cursor:pointer;
    .button{
        width:80px;
        height:100%;
        border-radius:5px;
        border:1px solid #d6d6d6;
        background-color:#EFEFEF;
        margin-right:10px;
        text-align:center;
        padding-top:5px;
        cursor:pointer;
    }

}
.payment_price_box{

    width:100%;
    height:150px;
    display:flex;
    border-top:1px solid #d6d6d6;
    border-bottom:1px solid #d6d6d6;
    margin-top:50px;
    .title{
        width:25%;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:${market_style.font.size.normal1};
        border-right:1px solid #d6d6d6;
    }
    .calculate{
        padding:30px;
        width:50%;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        border-right:1px solid #d6d6d6;
        .item_row{
            width:100%;
            height:30px;
            display:flex;
            justify-content:space-between;
        }
    }
    .result{
        width:25%;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:${market_style.font.size.normal1};
    }
}
`

const SmallImage = styled.div`
    width:100px;
    height:100px;
    background-image:url(${props => props.imageURL});
    background-size:contain;
    background-position:center center;
    border:1px solid #EFEFEF;
`

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onChangeCheck = this.onChangeCheck.bind(this);
        this.onClickDeleteAll = this.onClickDeleteAll.bind(this);
        this.onClickDeleteSelect = this.onClickDeleteSelect.bind(this);
    }
    componentDidMount() {
        this.setState({ token: cookie.load("cart") });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.CartList !== this.props.CartList) {
            console.log("CartContainer", this.props);
        }
        return true;
    }
    onChangeCheck(event) {
    }
    onClickDeleteAll(event) {
        this.props.CartList.map((item, index) => {
            document.getElementById(index).checked = true;
            return item;
        });
        this.props.deleteCartAllItem(this.props.userInfo.uid, this.props.token);
        window.location.reload();
    }
    onClickDeleteSelect(event) {
        this.props.CartList.map((item, index) => {
            // console.log(document.getElementById(index).checked);
            if (document.getElementById(index) && document.getElementById(index).checked === true) {

                console.log(this.props.CartList[index].uid + "제거");
                this.props.deleteCartItem(this.props.CartList[index].uid, this.props.token)
            }
            return item;
        });
        window.location.reload();
    }
    render() {
        console.log("CART::", this.props);
        const CartList = (item, index) => {
            return (
                <div className="value_box">
                    <div className="checkbox_value"><input id={index} type="checkbox" /></div>
                    <div className="product_info_value">
                        <SmallImage imageURL={item.s_img} />
                        <div className="information_text">
                            {item.title}<br />
                               [옵션]{item.product_option}<br />
                               [수량]{item.amount} <br />
                        </div>
                    </div>
                    <div className="product_price_value"><div>{item.price}</div></div>
                    <div className="product_delivery_value"><div>2500</div></div>
                </div>
            );
        }
        let AllPrice = 0;
        for (let idx = 0; idx < this.props.CartList.length; idx++) {
            AllPrice += this.props.CartList[idx].price * this.props.CartList[idx].amount;
        }
        return (
            <React.Fragment>
                <MainBox>
                    <div className="content_box">
                        <div className="label_box">
                            <div className="checkbox_label"><input type="checkbox" /></div>
                            <div className="product_info_label">상품정보</div>
                            <div className="product_price_label">상품금액</div>
                            <div className="product_delivery_label">배송비</div>
                        </div>
                        {
                            this.props.CartList.map((item, index) => {
                                return (
                                    CartList(item, index)
                                );
                            })
                        }
                        {/* <CartList/>
                    <CartList/> */}
                    </div>
                    <div className="product_delete_button_box">
                        <div className="button" onClick={this.onClickDeleteAll}>전체삭제</div>
                        <div className="button" onClick={this.onClickDeleteSelect}>선택삭제</div>
                    </div>

                    <div className="payment_price_box">
                        <div className="title">
                            <div>결제 예정 금액</div>
                        </div>
                        <div className="calculate">
                            <div className="item_row">
                                <div>상품금액</div>
                                <div>{AllPrice} point</div>
                            </div>
                            <div className="item_row">
                                <div>배송비</div>
                                <div>(+)2500 point</div>
                            </div>
                            <div className="item_row">
                                <div>할인금액</div>
                                <div>(-)0 point</div>
                            </div>
                        </div>
                        <div className="result">
                            <div>={AllPrice + 2500} point</div>
                        </div>
                    </div>

                </MainBox>
                <div>
                    <Button>쇼핑계속</Button>
                    <Button>구입</Button>
                </div>
            </React.Fragment>
        );
    }
}
export default Cart;