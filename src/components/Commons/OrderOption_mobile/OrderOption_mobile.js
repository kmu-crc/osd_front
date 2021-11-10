import React, { Component } from 'react';
import styled from 'styled-components';
import opendesigncss from "opendesign_style";
import { Dropdown } from "semantic-ui-react";

// const OrderWrapper = styled.div`
//     z-index: 820;
//     display: flex;
//     align-items:center;
//     justify-content:flex-end;
//     font-family: Noto Sans KR;
//     flex-wrap:wrap;
// `
// const OrderElement = styled.div`
//     width:128px;
//     height:34px;
//     font-family: Noto Sans KR;
//     font-weight: 500;
//     font-size: 18px;
//     display:flex;
//     justify-content:center;
//     align-items:center;
//     cursor: pointer;
//     color: black;

//     &.selected {
//         color:red;
//         margin-left: ${props => props.marginRight};
//         border:1px solid red;
//     }
//     &.unselected {
//         margin-left: ${props => props.marginRight};
//     }
//     @media only screen and (min-width : ${opendesigncss.resolutions.SmallMinWidth}px) and (max-width : ${opendesigncss.resolutions.SmallMaxWidth}px) {
//         font-size: 15px;
//         width: max-content;
//         &.unselected {
//             margin-left: 10px;
//         }
//         &.selected {
//             margin-left: 10px;
//         }
//     }
// `

const RoundComobo = styled.div`
    width:67px;
    height:16px;
    border-radius:7px;
    border:1px solid #707070;
    display:flex;
    align-items:center;
    justify-content:center;
    .text{
        font-family:Spoqa Han Sans Neo;
        font-size:8px;
        font-weight:500;
        color:${props=>props.type=="design"?"#1262AB":props.type=="designer"?"#7E1E9B":props.type=="group"?"#1E9B79":"red"};
    }

`
class OrderOption_mobile extends Component {
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
        console.log(this.state.options[0].text,this.props.selected)
        const { options } = this.state
        const { selected, style } = this.props
        return (
            <RoundComobo type={this.props.type}>
                <div className="text">인기순보기</div>
                <div className="text">∨</div>
            </RoundComobo>
            // <OrderWrapper wrap={this.props.wrap} style={style}>

            //     {options.map(opt => {
            //         return (<OrderElement
            //             marginRight={opt.marginRight}
            //             className={selected.keyword === opt.keyword ? "selected" : "unselected"}
            //             onClick={() => this.handleClicked(opt)} key={opt.keyword}>{opt.text}</OrderElement>)
            //     })}

            // </OrderWrapper>
        )
    }
}

export default OrderOption_mobile