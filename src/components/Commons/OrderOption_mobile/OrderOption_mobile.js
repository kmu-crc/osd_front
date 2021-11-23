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

const OrderDrop = styled.div`
    width:67px;
    height:16px;
    border-radius:7px;
    border:1px solid #707070;
    display:flex;
    align-items:center;
    justify-content:center;

    position:relative;
    .text{
        font-family:Spoqa Han Sans Neo;
        font-size:8px;
        font-weight:500;
        color:${props=>props.type=="design"?"#1262AB":props.type=="designer"?"#7E1E9B":props.type=="group"?"#1E9B79":"red"};
    }

    .dropWrap{
        width:67px;
        position:absolute;
        top:16px;
        z-index:888;
        .item{
            width:100%;
            height:16px;
            background-color:#1262AB;
            color:white;
            border-radius:7px;

            margin-top:1px;

            font-family:Spoqa Han Sans Neo;
            font-size:8px;
            font-weight:500;
            
            display:flex;
            justify-content:center;
            align-items:center;
        }
    }
`

class OrderOption_mobile extends Component {
    state = {
        drop:false,
        select:this.props.selected.keyword=="like"?0:1,
        options:
            [{ text: "인기순", keyword: "like", marginRight: "30px" },
            { text: "최신순", keyword: "update", marginRight: "30px" }]
    }

    handleClicked = (order,index) => {
        console.log(order,index);
        this.setState({select:order.keyword=="like"?0:1});
        this.props.order_clicked(order);
    }
    render() {
        console.log(this.props.selected)
        const { options } = this.state
        const { selected, style } = this.props
        return (
            <OrderDrop type={this.props.type}>
                <div className="text" onClick={()=>this.setState({drop:!this.state.drop})}>{options[this.state.select].text}</div>
                <div className="text">∨</div>
                {
                    this.state.drop&&
                    <div className="dropWrap">
                    {options.map((opt,index) => {
                            return (
                                <div className="item" onClick={() => this.handleClicked(opt,index)}>
                                    {opt.text}
                                </div>
                            )
                    })}
                    </div>
                }
            </OrderDrop>
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