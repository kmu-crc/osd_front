import React, { Component } from 'react';
import styled from "styled-components";

const FilterBox = styled.div`
    // border: 1px solid #ACACAC;
    border-radius: 25px;
    background-color: #EFEFEF;
    padding: 5px;
    padding-top: 10px;
    width: 230px;
    .wrapper {
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 20px;
        &.button-wrapper {
            display: flex;
        }
    }
    .title {
       font-size: 20px;
       font-weight: bold; 
    }
    .list-box {
        margin: 0;
        padding 0;
        margin-top: 15px;
        list-style: none;
    }
    .list-element {
        font-size: 16px;
        margin-top: 2px;
        label {
            margin-left: 5px;
        }
    }
    .wrapper-price-input {
        margin-left: auto;
        margin-top: 10px;
        margin-right: 10px;
        width: max-content;
    }
    .price-input {
        border-radius: 5px;
        border: 1px solid gray;
        box-shadow: inset 0 1px 0 1px rgba(0, 0, 0, 0.1);
        width: 73px;
        padding: 1px;
        text-align: right;
    }
    .button {
        margin-left:auto;
        margin-right: 10px;
        &:last-child {
            margin-left: 0px;
        }
        width: 75px;
        border: none;
        border-radius: 5px;
        background-color: #707070;
        color: white;
        text-align: center;
        cursor: pointer;
    }
`;

class ProductFilter extends Component {
    onReset = () => {}
    onSubmit = () => {}
    render() {
        return (<FilterBox>
            <div className="wrapper">
                <div className="title">아이템종류</div>
                <ul className="list-box">
                    <li className="list-element"><input type="radio" name="item-kinds" /><label>파일</label></li>
                    <li className="list-element"><input type="radio" name="item-kinds" /><label>공예품</label></li>
                    <li className="list-element"><input type="radio" name="item-kinds" /><label>커스텀 상품</label></li>
                </ul>
            </div>

            <div className="wrapper">
                <div className="title">배송</div>
                <ul className="list-box">
                    <li className="list-element"><input type="radio" name="item-delivery-method" /><label>무료배송</label></li>
                    <li className="list-element"><input type="radio" name="item-delivery-method" /><label>직접배송</label></li>
                    <li className="list-element"><input type="radio" name="item-delivery-method" /><label>직거래</label></li>
                </ul>
            </div>

            <div className="wrapper">
                <div className="title">가격</div>
                <ul className="list-box">
                    <li className="list-element"><input type="radio" name="item-price" /><label>1만원 이하</label></li>
                    <li className="list-element"><input type="radio" name="item-price" /><label>10만원 이하</label></li>
                    <li className="list-element"><input type="radio" name="item-price" /><label>100만원 이하</label></li>
                    <li className="list-element">
                        <input type="radio" name="item-price" />
                        <label>직접설정</label>
                        <div className="wrapper-price-input">
                            <input className="price-input" placeholder="0" />&nbsp;-&nbsp;
                            <input className="price-input" placeholder="10000" />
                        </div>
                    </li>
                </ul>
            </div>
            <div className="wrapper button-wrapper">
                <div className="button" onClick={this.onSubmit}>적용</div>
                <div className="button" onClick={this.onReset}>리셋</div>
            </div>
            <div style={{ height: "50px" }}></div>
        </FilterBox>)
    }
};

export default ProductFilter;
