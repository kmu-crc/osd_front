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
    constructor(props) {
        super(props);
        this.state = { kinds: [] };
    };
    onReset = () => {
        this.setState({ kinds: [] });
        let checks = document.getElementsByName('kinds');
        checks.forEach(item => {
            if (item.checked) {
                item.checked = false;
            }
        })
        // this.props.reset && this.props.reset();
        // this.props.close
    };
    onSubmit = () => {
        this.props.submit && this.props.submit(this.state);
    };
    changedCheckbox = (e, t) => {
        if (e.target.type !== "checkbox") return;
        let copy = this.state[t];
        if (e.target.checked) {
            copy.push(e.target.value);
        } else {
            copy.splice(copy.indexOf(e.target.value), 1);
        }
        this.setState({ [t]: copy });
    }
    // changedRadio = (e, t) => {
    // ;
    // }
    render() {
        const { ops } = this.props;
        console.log(ops);
        const items = [
            { value: "patent", text: "특허" },
            { value: "consort", text: "기술자문/상담" },
            { value: "info", text: "정보/아이디어/노하우" },
            { value: "product", text: "제작품" },
        ];
        return (<FilterBox>
            <div className="wrapper">
                <div className="title">아이템종류</div>
                <ul className="list-box">
                    {items.map(item => <li key={item.value} className="list-element"><label><input name="kinds" type="checkbox" onChange={e => this.changedCheckbox(e, "kinds")} value={item.value} />{item.text}</label></li>)}
                </ul>
            </div>

            {/*
            <div className="wrapper">
                <div className="title">배송</div>
                <ul className="list-box">
                    <li className="list-element"><label><input name="delivery" type="radio" onChange={e => this.changedRadio(e, "delivery")} />무료배송</label></li>
                    <li className="list-element"><label><input name="delivery" type="radio" onChange={e => this.changedRadio(e, "delivery")} />직접배송</label></li>
                    <li className="list-element"><label><input name="delivery" type="radio" onChange={e => this.changedRadio(e, "delivery")} />직거래</label></li>
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
            </div> */}
            <div className="wrapper button-wrapper">
                <div className="button" onClick={this.onSubmit}>적용</div>
                <div className="button" onClick={this.onReset}>모두해제</div>
            </div>
            <div style={{ height: "50px" }}></div>
        </FilterBox>)
    }
};

export default ProductFilter;
