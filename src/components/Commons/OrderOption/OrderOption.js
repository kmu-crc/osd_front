import React, { Component } from 'react';
import styled from 'styled-components';
import opendesigncss from "opendesign_style";

const OrderWrapper = styled.div`
    width: 100%;
    height:80px;
    z-index: 820;
    display: flex;
    align-items:center;
    justify-content:flex-end;
    font-family: Noto Sans KR;
`
const OrderElement = styled.div`
    width:128px;
    height:34px;
    font-family: Noto Sans KR;
    font-weight: 500;
    font-size: 18px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor: pointer;
    color: black;

    &.selected {
        margin-left: ${props => props.marginRight};
        border:1px solid #707070;
    }
    &.unselected {
        margin-left: ${props => props.marginRight};
    }
    @media only screen and (min-width : ${opendesigncss.resolutions.SmallMinWidth}px) and (max-width : ${opendesigncss.resolutions.SmallMaxWidth}px) {
        font-size: 15px;
        width: max-content;
        &.unselected {
            margin-left: 10px;
        }
        &.selected {
            margin-left: 10px;
        }
    }
`
class OrderOption extends Component {
    state = {
        options:
            [{ text: "인기순", keyword: "like", marginRight: "30px" },
            { text: "최신순", keyword: "update", marginRight: "30px" }]
    }

    handleClicked = (order) => {
        console.log(order);
        this.props.order_clicked(order)
    }
    render() {
        const { options } = this.state
        const { selected, style } = this.props
        return (

            <OrderWrapper style={style}>

                {options.map(opt => {
                    return (<OrderElement
                        marginRight={opt.marginRight}
                        className={selected.keyword === opt.keyword ? "selected" : "unselected"}
                        onClick={() => this.handleClicked(opt)} key={opt.keyword}>{opt.text}</OrderElement>)
                })}

            </OrderWrapper>
        )
    }
}

export default OrderOption
